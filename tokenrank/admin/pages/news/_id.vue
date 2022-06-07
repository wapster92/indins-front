<template>
  <FormValidator v-slot="{ validate }">
    <v-container
      fluid
      class="pa-0"
    >
      <v-row no-gutters>
        <PageBlock
          title="Основная информация"
          no-content
          class="header"
        />
      </v-row>
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="6"
        >
          <MainInfo
            :feed="news"
            @input="throttledSave(validate)"
          />
          <PageBlock title="Мета данные">
            <v-row no-gutters>
              <v-col
                cols="12"
                sm="12"
              >
                <TextInput
                  v-model="news.metaTitle"
                  label="Meta title"
                  input-type="standart"
                  name="meta-title"
                  required
                  @input="throttledSave(validate)"
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col
                cols="12"
                sm="12"
              >
                <TextInput
                  v-model="news.metaKeywords"
                  label="Meta Keywords"
                  input-type="standart"
                  name="meta-words"
                  required
                  @input="throttledSave(validate)"
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col
                cols="12"
                sm="12"
              >
                <TextareaInput
                  v-model="news.metaDescription"
                  label="Meta Description"
                  input-type="standart"
                  name="meta-desc"
                  required
                  @input="throttledSave(validate)"
                />
              </v-col>
            </v-row>
          </PageBlock>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <PageBlock no-padding>
            <div class="pa-0">
              <client-only :key="key">
                <SimpleWysiwyg
                  v-model="news.text"
                  name="text"
                  required
                  @input="throttledSave(validate)"
                />
              </client-only>
            </div>
          </PageBlock>
        </v-col>
      </v-row>
    </v-container>
  </FormValidator>
</template>

<script>
import {
  Filter, Get, Post, Put,
} from 'core-xhr';
import MainInfo from '@/components/news/MainInfo';

async function getNews(xhr, store, newsId) {
  const request = new Get('news-id')
    .addFilter(new Filter('id', 'eq', newsId));
  try {
    const response = await xhr.send(request);
    if (!response || !response.data.data.result[0]) return;
    return response.data.data.result[0];
  } catch (e) {
    store.dispatch('snack/error', 'Не удалось получить информацию о новости!');
  }
}

export default {
  name: 'Id',
  components: {
    MainInfo,
    SimpleWysiwyg: async () => {
      if (process.client) {
        // eslint-disable-next-line no-return-await
        return await import('indify/src/components/subsidiary/SimpleWysiwyg');
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      ++vm.key;
    });
  },
  async asyncData({ app: { $xhr }, store, params }) {
    if (params.id === 'add') return {};
    const news = await getNews($xhr, store, params.id);
    if (!news) return {};
    return { news };
  },
  meta: {
    breadcrumb: {
      immediate: false,
      handler({ route }) {
        return route.params.id === 'add' ? 'Новая новость' : 'Редактирование новости';
      },
    },
  },
  data() {
    return {
      news: {
      },
      key: 0,
    };
  },
  computed: {
    newsId() {
      return this.$route.params.id;
    },
    isAddPage() {
      return this.newsId === 'add';
    },
  },
  methods: {
    throttledSave(valid) {
      this.$store.dispatch('autosaveStore/toggle', {
        isVisible: true,
        confirmHandler: () => this.saveNews(valid),
        rejectHandler: () => {
          this.reject();
        },
      });
    },
    async saveNews(valid) {
      if (!valid()) return;
      const request = this.isAddPage
        ? new Post('news-id')
        : new Put('news-id').addFilter(new Filter('id', 'eq', this.newsId));
      this.news.user = { id: this.$store.getters['auth/getData'].id };
      const requestData = { ...this.news };
      request.setData(requestData);
      try {
        await this.$xhr.send(request);
        this.$store.dispatch('snack/info', 'Информация о новости успешно обновлена');
        this.$router.push({ name: 'news' });
      } catch (e) {
        this.$store.dispatch('snack/error', 'Не удалось сохранить информацию о новости.');
      }
    },
    reject() {
      this.$store.dispatch('autosaveStore/toggle', {
        isVisible: false,
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.header
  width: 100%;
.form-validator-component
  width: 100%;
.wysiwyg
  & >>> .ck
    &.ck-editor__main
      & > .ck-editor__editable
        padding: 0 24px
        &:not(.ck-focused)
          border: 1px solid transparent
          border-top: 1px solid #dadada
        &.ck-focused
          border-radius: 0 !important
          border: 1px solid #416FC8
    &.ck-toolbar
      border: none !important
</style>
