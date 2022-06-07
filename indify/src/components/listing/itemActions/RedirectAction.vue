<template>
  <ClickAction
    :icon="icon"
    @click="redirect"
  />
</template>

<script>
export default {
  name: 'RedirectAction',
  props: {
    item: {
      type: [Object, null],
      default: null,
    },
    routeTo: {
      type: [String, Object],
      default: '',
    },
    icon: {
      type: String,
      default: 'create',
    },
  },
  methods: {
    redirect() {
      const route = this.routeTo || {
        name: `${this.$route.name}-id`,
        params: {
          id: this.item?.id,
        },
      };
      this.$router.push(route);
    },
  },
};
</script>
