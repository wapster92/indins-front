<!--<template>-->
<!--  <div-->
<!--    class="circle">-->
<!--    <svg-->
<!--      class="diagram"-->
<!--      viewBox="0 0 45 45">-->
<!--      <circle-->
<!--        :class="fillColor"-->
<!--        :r="radius"-->
<!--        cx="50%"-->
<!--        cy="50%"-->
<!--      />-->
<!--      <circle-->
<!--        ref="mainDiagram"-->
<!--        :stroke-dashoffset="dashoffset"-->
<!--        :stroke-dasharray="dasharray"-->
<!--        :r="radius"-->
<!--        class="front"-->
<!--        cx="50%"-->
<!--        cy="50%"-->
<!--      />-->
<!--    </svg>-->
<!--    <slot />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'TkCircleDiagram',-->
<!--  props: {-->
<!--    dataDasharray: {-->
<!--      type: Array,-->
<!--      required: true,-->
<!--      validator: val => val?.length === 2,-->
<!--    },-->
<!--    radius: {-->
<!--      type: String,-->
<!--      default: '22.5',-->
<!--    },-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      dasharray: '0 0',-->
<!--      dashoffset: '100',-->
<!--      radiusBaseVal: 0,-->
<!--      circumference: 0,-->
<!--      animationStart: null,-->
<!--      animationId: null,-->
<!--      itemToAnimate: null,-->
<!--      percent: null,-->
<!--      offset: null,-->
<!--      updatedArrayValue: null,-->
<!--      step: null,-->
<!--      mode: 'inc',-->
<!--      oldPercent: null,-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    fillColor() {-->
<!--      const percent = Number(-->
<!--        ((this.dataDasharray[0] * 100) / this.dataDasharray[1]).toFixed(1),-->
<!--      );-->
<!--      if (percent > 33.3 && percent < 66.6) return 'orange';-->
<!--      return percent >= 66.6 ? 'green' : 'red';-->
<!--    },-->
<!--  },-->
<!--  watch: {-->
<!--    dataDasharray: {-->
<!--      handler() {-->
<!--        this.startAnimation();-->
<!--      },-->
<!--      deep: true,-->
<!--    },-->
<!--    percent(val, oldVal) {-->
<!--      if (oldVal !== null) {-->
<!--        this.oldPercent = oldVal;-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--  mounted() {-->
<!--    this.radiusBaseVal = this.$refs.mainDiagram?.r?.baseVal?.value;-->
<!--    this.circumference = 2 * Math.PI * this.radiusBaseVal;-->
<!--    this.startAnimation();-->
<!--  },-->
<!--  methods: {-->
<!--    animateDiagram(timestamp) {-->
<!--      if (!this.animationStart) {-->
<!--        this.percent = Number((-->
<!--          (this.dataDasharray[0] * 100) / this.dataDasharray[1]-->
<!--        ).toFixed(1));-->
<!--        if (this.percent > 100 || this.percent < 0) {-->
<!--          return;-->
<!--        }-->
<!--        this.offset = (this.percent / 100) * this.circumference;-->
<!--        this.updatedArrayValue = `${this.circumference - this.offset} ${this.offset}`;-->
<!--        this.animationStart = timestamp;-->
<!--        this.dashoffset = this.circumference.toFixed(3);-->
<!--        if (this.dasharray === '0 0') {-->
<!--          this.dasharray = `${this.circumference} 0`;-->
<!--        }-->
<!--      }-->
<!--      if (this.dasharray === this.updatedArrayValue) {-->
<!--        this.cancelAnimation();-->
<!--        return;-->
<!--      }-->
<!--      this.mode = this.percent > this.oldPercent ? 'inc' : 'dec';-->
<!--      const step = timestamp - this.animationStart;-->
<!--      const [dasharray1, dasharray2] = this.dasharray.split(' ');-->
<!--      if (this.mode === 'inc') {-->
<!--        this.dasharray = `${+dasharray1 - step / 1000} ${+dasharray2 + step / 1000}`;-->
<!--        if (Number(this.dasharray.split(' ')[0]) > this.circumference - this.offset) {-->
<!--          window.requestAnimationFrame(this.animateDiagram);-->
<!--        } else {-->
<!--          this.dasharray = `${this.circumference - this.offset} ${this.offset}`;-->
<!--          this.cancelAnimation();-->
<!--        }-->
<!--      } else {-->
<!--        this.dasharray = `${+dasharray1 + step / 1000} ${+dasharray2 - step / 1000}`;-->
<!--        if (Number(this.dasharray.split(' ')[0]) < this.circumference - this.offset) {-->
<!--          window.requestAnimationFrame(this.animateDiagram);-->
<!--        } else {-->
<!--          this.dasharray = `${this.circumference - this.offset} ${this.offset}`;-->
<!--          this.cancelAnimation();-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    cancelAnimation() {-->
<!--      window.cancelAnimationFrame(this.animationId);-->
<!--      this.animationId = null;-->
<!--      this.animationStart = false;-->
<!--      this.offset = null;-->
<!--      this.updatedArrayValue = null;-->
<!--      this.percent = null;-->
<!--    },-->
<!--    startAnimation() {-->
<!--      this.animationId = window.requestAnimationFrame(this.animateDiagram);-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.circle {-->
<!--  border-radius: 50%;-->
<!--  color: $primary-light-blue;-->
<!--  display: inline-block;-->
<!--  margin: 0;-->
<!--  width: 45px;-->
<!--  height: 45px;-->
<!--  position: relative;-->
<!--  left: 0;-->
<!--  .diagram {-->
<!--    width: 100%;-->
<!--    height: 100%;-->
<!--    position: absolute;-->
<!--    top: 0;-->
<!--    left: 0;-->
<!--    overflow: visible;-->
<!--    circle {-->
<!--      stroke-width: 3.54px;-->
<!--      stroke-linecap: butt;-->
<!--      transform: rotateZ(90deg) rotateY(-180deg) !important;-->
<!--      fill: transparent;-->
<!--      transform-origin: center;-->
<!--      z-index: 10;-->
<!--      &.front {-->
<!--        stroke: $primary-light-blue;-->
<!--        stroke-width: 4.3px;-->
<!--      }-->
<!--    }-->
<!--    .green {-->
<!--      stroke: $secondary-green;-->
<!--    }-->
<!--    .orange {-->
<!--      stroke: $primary-logo;-->
<!--    }-->
<!--    .red {-->
<!--      stroke: $secondary-red;-->
<!--    }-->
<!--  }-->
<!--  span {-->
<!--    font-size: 16px;-->
<!--    font-weight: normal;-->
<!--    display: block;-->
<!--    position: absolute;-->
<!--    top: 50%;-->
<!--    left: 50%;-->
<!--    transform: translate(-50%, -50%);-->
<!--    opacity: 1;-->
<!--    color: $primary-blue;-->
<!--    line-height: 25px;-->
<!--  }-->
<!--}-->
<!--</style>-->
<template>
  <div
    :style="{ height: computedSize + 'px', width: computedSize + 'px' }"
    class="svg__wrapper">
    <svg
      :height="computedSize"
      :width="computedSize"
      :viewBox="viewBox">
      <circle
        :r="radius"
        :stroke-width="computedStrokeWidth+'px'"
        cx="50%"
        cy="50%"
        fill="none"
        stroke="#ccc"/>
      <circle
        ref="mainDiagram"
        :stroke-width="computedStrokeWidth+'px'"
        :stroke-dasharray="strokeDashArray"
        :transform="circleRotation"
        :r="radius"
        :class="fillColor"
        cx="50%"
        cy="50%"
        class="front-circle"
        fill="none"
      />
    </svg>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Diagram',
  props: {
    // Свойство которое принимает массив чисел, где:
    // нулевой элемент - это: длина отрезка для видимой части stroke-dasharray
    // элемент с индексом 1, это длина всего отрезка
    // например из 78 яблок продано 25, значит пропс должен принять [25, 78]
    dataDasharray: {
      type: Array,
      required: true,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    strokeWidth: {
      type: Number,
      default: 5,
    },
    size: {
      type: Number,
      default: 45,
    },
  },
  computed: {
    computedSize() {
      return this.$store.state.screen.windowWidth < 721 ? 30 : this.size;
    },
    computedStrokeWidth() {
      return this.$store.state.screen.windowWidth < 721 ? 3 : this.strokeWidth;
    },
    viewBox() {
      return `0 0 ${this.computedSize} ${this.computedSize}`;
    },
    radius() {
      return (this.computedSize - this.computedStrokeWidth) / 2;
    },
    circumference() {
      return this.radius * Math.PI * 2;
    },
    dash() {
      return (this.percentage * this.circumference) / 100;
    },
    strokeDashArray() {
      return [this.dash, this.circumference - this.dash];
    },
    percentage() {
      if (!this.visible) return 0;
      const [first, second] = this.dataDasharray;
      return +second ? (first / second) * 100 : 0;
    },
    circleRotation() {
      return `rotate(-90 ${this.computedSize / 2} ${this.computedSize / 2})`;
    },
    fillColor() {
      if (this.percentage > 33.3 && this.percentage < 66.6) return 'orange';
      if (this.percentage >= 66.6) {
        return 'green';
      }
      return 'red';
    },
  },
};
</script>
<style lang="scss" scoped>
.svg__wrapper {
  position: relative;
  display: inline-block;
}
.front-circle {
  transition: all 2s ease;
}
.green {
  stroke: $secondary-green;
}
.orange {
  stroke: $primary-logo;
}
.red {
  stroke: $secondary-red;
}
span {
  font-size: 16px;
  font-weight: normal;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  color: $primary-blue;
  line-height: 25px;
  @include max-media($md) {
    font-size: 14px;
    line-height: 18.27px;
  }
}
</style>
