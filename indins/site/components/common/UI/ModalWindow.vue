<template>
  <div
    :class="modalClassList"
    @click="closeHandler"
    @wheel.prevent.stop
    @touchmove.prevent.stop
  >
    <div
      :style="styles"
      :class="modalWindowClassList"
      @click.prevent.stop
    >
      <div
        class="modal__close-button"
        @click="closeHandler"
      />
      <div
        v-if="options && options.title"
        class="modal__title"
      >
        {{ options.title }}
      </div>
      <div
        v-if="options && options.body"
        class="modal__body"
      >
        <component
          :is="bodyComponent"
          :value="bodyComponentProps"
        />
        <span
          v-if="!body.component"
          class="modal__body__text"
        >{{ body.text }}</span>
      </div>
      <div
        v-if="options && options.footer"
        class="modal__footer"
      >
        <component :is="footerComponent"/>
        <span
          v-if="!footer.component"
          class="modal__body__text"
        >{{ footer.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalWindow',

  data: () => ({
    animate: false,
    animateTimeout: null,
  }),

  computed: {
    showModal() {
      return this.$store.getters['modal/show'];
    },

    options() {
      return this.$store.getters['modal/options'];
    },

    modalClassList() {
      return {
        modal__overlay: true,
        modal__overlay_show: this.showModal && this.options,
      };
    },

    modalWindowClassList() {
      return {
        modal: true,
        modal_animate: this.animate,
      };
    },

    styles() {
      return this.options && this.options.styles;
    },

    body() {
      return this.options && this.options.body;
    },

    footer() {
      return this.options && this.options.footer;
    },

    bodyComponent() {
      return this.body && this.body.component;
    },

    bodyComponentProps() {
      return this.body && this.body.componentProps;
    },

    footerComponent() {
      return this.footer && this.footer.component;
    },
  },

  methods: {
    closeModal() {
      this.$store.commit('modal/hide');
    },

    clearOptions() {
      this.$store.commit('modal/clearOptions');
    },

    closeHandler() {
      setTimeout(this.clearOptions, 500);
      this.closeModal();
    },

    clickOverlayHandler() {
    },

    animateClick() {
      this.animate = false;
      this.$nextTick(() => {
        this.animate = true;
        window.clearTimeout(this.animateTimeout);
        this.animateTimeout = window.setTimeout(() => {
          this.animate = false;
        }, 150);
      });
    },
  },
};
</script>
