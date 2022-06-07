<template>
  <div class="portfolio-page">
    <PageTitle :data="{title: 'Портфолио'}"/>
    <!--  вырезан из FiltersPanel этот эмит  @filter:change="setFilters"  -->
    <FiltersPanel
      :current-filters="activeFilters"
      :filters="filtersArr"
      @filter:changed="getItems"
    />
    <Preloader :loading="!computedItems"/>
    <PortfolioGrid>
      <PortfolioTile
        v-for="item in computedItems"
        :key="item.id"
        :value="item"
      />
    </PortfolioGrid>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import { meta } from '~/mixins';
import checkMenu from '~/mixins/checkMenu';
import { portfolioTileData, portfolioFilters } from '~/constants';
import PageTitle from '~/components/common/UI/PageTitle';
import FiltersPanel from '~/components/pages/portfolio/FiltersPanel';
import PortfolioGrid from '~/components/pages/portfolio/PortfolioGrid';
import PortfolioTile from '~/components/pages/portfolio/PortfolioTile';
import Preloader from '~/components/common/UI/Preloader';
import portfolioGrid from '../../mixins/portfolioGrid';

export default {
  name: 'Portfolio',

  components: {
    PageTitle,
    FiltersPanel,
    PortfolioGrid,
    PortfolioTile,
    Preloader,
  },

  async asyncData({ app: { $xhr }, route }) {
    const filter = [
      new Filter('deletedAt', 'exists', false),
      new Filter('isActive', 'bool', true),
    ];

    let filters = [];

    if (route && route.query && route.query.currentFilters) {
      filters = route.query.currentFilters;
    }

    if (typeof filters === 'string') {
      filters = [filters];
    }

    if (filters.length) {
      filters = filters.map(el => Number(el));
      filter.push(new Filter('tags.id', 'ineq', filters));
    }
    const requestTags = new Get('tags')
      .collection()
      .addOrder('sort', 'DESC')
      .addFilter(new Filter('deletedAt', 'exists', false))
      .addFilter(new Filter('projectFilter', 'bool', true))
      .addFilter(new Filter('isActive', 'bool', true));

    const request = new Get('portfolio').collection().setFilter(filter).addOrder('sort', 'DESC');
    const metaRequest = new Get('meta').entity().addFilter(new Filter('url', 'eq', route.path));
    try {
      const project = await $xhr.send(request);
      const metaData = await $xhr.send(metaRequest).then(res => res.data.data.result);
      const tags = await $xhr.send(requestTags).then(res => res.data.data.result);

      tags.unshift({ name: 'Все', active: true });

      const items = project.data.data.result;
      filters = filters.map(el => Number(el));
      const activeFilters = new Set(filters);

      return {
        filtersArr: tags,
        ...metaData,
        items,
        activeFilters,
      };
    } catch (e) {
      console.error(e);
    }
  },

  mixins: [
    meta,
    checkMenu,
    portfolioGrid,
  ],

  data() {
    return {
      page: {
        menuBack: true,
        footerBack: false,
      },
      currentItem: 20,
      items: null,
      activeFilters: null,
      filtersArr: portfolioFilters,
      stopHandlerScroll: false,
      initialDocHeight: 500,
    };
  },

  computed: {
    // TODO разобраться с анимацией
    computedItems() {
      if (!this.items) {
        return [];
      }
      const arr = JSON.parse(JSON.stringify(this.items));
      arr.splice(this.currentItem);
      return arr.reduce((acc, item, index) => {
        const tags = item.tags.map(tag => tag.name);
        // if (!this.activeFilters?.size || tags.some(tag => this.activeFilters.has(tag))) {

        acc.push({
          ...item,
          ...portfolioTileData[item.url],
          styles: this.getStyle(index),
          tags,
        });
        // console.log(acc);
        // }
        return acc;
      }, []);
    },
  },

  mounted() {
    this.initialDocHeight = this.getDocHeight();
    const i = () => {
      if (this.$route.name !== 'portfolio') return window.removeEventListener('scroll', i);
      if (this.computedItems >= this.items) return window.removeEventListener('scroll', i);
      if (!this.stopHandlerScroll) {
        this.stopHandlerScroll = true;
        const currentDocHeight = this.getDocHeight();
        if (currentDocHeight - window.pageYOffset + 1500 < this.initialDocHeight) {
          this.initialDocHeight = currentDocHeight;
          this.currentItem += 20;
        }
        this.stopHandlerScroll = false;
      }
    };
    window.addEventListener('scroll', i);
  },

  methods: {
    async getItems(arr) {
      const filter = [
        new Filter('deletedAt', 'exists', false),
        new Filter('isActive', 'bool', true),
      ];

      if (arr && arr.length) {
        filter.push(new Filter('tags.id', 'ineq', arr));
      }

      const request = new Get('portfolio').collection().setFilter(filter).addOrder('sort', 'DESC');
      const project = await this.$xhr.send(request);
      this.items = project.data.data.result;
    },

    getDocHeight() {
      return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight,
      );
    },
  },
};
</script>
