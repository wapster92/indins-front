<template>
  <div class="time-slider-buttons">
    <v-btn
      v-for="minutes in incrementTable"
      :key="'minutes' + minutes"
      :color="color"
      x-small
      outlined
      @click="increaseTime(+minutes)"
    >
      {{ minutes }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'DateTimeFieldTimeIncrement',
  props: {
    value: {
      type: [Number, null],
      default: null,
    },
    timeStep: {
      type: Number,
      default: 30,
    },
    color: {
      type: String,
      default: '',
    },
  },
  computed: {
    incrementTable() {
      const result = [];
      if (this.timeStep <= 60) result.push('-60', '60');
      if (this.timeStep <= 30) {
        result.splice(1, 0, '-30', '30');
      }
      if (this.timeStep <= 15) {
        result.splice(2, 0, '-15', '15');
      }
      return result;
    },
    timePickerValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    increaseTime(minutes) {
      let result = this.timePickerValue + minutes;
      if (result > 1439) result = 1439;
      if (result < 0) result = 0;
      this.timePickerValue = result;
    },
  },
};
</script>

<style lang="stylus">
.time-slider-buttons
  display: flex
  flex-flow: row nowrap
  justify-content: center
  align-items: center
  width: 100%
  padding: 0 16px 16px
  .v-btn
    margin: 0 2px
</style>
