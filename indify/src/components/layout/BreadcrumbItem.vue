<template>
  <div class="breadcrumbs-item">
    <nuxt-link
      v-if="link"
      :to="link"
      :title="item.label"
    >
      {{ name }}
    </nuxt-link>
    <span
      v-else
      :title="item.label"
    >
      {{ name }}
    </span>
    <v-icon
      v-if="!last"
      size="18"
    >
      chevron_right
    </v-icon>
  </div>
</template>

<script>
export default {
  name: 'BreadcrumbItem',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    last: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    link() {
      return this.item && !this.last ? this.item.routeTo : false;
    },
    name() {
      if (!this.item) return '';
      let name = this.item.label;
      if (name && name.length > 30) {
        name = `${name.slice(0, 18)}...`;
      }
      return name;
    },
  },
};
</script>

<style lang="stylus">
.breadcrumbs-item
  position: relative
  display: flex
  flex-flow: row nowrap
  align-items: center
  height: 32px
  padding-right: 23px
  margin-right: 5px
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  &:last-of-type
    margin-right: 0
    padding-right: 0
  & > span
    overflow: hidden
    text-overflow: ellipsis
  a
    color: #416FC8
    text-decoration: none
  span
    color #202124
  a, span
    font-weight: 500
    font-size: 15px

  .nuxt-link-active
    overflow: hidden
    text-overflow: ellipsis

  .v-icon.v-icon
    position: absolute
    right: 0
    top: 50%
    transform: translateY(-50%)

@media(max-width: 959px)
  .breadcrumbs-item
    height: 20px
    a, span
      font-size: 16px
</style>
