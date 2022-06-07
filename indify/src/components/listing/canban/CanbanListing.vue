<template>
  <div
    v-if="listingIsChosen"
    class="canban-listing"
  >
    <ScrollComponent
      v-model="horizontalScroll"
      horizontal
      :dont-hide="horizontalScroll.x > 0"
    />
    <div
      class="left-scroll-activator"
      :style="{ width: scrollAreaWidth + 'px' }"
      @dragenter="startScrollLeft"
      @dragleave="stopHorizontalScroll = true"
    />
    <div
      class="right-scroll-activator"
      :style="{ width: scrollAreaWidth + 'px' }"
      @dragenter="startScrollRight"
      @dragleave="stopHorizontalScroll = true"
    />
    <div
      v-for="(localList, index) in listOfLists"
      :key="'canban-list' + index"
      :data-index="index"
      :class="{
        'is-targeted': targetColumn === localList
      }"
      class="canban-group"
      @dragenter="changeTargetList(index)"
    >
      <div class="canban-header-wrapper">
        <slot
          :options="localList"
          name="head"
        >
          <DefaultCanbanHead
            :options="localList"
          >
            <slot
              :options="localList"
              name="head-buttons"
            />
          </DefaultCanbanHead>
        </slot>
      </div>
      <div class="canban-elements">
        <ScrollComponent
          vertical
        />
        <div
          v-for="(item, itemIndex) in localList.list"
          :key="'canban' + item.id"
          :class="{ 'is-touch-dragged': touchDrag && currentElement.item && item.id === currentElement.item.id }"
          :style="getCurrentElementStyle(item)"
          class="canban-element-wrapper"
          draggable="true"
          @dragstart="startDrag(item, index, itemIndex)"
          @touchstart.capture.stop="startTouchDrag(item, index, itemIndex, $event)"
          @touchmove="touchMoveDrag($event)"
          @touchend="touchEndDrag($event)"
          @touchcancel="touchCancelDrag"
          @click="doubleClickHandler(item)"
        >
          <slot
            :item="item"
            name="element"
          >
            <DefaultCanbanElement
              :name-field="nameField"
              :phone-field="phoneField"
              :description-field="descriptionField"
              :date-field="dateField"
              :price-field="priceField"
              :date-format="dateFormat"
              :item="item"
            />
          </slot>
        </div>
      </div>
    </div>
    <div
      v-show="currentElement.item"
      class="canban-footer"
    >
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
import { getObjectField } from '../../../helpers';
import { debounce, throttle } from '../../../helpers/decorators';
import DefaultCanbanElement from './DefaultCanbanElement';
import DefaultCanbanHead from './DefaultCanbanHead';
import ScrollComponent from "../../ui-kit/ScrollComponent";

export default {
  name: 'CanbanListing',
  components: {
    ScrollComponent,
    DefaultCanbanElement,
    DefaultCanbanHead,
  },
  provide() {
    return {
      draggedItem: this.currentElement,
    };
  },
  inject: {
    chosenListing: {
      default: null,
    },
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
    singleCanbanName: {
      type: String,
      default: 'Список',
    },
    splitByField: {
      type: String,
      default: '',
    },
    splitByFunction: {
      type: [Function, null],
      default: null,
    },
    splitByColumns: {
      type: [Array, null],
      default: null,
    },
    colorField: {
      type: String,
      default: 'status.color',
    },
    nameField: {
      type: String,
      default: 'name',
    },
    phoneField: {
      type: String,
      default: 'phone',
    },
    descriptionField: {
      type: String,
      default: 'description',
    },
    dateField: {
      type: String,
      default: 'createdAt',
    },
    dateFormat: {
      type: String,
      default: 'DD.MM.YYYY',
    },
    priceField: {
      type: String,
      default: 'price',
    },
    scrollSpeed: {
      type: Number,
      default: 30,
    },
    scrollAreaWidth: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      listOfLists: [],
      currentElement: { item: null },
      originalList: null,
      currentElementIndex: null,
      targetList: null,
      targetColumn: null,
      touchDrag: false,
      touchCoordinates: {
        x: 0,
        y: 0,
        elationX: 0,
        elationY: 0,
      },
      horizontalScroll: {
        x: 0,
        y: 0,
        xScrollDistance: 0,
        yScrollDistance: 0,
      },
      stopHorizontalScroll: true
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
    list() {
      this.restributeItems();
    },
    splitByFunction() {
      this.restributeItems();
    },
    splitByField() {
      this.restributeItems();
    },
    splitByColumns() {
      this.restributeItems();
    },
  },
  created() {
    this.restributeItems = debounce(this.restributeItems, 100);
  },
  mounted() {
    this.restributeItems();
    this.startDrag = throttle(this.startDrag, 500);
    this.scrollRight = debounce(this.scrollRight, this.scrollSpeed);
    this.scrollLeft = debounce(this.scrollLeft, this.scrollSpeed);
    document.addEventListener('drop', this.endDragging);
    document.addEventListener('dragover', this.preventDefault);
  },
  beforeDestroy() {
    document.removeEventListener('drop', this.endDragging);
    document.removeEventListener('dragover', this.preventDefault);
  },
  methods: {
    startScrollRight(){
      this.stopHorizontalScroll = false;
      this.scrollRight();
    },
    startScrollLeft(){
      this.stopHorizontalScroll = false;
      this.scrollLeft();
    },
    scrollRight(){
      const { x, xScrollDistance } = this.horizontalScroll;
      if(x >= xScrollDistance || this.stopHorizontalScroll) return;
      this.horizontalScroll.x += 10;
      this.scrollRight()
    },
    scrollLeft(){
      const { x } = this.horizontalScroll;
      if(x <= 0 || this.stopHorizontalScroll) return;
      this.horizontalScroll.x -= 10;
      this.scrollLeft()
    },
    preventDefault(event) {
      event.preventDefault();
    },
    changeTargetList(index) {
      this.targetList = this.listOfLists[index].list;
      this.targetColumn = this.listOfLists[index];
    },
    startDrag(item, index, itemIndex) {
      this.currentElement.item = item;
      this.currentElementIndex = itemIndex;
      this.originalList = this.listOfLists[index].list;
      this.targetList = this.originalList;
      this.targetColumn = this.listOfLists[index];
    },
    endDragging(event) {
      this.stopHorizontalScroll = true;
      event.preventDefault();
      if (
        !event.target.closest('.canban-group')
        || !Array.isArray(this.targetList)
        || this.originalList === this.targetList
      ) {
        this.resetDragVariables();
        return;
      }
      const overlapWith = document
        .elementFromPoint(event.pageX, event.pageY)
        ?.closest('.canban-element-wrapper');
      this.originalList.splice(this.currentElementIndex, 1);

      if (!overlapWith) {
        this.targetList.push(this.currentElement.item);
      } else {
        let index = -1;
        let currentSibling = overlapWith.previousElementSibling;
        while (currentSibling) {
          index++;
          currentSibling = currentSibling.previousElementSibling;
        }
        this.targetList.splice(Math.max(index, 0), 0, this.currentElement.item);
      }

      this.$emit('change', {
        column: this.targetColumn,
        element: this.currentElement.item,
      });

      this.$emit('dragend', this.currentElement.item);
      this.resetDragVariables();
    },
    startTouchDrag(item, index, itemIndex, event) {
      if (event?.touches.length > 1) return;
      this.startDrag(item, index, itemIndex);
      this.touchDrag = true;
      this.touchCoordinates.elationX = event.touches[0].clientX - event.target.getBoundingClientRect().left;
      this.touchCoordinates.elationY = event.touches[0].clientY - event.target.getBoundingClientRect().top;
      this.touchCoordinates.x = event.touches[0].clientX;
      this.touchCoordinates.y = event.touches[0].clientY;
    },
    async touchMoveDrag(event) {
      if (!this.touchDrag) return;
      const { elationX, elationY } = this.touchCoordinates;
      this.touchCoordinates.x = event.touches[0].clientX - elationX;
      this.touchCoordinates.y = event.touches[0].clientY - elationY;

      const { right, left } = event.target.getBoundingClientRect();
      if (window.innerWidth - right <= 70) {
        this.horizontalScroll.x += 4;
      }
      if (left <= 70) {
        this.horizontalScroll.x -= 4;
      }
      if (this.horizontalScroll.x < 0) this.horizontalScroll.x = 0;
      if (this.horizontalScroll.x > this.horizontalScroll.xScrollDistance) {
        this.horizontalScroll.x = this.horizontalScroll.xScrollDistance;
      }

      const column = document.elementFromPoint(event.touches[0].pageX, event.touches[0].pageY)
        ?.closest('.canban-group');
      if (column) this.changeTargetList(+column.dataset.index);
    },
    async touchEndDrag(event) {
      if (!this.touchDrag) return;
      const { pageX: x, pageY: y } = event.changedTouches[0];
      const { item } = this.currentElement;
      const originalList = this.originalList;
      const originalIndex = this.currentElementIndex;
      const targetList = this.targetList;
      const targetColumn = this.targetColumn;
      this.touchCancelDrag();

      await this.$nextTick();

      const overlapWith = document
        .elementFromPoint(x, y)
        ?.closest('.canban-element-wrapper');

      originalList.splice(originalIndex, 1);
      if (!overlapWith) {
        targetList.push(item);
      } else {
        let index = -1;
        let currentSibling = overlapWith.previousElementSibling;
        while (currentSibling) {
          index++;
          currentSibling = currentSibling.previousElementSibling;
        }
        targetList.splice(Math.max(index, 0), 0, item);
      }
      this.$emit('change', {
        column: targetColumn,
        element: item,
      });

      this.$emit('dragend', item);
    },
    touchCancelDrag() {
      this.resetDragVariables();
      this.resetTouchDragVariables();
    },
    resetDragVariables() {
      this.currentElement.item = null;
      this.currentElementIndex = null;
      this.originalList = null;
      this.targetList = null;
      this.targetColumn = null;
    },
    resetTouchDragVariables() {
      this.touchDrag = false;
      this.touchCoordinates.x = 0;
      this.touchCoordinates.y = 0;
    },
    getCurrentElementStyle(item) {
      if (!this.touchDrag || item.id !== this.currentElement.item?.id) return '';
      const { x, y } = this.touchCoordinates;
      return `top: ${y}px; left: ${x}px; pointer-events: none;`;
    },
    restributeItems() {
      if (!this.splitByField && !this.splitByFunction) {
        this.listOfLists = [{ name: this.singleCanbanName, list: [...this.list] }];
        return;
      }
      if (this.splitByFunction) {
        this.restributeByFunction();
      } else if (this.splitByField) {
        this.restributeByField();
      }
    },
    restributeByField() {
      const localMap = {};
      const field = this.splitByField;
      const columns = this.splitByColumns;

      if (this.splitByColumns) {
        columns.forEach(column => {
          localMap[column.name] = [];
        });
      }

      this.list.forEach(item => {
        const fieldValue = getObjectField(item, field);
        if (localMap[fieldValue]) {
          localMap[fieldValue].push(item);
        } else if (!this.splitByColumns) {
          localMap[fieldValue] = [item];
        }
      });

      this.listOfLists = Object.keys(localMap).map(key => ({
        name: key,
        list: localMap[key],
        color: getObjectField(localMap[key][0], this.colorField),
      }));
      this.fixColors();
    },
    restributeByFunction() {
      const localMap = {};
      const func = this.splitByFunction;

      if (this.splitByColumns) {
        this.splitByColumns.forEach(column => {
          localMap[column.name] = [];
        });
      }

      this.list.forEach(item => {
        const column = func(item);
        if (localMap[column]) {
          localMap[column].push(item);
        }
      });

      this.listOfLists = Object.keys(localMap).map(key => ({
        name: key,
        list: localMap[key],
        color: getObjectField(localMap[key][0], this.colorField),
      }));
      this.fixColors();

    },
    fixColors() {
      this.listOfLists.forEach(list => {
        if (!list.color) {
          list.color = this.splitByColumns
            .find(col => col.name === list.name)?.color;
        }
      });
    },
    doubleClickHandler(item) {
      this.$emit('item-click', item);
    },
  },
};
</script>

<style lang="stylus">
.canban-listing
  position: relative
  display: grid
  grid-template: 100% \/ repeat(20, auto)
  justify-content: flex-start
  min-width: 100%
  height: 100%
  padding: 4px 0 0 0
  overflow: hidden

.canban-group
  width: 312px
  min-width: 312px
  height: 100%
  margin-left: 4px
  &.is-targeted
    background: rgba(0, 0, 0, 0.1)
  & > div
    margin-bottom: 2px

.canban-elements
  position: relative
  height: calc(100% - 42px)
  overflow: hidden

.canban-footer
  position: fixed
  bottom: 0
  left: 0
  display: flex
  flex-flow: row nowrap
  justify-content: flex-end
  align-items: center
  width: calc(100% - 50px)
  padding: 10px 17px
  margin-left: 50px
  background: #ffffff
  z-index: 15
  & > *
    margin-left: 5px

.canban-element-wrapper
  &.is-touch-dragged
    position: fixed
    top: 0
    left: 0
    z-index: 5

.left-scroll-activator,
.right-scroll-activator
  position: fixed
  background-color: transparent
  height: 100%
  z-index: 10

.right-scroll-activator
  right: 0

</style>
