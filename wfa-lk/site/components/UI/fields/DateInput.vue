<template>
  <div
    class="date-input"
  >
    <span
      v-if="label || info"
      class="date-input__info"
    >
      <FieldLabel
        v-if="label"
        :label="label"
      />
      <FieldInfo
        v-if="info"
        :info="info"
      />
    </span>
    <ElDatePicker
      ref="picker"
      v-model="date"
      :value="value"
      v-mask="'##-##-####'"
      format="dd-MM-yyyy"
      value-format="yyyy-MM-dd"
      placeholder="ДД-ММ-ГГГГ"
      @change="changeValue"
    />
    <FieldIcon
      class="date-input__icon"
      icon="field-calendar"
      @click="openPicker"
    />
    <span
      v-show="invalid.length > 0"
      class="date-input__error"
      v-text="errorMessage"
    />
  </div>
</template>

<script>
import { mask } from 'vue-the-mask';
import ElDatePicker from 'element-ui/lib/date-picker';
import FieldInfo from '~/components/UI/fields/FieldInfo';
import FieldLabel from '~/components/UI/fields/FieldLabel';
import FieldIcon from '~/components/UI/fields/FieldIcon';
import 'element-ui/lib/theme-chalk/date-picker.css';
import 'element-ui/lib/theme-chalk/icon.css';
import lang from 'element-ui/lib/locale/lang/ru-RU';
import locale from 'element-ui/lib/locale';


locale.use(lang);

export default {
  name: 'DateInput',
  components: {
    FieldLabel,
    FieldInfo,
    FieldIcon,
    ElDatePicker,
  },
  directives: {
    mask,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    info: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: 'Поле обязательно для заполнения',
    },
    invalid: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      date: null,
    };
  },
  methods: {
    changeValue() {
      this.$emit('input', this.date);
    },
    changeDate(val) {
      this.date = val;
      this.changeValue();
    },
    openPicker() {
      this.$refs.picker.focus();
    },
  },
};
</script>

<style lang="stylus">
.date-input
  display: flex;
  position: relative;
  flex-direction column;
  &__info
    display: flex;
    justify-content space-between;
    margin-bottom: 4px;
  &__input
    width: 100%;
    background: $grey-1;
    border: 1px solid $grey-stroke;
    border-radius: 5px;
    height: 50px
    padding: 0 55px 0 16px;
    color: $text-secondary;
    font-size: 16px;
    font-weight: 400;
  &__wrap
    display: inline-flex;
    width: 100%;
    position: relative;
  &__error
    position: absolute;
    bottom: -15px
    font-size: 13px
    color: $red-main;
    width: 100%;
    left: 0;
  .mx-input-wrapper
    width: 100%
  .mx-icon-calendar
    right: 0
  &__icon
    position: absolute;
    margin-top: 23px
  .el-input__icon
    display: none;
.el-input__inner
  width: 100%;
  background: $grey-1;
  border: 1px solid $grey-stroke;
  border-radius: 5px;
  height: 50px
  padding: 0 55px 0 16px !important;
  color: $text-secondary;
  font-size: 16px;
  font-weight: 400;
.el-date-editor.el-input
  width: 100%;
</style>
