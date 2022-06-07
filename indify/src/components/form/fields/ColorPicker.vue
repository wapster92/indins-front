<template>
  <div>
    <TextInput
      v-model="localValue"
      :label="label"
      :rules="rules"
      :error-messages="errorList"
      :color="computedColor"
      :append-icon="appendIcon"
      :input-type="inputType"
      class="simple-text simple-date simple-color-picker"
      readonly
      @click.native="toggle"
    >
      <template #prepend-inner>
        <v-icon
          :class="isCompact ? 'color-dot' : 'color-dot with-margin'"
          :color="prependColor"
          size="15"
        >
          fiber_manual_record
        </v-icon>
      </template>
    </TextInput>
    <div
      v-show="show"
      class="color-picker-wrapper"
    >
      <v-color-picker
        v-model="localValue"
        :readonly="readonly"
        :width="canvasWidth"
        :hide-canvas="hideCanvas"
        hide-inputs
        canvas-height="154"
        class="color-picker-custom mt-3"
      />
    </div>
  </div>
</template>

<script>
import validation from '../mixins/validation';

export default {
  name: 'ColorPicker',
  mixins: [validation],
  props: {
    value: {
      type: String,
      default: '#24BB3D',
    },
    label: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    inputType: {
      type: [String, null],
      default: null,
      validator: value => {
        const types = ['compact', 'standart'];
        return !value || types.includes(value);
      },
    },
  },
  data() {
    return {
      show: false,
      canvasWidth: 300,
      resizeObserver: null,
      hideCanvas: false,
      localValue: '#FF00FF',
    };
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
    computedColor() {
      return !this.color ? this.$defaultConfig.color : this.color;
    },
    prependColor() {
      return this.localValue || this.$defaultConfig.color;
    },
    appendIcon() {
      return this.isCompact ? '' : 'colorize';
    },
  },
  watch: {
    localValue: {
      immediate: true,
      handler(value) {
        if (value === this.value) return;
        this.$emit('input', value);
      },
    },
    value: {
      immediate: true,
      handler(value) {
        if (!value) return;
        this.localValue = value;
      },
    },
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(() => this.refreshWidth);
    this.resizeObserver.observe(this.$el);
    this.resizeObserver.observe(document.querySelector('body'));
    this.refreshWidth();
  },
  beforeDestroy() {
    this.resizeObserver.disconnect();
  },
  methods: {
    toggle() {
      if (this.readonly) return;
      this.show = !this.show;
    },
    async refreshWidth() {
      this.canvasWidth = this.$el.clientWidth - 16;
      this.hideCanvas = true;
      await this.$nextTick();
      this.hideCanvas = false;
    },
  },
};
</script>

<style lang="stylus">
.simple-color-picker
  cursor: pointer
  &:not(.is-compact)
    .v-label
      left: -25px!important
  .v-input__prepend-inner
    align-self center !important
    margin-top: 0 !important
  &__circle
    width: 10px
    height: 10px
    border-radius 50%
    margin-right: 10px
  .color-dot
    margin-right: 6px
    &.with-margin
      margin-top: 6px

.color-picker-wrapper
  padding: 0 12px
.color-picker-custom
  .v-color-picker__controls
    padding: 23px 0 16px
</style>
