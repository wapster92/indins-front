<template>
  <div
    :class="{'is-current-month': item.date.month() === currentMonth}"
    class="calendar-date"
  >
    <span
      :class="{'is-current-day': item.date.format('YYYY-MM-DD') === today}"
      class="calendar-date-day"
    >
      {{ item.day }}
    </span>
    <div class="calendar-date-content-wrapper">
      <ScrollComponent
        vertical
        min-handle-height="10"
      />
      <div>
        <draggable
          v-model="itemList"
          class="calendar-date-content"
          group="calendar"
          @add="itemChange($event)"
          @end="emitDragEnd"
        >
          <div
            v-for="(element, index) in visibleList"
            :key="`${item.date.format('DD-MM-YYYY')}-${index}`"
            class="listing-calendar-element"
            @click="itemClick(element, item.date)"
          >
            <slot
              name="calendar-element"
              :item="element"
            >
              <DefaultCalendarElement
                :item="element"
                :name-field="nameField"
                :color-field="colorField"
                :chip-props="chipsProps"
                @element-is-dragged="emitDragStart($event)"
              />
            </slot>
          </div>
          <div
            v-if="visibleList.length !== itemList.length"
            class="calendar-day-more"
            @click="toggleList"
          >
            Еще {{ itemList.length - visibleList.length }} ...
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import DefaultCalendarElement from './DefaultCalendarElement';

export default {
  name: 'CalendarListingDate',
  components: {
    DefaultCalendarElement,
    draggable,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    currentMonth: {
      type: Number,
      default: 1,
    },
    today: {
      type: String,
      default: '',
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
  },
  data() {
    return {
      showAllElements: false,
    };
  },
  computed: {
    itemList: {
      get() {
        return this.item.list;
      },
      set(value) {
        // eslint-disable-next-line vue/no-mutating-props
        this.item.list = value;
      },
    },
    visibleList() {
      return this.showAllElements
        ? this.item.list
        : this.item.list.slice(0, 5);
    },
  },
  methods: {
    itemChange(event) {
      this.$emit('item-change', {
        event,
        list: this.item.list,
        date: this.item.date,
      });
    },
    itemClick(element, date) {
      this.$emit('item-click', { item: element, date: date.format('YYYY-MM-DD') });
    },
    emitDragStart(event) {
      this.$emit('element-is-dragged', event);
    },
    emitDragEnd() {
      this.$emit('dragend');
    },
    toggleList() {
      this.showAllElements = true;
    },
  },
};
</script>

<style lang="stylus">
.calendar-date
  display: grid
  grid-template: 18px 1fr \/ 1fr 1fr
  grid-gap: 2px 0
  padding: 4px
  border-bottom: 1px solid #DADADA
  border-right: 1px solid #DADADA
  color: #202124
  font-size: 14px
  overflow: hidden
  &.is-current-month
    background: #ffffff
  .calendar-date-content
    span
      cursor: pointer

.calendar-date-day
  display: inline-flex
  justify-content: center
  align-items: center
  width: 18px
  height: 18px
  border-radius: 50%
  font-size: 12px
  line-height: 0
  overflow: hidden
  &.is-current-day
    background-color: #416FC8
    color: #ffffff

.calendar-date-content-wrapper
  position: relative
  grid-column: 1 \/ -1
  overflow: hidden

.calendar-date-content
  height: 100%
  & > *
    width: 100%
    margin-top: 1px

.listing-calendar-element
  line-height: 0

.calendar-day-more
  height: 11px
  font-size: 10px
  line-height: 10px
  color: #888A90
  white-space: nowrap
  &:hover
    cursor: pointer
    color: #416fc8
</style>
