<template>
  <ul class="list">
    <li
      v-for="item of items"
      :key="item.title"
      class="list__item"
    >
      <span
        class="list__chip"
        :style="{'background-color': item.color }"
      />
      <span class="list__label">{{ item.title }}</span>
      <span
        v-if="!item.count.length"
        class="list__count"
      >{{ item.count }}</span>
      <ul
        v-else
        class="count-list"
      >
        <li
          v-for="(count, i) of item.count"
          :key="i"
          class="count-list__item"
        >
          {{ count }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AnalyticsOrders',
  props: {
    items: {
      type: Array,
      default: () => ([]),
    },
  },
};
</script>

<style lang="stylus" scoped>
.list {
  list-style-type: none;
  &__item {
    padding: 6px 0
    font-size: 14px
    display: grid;
    grid-template-columns 180px auto
    position relative
  }
  &__chip {
    content: attr(data-color);
    width: 6px
    height: 6px
    position: absolute
    top: 0
    bottom: 0
    margin: auto 0
    left: -15px
    border-radius: 50%
  }
}
.count-list
  list-style-type none
  display: flex
  padding: 0
  &__item
    color: #8e43b1;
    &:before
      content: '/';
      color: #ccc;
      padding: 0 3px;
    &:first-child
      &:before
        display: none
    &:nth-child(2)
      color: #eba844;
    &:last-child
      color: #202124;
</style>
