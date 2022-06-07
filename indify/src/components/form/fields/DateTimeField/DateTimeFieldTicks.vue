<template>
  <div
    v-if="showTimeTicks && showTimePicker"
    class="time-slider-ticks"
  >
    <span
      v-for="(tick, index) in tickLabels"
      :key="'tick-' + index"
      :style="{'left': getTickPosition(index)}"
      class="time-slider-tick"
    />
    <span
      v-for="(tick, index) in tickLabels"
      :key="'tick-label-' + index"
      :style="{'left': getTickPosition(index)}"
      class="time-slider-label"
      @click="tickClick(tick)"
    >
      {{ tick }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'DateTimeFieldTicks',
  props: {
    showTimeTicks: {
      type: Boolean,
      default: false,
    },
    showTimePicker: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tickDistance: 0,
    };
  },
  computed: {
    tickLabels() {
      const result = ['00'];
      const step = +this.timeTickStep >= 1 ? +this.timeTickStep : 1;
      for (let i = step; i < 24; i += step) {
        const label = i >= 10 ? `${i}` : `0${i}`;
        result.push(label);
      }
      result.push('24');
      return result;
    },
  },
  watch: {
    showTimePicker() {
      this.setupTicks();
    },
  },
  methods: {
    setupTicks() {
      if (!this.showTimeTicks) return;
      const width = 170;
      this.tickDistance = width / (this.tickLabels.length - 1);
    },
    getTickPosition(index) {
      if (index === 0) return '8px';
      if (index === this.tickLabels.length - 1) return '177px';
      return `${this.tickDistance * index + 8}px`;
    },
    tickClick(tick) {
      this.$emit('time-change', +tick * 60);
    },
  },
};
</script>

<style lang="stylus">
.time-slider-ticks
  position: absolute
  left: 59px
  top: 28px
  .time-slider-tick
    position: absolute
    top: -3px
    left: 0
    display: inline-block
    width: 1px
    height: 4px
    background: rgb(65, 111, 200)

  .time-slider-label
    position: absolute
    top: 0
    left: 0
    z-index: 3
    display: inline-block
    color: rgb(65, 111, 200)
    margin-left: -5px
    font-size: 10px
    cursor: pointer
</style>
