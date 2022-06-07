<template>
  <v-checkbox
    v-model="localValue"
    v-bind="$attrs"
    :color="defaultColor"
    :rules="rules"
    :error-messages="visibleErrors"
    :class="{ 'is-compact': isCompact}"
    class="simple-check"
    hide-details
    v-on="$listeners"
  />
</template>

<script>
import defaultColor from '../mixins/defaultColor';
import fieldModel from '../mixins/fieldModel';
import validation from '../mixins/validation';

export default {
  name: 'SimpleCheck',
  mixins: [defaultColor, fieldModel, validation],
  props: {
    inputType: {
      type: [String, null],
      default: null,
      validator: value => {
        const types = ['compact', 'standart'];
        return !value || types.includes(value);
      },
    },
  },
  computed: {
    currentInputType() {
      return this.inputType || (this.$vuetify.breakpoint.smAndDown
        ? 'standart'
        : 'compact');
    },
    isCompact() {
      return this.currentInputType === 'compact';
    },
    errorsAreVisible() {
      return this.showErrors && this.inputType === 'standart';
    },
    visibleErrors() {
      return this.errorsAreVisible
        ? this.errorList
        : '';
    },
  },
};
</script>

<style lang="stylus">
.simple-check.v-input
  display: flex
  flex-flow: row nowrap
  align-items: center
  height: 42px
  margin-top: 0
  padding: 0 12px
  &.is-compact
    height: 37px
  &.v-input--checkbox .v-input--selection-controls__input
    margin-right: 16px

  .theme--light.v-icon
    color: #dadada

  .v-label
    font-size: 14px

  .v-input__slot
    margin-bottom: 4px

@media(max-width: 959px)
  .v-input.simple-check
    padding: 0 8px
</style>
