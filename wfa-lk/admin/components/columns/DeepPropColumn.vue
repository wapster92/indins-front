<template>
  <div class="table-cell">
    {{ value }}
  </div>
</template>

<script>

export default {
  name: 'DeepPropColumn',
  props: {
    field: {
      // Пример :field="['serviceType','sums','0','clubCost']"
      type: Array,
      required: true,
    },
  },
  computed: {
    value() {
      function getObjectField(item, queryParts) {
        const val = item;
        if (queryParts.length < 2) return val[queryParts[0]];
        return getObjectField(val[queryParts[0]], queryParts.slice(1));
      }
      try {
        const queryArr = this.field;
        return getObjectField(this.item, queryArr);
      } catch (e) {
        return '-';
      }
    },
    item() {
      return this.$parent.item;
    },
  },
};
</script>
