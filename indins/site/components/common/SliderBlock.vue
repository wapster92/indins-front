<template>
  <div class="slider-block">

    <SwiperProjects v-if="computedItems.length !== 0">
      <PortfolioTile
        v-for="(item, index) in computedItems"
        :key="item.url + index"
        :value="item"
        class="swiper-slide portfolio-item--square"
      />
    </SwiperProjects>

  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import { portfolioGrid, portfolioTileData } from '~/constants';
// import SwiperProjects from '~/components/common/SwiperProjects';
import PortfolioTile from '~/components/pages/portfolio/PortfolioTile';

export default {
  name: 'SliderBlock',

  components: {
    SwiperProjects: () => import('~/components/common/SwiperProjects'),
    PortfolioTile,
  },

  props: {
    tags: {
      type: Array,
      default: () => [],
      require: true,
    },
  },

  data() {
    return {
      portfolioList: null,
    };
  },

  computed: {
    computedItems() {
      if (!this.portfolioList) {
        return [];
      }

      return this.portfolioList.reduce((acc, item, index) => {
        const projectTags = item.tags.map(tag => tag.name);

        acc.push({
          ...item,
          ...portfolioTileData[item.url],
          styles: portfolioGrid[index],
          projectTags,
        });

        return acc;
      }, []);
    },
  },

  beforeMount() {
    let filters = this.tags;

    if (typeof filters === 'string') {
      filters = [filters];
    }

    const filter = [
      new Filter('deletedAt', 'exists', false),
      new Filter('isActive', 'bool', true),
      new Filter('tags.name', 'ineq', filters),
    ];
    /*
    if (filters) {
      for (let i = 0; i < filters.length; i++) {
        if (i === filters.length - 1) {
          filter.push(new Filter('tags.name', 'eq', filters[i], true));
        } else {
          filter.push(new Filter('tags.name', 'eq', filters[i], false));
        }
      }
    } */

    const request = new Get('portfolio')
      .collection()
      .limitShown(10)
      .addOrder('sort', 'DESC')
      .setFilter(filter);

    this.$xhr.send(request)
      .then(response => {
        this.portfolioList = response.data.data.result;
      }).catch(
        e => console.error(e),
      );

    /* this.portfolioList = [
    {
        id: 1,
        url: 'cds',
        tileTag: 'CRM и ERP-система',
        tileTitle: 'ЦДС Партнер',
        logo: '/img/projectBlocks/cds/logo_cds.svg',
        projectTags: [{ id: 1, name: 'crm' }, { id: 2, name: 'erp' }],
        order: 1,
      },
    ]; */
  },
};
</script>
