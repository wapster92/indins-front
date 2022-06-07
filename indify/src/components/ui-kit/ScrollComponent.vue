<template>
  <div class="scroll-component">
    <div
      v-if="showXScroll"
      class="scroll-component-x"
      :class="{
        'is-active': (scrollIsActive && !verticalScroll) || dontHide,
      }"
      :style="verticalPathStyles"
    >
      <span
        class="scroll-component-handle"
        :style="horizontalHandleStyles"
        @mousedown.stop.prevent="startDrag($event)"
        @touchstart.stop.prevent="startDragTouch($event)"
      />
    </div>
    <div
      v-if="showYScroll"
      class="scroll-component-y"
      :class="{
        'is-active': (scrollIsActive && verticalScroll) || dontHide,
      }"
      :style="horizontalPathStyles"
    >
      <span
        class="scroll-component-handle"
        :style="verticalHandleStyles"
        @mousedown.stop.prevent="startDrag($event, true)"
        @touchstart.stop.prevent="startDragTouch($event, true)"
      />
    </div>
  </div>
</template>

<script>
import { getType, makeHash } from '../../helpers';
import { debounce } from '../../helpers/decorators';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ScrollComponent',
  props: {
    horizontal: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default: () => ({
        x: 0,
        y: 0,
        xScrollDistance: 0,
        yScrollDistance: 0,
      }),
    },
    handleWidth: {
      type: [Number, String],
      default: 8,
      validator: value => getType(+value) === 'Number',
    },
    minHandleHeight: {
      type: [Number, String],
      default: 70,
      validator: value => getType(+value) === 'Number',
    },
    pathColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.2)',
    },
    handleColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.8)',
    },
    wheelScrollDistance: {
      type: [Number, String],
      default: 0,
      validator: value => getType(+value) === 'Number',
    },
    scrollHideDelay: {
      type: [Number, String],
      default: 200,
      validator: value => getType(+value) === 'Number',
    },
    dontHide: {
      type: Boolean,
      default: false,
    },
    resetOnResize: {
      type: Boolean,
      default: false,
    },
    isNotInteractive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: null,
      scrolledElement: null,
      scrolled: {
        x: 0,
        y: 0,
        xScrollDistance: 0,
        yScrollDistance: 0,
      },
      cursorCoords: {
        x: 0,
        y: 0,
      },
      touchCoords: {
        x: 0,
        y: 0,
      },
      handleHeight: { x: 50, y: 50 },
      toScrollPixelX: 1,
      toScrollPixelY: 1,
      verticalScroll: false,
      scrollIsActive: false,
      observer: null,
      resizeObserver: null,
      timer: null,
      hideXScroll: false,
      hideYScroll: false,
    };
  },
  computed: {
    ...mapGetters({
      isRegistered: 'scrollManagement/scrollIsRegistered',
      isActive: 'scrollManagement/scrollIsActive',
      canBeActivated: 'scrollManagement/canBeActivated',
    }),
    xScrollDistance: {
      get() {
        return this.scrolled.xScrollDistance;
      },
      set(value) {
        this.scrolled.xScrollDistance = value;
      },
    },
    yScrollDistance: {
      get() {
        return this.scrolled.yScrollDistance;
      },
      set(value) {
        this.scrolled.yScrollDistance = value;
      },
    },
    verticalPathStyles() {
      return {
        height: `${this.handleWidth}px`,
        bottom: `-${Math.ceil(this.scrolled.y)}px`,
        left: `${this.scrolled.x}px`,
        'background-color': this.pathColor,
      };
    },
    verticalHandleStyles() {
      return {
        top: `${this.scrolled.y / this.toScrollPixelY}px`,
        height: `${this.handleHeight.y}px`,
        'background-color': this.handleColor,
      };
    },
    horizontalPathStyles() {
      return {
        width: `${this.handleWidth}px`,
        top: `${Math.ceil(this.scrolled.y)}px`,
        right: `-${this.scrolled.x}px`,
        'background-color': this.pathColor,
      };
    },
    horizontalHandleStyles() {
      return {
        left: `${this.scrolled.x / this.toScrollPixelX}px`,
        width: `${this.handleHeight.x}px`,
        'background-color': this.handleColor,
      };
    },
    showXScroll() {
      return !this.hideXScroll && this.horizontal && this.scrolledElement && this.xScrollDistance > 0;
    },
    showYScroll() {
      return !this.hideYScroll && this.vertical && this.scrolledElement && this.yScrollDistance > 0;
    },
    pxPerWheelScroll() {
      const defaultValue = 40;
      if (!this.wheelScrollDistance) return defaultValue;
      const result = +this.wheelScrollDistance;
      return Number.isNaN(result) ? defaultValue : result;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val === this.scrolled.top || !val) return;
        this.scrollTo(val.x, val.y);
      },
    },
    scrolled: {
      deep: true,
      handler(val) {
        this.manageScrolls(val.x, val.y);
        this.$emit('input', val);
      },
    },
    scrolledElement: {
      immediate: true,
      handler(newElem, oldElem) {
        if (oldElem) {
          oldElem.removeEventListener('wheel', this.scrollWheelHandler);
          oldElem.removeEventListener('touchstart', this.setInitialTouches);
          oldElem.removeEventListener('touchmove', this.scrollTouchmoveHandler);
          oldElem.removeEventListener('touchend', this.stopScrolling);
        }
        if (newElem) {
          newElem.addEventListener('wheel', this.scrollWheelHandler);
          newElem.addEventListener('touchstart', this.setInitialTouches);
          newElem.addEventListener('touchmove', this.scrollTouchmoveHandler);
          newElem.addEventListener('touchend', this.stopScrolling);
        }
      },
    },
  },
  created() {
    this.name = makeHash(15);
    this.register(this.name);
    this.dragging = this.smoothScroll(this.dragging);
    this.draggingTouch = this.smoothScroll(this.draggingTouch);
    this.scrollWheelHandler = this.smoothScroll(this.scrollWheelHandler);
    this.scrollTouchmoveHandler = this.smoothScroll(this.scrollTouchmoveHandler);
    this.stopScrolling = debounce(this.stopScrolling, +this.scrollHideDelay);
    this.recalculate = debounce(this.recalculate, 100);
  },
  mounted() {
    this.scrolledElement = this.$el.parentElement;
    this.recalculate();
    const observeConfig = { attributes: true, childList: true, subtree: true };
    this.observer = new MutationObserver(this.recalculate);
    this.observer.observe(this.scrolledElement, observeConfig);
    this.resizeObserver = new ResizeObserver(this.recalculate);
    this.resizeObserver.observe(this.scrolledElement);
    const children = Array.from(this.scrolledElement.children);
    if (!Array.isArray(children)) return;
    children
      .filter(childEl => !childEl.classList.contains('scroll-component'))
      .forEach(childEl => this.resizeObserver.observe(childEl));
  },
  beforeDestroy() {
    this.unregister(this.name);
    if (this.scrolledElement) {
      this.scrolledElement.removeEventListener('wheel', this.scrollWheelHandler);
      this.scrolledElement.removeEventListener('touchstart', this.setInitialTouches);
      this.scrolledElement.removeEventListener('touchmove', this.scrollTouchmoveHandler);
      this.scrolledElement.removeEventListener('touchend', this.stopScrolling);
    }
    this.observer.disconnect();
    this.resizeObserver.disconnect();
  },
  methods: {
    ...mapActions({
      register: 'scrollManagement/registerScroll',
      unregister: 'scrollManagement/unregisterScroll',
      activate: 'scrollManagement/activateScroll',
      deactivate: 'scrollManagement/deactivateScroll',
    }),
    smoothScroll(func) {
      return function (...args) {
        if (!window) return;
        window.requestAnimationFrame(() => func(...args));
      };
    },
    async setXScrollDistance() {
      if (!this.scrolledElement) return 0;
      this.hideXScroll = true;
      await this.$nextTick();
      const { scrollWidth, clientWidth } = this.scrolledElement;
      this.xScrollDistance = scrollWidth - clientWidth;
      this.hideXScroll = false;
    },
    async setYScrollDistance() {
      if (!this.scrolledElement) return 0;
      this.hideYScroll = true;
      await this.$nextTick();
      const { scrollHeight, clientHeight } = this.scrolledElement;
      this.yScrollDistance = scrollHeight - clientHeight;
      this.hideYScroll = false;
    },
    setHandleHeight() {
      if (!this.scrolledElement) {
        this.handleHeight.x = 50;
        this.handleHeight.y = 50;
        return;
      }
      const { clientWidth, clientHeight } = this.scrolledElement;
      this.handleHeight.x = this.calculateHandleWidth(clientWidth, this.xScrollDistance);
      this.handleHeight.y = this.calculateHandleWidth(clientHeight, this.yScrollDistance);
    },
    setToScrollPixelX() {
      if (!this.scrolledElement) {
        this.toScrollPixelX = 1;
        return;
      }
      const { clientWidth } = this.scrolledElement;
      this.toScrollPixelX = this.xScrollDistance / (clientWidth - this.handleHeight.x);
    },
    setToScrollPixelY() {
      if (!this.scrolledElement) {
        this.toScrollPixelY = 1;
        return;
      }
      const { clientHeight } = this.scrolledElement;
      this.toScrollPixelY = this.yScrollDistance / (clientHeight - this.handleHeight.y);
    },
    manageScrolls(x, y) {
      if (!this.scrolledElement) return;
      this.scrolledElement.scrollTo({
        top: y,
        left: x,
      });
    },
    scrollTo(x, y) {
      if (x === undefined) x = this.value.x;
      if (y === undefined) y = this.value.y;
      this.scrolled.x = x || 0;
      this.scrolled.y = y || 0;
    },
    calculateHandleWidth(clientMeasure, distance) {
      if (clientMeasure - +this.minHandleHeight >= distance) {
        return clientMeasure - distance;
      }
      return +this.minHandleHeight;
    },
    dragVertical(y) {
      const value = y > this.cursorCoords.y
        ? y - this.cursorCoords.y
        : -1 * (this.cursorCoords.y - y);

      this.scrolled.y += value * this.toScrollPixelY;
      this.cursorCoords.y = y;
      if (this.scrolled.y < 0) this.scrolled.y = 0;
      if (this.scrolled.y > this.yScrollDistance) {
        this.scrolled.y = this.yScrollDistance;
      }
      this.$forceUpdate();
    },
    dragHorizontal(x) {
      const value = x > this.cursorCoords.x
        ? x - this.cursorCoords.x
        : -1 * (this.cursorCoords.x - x);

      this.scrolled.x += value * this.toScrollPixelX;
      this.cursorCoords.x = x;
      if (this.scrolled.x < 0) this.scrolled.x = 0;
      if (this.scrolled.x > this.xScrollDistance) {
        this.scrolled.x = this.xScrollDistance;
      }
    },
    startDrag(event, vertical = false) {
      if (this.isNotInteractive) return;
      this.scrollIsActive = true;
      this.verticalScroll = vertical;
      this.cursorCoords.x = event.clientX;
      this.cursorCoords.y = event.clientY;
      document.addEventListener('mousemove', this.dragging);
      document.addEventListener('mouseup', this.stopDrag);
      document.querySelector('html')
        .addEventListener('mouseleave', this.stopDrag);
    },
    dragging(event) {
      if (this.verticalScroll) {
        return this.dragVertical(event.clientY);
      }
      this.dragHorizontal(event.clientX);
    },
    stopDrag(event) {
      this.cursorCoords.x = event.clientX || 0;
      this.cursorCoords.y = event.clientY || 0;
      document.removeEventListener('mousemove', this.dragging);
      document.removeEventListener('mouseup', this.stopDrag);
      document.querySelector('html')
        .removeEventListener('mouseleave', this.stopDrag);
      this.stopScrolling();
    },
    startDragTouch(event, vertical = false) {
      if (!event.touches || !event.touches[0] || this.isNotInteractive) return;
      this.verticalScroll = vertical;
      this.cursorCoords.x = event.touches[0].clientX;
      this.cursorCoords.y = event.touches[0].clientY;
      document.addEventListener('touchmove', this.draggingTouch);
      document.addEventListener('touchend', this.stopDragTouch);
      document.querySelector('html')
        .addEventListener('touchcancel', this.stopDragTouch);
    },
    draggingTouch(event) {
      if (this.verticalScroll) {
        return this.dragVertical(event.touches[0].clientY);
      }
      this.dragHorizontal(event.touches[0].clientX);
    },
    stopDragTouch() {
      document.removeEventListener('touchmove', this.draggingTouch);
      document.removeEventListener('touchend', this.stopDragTouch);
      document.querySelector('html')
        .removeEventListener('touchcancel', this.stopDragTouch);
      this.stopScrolling();
    },

    scrollWheelHandler(event) {
      const { shiftKey, deltaY, deltaX } = event;
      if (!this.showYScroll && !this.showXScroll) return;
      if (this.canBeActivated) {
        this.activate(this.name);
      }
      if (!this.isActive(this.name)) return;

      event.stopPropagation();
      this.verticalScroll = !event.shiftKey && deltaY !== 0;
      this.scrollIsActive = true;
      if (this.verticalScroll) {
        this.scrolled.y += this.pxPerWheelScroll * (deltaY > 0 ? 1 : -1);
      } else if (deltaX) {
        this.scrolled.x += this.pxPerWheelScroll * (deltaX > 0 ? 1 : -1);
      } else {
        this.scrolled.x += this.pxPerWheelScroll * (deltaY > 0 ? 1 : -1);
      }

      if (this.scrolled.x < 0) this.scrolled.x = 0;
      if (this.scrolled.y < 0) this.scrolled.y = 0;
      if (!this.scrolledElement) return;
      if (this.scrolled.x > this.xScrollDistance) {
        this.scrolled.x = this.xScrollDistance;
      }
      if (this.scrolled.y > this.yScrollDistance) {
        this.scrolled.y = this.yScrollDistance;
      }
      this.stopScrolling(300);
    },
    setInitialTouches(event) {
      if (!this.showYScroll && !this.showXScroll) return;
      if (!event.touches || event.touches.length < 1) return;
      if (this.canBeActivated) {
        this.activate(this.name);
      }
      if (!this.isActive(this.name)) return;
      this.touchCoords.x = event.touches[0].clientX;
      this.touchCoords.y = event.touches[0].clientY;
      this.scrollIsActive = true;
    },
    scrollTouchmoveHandler(event) {
      if (
        event.target.closest
        && (
          event.target.closest('.scroll-component-x')
          || event.target.closest('.scroll-component-y')
        )
      ) return;
      if (!event.touches || event.touches.length < 1) return;
      if (!this.isActive(this.name)) return;

      const x = event.touches[0].clientX;
      const y = event.touches[0].clientY;
      const valueX = x > this.touchCoords.x
        ? x - this.touchCoords.x
        : -1 * (this.touchCoords.x - x);
      const valueY = y > this.touchCoords.y
        ? y - this.touchCoords.y
        : -1 * (this.touchCoords.y - y);

      this.verticalScroll = Math.abs(valueX) < Math.abs(valueY);
      if (this.verticalScroll) {
        this.scrolled.y -= valueY;
      } else {
        this.scrolled.x -= valueX;
      }
      this.touchCoords.x = x;
      this.touchCoords.y = y;
      if (this.scrolled.x < 0) this.scrolled.x = 0;
      if (this.scrolled.y < 0) this.scrolled.y = 0;
      if (this.scrolled.x > this.xScrollDistance) this.scrolled.x = this.xScrollDistance;
      if (this.scrolled.y > this.yScrollDistance) this.scrolled.y = this.yScrollDistance;
      this.stopScrolling(500);
    },
    stopScrolling(ms) {
      this.scrollIsActive = false;
      clearTimeout(this.timer);
      this.timer = setTimeout(this.deactivate, ms);
    },
    async recalculate(data) {
      let preventRecalculate = false;
      data?.forEach(entry => {
        if (
          entry.target.classList.contains('scroll-component')
          || entry.target.classList.contains('scroll-component-x')
          || entry.target.classList.contains('scroll-component-y')
        ) {
          preventRecalculate = true;
        }
      });
      if (preventRecalculate) return;
      await Promise.all([
        this.setXScrollDistance(),
        this.setYScrollDistance(),
      ]).catch(this.$errorHandler());
      this.setHandleHeight();
      this.setToScrollPixelX();
      this.setToScrollPixelY();
      if (this.resetOnResize) {
        this.scrolled.x = 0;
        this.scrolled.y = 0;
      }
    },
  },
};
</script>

<style lang="stylus">
.scroll-component-element
  position: relative
  overflow: hidden

.scroll-component
  width: 0
  height: 0
  overflow: visible

.scroll-component-handle
  position: absolute
  top: 0
  left: 0
  display: block
  border-radius: 5px
  cursor: pointer

.scroll-component-x
  position: absolute
  bottom: 0
  left: 0
  z-index: 1
  width: 100%
  height: 6px
  opacity: 0
  transition: opacity 0.3s ease
  &.is-active, &:hover
    opacity: 1
  .scroll-component-handle
    width: 50px
    height: 100%
    transition: left 0.1s ease

.scroll-component-y
  position: absolute
  top: 0
  right: 0
  z-index: 1
  width: 6px
  height: 100%
  opacity: 0
  transition: opacity 0.3s ease
  &.is-active, &:hover
    opacity: 1
  .scroll-component-handle
    width: 100%
    height: 50px
    transition: top 0.1s ease
</style>
