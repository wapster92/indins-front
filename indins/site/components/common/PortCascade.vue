<template>
  <div
    :class="[data.areaClass, {'port-cascade-revers' : reversProp}]"
    class="port-cascade-area"
  >
    <div class="port-cascade-left">
      <div class="angular-area">
        <span class="angular-back"><span/></span>
        <div class="port-cascade-col">
          <div
            v-for="(img, key) in data.images"
            v-if="img"
            :class="img.srcClass"
            :key="key"
            class="port-cascade-img-block"
          >
            <img
              :src="img.src"
              :alt="img.alt"
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="port-cascade-right">
      <div class="port-cascade-col">
        <div
          v-if="data.text"
          :class="data.textClass"
          class="port-cascade-text"
          v-html="data.text"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      reversProp: false,
    };
  },
  created() {
    if (this.data.revers) {
      this.reversProp = this.data.revers;
    }
  },
};
</script>
