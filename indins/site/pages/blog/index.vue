<template>
  <div class="blog-page">
    <PageTitle :data="pageTitle"/>
    <FiltersPanel
      :current-filters="activeFilters"
      :filters="filtersArr"
      class="blog-filter-panel"
      @filter:changed="getByTag"
    />
    <div
      v-if="items && items.length"
      class="blog-page__container"
    >
      <InfoBlockGrid
        :data="infoBlockGrid"
      >
        <BlogItem
          v-for="(item, key) in getItems"
          :key="key"
          :data="item"
        />
      </InfoBlockGrid>
      <!--      <Pagination
        v-if="isShowPagination"
        :page-count="getPageCount"
        v-model="activePage"
        @pageChanged="pageChanged"
      />-->
    </div>
    <div
      v-if="!items"
      class="blog-page__container"
    >
      <div class="blog-page__container_empty">
        <span>Скоро здесь будут интересные статьи</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import { meta } from '~/mixins/meta';
import { blogFiltersTag } from '~/constants/blogFilter';
import checkMenu from '~/mixins/checkMenu';
import PageTitle from '~/components/common/UI/PageTitle';
import FiltersPanel from '~/components/pages/portfolio/FiltersPanel';
import InfoBlockGrid from '~/components/common/UI/InfoBlockGrid';
import BlogItem from '~/components/common/BlogItem';
import Pagination from '~/components/common/UI/Pagination';

// const itemsPerPage = 9;
// let stopHandlerScroll = false;

export default {
  name: 'Blog',

  components: {
    BlogItem,
    PageTitle,
    InfoBlockGrid,
    Pagination,
    FiltersPanel,
  },

  mixins: [
    meta,
    checkMenu,
  ],

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
      .addFilter(new Filter('articleFilter', 'bool', true))
      .addFilter(new Filter('isActive', 'bool', true));

    const blogRequest = new Get('blog').addOrder('createdAt', 'DESC').setFilter(filter);

    const metaRequest = new Get('meta').entity().addFilter(new Filter('url', 'eq', route.path));
    try {
      const metaData = await $xhr.send(metaRequest).then(res => res.data.data.result);
      let articles = await $xhr.send(blogRequest).then(res => res.data.data.result);
      const tags = await $xhr.send(requestTags).then(res => res.data.data.result);
      tags.unshift({ name: 'Все', active: true });

      const { metaTitle, metaDescription, metaKeywords } = metaData;

      filters = filters.map(el => Number(el));
      const activeFilters = new Set(filters);

      if (!articles.length) { articles = null; }

      return {
        filtersArr: tags,
        activeFilters,
        metaTitle,
        metaDescription,
        metaKeywords,
        items: articles,
      };
    } catch (e) {
      console.error(e);
    }
  },

  data() {
    return {
      items: null,
      itemsPerPage: 9,
      clientScreenHeight: 500,
      filtersArr: blogFiltersTag,
      stopHandlerScroll: false,
      activeFilters: null,
      // currentDocHeight: null,
      initialDocHeight: null,
      page: {
        menuBack: true,
        footerBack: false,
      },

      pageTitle: {
        title: 'Блог',
      },

      infoBlockGrid: {
        gridClass: 'blog-step',
        column: '3',
        gap: '35',
      },

      activePage: 1,
    };
  },

  computed: {
    /* isShowPagination() {
      return false;
      return this.items.length > itemsPerPage;
    }, */
    getPageCount() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    getItems() {
      // const from = itemsPerPage * this.activePage - itemsPerPage;
      const to = this.itemsPerPage * this.activePage;
      return this.items.length <= this.itemsPerPage ? this.items : this.items.slice(0, to);
    },
  },

  mounted() {
    // this.activePage = this.$route.query.page !== undefined ? +this.$route.query.page : 1;
    // this.pageChanged();
    this.initialDocHeight = this.getDocHeight();

    const i = () => {
      if (!this.items) { window.removeEventListener('scroll', i); return; }
      if (this.$route.name !== 'blog') { window.removeEventListener('scroll', i); return; }
      if (this.items.length / this.itemsPerPage < this.activePage) {
        window.removeEventListener('scroll', i);
        return;
      }
      if (!this.stopHandlerScroll) {
        this.stopHandlerScroll = true;
        const currentDocHeight = this.getDocHeight();
        if (currentDocHeight - window.pageYOffset < this.initialDocHeight) {
          // const nextPage = Number(this.$route.query.page) + 1;
          this.pageChanged();
        }
        this.stopHandlerScroll = false;
      }
    };

    window.addEventListener('scroll', i);
  },

  methods: {
    async getByTag(arr) {
      const filter = [
        new Filter('deletedAt', 'exists', false),
        new Filter('isActive', 'bool', true),
      ];

      if (arr && arr.length) {
        filter.push(new Filter('tags.id', 'ineq', arr));
      }

      const blogRequest = new Get('blog').addOrder('createdAt', 'DESC').setFilter(filter);
      let articles = await this.$xhr.send(blogRequest)
        .then(res => res.data.data.result);

      if (!articles.length) { articles = null; }

      this.items = articles;
    },
    pageChanged() {
      if (this.$route.name !== 'blog') return;
      this.activePage += this.activePage;
      // this.$router.push(`${this.$route.path}?page=${e}`);
    },
    /* getScreenHeight() {
      this.clientHeight = document.documentElement.clientHeight;
    }, */
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
