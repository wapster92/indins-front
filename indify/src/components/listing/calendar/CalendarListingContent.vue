<template>
  <div class="calendar-desktop-wrapper">
    <div class="calendar-wrapper">
      <div
        v-for="day in week"
        :key="'header-' + day"
        class="calendar-weekday"
      >
        {{ day }}
      </div>
      <CalendarListingDate
        v-for="(item, index) in dayList"
        :key="'calendar-date-' + index"
        :item="item"
        :current-month="currentMonth"
        :today="today"
        :name-field="nameField"
        :color-field="colorField"
        :chips-props="chipsProps"
        @item-change="itemChange($event)"
        @dragend="endDragging"
        @element-is-dragged="dragCallback($event)"
        @item-click="itemClick($event)"
      />

    </div>
    <ScrollComponent
      vertical
      horizontal
    />
  </div>
</template>

<script>
import moment from 'moment';
import { getObjectField } from '../../../helpers';
import CalendarListingDate from './CalendarListingDate';

export default {
  name: 'CalendarListingContent',
  components: {
    CalendarListingDate,
  },
  props: {
    list: {
      type: Array,
      default: () => ([]),
    },
    week: {
      type: Array,
      default: () => [],
    },
    currentMonth: {
      type: Number,
      default: 0,
    },
    currentYear: {
      type: Number,
      default: 2021,
    },
    today: {
      type: String,
      default: '',
    },
    dateField: {
      type: String,
      default: 'createdDate',
    },
    colorField: {
      type: String,
      default: 'status.color',
    },
    nameField: {
      type: String,
      default: 'name',
    },
    chipsProps: {
      type: [Object, null],
      default: null,
    },
    currentElement: {
      type: [Object, null],
      default: null,
    },
  },
  data() {
    return {
      dayList: [],
    };
  },
  watch: {
    currentMonth: {
      immediate: true,
      handler() {
        this.constructDayList();
      },
    },
    list: {
      immediate: true,
      handler() {
        this.fillDayList();
      },
    },
  },
  mounted() {
    this.constructDayList();
  },
  methods: {
    getDate(item) {
      return getObjectField(item, this.dateField);
    },
    constructDayList() {
      this.dayList = [];
      const { currentMonth: month, currentYear: year } = this;
      const startingDate = moment()
        .month(month)
        .year(year)
        .date(1)
        .weekday(0);
      const endingDate = moment()
        .month(month)
        .year(year)
        .date(31)
        .weekday(6);

      for (
        let date = startingDate;
        +date <= +endingDate;
        date = startingDate.add(1, 'day')
      ) {
        this.dayList.push({ date: moment(date), day: date.date(), list: [] });
      }
      this.fillDayList();
    },
    setCurrentElement(item) {
      this.$emit('update:current-element', item);
    },
    dragCallback(item) {
      this.setCurrentElement(item);
    },
    endDragging() {
      this.$emit('dragend', this.currentElement);
      this.setCurrentElement(null);
    },
    itemChange({ list, event, date }) {
      const item = list[event.newDraggableIndex];
      if (!item) return;
      this.$emit('item-change', { item, date });
    },
    itemClick(element) {
      this.$emit('item-click', element);
    },
    fillDayList() {
      if (this.$getType(this.list) !== 'Array'
        || this.dayList.length === 0 || !this.dateField) return;

      if (this.list.length === 0) this.clearDayList();

      const hashMap = {};
      this.list.forEach(item => {
        const date = this.getDate(item);
        if (!hashMap[date]) {
          hashMap[date] = [item];
        } else {
          hashMap[date].push(item);
        }
      });

      Object.keys(hashMap).forEach(key => {
        const itemDate = moment(key).format('DD-MM-YYYY');
        this.dayList.find(day => {
          if (moment(day.date).format('DD-MM-YYYY') === itemDate) {
            day.list = [...hashMap[key]];
            return true;
          }
          return false;
        });
      });
    },
    clearDayList() {
      this.dayList.forEach(day => {
        day.list = [];
      });
    },
  },
};
</script>

<style lang="stylus">
.calendar-desktop-wrapper
  position: relative
  height: 100%
  overflow: hidden

.calendar-wrapper
  display: grid
  grid-template: 22px \/ repeat(7, minmax(174px, 1fr))
  grid-auto-rows: minmax(105px, 1fr)
  grid-gap: 0
  height: 100%

.calendar-weekday, .calendar-date
  width: 100%
  height: 100%
  background: #F3F5F8
  font-weight: 500
  &:nth-of-type(7n+1)
    border-left: 1px solid #DADADA

.calendar-weekday
  display: flex
  flex-flow: row nowrap
  justify-content: flex-start
  align-items: center
  padding: 0 4px
  border-top: 1px solid #DADADA
  border-bottom: 1px solid #DADADA
  border-right: 1px solid #DADADA
  background: #ffffff
  color: #888A91
  font-size: 12px
  text-transform: capitalize
</style>
