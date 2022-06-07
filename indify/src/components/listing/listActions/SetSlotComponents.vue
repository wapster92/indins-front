<template>
  <div
    :class="{ 'is-half': halfWidth }"
    class="listing-actions"
  >
    <div
      v-for="(item, index) of visibleActions"
      :key="'item-action-' + index"
      class="action-element"
    >
      <RenderNode :node="item" />
    </div>
    <div
      v-if="invisibleActions.length > 0"
      class="action-element"
    >
      <HiddenItems>
        <v-list-item
          v-for="(item, index) of invisibleActions"
          :key="'item-silent-action-' + index"
          dense
        >
          <RenderNode :node="item" />
        </v-list-item>
      </HiddenItems>
    </div>
  </div>
</template>

<script>
import { RenderNode } from "../../subsidiary";
import HiddenItems from './HiddenItems';

export default {
  name: 'SetSlotComponents',
  components: {
    RenderNode,
    HiddenItems,
  },
  data() {
    return {
      visibleActions: [],
      invisibleActions: [],
    };
  },
  computed: {
    halfWidth() {
      return this.visibleActions.length === 1 && this.invisibleActions.length === 0;
    },
  },
  created() {
    this.$eventBus.on('set-listing-actions', this.splitActions);
  },
  methods: {
    splitActions(components) {
      this.visibleActions = [];
      this.invisibleActions = [];
      if (components.length <= 2) {
        this.visibleActions = [...components];
        return;
      }
      const visibleActions = [];
      const invisibleActions = [];
      components.forEach((el, i) => i < 1
        ? visibleActions.push(el)
        : invisibleActions.push(el)
      );
      this.visibleActions = visibleActions;
      this.invisibleActions = invisibleActions;
    },
  },
};
</script>

<style lang="stylus">
@media (max-width: 500px)
  .listing-actions
    border-left: none
</style>
