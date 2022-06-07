<template>
  <span
    class="select-input"
  >
    <span
      v-if="label || info"
      class="select-input__info"
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
    <span class="select-input__wrap">
      <!--      <v-select
        :options="options"
        :label="labelOption"
        @option:selected="changeValue"
      >
        <template #no-options="{ searching }">
          <template v-if="searching">
            Ничего не найдено
          </template>
          <em style="opacity: 0.5;" v-else>Список пуст</em>
        </template>
        <template #search="{ attributes, events }">
          <input
            class="select-input__input"
            v-bind="attributes"
            v-on="events"
            @input="changeInput"
          >
        </template>
        <template #open-indicator>
          <FieldIcon
            icon="field-select"
          />
        </template>
      </v-select>-->
      <ElSelect
        v-model="value"
        :value-key="labelOption"
        filterable
        @change="changeValue(value)"
        :disabled="disabled"
      >
        <ElOption
          v-for="item of options"
          :key="item.id"
          :label="item[labelOption]"
          :value="item"
        />
      </ElSelect>
      <span
        v-show="invalid.length > 0"
        class="select-input__error"
        v-text="errorMessage"
      />
    </span>

  </span>
</template>

<script>
import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';
import 'vue-select/dist/vue-select.css';
import FieldInfo from '~/components/UI/fields/FieldInfo';
import FieldLabel from '~/components/UI/fields/FieldLabel';
import FieldIcon from '~/components/UI/fields/FieldIcon';
import 'element-ui/lib/theme-chalk/select.css';
import 'element-ui/lib/theme-chalk/option.css';
import 'element-ui/lib/theme-chalk/icon.css';

export default {
  name: 'SelectInput',
  components: {
    FieldInfo,
    FieldLabel,
    FieldIcon,
    ElSelect,
    ElOption,
  },
  props: {
    labelOption: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    optValue: {
      type: String,
      default: 'id',
    },
    info: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default() {
        return [];
      },
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
    value: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      val: null,
    };
  },
  methods: {
    changeValue(value) {
      this.$emit('input', value);
    },
    changeInput(e) {
      // console.log(e.target.value);
      this.$emit('changeInput', e.target.value);
    },
  },
};
</script>

<style lang="stylus">

.select-input
  display: flex;
  position: relative;
  flex-direction column;
  &__info
    display: flex;
    justify-content space-between;
    margin-bottom: 4px;
  &__input
    width: 100%;

    border-radius: 5px;
    min-height: 50px
    padding: 5px 16px;

    font-size: 16px;
    font-weight: 400;
    outline-offset 0
    text-transform: uppercase;
  &__wrap
    display: inline-flex;
    width: 100%;
    position: relative;
  &__error
    position: absolute;
    bottom: -15px
    font-size: 13px
    color: $red-main;
.el-select
  width: 100%
.el-select-dropdown

  @media screen and (max-width: 532px)
    max-width: 320px !important;
.el-select-dropdown__item
  white-space: normal;

.el-input__inner
  color: $text-secondary !important;
  background: $grey-1 !important;
  border: 1px solid $grey-stroke !important;
</style>
