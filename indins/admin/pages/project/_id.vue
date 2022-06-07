<template>
  <div class="item-page fill-height">
    <PageBlock
      :title="dialogTitle || project.tileTitle"
      no-padding
    >
      <FormValidator
        v-slot="{ validate }"
        class="px-2 py-4"
      >
        <AutoSaveBlock
          justify
          sticky
          @save="save(validate)"
        >
          <template #default="{ throttledSave }">
            <v-row no-gutters>
              <v-col
                md="12"
                lg="12"
                cols="12"
              >
                <v-row no-gutters>
                  <v-col
                    sm="4"
                    md="4"
                    cols="12"
                  >
                    <SimpleText
                      v-model="project.tileTitle"
                      label="Заголовок страницы"
                      name="title"
                      required
                      @input="throttledSave"
                    />
                  </v-col>
                  <v-col
                    sm="4"
                    md="4"
                    cols="12"
                  >
                    <SimpleText
                      v-model="project.tileTag"
                      label="Категория"
                      name="category"
                      required
                      @input="throttledSave"
                    />
                  </v-col>

                  <v-col
                    sm="4"
                    md="4"
                    cols="12"
                  >
                    <v-row no-gutters>
                      <v-btn
                        fab
                        small
                        depressed
                        color="info"
                        @click="generateUrl('project', 'tileTitle', 'url')"
                      >
                        <v-icon>
                          loop
                        </v-icon>
                      </v-btn>
                      <SimpleText
                        v-model="project.url"
                        label="URL"
                        name="url"
                        required
                        @input="throttledSave"
                      />
                    </v-row>
                  </v-col>
                  <v-col
                    sm="4"
                    md="4"
                    cols="12"
                  >
                    <SimpleText
                      v-model="project.shortName"
                      label="Название"
                      name="short-name"
                      required
                      @input="throttledSave"
                    />
                  </v-col>
                  <v-col
                    sm="4"
                    md="4"
                    cols="12"
                  >
                    <SimpleText
                      v-model="project.metaTitle"
                      label="MetaTitle"
                      name="meta-title"
                      required
                      @input="throttledSave"
                    />
                  </v-col>
                  <v-col
                    sm="4"
                    md="4"
                    cols="12"
                  >
                    <SimpleText
                      v-model="project.metaKeywords"
                      label="MetaKeywords"
                      name="meta-keywords"
                      required
                      @input="throttledSave"
                    />
                  </v-col>
                  <v-col
                    sm="5"
                    md="5"
                    cols="12"
                  >
                    <v-row no-gutters>
                      <v-col
                        sm="12"
                        md="12"
                        cols="12"
                      >
                        <SimpleText
                          v-model="project.pageTitle"
                          label="Заголовок плитки"
                          name="page-title"
                          required
                          @input="throttledSave"
                        />
                      </v-col>
                      <v-col
                        sm="12"
                        md="12"
                        cols="12"
                      >
                        <SearchSelect
                          v-model="project.tags"
                          :items="projectTags"
                          item-text="name"
                          label="Теги"
                          multiple
                          @input="throttledSave"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col
                    sm="7"
                    md="7"
                    cols="12"
                  >
                    <SimpleTextarea
                      v-model="project.metaDescription"
                      style="padding-top: 25px"
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
                cols="12"
              >
                <SimpleSlider
                  v-model="project.sort"
                  max="1000"
                  min="0"
                  label="Сортировка"
                  slot-right
                  @input="throttledSave"
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col
                sm="6"
                md="4"
                cols="12"
                class="px-2"
              >
                <span class="simple__title">Лого</span>
                <FileUploader
                  :upload-request="uploadRequest"
                  :value="project.logo ? {name: project.tileTitle, url: project.logo} : null"
                  class="mt-1"
                  accept="image/png,image/svg+xml"
                  @onUploaded="onUploaded($event, throttledSave, 'logo')"
                  @onDeleteItem="project.logo = ''"
                />
              </v-col>
              <v-col
                sm="6"
                md="4"
                cols="12"
                class="px-2"
              >
                <span class="simple__title">Превью десктоп версия</span>
                <FileUploader
                  :upload-request="uploadRequest"
                  :value="project.imageDesktop ? {name: project.tileTitle, url: project.imageDesktop} : null"
                  class="mt-1"
                  accept="image/jpeg,image/pjpeg,image/png,image/svg+xml,image/webp"
                  @onUploaded="onUploaded($event, throttledSave, 'imageDesktop')"
                  @onDeleteItem="project.imageDesktop = ''"
                />
              </v-col>
              <v-col
                sm="6"
                md="4"
                cols="12"
                class="px-2"
              >
                <span class="simple__title">Превью mobile</span>
                <FileUploader
                  :upload-request="uploadRequest"
                  :value="project.imageMobile ? {name: project.tileTitle, url: project.imageMobile} : null"
                  class="mt-1"
                  accept="image/jpeg,image/pjpeg,image/png,image/svg+xml,image/webp"
                  @onUploaded="onUploaded($event, throttledSave, 'imageMobile')"
                  @onDeleteItem="project.imageMobile = ''"
                />
              </v-col>
            </v-row>

            <v-row
              v-if="!isAddPage"
              no-gutters
              class="px-2"
            >
              <v-col
                sm="2"
                cols="6"
                class="d-flex align-center justify-center"
              >
                <a
                  :href="`${urlToSite}/portfolio/viewTiles?url=${project.url}`"
                  class="tiles-view app-btn mr-1 v-btn v-btn--outlined theme--light v-size--default"
                  target="_blank"
                >Вид плиток</a>
              </v-col>
              <v-col
                sm="2"
                cols="6"
                class="d-flex align-center justify-center"
              >
                <SimpleSwitch
                  v-model="project.isActive"
                  hide-details
                  label="Активна"
                  @change="throttledSave"
                />
              </v-col>
              <v-col
                sm="2"
                cols="6"
                class="d-flex align-center justify-center"
              >
                <SimpleSwitch
                  v-model="project.isShowOnMain"
                  hide-details
                  label="На главной"
                  @change="throttledSave"
                />
              </v-col>
              <v-col
                sm="6"
                cols="6"
                class="pt-2"
              >
                <SimpleText
                  v-model="project.portFooterUrl"
                  label="Url для перехода на сайт проекта"
                  @input="throttledSave"
                />
              </v-col>
            </v-row>
            <v-row
              no-gutters
              class="px-2"
            >
              <v-col cols="12">
                <span class="simple__title">Описание</span>
                <SimpleEditor
                  v-model="project.description"
                  @input="throttledSave"
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
  name: 'ProjectPage',
  components: { SimpleEditor },
  mixins: [urlGenerator],
  meta: {
    breadcrumb() {
      return this.project.tileTitle || 'Добавление';
    },
  },
  async asyncData({
    app: { $xhr }, error, route,
  }) {
    const id = parseInt(route.params.id) || null;
    if (!id) {
      return {};
    }

    const data = await $xhr
      .send(
        new Get('project').entity().addFilter(new Filter('id', 'eq', id)),
      )
      .then(response => response.data.data.result)
      .catch(reason => console.error(reason) ^ error(reason.message || reason.error));

    return {
      id,
      project: {
        ...data,
      },
    };
  },
  data() {
    return {
      id: null,
      project: {
        sort: 50,
        tags: [],
      },
      projectTags: [],
      uploadRequest: new Simple(),
      valid: false,
      isUrlUnique: null,
      urlToSite: null,
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
      return this.isAddPage
        ? new Post('project').entity()
        : new Put('project')
          .entity()
          .addFilter(new Filter('id', 'eq', this.id));
    },
  },
  mounted() {
    this.getProjectTags();
    // eslint-disable-next-line no-restricted-globals
    this.urlToSite = location.origin;
  },
  methods: {
    onUploaded(event, throttledSave, field) {
      throttledSave();
      this.project[field] = event.url;
    },
    async getProjectTags() {
      // noinspection JSUnresolvedVariable
      this.projectTags = await this.$xhr.send(
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
        new Filter('url', 'eq', this.project.url),
        new Filter('deletedAt', 'exists', false),
      ];
      const request = new Get('project').setFilter(filters);
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

      const request = this.entityRequest.setData({ ...this.project });

      // noinspection JSUnresolvedVariable
      this.$xhr
        .send(request)
        .then(() => {
          this.$store.dispatch('snack/notify', 'Сохранено');
          this.$router.push({ name: 'project' });
        })
        .catch(e => {
          console.error(e);
          this.$store.dispatch('snack/error', 'Что-то пошло не так');
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
  .simple__title
    font-size 16px
    color #00000099
  .tiles-view
    color: rgb(65, 111, 200) !important;
</style>
