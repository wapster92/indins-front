<template>
  <div class="app-badge">
    <div
      class="badge-circle"
      :style="{
        borderRadius: (styles.height/2)+'px',
        minWidth: styles.height+'px',
        height: styles.height+'px',
        top: (-5 - styles.top)+'px',
        right: (-15 - styles.right)+'px',
        backgroundColor: (styles.bgColor || '#CF4949'),
        zIndex: styles.zIndex,
      }"
    >
      <div class="badge-count-wrapper">
        <div
          class="badge-count"
          :style="{
            fontSize: styles.height-8 + 'px',
            color: styles.fontColor || '#ffffff'
          }"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'IBadge',
  props: {
    styles: {
      type: Object,
      default: () => ({
        height: 16,
        top: 0,
        right: 0,
        bgColor: '#CF4949',
        zIndex: 2,
        fontColor: '#ffffff',
      }),
    },
  },
};
</script>

<style lang="stylus">
.app-badge
  position: absolute

.badge-circle
  position: absolute
  display: inline-block
  text-align: center
  padding-left: 5px
  padding-right: 5px

.badge-count-wrapper
  display flex
  justify-content: center;
  height 100%

.badge-count
  display: flex
  align-items center
  padding-bottom 1px
</style>
