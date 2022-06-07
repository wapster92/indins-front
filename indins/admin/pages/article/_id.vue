<template>
  <div class="item-page fill-height">
    <PageBlock
      :title="dialogTitle || article.title"
      no-padding
    >
      <FormValidator
        v-slot="{ validate }"
        class="px-2 py-4"
      >
        <AutoSaveBlock
          justify
          sticky
          @cancel="cancel"
          @save="save(validate)"
        >
          <template #default="{ throttledSave }">
            <v-row no-gutters>
              <v-col
                sm="12"
                md="4"
                cols="12"
                class="px-2"
              >
                <FileUploader
                  :upload-request="uploadRequest"
                  :value="article.image ? {name: article.title, url: article.image} : null"
                  class="mt-4"
                  accept="image/jpeg,image/pjpeg,image/png,image/svg+xml,image/webp"
                  name="article-image"
                  required
                  @onUploaded="onUploaded($event, throttledSave)"
                  @onDeleteItem="article.image = ''"
                />
              </v-col>
              <v-col
                sm="12"
                md="8"
                cols="12"
              >
                <v-row no-gutters>
                  <v-col
                    sm="6"
                    md="6"
                    cols="12"
                  >
                    <SimpleText
                      v-model="article.title"
                      label="Заголовок"
                      name="title"
                      required
                      @keyup.native="generateUrl('article', 'title', 'url')"
                      @input="throttledSave"
                    />
                  </v-col>
                  <v-col
                    sm="6"
                    md="6"
                    cols="12"
                  >
                    <SimpleText
                      v-model="article.metaTitle"
                      label="MetaTitle"
                      name="meta-title"
                      required
                      @input="throttledSave"
                    />
                  </v-col>
                  <v-col
                    sm="6"
                    md="6"
                    cols="12"
                  >
                    <SimpleText
                      v-model="article.url"
                      label="URL"
                      name="url"
                      required
                      @input="throttledSave"
                    />
                  </v-col>
                  <v-col
                    sm="6"
                    md="6"
                    cols="12"
                  >
                    <SimpleText
                      v-model="article.metaKeywords"
                      label="MetaKeywords"
                      name="meta-keywords"
                      required
                      @input="throttledSave"
                    />
                  </v-col>
                  <v-col
                    sm="6"
                    md="6"
                    cols="6"
                  >
                    <DateTimeField
                      ref="simpleDateTime"
                      v-model="article.publicationDateTime"
                      label="Дата и время публикации"
                      @input="throttledSave"
                    />
                  </v-col>
                  <v-col
                    sm="6"
                    md="6"
                    cols="6"
                  >
                    <SimpleTextarea
                      v-model="article.metaDescription"
                      :rows="3"
                      :rules="[$fieldValidator.metaDescriptionMaxLength]"
                      counter="150"
                      label="MetaDescription"
                      name="meta-description"
                      required
                      @input="throttledSave"
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                sm="12"
                md="12"
                cols="12"
                class="px-2"
              >
                <div
                  class="mb-1"
                  style="color: rgba(0,0,0,.6); font-size: 12px"
                >
                  Текст
                </div>
                <SimpleEditor
                  id="articleDescription"
                  v-model="article.text"
                  @input="throttledSave"
                />
              </v-col>
              <v-col
                sm="12"
                md="6"
                cols="12"
              >
                <SearchSelect
                  v-model="article.tags"
                  :items="articleTags"
                  item-text="name"
                  label="Теги"
                  multiple
                  @input="throttledSave"
                />
              </v-col>
              <v-col
                sm="6"
                md="6"
                cols="12"
              >
                <SimpleText
                  v-model="article.author"
                  label="Автор"
                  name="author"
                  required
                  @input="throttledSave"
                />
              </v-col>
              <v-col cols="12">
                <SimpleSwitch
                  v-model="article.isActive"
                  hide-details
                  label="Активна"
                  @change="throttledSave"
                />
              </v-col>
            </v-row>
          </template>
        </AutoSaveBlock>
      </FormValidator>
    </PageBlock>
  </div>
</template>

<script>
import {
  Filter, Get, Post, Put, Simple,
} from 'core-xhr';
import SimpleEditor from '../../components/SimpleEditor';
import urlGenerator from '../../mixins/urlGenerator';

export default {
  name: 'ArticlePage',
  components: { SimpleEditor },
  mixins: [urlGenerator],
  meta: {
    breadcrumb() {
      return this.article.title || 'Добавление';
    },
  },
  async asyncData({ app: { $xhr }, error, route }) {
    const id = parseInt(route.params.id) || null;
    if (!id) {
      return {};
    }

    const data = await $xhr
      .send(
        new Get('article').entity().addFilter(new Filter('id', 'eq', id)),
      )
      .then(response => response.data.data.result)
      .catch(reason => console.error(reason) ^ error(reason.message || reason.error));

    const {
      image, url, title, author, text, views, publicationDateTime, tags, isActive, metaTitle, metaDescription, metaKeywords,
    } = data;
    return {
      id,
      article: {
        image, url, title, author, text, views, publicationDateTime, tags, isActive, metaTitle, metaDescription, metaKeywords,
      },
    };
  },
  data() {
    return {
      id: null,
      article: {
        image: null,
        url: null,
        title: null,
        author: null,
        text: null,
        views: 0,
        publicationDateTime: null,
        tags: null,
        isActive: null,
        metaTitle: null,
        metaDescription: null,
        metaKeywords: null,
      },
      articleTags: [],
      uploadRequest: new Simple(),
      isUrlUnique: null,
    };
  },
  computed: {
    isAddPage() {
      return this.$route.params.id === 'add';
    },
    dialogTitle() {
      return this.isAddPage ? 'Добавление' : 'Редактирование';
    },
    entityRequest() {
      return this.isAddPage ? new Post('article').entity() : new Put('article').entity().addFilter(new Filter('id', 'eq', this.id));
    },
    closeRoute() {
      return { name: 'article' };
    },
  },
  mounted() {
    this.getArticleTags();
  },
  methods: {
    onUploaded(event, throttledSave) {
      throttledSave();
      this.article.image = event.url;
    },
    async getArticleTags() {
      // noinspection JSUnresolvedVariable
      this.articleTags = await this.$xhr.send(
        new Get('tags')
          .collection()
          .setFilter([
            new Filter('deletedAt', 'exists', false),
            new Filter('isActive', 'bool', true),
          ]),
      ).then(res => res.data.data.result).catch(e => this.error(e));
    },
    async checkUniqueValue() {
      const filters = [
        new Filter('url', 'eq', this.article.url),
        new Filter('deletedAt', 'exists', false),
      ];
      const request = new Get('article').setFilter(filters);
      try {
        // noinspection JSUnresolvedVariable
        const data = await this.$xhr.send(request);
        if (!this.isAddPage) {
          if (data.data.data.result.length === 1) {
            if (this.id === data.data.data.result[0].id) {
              this.isUrlUnique = true;
            }
          } else if (data.data.data.result.length === 0) {
            this.isUrlUnique = true;
          }
        } else {
          this.isUrlUnique = data.data.data.result.length === 0;
        }
      } catch (e) { console.error(e); }
    },
    async save(validate) {
      if (!validate()) {
        this.$store.dispatch('snack/error', 'Заполните обязательные поля');
        return;
      }
      await this.checkUniqueValue();

      if (!this.isUrlUnique) {
        this.$store.dispatch('snack/error', 'Страница с таким url уже существует');
        return;
      }

      this.$store.dispatch('snack/notify', 'Подождите...');

      const request = this.entityRequest.setData({ ...this.article });

      // noinspection JSUnresolvedVariable
      this.$xhr
        .send(request)
        .then(() => {
          this.$store.dispatch('snack/notify', 'Сохранено');
          this.$router.push(this.closeRoute);
        })
        .catch(e => {
          console.error(e);
          this.$store.dispatch('snack/error', 'Что-то пошло не так');
        });
    },
    cancel() {
      this.$router.push(this.closeRoute);
    },
  },
};
</script>
