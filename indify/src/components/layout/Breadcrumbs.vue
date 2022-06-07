<template>
  <div class="breadcrumbs">
    <div
      class="breadcrumbs-popup"
      :class="{ 'is-open': breadcrumbsPopup }"
    >
      <v-list>
        <v-list-item
          v-for="(item, index) in breadcrumbsLists.hidden"
          :key="'breadcrumb-popup-' + index"
          dense
          @click="breadcrumbsPopup = false"
        >
          <span class="breadcrumb-item-number">
            {{ index + 1 }}
          </span>
          <BreadcrumbItem
            :item="item"
            :last="index === breadcrumbsLists.length - 1"
          />
        </v-list-item>
      </v-list>
    </div>
    <BreadcrumbItem
      v-for="(item, index) in breadcrumbsLists.visible"
      :key="'breadcrumb-' + index"
      :item="item"
      :last="index === breadcrumbsLists.visible.length - 1"
      @click.native.stop="openPopup(index)"
    />
  </div>
</template>

<script>
import BreadcrumbItem from './BreadcrumbItem';

export default {
  name: 'Breadcrumbs',
  components: {
    BreadcrumbItem,
  },
  data() {
    return {
      breadcrumbsPopup: false,
      currentWidth: null,
      resizeObserver: null,
    };
  },
  computed: {
    breadcrumbsLists() {
      const list = this.$store.getters['breadcrumbs/items'];
      if (!list) return { visible: [], hidden: [] };
      const breadCount = this.calculateBreadCount(list);
      return list.length <= breadCount
        ? { visible: list, hidden: [] }
        : {
          visible: list.slice(list.length - breadCount),
          hidden: list.slice(0, list.length - breadCount),
        };
    },
  },
  created() {
    this.$root.$on('routeChanged', this.closePopup);
  },
  mounted() {
    document.addEventListener('click', this.closePopup);
    this.resizeObserver = new ResizeObserver(() => this.currentWidth = this.$el.offsetWidth);
    this.resizeObserver.observe(this.$el);
  },
  beforeDestroy() {
    this.$root.$off('routeChanged', this.closePopup);
    document.removeEventListener('click', this.closePopup);
    this.resizeObserver.disconnect();
  },
  methods: {
    calculateBreadCount(list) {
      if (!this.currentWidth) return 1;
      const elementWidths = [];
      for (let i = list.length - 1; i >= 0; i--) {
        elementWidths.push(28 + (list[i].label.length * 10));
      }
      elementWidths.push(0);
      let allowedWidth = 99999;

      while (allowedWidth > this.currentWidth && elementWidths.length) {
        elementWidths.pop();
        allowedWidth = elementWidths.reduce((sum, width) => sum + width, 0);
      }

      return elementWidths.length || 1;
    },
    openPopup(index) {
      if (
        index !== this.breadcrumbsLists.visible.length - 1
        || this.breadcrumbsLists.hidden.length === 0
      ) return;
      this.breadcrumbsPopup = true;
    },
    closePopup(event) {
      if (event && event.target?.closest('.breadcrumbs-popup')) return;
      this.breadcrumbsPopup = false;
    },
  },
};
</script>

<style lang="stylus">
.breadcrumbs
  flex-grow: 2
  position: relative
  display: flex
  flex-flow: row nowrap
  align-items: center
  margin: 0

.breadcrumbs-popup
  display: none
  &.is-open
    position: absolute
    top: 100%
    left: 0
    z-index: 3
    display: flex
    flex-flow: column nowrap
    justify-content: flex-start
    align-items: stretch
    masx-width: 100%
    max-height: 300px
    overflow: hidden auto
    background: #ffffff
    box-shadow: 0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)
  .v-list-item
    display: flex
    flex-flow: row nowrap
    align-items: center
    height: 40px
  .breadcrumb-item-number
    display: inline-block
    align-items: center
    width: 20px
    min-width: 20px
    height: 20px
    padding: 0px 6px
    margin-right: 7px
    border-radius: 50%
    background: #416FC8
    text-align: center
    color: #ffffff
    font-size: 14px
  .breadcrumbs-item
    height: 100%
    .v-icon
      display: none
    a
      display: inline-flex
      align-items: center
      height: 100%
</style>
