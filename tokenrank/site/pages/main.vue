<template>
  <div id="app">
    <div class="fruit-wrap">
      <div>
        <TkCircleDiagram
          v-for="(donut, idx) of donuts"
          :key="idx"
          :index="idx"
          :observer="observer"
          :size="donut.size"
          :stroke-width="donut.strokeWidth"
          :data-dasharray="donut.dataDashArray"
          :visible="donut.seen"
          color="green"
        ><span>{{ donut.dataDashArray[0] }}</span></TkCircleDiagram>
      </div>
    </div>
  </div>
</template>

<script>
import TkCircleDiagram from '@/components/UI/TkCircleDiagram';

export default {
  name: 'App',
  components: {
    TkCircleDiagram,
  },
  data() {
    return {
      donuts: [{
        size: 250,
        strokeWidth: 20,
        dataDashArray: [45, 100],
        seen: false,
      }, {
        size: 250,
        strokeWidth: 20,
        dataDashArray: [75, 100],
        seen: false,
      }],
      observer: null,
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(
      this.onElementObserved,
      {
        root: this.$el,
        threshold: 1.0,
      },
    );
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  methods: {
    onElementObserved(entries) {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) {
          return;
        }
        this.observer.unobserve(target);
        const i = target.getAttribute('data-index');
        this.donuts[i].seen = true;
      });
    },
  },
};
</script>

<style lang="scss">
</style>
