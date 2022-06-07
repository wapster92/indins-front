<template>
  <div
    class="calendar-footer"
    :class="{ 'is-full-width': hasCurrentDrag }"
  >
    <div
      v-show="!hasCurrentDrag"
      class="calendar-month-changer"
    >
      <CalendarListingDropdown
        :button-text="monthText"
      >
        <v-list-item
          v-for="item in monthList"
          :key="'month-list' + item"
          @click="setCurrentMonth(item)"
        >
          <span :class="{ 'is-active': item === monthText }">
            {{ item }}
          </span>
        </v-list-item>
      </CalendarListingDropdown>
      <CalendarListingDropdown
        :button-text="year"
      >
        <v-list-item
          v-for="item in yearList"
          :key="'month-list' + item"
          @click="setCurrentYear(item)"
        >
          <span :class="{ 'is-active': item === year }">
            {{ item }}
          </span>
        </v-list-item>
      </CalendarListingDropdown>
      <button
        class="icon-button prev-month"
        @click="changeMonth()"
      >
        <v-icon
          color="#202124"
          small
        >
          arrow_back_ios
        </v-icon>
      </button>
      <button
        class="icon-button next-month"
        @click="changeMonth(true)"
      >
        <v-icon
          color="#202124"
          small
        >
          arrow_forward_ios
        </v-icon>
      </button>
    </div>
    <div
      v-show="hasCurrentDrag"
      class="calendar-buttons"
    >
      <slot name="calendar-actions" />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import CalendarListingDropdown from './CalendarListingDropdown';

export default {
  name: 'CalendarListingFooter',
  components: { CalendarListingDropdown },
  props: {
    currentMonth: {
      type: Number,
      default: 0,
    },
    currentYear: {
      type: Number,
      default: 2021,
    },
    currentElement: {
      type: [Object, null],
      default: null,
    },
  },
  data() {
    return {
      monthDropdown: false,
      yearDropdown: false,
      monthList: [],
      yearList: [],
    };
  },
  computed: {
    month: {
      get() {
        return this.currentMonth;
      },
      set(value) {
        this.$emit('update:currentMonth', value);
      },
    },
    year: {
      get() {
        return this.currentYear;
      },
      set(value) {
        this.$emit('update:currentYear', value);
      },
    },
    monthText() {
      return moment().month(this.month).format('MMMM');
    },
    hasCurrentDrag() {
      return this.currentElement !== null
        && this.$getType(this.$scopedSlots['calendar-actions']) === 'Function'
        && this.$scopedSlots['calendar-actions']();
    },
  },
  mounted() {
    this.prepareMonths();
    this.prepareYears();
  },
  methods: {
    prepareMonths() {
      this.monthList = [];
      const month = moment();
      for (let i = 0; i < 12; i++) {
        this.monthList.push(month.month(i).format('MMMM'));
      }
    },
    prepareYears() {
      this.yearList = [];
      for (let i = -15; i < 3; i++) {
        this.yearList.push(
          +moment().add(i, 'years').format('YYYY'),
        );
      }
    },
    changeMonth(increase) {
      this.month += increase ? 1 : -1;
      if (this.month < 0) {
        this.month = 11;
        this.year--;
      }
      if (this.month > 11) {
        this.month = 0;
        this.year++;
      }
    },
    setCurrentMonth(item) {
      this.month = moment(item, 'MMMM').month();
    },
    setCurrentYear(item) {
      this.year = +item;
    },
  },
};
</script>

<style lang="stylus">
.calendar-footer
  position: absolute
  bottom: 0
  left: 4px
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  align-items: center
  width: 100%
  min-height: 50px
  padding: 10px 17px
  border-left: 1px solid #dadada
  margin-top: auto
  background: #ffffff
  &.is-full-width
    width: 100%
    margin-left: -5px
    padding: 10px
    filter: drop-shadow(0px 5px 20px rgba(63, 74, 106, 0.4))

.calendar-month-changer
  display: flex
  flex-flow: row nowrap
  align-items: center
  width: 180px
  .icon-button:last-of-type
    margin-left: 25px

.calendar-buttons
  width: 100%
  display: flex
  flex-flow: row nowrap
  justify-content: flex-end

.prev-month, .next-month
  display: none

@media(max-width: 959px)
  .calendar-footer
    left: 0
    width: 100%
    height: 50px
    padding: 10px 20px
</style>
