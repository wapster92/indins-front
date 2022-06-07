<template>
  <div class="simple-textarea">
    <span
      v-if="label || info"
      class="simple-textarea__info"
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
    <span class="simple-textarea__wrap">
      <textarea
        :name="name"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        class="simple-textarea__input"
        @input="changeValue"
      />
      <FieldIcon
        v-if="icon"
        :icon="icon"
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
  },
  methods: {
    changeValue(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>

<style lang="stylus">
.simple-textarea
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
    height: 78px
    padding: 12px 16px;
    resize none
    color: $text-secondary;
    font-size: 16px;
    font-weight: 400;
  &__wrap
    display: inline-flex;
    width: 100%;
    position: relative;

</style>
