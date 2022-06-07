<template>
  <div class="progress-bar-wrapper">
    <!-- ----------------title--------------------- -->
    <div class="d-flex justify-space-between progress-bar-title-wrapper">
      <div class="progress-bar-title">
        {{ title }}
        <slot />
      </div>
      <div v-if="titleDescription">
        <div v-if="usePercents">
          {{ descriptionStart + calcPercent + "%" }}
        </div>
        <div v-if="customDescription">
          {{ customDescription }}
        </div>
        <div v-if="!customDescription && !usePercents">
          {{ descriptionStart + currentValueData + " " + measure }}
        </div>
      </div>
    </div>

    <!-- ----------------currentValue/endValue--------------------- -->
    <div
      v-if="rowDescription"
      class="d-flex justify-start progress-bar-description"
    >
      <div class="progress-bar_current-value">
        <span v-if="usePercents">
          {{ calcPercent }}
        </span>
        <span v-else>
          {{ currentValueData }}
        </span>
      </div>
      <span class="mx-1">/</span>
      <div class="progress-bar-end-value">
        <span v-if="usePercents">
          100%
        </span>
        <span v-else>
          {{ max - min }} {{ measure }}
        </span>
      </div>
    </div>

    <!-- ----------------line--------------------- -->
    <div class="progress-bar_line-block">
      <div class="progress-bar_full-percent-line">
        <span
          class="progress-bar_closed-percent-line info"
          :style="[{ width: calcPercent + '%' }]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getObjectField } from '../../helpers';

export default {
  name: 'ProgressBar',
  props: {
    usePercents: {
      type: Boolean,
      default: false,
    },
    max: {
      type: [String, Number],
      required: true,
    },
    min: {
      type: [String, Number],
      default: 0,
    },
    currentValue: {
      type: [String, Number, Object],
      required: true,
    },
    itemField: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    titleDescription: {
      type: Boolean,
      default: false,
    },
    descriptionStart: {
      type: String,
      default: 'Выполнено: ',
    },
    customDescription: {
      type: String,
      default: '',
    },
    rowDescription: {
      type: Boolean,
      default: true,
    },
    lineColor: {
      type: String,
      default: '',
    },
    measure: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentValueData: '0',
    };
  },
  computed: {
    computedColor() {
      return !this.lineColor ? this.$defaultConfig.color : this.lineColor;
    },
    calcPercent() {
      const result = (((this.currentValueData - this.min) * 100)
        / (this.max - this.min)).toFixed(1);
      if (Number.isNaN(result)) return 0;
      return this.min === 0 && +result === 0 && +this.currentValueData !== 0
        ? '< 0.1'
        : result;
    },
  },
  watch: {
    currentValue: {
      immediate: true,
      handler(newVal) {
        if (this.$getType(newVal) === 'Object' && this.itemField) {
          this.currentValueData = getObjectField(newVal, this.itemField);
        } else if (
          this.$getType(newVal) === 'Number'
          || this.$getType(newVal) === 'String'
        ) {
          this.currentValueData = newVal;
        }
      },
    },
  },
};
</script>

<style lang="stylus">
.progress-bar-title-wrapper
  padding-bottom 4px

.progress-bar-description
  padding-bottom 2px

.progress-bar-wrapper
  padding-bottom: 2px
  margin: 8px
  font-size: 14px

.progress-bar-end-value
  opacity: .6

.progress-bar_full-percent-line
  position: relative;
  width: 100%;
  background: #e9ebef;
  height 8px
  border-radius 4px
  span
    border-radius 4px

.progress-bar_closed-percent-line
  position: absolute;
  left: 0;
  height: 100%;
  max-width: 100%;


</style>
