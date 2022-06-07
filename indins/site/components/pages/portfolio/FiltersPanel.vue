<template>
  <div
    class="portfolio-filter"
  >
    <div class="portfolio-filter__content">
      <div
        v-for="(item, index) in itemsList"
        :key="item.tag"
        class="portfolio-filter__content__item"
      >
        <Button
          :active="item.active"
          bgColor="#637EA8"
          color="#494949"
          class="portfolio-filter__content__item__btn"
          hover-gray
          border-color="#637EA8"
          @click="switchFilter(item, index)"
        >
          <span class="portfolio-filter__content__text">
            {{ item.name }}
          </span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '~/components/common/UI/Button';

export default {
  name: 'PortfolioFilter',

  components: {
    Button,
  },

  props: {
    /* data: {
      type: Object,
      default: () => ({}),
    }, */

    currentFilters: {
      type: Set,
      default: new Set(),
    },

    filters: {
      type: Array,
      default: () => ([]),
    },
  },

  data: () => ({
    activeFilters: null,
    itemsList: null,
  }),

  watch: {
    activeFilters: {
      deep: true,
      immediate: true,
      handler(value) {
        this.$emit('filter:change', value);
      },
    },
  },

  created() {
    this.itemsList = this.filters;
    this.setActiveItems();
  },

  methods: {
    switchFilter(item, index) {
      if (!this.activeFilters.delete(item.id)) {
        this.activeFilters.add(item.id);
      }

      if (!index || this.activeFilters.size >= this.filters.length - 1) {
        this.activeFilters.clear();
        this.itemsList[index].active = true;
        this.$emit('filter:changed');
      }

      this.itemsList = this.itemsList.map((value, idx) => {
        const localItem = { ...value };

        if (idx) {
          localItem.active = this.activeFilters.has(localItem.id);
        } else {
          localItem.active = !this.activeFilters.size;
        }

        return localItem;
      });
      const arr = [];
      this.activeFilters.forEach(el => arr.push(el));
      this.$router.push({ query: { currentFilters: [...this.activeFilters] } });
      this.$emit('filter:changed', arr);
    },

    setActiveItems() {
      // console.log(this.currentFilters);
      this.activeFilters = this.currentFilters;
      if (this.currentFilters.size) {
        this.itemsList[0].active = false;

        this.itemsList = this.itemsList.map((item, index) => {
          const localItem = { ...item };

          if (index === 0) {
            localItem.active = false;
          }

          if (this.activeFilters.has(localItem.id)) {
            localItem.active = true;
          }

          return localItem;
        });
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.i-btn_active
  &:hover
    color: rgb(73, 73, 73) !important;
</style>