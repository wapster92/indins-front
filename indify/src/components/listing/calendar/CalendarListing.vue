<template>
  <div
    v-if="listingIsChosen && isMobile"
    class="calendar-listing"
  >
      <CalendarListingMobileContent
        v-if="isMobile === 'mobile'"
        :list="list"
        :week="week"
        :current-month="currentMonth"
        :current-year="currentYear"
        :today="today"
        :date-field="dateField"
        :mark-date="markDate"
      />
      <CalendarListingContent
        v-if="isMobile === 'desktop'"
        :current-element.sync="currentElement"
        :list="list"
        :week="week"
        :current-month="currentMonth"
        :current-year="currentYear"
        :today="today"
        :date-field="dateField"
        :color-field="colorField"
        :name-field="nameField"
        :chips-props="chipsProps"
        @item-change="itemChange($event)"
        @dragend="endDragging($event)"
        @item-click="itemClick($event)"
      />
    <CalendarListingFooter
      :current-month.sync="currentMonth"
      :current-year.sync="currentYear"
      :current-element="currentElement"
    >
      <template #calendar-actions>
        <slot name="calendar-actions" />
      </template>
    </CalendarListingFooter>
  </div>
</template>

<script>
import moment from 'moment';
import CalendarListingFooter from './CalendarListingFooter';
import CalendarListingMobileContent from './CalendarListingMobileContent';
import CalendarListingContent from './CalendarListingContent';

export default {
  name: 'CalendarListing',
  components: {
    CalendarListingContent,
    CalendarListingMobileContent,
    CalendarListingFooter,
  },
  inject: {
    chosenListing: {
      default: null,
    },
  },
  provide() {
    return {
      draggedItem: this.draggedItem,
    };
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: () => ([]),
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
    markDate: {
      type: [Function, null],
      default: null,
    },
  },
  data() {
    return {
      week: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
      currentMonth: moment().month(),
      currentYear: moment().year(),
      today: moment().format('YYYY-MM-DD'),
      currentElement: null,
      draggedItem: {
        item: null,
      },
      isMobile: '',
    };
  },
  computed: {
    listingIsChosen() {
      return this.chosenListing === null
        || this.chosenListing.chosen === null
        || this.chosenListing.chosen.name === this.name;
    },
  },
  watch: {
    currentElement(value) {
      this.draggedItem.item = value;
    },
  },
  mounted() {
    this.computeLayoutType()
  },
  methods: {
    computeLayoutType() {
      this.$nextTick(()=>{
        this.isMobile = (this.$vuetify.breakpoint.smAndDown) ? 'mobile' : 'desktop';
      })
    },
    itemChange(event) {
      this.$emit('item-change', event);
    },
    endDragging(event) {
      this.$emit('dragend', event);
    },
    itemClick(element) {
      this.$emit('item-click', element);
    },
  },
};
</script>

<style lang="stylus">
.calendar-listing
  position: relative
  width: 100%
  height: 100%
  padding: 4px 0 50px 4px

@media(max-width: 959px)
  .calendar-listing
    padding: 4px 0 50px
</style>
