<template>
  <v-switch
    v-model="localValue"
    v-bind="$attrs"
    color="info"
    :rules="rules"
    :error-messages="visibleErrors"
    :class="{ 'is-compact': isCompact}"
    class="simple-switch"
    hide-details
    v-on="$listeners"
  />
</template>

<script>
import defaultColor from '../mixins/defaultColor';
import fieldModel from '../mixins/fieldModel';
import validation from '../mixins/validation';

export default {
  name: 'SimpleSwitch',
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
.simple-switch.v-input
  display: flex
  flex-flow: row nowrap
  align-items: center
  height: 37px
  margin-top: 0
  padding: 0 12px
  &.v-input--switch .v-input--selection-controls__input
    margin-right: 16px

  .v-label
    font-size: 14px

  .v-input__slot
    margin-bottom: 4px

@media(max-width: 959px)
  .v-input.simple-switch
    padding: 0 8px
</style>
