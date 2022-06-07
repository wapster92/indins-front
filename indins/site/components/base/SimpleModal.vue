<template>
  <div>
    <div
      :class="{'simple-modal__substrate--active': shown}"
      class="simple-modal__substrate"
      @click="closeModal($event)"
    />
    <div
      ref="simpleModal"
      :style="{'width': width + 'px'}"
      :class="{'simple-modal--active': shown}"
      class="simple-modal"
    >
      <div class="simple-modal__content">
        <div
          class="simple-modal__close-button"
          @click="closeModal($event)"
        />
        <div
          v-if="data.title"
          class="simple-modal__title"
        >
          <span
            v-text="data.title"
          />
        </div>
        <div
          v-if="data.text"
          class="simple-modal__text"
        >
          <span
            v-text="data.text"
          />
        </div>
        <div class="simple-modal__action">
          <SimpleButton
            :data="data.button"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleButton from './SimpleButton';

export default {
  name: 'SimpleModal',
  components: { SimpleButton },
  props: {
    shown: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({
        title: 'Заголовок',
        text: 'Текст',
        button: {},
      }),
    },
    width: {
      type: Number,
      default: 600,
    },
    persistent: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    closeModal(e) {
      if (!this.persistent) {
        this.$emit('close');
      } else {
        if (e.target.className.indexOf('simple-modal__close-button') + 1) {
          this.$emit('close');
        }
        if (e.target.className.indexOf('simple-modal__substrate') + 1) {
          this.$refs.simpleModal.classList.add('simple-modal--animated');
          setTimeout(() => {
            this.$refs.simpleModal.classList.remove('simple-modal--animated');
          }, 50);
        }
      }
    },
  },
};
</script>
