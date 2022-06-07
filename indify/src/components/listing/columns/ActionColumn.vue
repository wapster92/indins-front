<template>
  <div
    :data-field="field"
    :data-group="clickableGroup"
    :class="{ 'is-hovered': isHovered }"
    class="table-cell action-column"
  >
    <slot
      :item="item"
      :url="url"
      name="default"
    />
  </div>
</template>

<script>
import clickableGroup from './clickableGroup.js';

export default {
  name: 'ActionColumn',
  mixins: [clickableGroup],
  data() {
    return {
      field: 'special:listing-actions',
    };
  },
  computed: {
    item() {
      return this.$parent.item;
    },
    url() {
      return this.$parent.url;
    },
  },
};
</script>
