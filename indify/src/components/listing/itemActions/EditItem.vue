<template>
  <nuxt-link
    tag="button"
    class="listing-icon-button"
    :to="to"
  >
    <v-icon size="16">
      create
    </v-icon>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    item: {
      type: [Object, null],
      default: null,
    },
    routeTo: {
      type: [String, Object, null],
      default: null,
    },
    entityParam: {
      type: String,
      default: 'id',
    },
  },
  computed: {
    defaultRoute() {
      const params = { ...this.$route.params };
      params[this.entityParam] = this.item ? this.item.id || 'add' : 'add';
      return {
        name: `${this.$route.name}-${this.entityParam}`,
        params,
      };
    },
    to() {
      return this.routeTo || this.defaultRoute;
    },
  },
};
</script>
