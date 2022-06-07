<template>
  <div
    class="canban-header"
  >
    <div
      class="canban-colored-line"
      :style="lineStyle"
    />
    <div class="canban-head-text">
      {{ column || 'Пользователей' }}: <span>{{ list.length }}</span>
    </div>
    <div class="canban-head-buttons">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultCanbanHead',
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    list() {
      return this.options.list;
    },
    column() {
      return this.options.name;
    },
    color() {
      return this.options.color;
    },
    lineStyle() {
      return this.color ? `background-color: ${this.color};` : '';
    },
  },
};
</script>

<style lang="stylus">
.canban-header
  position: relative
  display: flex
  flex-flow: row nowrap
  align-items: center
  height: 40px
  padding: 5px 16px
  border: 1px solid #DADADA
  background: #F3F5F8
  color: #202124
  font-size: 14px
  line-height: 16px
  font-weight: bold
  span
    display: inline-block
    margin-left: 10px
    color: #888A91
    font-size: 13px
    line-height: 15px
    font-weight: 400

.canban-colored-line
  position: absolute
  top: 0
  left: 0
  z-index: 1
  width: 100%
  height: 3px
  background-color: #F3F5F8

.canban-head-buttons
  display: flex
  flex-flow: row nowrap
  align-items: center
  justify-content: flex-end
  margin-left: auto
</style>
