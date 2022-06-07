<template>
  <div class="item-page fill-height">
    <PageBlock>
      <FormValidator v-slot="{ validate }">
        <AutoSaveBlock
          v-slot="{ throttledSave }"
          justify
          sticky
          @save="save(validate)"
        >
          <div class="title">
            {{ dialogTitle }} {{ vacancy.title }}
          </div>
          <v-row no-gutters>
            <v-col
              sm="12"
              md="4"
              cols="12"
            >
              <FileUploader
                :upload-request="uploadRequest"
                :value="vacancy.image ? {name: vacancy.title, url: vacancy.image} : null"
                class="mt-4"
                accept="image/jpeg,image/pjpeg,image/png,image/svg+xml,image/webp"
                name="vacancy-image"
                required
                @onUploaded="onUploaded($event, throttledSave)"
                @onDeleteItem="vacancy.image = ''"
              />
            </v-col>
            <v-col
              sm="12"
              md="8"
              cols="12"
            >
              <v-row
                class="pl-2"
                no-gutters
              >
                <v-col
                  sm="6"
                  md="6"
                  cols="12"
                >
                  <SimpleText
                    v-model="vacancy.title"
                    label="Заголовок"
                    name="title"
                    required
                    @keyup.native="generateUrl('vacancy', 'title', 'url')"
                    @input="throttledSave"
                  />
                </v-col>
                <v-col
                  sm="6"
                  md="6"
                  cols="12"
                >
                  <SimpleText
                    v-model="vacancy.url"
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
                    v-model="vacancy.metaTitle"
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
                    v-model="vacancy.metaKeywords"
                    label="MetaKeywords"
                    name="meta-keywords"
                    required
                    @input="throttledSave"
                  />
                </v-col>
                <v-col
                  sm="12"
                  md="12"
                  cols="12"
                >
                  <SimpleTextarea
                    v-model="vacancy.metaDescription"
                    :rows="3"
                    :rules="[$fieldValidator.metaDescriptionMaxLength]"
                    counter="158"
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
            >
              <div
                class="mb-1"
                style="color: rgba(0,0,0,.6); font-size: 12px"
              >
                Описание
              </div>
              <SimpleEditor
                id="vacancyDescription"
                v-model="vacancy.description"
                @input="throttledSave"
              />
            </v-col>
            <SimpleSwitch
              v-model="vacancy.isActive"
              class="mb-0 pb-0"
              hide-details
              label="Активна"
              @change="throttledSave"
            />
          </v-row>
        </AutoSaveBlock>
      </FormValidator>
    </PageBlock>
  </div>
</template>

<script>
import {
  Post, Get, Put, Filter, Simple,
} from 'core-xhr';
import SimpleEditor from '../../components/SimpleEditor';
import urlGenerator from '../../mixins/urlGenerator';

const descriptionDefault = `<p>Описание вакансии</p><p>&nbsp;</p><h2 style="text-align: center;">Необходимо:</h2>
                      <p>&nbsp;</p><p>Описание нобходимого</p><p>&nbsp;</p>
                      <h2 style="text-align: center;">Также важно:</h2>
                      <p>&nbsp;</p><p>Описание важного</p><p>&nbsp;</p>
                      <h2 style="text-align: center;">Будет здорово, если вы:</h2><p>&nbsp;</p>
                      <p>Описание дополнительных плюсов</p>
                      <p>&nbsp;</p><p>&nbsp;</p><h2 style="text-align: center;">Наш подход:</h2>
                      <p>&nbsp;</p><p>Описание подхода</p>
                      <p>&nbsp;</p><h2 style="text-align: center;">Условия:</h2><p>&nbsp;</p>
                      <p>Описание условий</p><p>&nbsp;</p>
                      <h2 style="text-align: center;">Офис и рабочее место:</h2><p>&nbsp;</p><p>Описание офиса и рабочего места</p>`;

export default {
  name: 'VacancyPage',
  components: { SimpleEditor },
  mixins: [urlGenerator],
  meta: {
    breadcrumb() {
      return this.vacancy.title || 'Добавление';
    },
  },
  async asyncData({ app: { $xhr }, error, route }) {
    const id = parseInt(route.params.id) || null;
    if (!id) {
      return {};
    }
    const data = await $xhr
      .send(
        new Get('vacancy').entity().addFilter(new Filter('id', 'eq', id)),
      )
      .then(response => response.data.data.result)
      .catch(reason => console.error(reason) ^ error(reason.message || reason.error));

    const {
      image, url, title, description, responsibility, bun, conditions, isActive, metaTitle, metaDescription, metaKeywords,
    } = data;
    return {
      id,
      vacancy: {
        image, url, title, description, responsibility, bun, conditions, isActive, metaTitle, metaDescription, metaKeywords,
      },
    };
  },
  data() {
    return {
      id: null,
      vacancy: {
        image: null,
        url: null,
        title: null,
        description: descriptionDefault,
        responsibility: null,
        bun: null,
        conditions: null,
        isActive: null,
        metaTitle: null,
        metaDescription: null,
        metaKeywords: null,
      },
      uploadRequest: new Simple(),
      valid: false,
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
      return this.isAddPage ? new Post('vacancy').entity() : new Put('vacancy').entity().addFilter(new Filter('id', 'eq', this.id));
    },
  },
  methods: {
    onUploaded(event, throttledSave) {
      throttledSave();
      this.vacancy.image = event.url;
    },
    async checkUniqueValue() {
      const filters = [
        new Filter('url', 'eq', this.vacancy.url),
        new Filter('deletedAt', 'exists', false),
      ];
      const request = new Get('vacancy').setFilter(filters);
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

      const request = this.entityRequest.setData({ ...this.vacancy });

      this.$xhr
        .send(request)
        .then(() => {
          this.$store.dispatch('snack/notify', 'Сохранено');
          this.$router.push('/vacancy');
        })
        .catch(e => {
          console.error(e);
          this.$store.dispatch('snack/error', 'Что-то пошло не так');
        });
    },
  },
};
</script>
