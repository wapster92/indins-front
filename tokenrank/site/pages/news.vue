<template>
  <div>
    <div
      v-if="isNewsListPage"
      class="container">
      <MainHeading>Новости крипторынка</MainHeading>
      <div class="news-filter news-filter--offset-bottom">
        <TkSelect
          query="tokens"
          class="news-filter__select"
          @input="exactFilter($event, 'token.id')"/>
        <TkSelect
          query="exchange"
          placeholder="Фильтр по криптобирже"
          filter
          class="news-filter__select"
          @input="exactFilter($event, 'exchange.id')"/>
        <TkSearch
          v-model="search"
          placeholder="Поиск"
          class="news-filter__search"
          @keypress.enter.native="addSearchFilter"
          @click="addSearchFilter"/>
      </div>
      <ApiForPagination
        :filters="filters"
        entity="news"
        limit="10">
        <template #default="{list}">
          <div class="news-list">
            <div
              v-if="list.length"
              class="news-list__items">
              <TkArticlePreview
                v-for="(newPreview) of list"
                :article="newPreview"
                :key="newPreview.id"
                class="news-list__item"/>
            </div>
            <div
              v-else
              class="news-list__empty">
              <EmptyComponent/>
            </div>
          </div>
        </template>
      </ApiForPagination>

    </div>

    <NuxtChild/>

  </div>
</template>

<script>
import MainHeading from '@/components/elements/headers/MainHeading';
import TkArticlePreview from '@/components/articles/TkArticlePreview';
import TkSearch from '@/components/UI/TkSearch';
import TkSelect from '@/components/UI/TkSelect';
import EmptyComponent from '@/components/main/EmptyComponent';
import ApiForPagination from '@/components/ApiForPagination';
import getMetaTags from '@/utils/getMetaTags';
import { metaMixin } from '@/mixins/meta';

export default {
  name: 'News',
  components: {
    TkSelect,
    MainHeading,
    TkArticlePreview,
    TkSearch,
    EmptyComponent,
    ApiForPagination,
  },
  async asyncData({ app: { $xhr }, error, route }) {
    try {
      const metaTags = await getMetaTags($xhr, route);
      return {
        metaTags,
      };
    } catch (e) {
      error(e);
    }
  },
  mixins: [
    metaMixin,
  ],
  data() {
    return {
      metaTags: null,
      filters: [{ field: 'deletedAt', operator: 'exist', value: false }],
      search: '',
    };
  },
  computed: {
    isNewsListPage() {
      return this.$route.name === 'news';
    },
  },
  watch: {

  },
  methods: {
    exactFilter(id, type) {
      this.addFilter({ field: type, operator: 'eq', value: id });
    },
    addSearchFilter() {
      if (this.search.length < 2) return this.removeSearchFilter();
      this.addFilter({ field: 'name,description,text', operator: 'multiple', value: this.search });
    },
    removeSearchFilter() {
      this.removeFilter({ field: 'name,description,text', operator: 'multiple', value: this.search });
    },
    addFilter(obj) {
      const idx = this.filters.findIndex(filter => obj.field === filter.field);
      if (idx < 0) {
        this.filters.push(obj);
      } else {
        this.$set(this.filters, idx, obj);
      }
    },
    removeFilter(obj) {
      const idx = this.filters.findIndex(filter => obj.field === filter.field);
      if (idx < 0) return false;
      this.$delete(this.filters, idx);
    },
  },
};
</script>

<style scoped lang="scss">
.news-list {
  padding: 0 0 60px 0;
  @include min-media($md) {
    padding: 0 0 100px 0;
  }
  &__item {
    margin-bottom: 30px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.news-filter {
  display: flex;
  gap: 20px;
  &--offset-bottom {
    margin-bottom: 20px;
    @include min-media($md) {
      margin-bottom: 35px;
    }
  }
  &__search {
    width: 100%;
    @include min-media($md) {
      max-width: 384px;
    }
  }
  &__select {
    display: none;
    @include min-media($md) {
      display: block;
    }
  }
}
</style>
