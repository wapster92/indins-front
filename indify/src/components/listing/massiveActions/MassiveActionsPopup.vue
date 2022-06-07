<template>
  <div
    :class="{ 'is-open': isOpen }"
    class="massive-actions-popup-wrapper"
  >
    <div
      :style="{ transform: `translateY(${ isOpen ? 0 : translateDistance}px)` }"
      class="massive-actions-mobile"
    >
      <div class="massive-actions-top">
        <span class="massive-actions-title">Действия</span>
        <button
          class="massive-actions-opener"
          @click="togglePopup"
        >
          <svg
            width="10"
            height="5"
          >
            <path
              d="M0 0 l5 5 l5 -5 z"
              fill="#416FC8"
            />
          </svg>
        </button>
      </div>
      <div class="massive-actions-popup">
        <slot />
      </div>
    </div>
    <div class="massive-actions-shadow" />
  </div>
</template>

<script>
export default {
  name: 'MassiveActionsPopup',
  data() {
    return {
      isOpen: false,
      translateDistance: 100,
      resizeObserver: null,
    };
  },
  mounted() {
    const list = this.$el.querySelector('.massive-actions-popup');
    if (list) {
      this.resizeObserver = new ResizeObserver(() => this.calculateDistance(list));
      this.resizeObserver.observe(list);
    }
  },
  beforeDestroy() {
    this.resizeObserver.disconnect();
  },
  methods: {
    togglePopup() {
      this.isOpen = !this.isOpen;
    },
    calculateDistance(list) {
      this.translateDistance = list.clientHeight;
    },
  },
}
</script>

<style lang="stylus">
.massive-actions-popup-wrapper
  height: 32px
  background: #ffffff
  &.is-open
    .massive-actions-top
      background: #F3F5F8
    .massive-actions-mobile
      background: #ffffff
    .massive-actions-opener
      background: #ffffff
      transform: rotate(0deg)

    .massive-actions-shadow
      display: block

.massive-actions-top
  display: grid
  grid-template: 100% \/ 1fr 32px
  align-items: center
  justify-content: space-between
  padding: 9px 20px
  background: #ffffff

.massive-actions-mobile
  position: fixed
  bottom: 0
  left: 0
  z-index: 2
  width: 100vw
  transform: translateY(0px)
  transition: transform 0.4s ease

.massive-actions-title
  font-size: 14px
  line-height: 1
  font-weight: 500
  color: #202124

.massive-actions-opener
  transform: rotate(180deg)
  display: flex
  flex-flow: row nowrap
  justify-content: center
  align-items: center
  width: 32px
  height: 32px
  border-radius: 50%
  background: #F3F5F8

.massive-actions-popup
  display: flex
  flex-flow: column nowrap
  align-items: flex-start
  justify-content: flex-start
  padding: 9px 20px
  background: #ffffff

.massive-actions-shadow
  position: fixed
  top: 0
  left: 0
  z-index: 1
  display: none
  width: 100vw
  height: 100vh
  background: rgba(63, 74, 106, 0.4)
</style>