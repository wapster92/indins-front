<template>
  <div class="horizon-item-block">
    <div class="is-head">
      <transition name="fade-transition">
        <div
          v-if="data.icon && visible"
          class="icon"
        >
          <span :style="`background-image: url('` + data.icon + `')`"/>
        </div>
      </transition>
      <transition name="fade-transition">
        <div
          v-if="data.title && visible"
          :class="data.titleClass"
          class="name"
          v-html="data.title"
        />
      </transition>
    </div>
    <transition name="fade-transition">
      <div
        v-if="data.text && visible"
        :class="data.textClass"
        class="is-text"
        v-html="data.text"
      />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'HorizonItem',

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },

    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
