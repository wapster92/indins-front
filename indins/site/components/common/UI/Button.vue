<template>
  <button
    ref="btn"
    :class="classList"
    :disabled="disabled"
    :style="computedStyles"
    :type="type"
    @click="onClick"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'Button',

  props: {
    bgColor: {
      type: String,
      default: 'transparent',
    },
    active: {
      type: Boolean,
      default: false,
    },
    borderColor: {
      type: String,
      default: '#637EA8',
    },
    color: {
      type: String,
      default: '#fff',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hideBorderOnHover: {
      type: Boolean,
      default: false,
    },
    hoverGray: {
      type: Boolean,
      default: false,
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: 'button',
    },
  },

  computed: {
    classList() {
      return {
        'i-btn_active': this.active,
        'i-btn': true,
        'i-btn_disabled': this.disabled,
        'i-btn_hover-gray': this.hoverGray,
        'i-btn_hover-blue': !this.hoverGray,
        'i-btn_hide-border-on-hover': this.hideBorderOnHover,
      };
    },

    borderStyle() {
      return { border: `1px solid ${this.borderColor}` };
    },

    fontColor() {
      return this.active ? { color: '#fff' } : { color: this.color };
    },

    backgroundColor() {
      return this.active ? {
        'background-color': this.bgColor,
      } : {
        'background-color': 'transparent',
      };
    },

    computedStyles() {
      return {
        ...this.styles, ...this.borderStyle, ...this.fontColor, ...this.backgroundColor,
      };
    },
  },

  methods: {
    onClick(event) {
      this.$emit('click');
      this.createWave(event);
    },

    createWave(event) {
      if (event) {
        const { x: targetX, y: targetY } = this.$refs.btn.getBoundingClientRect();

        const span = document.createElement('span');
        span.classList.add('i-btn__wave');
        span.style.top = `${event.clientY - targetY}px`;
        span.style.left = `${event.clientX - targetX}px`;

        this.$refs.btn.append(span);

        setTimeout(() => {
          span.remove();
        }, 300);
      }
    },
  },
};
</script>


