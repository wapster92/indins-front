<template>
  <div>
    <transition
      name="fade"
      mode="out-in">
      <div
        v-if="loading"
        key="loading"
        class="loading">
        <img
          class="loading__img"
          src="@/assets/svg/loading.svg"
          alt="loading">
      </div>
      <div
        v-else
        key="list">
        <slot
          :list="list"
          name="default"/>
      </div>
    </transition>
    <TkPagination
      v-if="pages !== 1"
      v-model="currentPage"
      :page-count="pages"/>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import TkPagination from '@/components/UI/TkPagination';

export default {
  name: 'ApiForPaginationVue',
  components: {
    TkPagination,
  },
  props: {
    entity: {
      type: String,
      required: true,
    },
    filters: {
      type: Array,
      default: () => [{
        field: 'deletedAt', operator: 'exists', value: false, orFilter: false,
      }],
    },
    limit: {
      type: String,
      default: '50',
    },
  },
  async fetch() {
    this.loading = true;
    try {
      if (this.entity) {
        const request = await this.$xhr.send(new Get(this.entity)
          .collection()
          .setFilter(this.generatedFilters())
          .limitStart(this.getStartLimitValue())
          .limitShown(this.limit)
          .count(true)
          .pagination(true));
        this.pages = request.data.data.pagination.all;
        this.currentPage = request.data.data.pagination.now;
        this.list = request.data.data.result;
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  },
  data() {
    return {
      list: [],
      pages: 1,
      currentPage: 1,
      loading: false,
    };
  },
  watch: {
    currentPage() {
      this.$fetch();
    },
    filters: {
      deep: true,
      handler() {
        this.$fetch();
      },
    },
  },
  methods: {
    generatedFilters() {
      return this.filters.map(({
        field, operator, value, orFilter = false,
      }) => new Filter(field, operator, value, orFilter));
    },
    getStartLimitValue() {
      const limit = Number(this.limit);
      return (this.currentPage - 1) * limit;
    },
  },
};
</script>

<style lang="scss">
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
