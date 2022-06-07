<template>
  <div class="listing-view">
    <v-tooltip
      bottom
      nudge-right="30"
      v-for="viewType in viewList"
      :key="viewType.name"
      :disabled="!viewType.tooltip"
    >
      <template #activator="{ on, attrs }">
        <button
          class="icon-button"
          @click="changeView(viewType)"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon
            :color="currentView && currentView.name === viewType.name ? '#416FC8' : '#888A91'"
            :class="{ 'material-icons-outlined': viewType && viewType.outlined }"
            size="20"
          >
            {{ viewType.icon }}
          </v-icon>
        </button>
      </template>
      <span v-if="!!viewType.tooltip">{{ viewType.tooltip }}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: 'ListingViewSwitch',
  props: {
    value: {
      type: [Object, null],
      default: null,
    },
    viewList: {
      type: Array,
      default: () => ([]),
    },
    defaultView: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentView: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(val) {
        this.currentView = val;
      },
    },
  },
  mounted() {
    if (Array.isArray(this.viewList) && this.viewList.length > 1 && !this.currentView) {
      this.changeView(this.viewList
        .find(type => type.name === this.defaultView) || this.viewList[0]);
    }
  },
  methods: {
    changeView(view) {
      this.currentView = view;
      this.$emit('input', view);
    },
  },
};
</script>

<style lang="stylus">
.listing-view
  display: flex
  flex-flow: row nowrap
  justify-content: flex-start
  align-items: center
  height: 42px
  padding: 0 15px
  border-right: 1px solid #DADADA

  .icon-button:nth-of-type(n+2)
    margin-left: 15px

@media (max-width: 500px)
  .listing-view
    justify-self: start
</style>
