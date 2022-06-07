export default async ({route}) => {
  for (let matched of route.matched) {
    if (matched.components.default.options.head) {
      return;
    }
    matched.components.default.options.head = function () {
      const items = this.$store.getters['breadcrumbs/items'];
      if (!items.length) {
        return;
      }
      return {
        title: items
          .map(i => i.label)
          .reverse()
          .join(' / ')
      }
    }
  }
}
