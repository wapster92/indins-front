<template>
  <v-btn
    v-bind="{...options, ...$attrs}"
    color="info"
    class="default-add-button"
    @click="saveNewRow"
    :loading="loading"
  >
    <v-icon size="25">
      add
    </v-icon>
  </v-btn>
</template>

<script>
import { Post } from 'core-xhr';

export default {
  name: 'AddRow',
  props: {
    query: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Object,
      default: () => ({
        elevation: 0,
        fab: true,
        width: 28,
        height: 28,
      })
    },
    setRedirectRoute: {
      type: Function,
      default: (vm, result) => ({
        name: `${vm.$route.name}-id`,
        params: { id: result.data.data?.created }
      })
    },
    callback: {
      type: Function,
      default: (vm, result) => {
        if (result?.data?.success && result.data?.data?.created) {
          let routeObject = vm.setRedirectRoute(vm, result)
          vm.$router.push(routeObject);
        }
      }
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async saveNewRow() {
      try {
        const request = new Post(this.query).setData({ ...this.data });
        this.loading = true
        let result = await this.$xhr.send(request);
        this.loading = false
        this.callback(this, result)
      } catch (error) {
        this.loading = false
        this.$errorHandler('Добавить элемент не удалось!')(error);
      }
    },
  },
};
</script>

<style lang="stylus">
.add-row-btn
  cursor: pointer
</style>
