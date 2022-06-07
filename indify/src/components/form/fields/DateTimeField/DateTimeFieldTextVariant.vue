<template>
  <v-list
    v-if="timeOnly && timeTextMode && !range"
    class="time-table-text-list"
  >
    <v-list-item
      v-for="timeText in timeTextTable"
      :key="timeText.text"
      @click="setTextTime(timeText.value)"
    >
      {{ timeText.text }}
    </v-list-item>
  </v-list>
</template>

<script>
import moment from "moment";

export default {
  name: 'DateTimeFieldTextVariant',
  props: {
    timeOnly: {
      type: Boolean,
      default: false,
    },
    timeTextMode: {
      type: Boolean,
      default: false,
    },
    range: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timeTextTable: [
        { text: 'Через 15 минут', value: 15 },
        { text: 'Через 30 минут', value: 30 },
        { text: 'Через час', value: 60 },
        { text: 'Сегодня', value: 'today' },
        { text: 'Завтра', value: 'tomorrow' },
        { text: 'До конца недели', value: 'endOfWeek' },
        { text: 'Через неделю', value: 10080 },
        { text: 'Через месяц', value: 43200 },
        { text: 'Через год', value: 525600 },
      ],
    };
  },
  methods: {
    setTextTime(value) {
      const type = this.$getType(value);
      if (type === 'String') {
        const daysMap = {
          today: 0,
          tomorrow: 1,
          endOfWeek: moment().endOf('week').diff(moment(), 'days'),
        };
        this.$emit('day-change', daysMap[value]);
        this.$emit('reset-time');
      }
      if (type === 'Number') {
        const now = moment();
        const time = moment(now).add(value, 'minutes');
        this.$emit('set-time', time.minutes() + (time.hours() * 60));
        this.$emit('day-change', time.diff(now, 'days'));
        if (time.diff(now, 'days') > 0) {
          this.$emit('reset-time');
        }
      }
    },
  },
};
</script>

<style lang="stylus">
.time-table-text-list
  padding: 0
  .v-list-item
    box-sizing: border-box
    min-height: 36px
    height: 36px
    padding: 10px 17px
    font-size: 14px
    line-height: 16px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
</style>
