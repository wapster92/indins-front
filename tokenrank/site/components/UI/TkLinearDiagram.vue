<template>
  <div class="linear">
    <div class="linear__info-wrapper info">
      <span class="info__text">{{ minLocalV }} $</span>
      <span class="info__text">{{ period }}</span>
      <span class="info__text">{{ maxLocalV }} $</span>
    </div>
    <div class="linear__diagram-wrapper diagram">
      <div
        :class="currentColor"
        :style="{ width: calculatedWidth }"
        class="diagram__inner"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TkLinearDiagram',
  props: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    currentValue: {
      type: Number,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
  },
  computed: {
    minLocalV() {
      return this.min.toLocaleString('ru-RU');
    },
    maxLocalV() {
      return this.max.toLocaleString('ru-RU');
    },
    currentColor() {
      const part = (100 / (this.max - this.min)) * (this.currentValue - this.min);
      if (part > 66) return 'good';
      return part < 33 ? 'bad' : 'normal';
    },
    calculatedWidth() {
      const part = (100 / (this.max - this.min)) * (this.currentValue - this.min);
      return `${part}%`;
    },
  },
};
</script>

<style lang="scss" scoped>
.linear {
  @include flex-between;
  flex-direction: column;
  margin-bottom: 20px;
  @include min-media($md + 1) {
    margin-bottom: 35px;
  }
  &__info-wrapper {
    width: 100%;
    @include flex-between;
    margin-bottom: 4px;
    .info__text {
      font-size: 12px;
      color: $secondary-medium-black;
      @include min-media($md + 1) {
        font-size: 14px;
      }
    }
  }
  &__diagram-wrapper {
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background: $primary-light-blue;
    .diagram__inner {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      &.good {
        background: #A2D76A;
      }
      &.normal {
        background: #F0B90B;
      }
      &.bad {
        background: #EF5C49;
      }
    }
  }
}
</style>
