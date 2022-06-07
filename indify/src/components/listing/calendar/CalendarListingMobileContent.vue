<template>
  <div class="calendar-mobile-wrapper">
    <div class="calendar-mobile-top">
      <div
        v-for="day in week"
        :key="'header-' + day"
        class="calendar-weekday"
      >
        {{ day }}
      </div>
    </div>
    <div class="calendar-mobile-main">
      <div
        v-for="item in dayList"
        :key="item.id"
        :class="{
          'is-current-date': item.isCurrentDay,
          'is-month-name': item.isMonth,
        }"
        :style="getDateStyles(item)"
        class="calendar-mobile-date"
      >
        {{ item.day }}
      </div>
      <ScrollComponent
        v-model="scrollValues"
        vertical
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { getObjectField, contrastTextColor } from '../../../helpers';

export default {
  name: 'CalendarListingMobileContent',
  props: {
    list: {
      type: Array,
      default: () => [],
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
    markDate: {
      type: [Function, null],
      default: null,
    },
  },
  data() {
    return {
      dayList: [],
      scrollValues: {
        x: 0,
        y: 0,
        xScrollDistance: 0,
        yScrollDistance: 0,
      },
    };
  },
  watch: {
    currentYear: {
      immediate: true,
      handler() {
        this.constructDayList();
      },
    },
    currentMonth(value) {
      this.scrollToCurrentMonth(value);
    },
    list() {
      this.constructDayList();
    },
  },
  mounted() {
    const unwatch = this.$watch('scrollValues.yScrollDistance', value => {
      if (value === 0) return;
      this.scrollToCurrentMonth(this.currentMonth);
      unwatch();
    });
  },
  methods: {
    getDate(item) {
      return getObjectField(item, this.dateField);
    },
    constructDayList() {
      this.dayList = [];
      const { currentYear: year } = this;
      const startingDate = moment()
        .month(0)
        .year(year)
        .date(1);
      const endingDate = moment()
        .month(11)
        .year(year)
        .date(31);

      for (
        let date = startingDate;
        +date <= +endingDate;
        date = startingDate.add(1, 'day')
      ) {
        if (date.date() === 1) {
          this.dayList.push({
            id: `month-${date.format('MMMM')}`,
            date: moment(date),
            day: date.format('MMMM'),
            isMonth: true,
          });
          const daysDiff = date.weekday();
          if (daysDiff !== 0) {
            for (let i = daysDiff; i > 0; i--) {
              this.dayList.push(
                `${this.createDummyDay(date.format('DD.MM'))}-${i}`,
              );
            }
          }
        }
        this.dayList.push(this.createDateObject(date));
      }
    },
    createDummyDay(id) {
      return { id, date: null, day: '' };
    },
    createDateObject(date) {
      const result = {
        id: `date-${date.format('DD.MM')}`,
        date: moment(date),
        day: date.date(),
      };
      const currentDate = date.format('YYYY-MM-DD');
      if (this.today === currentDate) {
        result.isCurrentDay = true;
      } else if (this.$getType(this.markDate) === 'Function') {
        const markResult = this.markDate(this.list, currentDate);
        const resultType = this.$getType(markResult);
        if (resultType === 'Boolean' && markResult) {
          result.background = '#DFEBFA';
          result.textColor = '#202124';
        }
        if (resultType === 'String' && markResult) {
          result.background = markResult;
          result.textColor = contrastTextColor(markResult);
        }
      }
      return result;
    },
    getDateStyles(item) {
      if (item.isCurrentDay) return '';
      const result = {};
      if (item.background) {
        result['background-color'] = item.background;
      }
      if (item.textColor) {
        result.color = item.textColor;
      }
      return result;
    },
    scrollToCurrentMonth(monthNumber) {
      const month = moment().month(monthNumber).format('MMMM');
      const monthElements = this.$el.querySelectorAll('.is-month-name');
      let found = null;
      for (let i = 0; i < monthElements.length; i++) {
        const text = monthElements[i].textContent
          .replace(/\s+/g, '');
        if (text === month) {
          found = monthElements[i].nextElementSibling;
          break;
        }
      }
      if (!found) return;
      this.scrollValues.y = found.offsetTop - 60;
      if (this.scrollValues.y > this.scrollValues.yScrollDistance) {
        this.scrollValues.y = this.scrollValues.yScrollDistance;
      }
      if (this.scrollValues.y < 0) {
        this.scrollValues.y = 0;
      }
    },
  },
};
</script>

<style lang="stylus">
$calendar-row-height = 28px
$calendar-grid-template = $calendar-row-height \/ repeat(7, 30px)

.calendar-mobile-wrapper
  display: grid
  grid-template: $calendar-row-height minmax(0, 1fr) \/ 100%
  grid-gap: 12px 0
  height: 100%
  //padding: 0 20px
  background: #ffffff

.calendar-mobile-top
  position: relative
  display: grid
  grid-template: $calendar-grid-template
  grid-gap: 0 29px
  justify-content: center

  .calendar-weekday
    border-top: none
    border-bottom: none
    border-right: none
    text-transform: capitalize
    justify-content: center
    font-size: 14px
    line-height: 1
    font-weight: 400
    &:nth-of-type(7n+1)
      border-left: none

.calendar-mobile-main
  position: relative
  display: grid
  grid-template: $calendar-grid-template
  grid-gap: 30px 29px
  grid-auto-rows: $calendar-row-height
  justify-content: center
  justify-items: center
  align-items: center
  overflow: hidden

.calendar-mobile-date
  display: flex
  flex-flow: row nowrap
  justify-content: center
  align-items: center
  width: 36px
  height: 36px
  border-radius: 50%
  background: #ffffff
  font-size: 16px
  line-height: 1
  &.is-current-date
    color: #ffffff
    background-color: #416FC8
  &.is-month-name
    position: sticky
    top: 0
    z-index: 1
    grid-column: 1 \/ -1
    width: 100%
    border-radius: 0
    font-weight: 500
    background-color: #ffffff
    text-transform: capitalize
    color: #000000
</style>
