<template>
  <div class="simple-input">
    <span
      v-if="label || info"
      class="simple-input__info"
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
    <span class="simple-input__wrap">
      <input
        :type="type"
        :name="name"
        :placeholder="placeholder"
        class="simple-input__input"
        :disabled="disabled"
        :value="value"
        @input="changeValue"
        @focus="$event.target.removeAttribute('readonly')"
      >
      <FieldIcon
        v-if="icon"
        class="simple-input__icon"
        :icon="icon"
      />
      <span
        v-show="invalid.length > 0"
        class="simple-input__error"
        v-text="errorMessage"
      />
      <span
        v-show="defaultErrorMessage && invalid.length <= 0"
        class="simple-input__error"
        v-text="defaultErrorMessage"
      />
    </span>
  </div>
</template>

<script>
import FieldInfo from '~/components/UI/fields/FieldInfo';
import FieldLabel from '~/components/UI/fields/FieldLabel';
import FieldIcon from '~/components/UI/fields/FieldIcon';

export default {
  name: 'SimpleInput',
  components: {
    FieldInfo,
    FieldLabel,
    FieldIcon,
  },
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    placeholder: {
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
    icon: {
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
    defaultErrorMessage: {
      type: String,
      default: '',
    },
  },
  methods: {
    async changeValue(e) {
      const val = e.target.value;
      this.$emit('input', val.toUpperCase());
    },
  },
};
</script>

<style lang="stylus">
.simple-input
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
    padding: 0 16px;
    color: $text-secondary;
    font-size: 16px;
    font-weight: 400;
    //text-transform: uppercase;
  &__wrap
    display: inline-flex;
    width: 100%;
    position: relative;
    flex-direction: column
  &__icon
    fill $blue-secondary
    cursor pointer
  &__error
    color: $red-main;
    font-size: 14px
    padding-top: 4px
</style>
