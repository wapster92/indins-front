<template>
  <div
    v-if="isVisible"
    :data-field="field"
    :class="{ 'is-editing' : isEditing, 'is-saving-cell' : showProgress }"
    class="table-cell"
  >
    <div v-if="isEditing">
      <input
        ref="input"
        v-model="inputValue"
        class="is-editing-input"
        :maxlength="max"
        :type="input.type"
        @input="startSaving($event)"
        @blur="showTableCell"
        @keyup.enter="showTableCell"
      >
    </div>
    <v-progress-linear
      v-else-if="showProgress"
      indeterminate
      :color="progress.color"
      height="100%"
    >
      <span
        class="is-saving-span"
      >
        {{ shownValue }}
      </span>
    </v-progress-linear>
    <div
      v-else
      @click="showInput"
    >
      {{ shownValue }}
    </div>
  </div>
</template>

<script>
import { debounce } from 'indify/src/helpers/decorators';
import { Filter, Put } from 'core-xhr';

export default {
  name: 'InputTextColumn',
  props: {
    field: {
      type: String,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    empty: {
      type: String,
      default: '-',
    },
    saveQuery: {
      type: String,
      required: true,
    },
    progress: {
      type: Object,
      default: () => ({
        minTime: 200,
        color: '#f4f8fd',
      }),
    },
    input: {
      type: Object,
      default: () => ({
        maxLength: 100,
        type: 'text',
        debounceTime: 800,
      }),
    },
    mode: {
      type: String,
      default: null,
    },
    precision: {
      type: Number,
      default: null,
    },
    delimiter: {
      type: String,
      default: ',',
    },
    currencySign: {
      type: String,
      default: '₽',
    },
  },
  data() {
    return {
      inputValue: null,
      savingValue: null,
      isEditing: false,
      isSaving: false,
      showProgressOnBlur: false,
    };
  },
  computed: {
    max() {
      if (this.mode === 'phone') {
        return 18;
      }
      if (this.mode === 'float') {
        return 15; // TODO появляется E+разряд - надо дорабатывать маску
      }
      if (this.mode === 'currency') {
        return 13; // TODO надо тестировать отображение и менять макс
      }
      if (this.mode === 'date') {
        return 10;
      }
      return this.input.maxLength;
    },
    dbValue() {
      return this.$fieldResolver.getFieldValue(this.item, this.field);
    },
    item() {
      return this.$parent.item;
    },
    isVisible() {
      if (!this.$parent.visibleColumns) return true;
      return this.$parent.visibleColumns[this.field];
    },
    showProgress() {
      return ((this.isSaving && !this.isEditing) || (this.showProgressOnBlur && !this.isEditing));
    },
    shownValue() {
      let {mode, dbValue: val, precision, delimiter, currencySign} = this;
      val = (this.savingValue !== null)
        ? this.savingValue
        : val = this.$applyMask({mode, val, precision, delimiter, currencySign}); // TODO брать из хелперов
      return val || this.empty;
    },
  },
  watch: {
    dbValue() {
      this.savingValue = null;
    },
  },
  methods: {
    showInput() {
      if (this.isSaving || this.readonly) return;
      this.save = debounce(this.save, this.input.debounceTime);

      let {mode, dbValue: val, precision, delimiter, currencySign} = this;
      if (this.mode === 'currency') {
        mode = 'float';
        precision = null;
      }
      this.inputValue = this.$applyMask({mode, val, precision, delimiter, currencySign});
      this.isEditing = true;
      this.$nextTick(() => this.$refs.input.focus());
    },
    startSaving(e) {
      this.isSaving = true;
      this.showProgressOnBlur = true;
      const val = e.target.value;
      // TODO добавить маски для save, вынести ифы в отдельную функцию
      let {mode, precision, delimiter, currencySign} = this;
      let v;
      switch (mode) {
        case 'phone':
          v = this.$applyMask({mode, val});
          this.inputValue = v;
          this.savingValue = v;
          this.save(+this.$applyMask({mode: 'positive-integer', val}));
          break;
        case 'integer':
          v = this.$applyMask({mode, val});
          this.inputValue = v;
          this.savingValue = v;
          this.save(+v);
          break;
        case 'float':
          this.inputValue = this.$applyMask({mode, val, precision: null, delimiter});
          v = this.$applyMask({mode, val, precision, delimiter});
          this.savingValue = v;
          this.save(+(v.split(delimiter).join('.')));
          break;
        case 'currency':
          this.inputValue = this.$applyMask({mode: 'float', val, precision: null, delimiter});
          this.savingValue = this.$applyMask({mode, val, delimiter, currencySign});
          v = this.$applyMask({mode: 'float', val, precision: 2, delimiter}).split(delimiter).join('.');
          this.save(+v);
          break;
        case 'date':
          v = this.$applyMask({mode, val});
          this.inputValue = v;
          this.savingValue = v;
          if (v === '') {
            this.save(null);
          } else if (v?.length === 10) {
            let d = v.split('.').reverse().join('-');
            d = `${d}T23:59:59`;
            this.save(d);
          } else {
            this.savingValue = null;
            this.isSaving = false;
            this.showProgressOnBlur = false;
          }
          break;
        default:
          this.inputValue = val;
          this.savingValue = val;
          this.save(val);
          break;
      }
    },
    async save(val) {
      try {
        if (!this.item.id) {
          throw new Error('Отсутствует ID');
        }
        const id = this.$fieldResolver.getFieldParentId(this.item, this.field);
        const key = this.$fieldResolver.getFieldKey(this.item, this.field);
        const request = new Put(this.saveQuery).addFilter(new Filter('id', 'eq', id));
        const requestData = {
          [key]: val,
        };
        if (!requestData.id) delete requestData.id;
        request.setData(requestData);
        const response = await this.$xhr.send(request);
        if (response?.data?.success && response?.data?.data?.updatedRows === 0) {
          throw new Error('success, but updatedRows === 0');
        }
      } catch (error) {
        this.savingValue = null;
        this.$errorHandler('Сохранить значение не удалось!')(error);
      } finally {
        this.isSaving = false;
      }
    },
    showTableCell() {
      this.inputValue = null;
      this.isEditing = false;
      setTimeout(() => { this.showProgressOnBlur = false; }, this.progress.minTime);
    },
  },
};
</script>

<style lang="stylus">
.is-editing
  padding-left: 0
  border: 1px solid #416FC8
  background-color: #ffffff
  &-input
    padding-left: 15px

.is-saving
  &-cell
    padding: 0
    & .v-progress-linear__content
      justify-content: flex-start
      padding-left: 15px

</style>
