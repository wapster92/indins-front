<template>
  <div :class="mobile ? '':'fill-height'">
    <FormValidator v-slot="{ validate }">
      <AutoSaveBlock
        v-slot="{ throttledSave }"
        class="fill-height"
        fixed
        @save="save(validate)"
      >
        <div class="fill-height">
          <PageBlock
            :title="metaBlockTitle"
            class="pt-1"
          >
            <div
              class="d-flex"
              :class="mobile ? 'flex-column' : 'flex-row'"
            >
              <SimpleText
                v-model="settingsData.metaTitle"
                label="Заголовок"
                @input="throttledSave"
              />
              <SimpleText
                v-model="settingsData.metaDescription"
                label="Описание"
                @input="throttledSave"
              />
              <SimpleText
                v-model="settingsData.metaKeywords"
                label="Ключевые слова"
                @input="throttledSave"
              />
            </div>
          </PageBlock>
          <v-row class="ma-0">
            <v-col
              cols="12"
              sm="6"
              class="pa-0"
            >
              <PageBlock :title="requireSettingsTitle">
                <div class="d-flex flex-column">
                  <SimpleText
                    v-model="settingsData.phone"
                    label="Основной номер телефона на сайте"
                    required
                    name="phone"
                    @input="throttledSave"
                  />
                  <SimpleText
                    v-model="settingsData.header"
                    label="Заголовок для главной страницы и по умолчанию"
                    required
                    name="header"
                    @input="throttledSave"
                  />
                  <SimpleText
                    v-model="settingsData.email"
                    mode="email"
                    label="E-mail для уведомлений"
                    required
                    name="email"
                    @input="throttledSave"
                  />
                </div>
              </PageBlock>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              class="pa-0"
            >
              <PageBlock :title="socialTitle">
                <SimpleText
                  v-model="settingsData.urlInstagram"
                  label="Ссылка Instagram"
                  @input="throttledSave"
                />
                <SimpleText
                  v-model="settingsData.urlVk"
                  label="Ссылка VK"
                />
                <SimpleText
                  v-model="settingsData.urlFaceBook"
                  label="Ссылка facebook"
                  @input="throttledSave"
                />
                <SimpleText
                  v-model="settingsData.urlYoutube"
                  label="Ссылка YouTube"
                  @input="throttledSave"
                />
                <SimpleText
                  v-model="settingsData.urlOk"
                  label="Ссылка Одноклассники"
                  @input="throttledSave"
                />
              </PageBlock>
            </v-col>
          </v-row>
          <!--          <v-row class="ma-0">
            <v-col
              cols="12"
              sm="6"
              class="pa-0"
            >
              <PageBlock title="Баннер для ПК">
                <FileUploader
                  v-model="settingsData.bannerDesktop"
                  :upload-request="requestFile"
                  required
                  name="bannerDesktop"
                  @input="throttledSave"
                />
              </PageBlock>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              class="pa-0"
            >
              <PageBlock title="Баннер для смартфона">
                <FileUploader
                  v-model="settingsData.bannerSmartphone"
                  :upload-request="requestFile"
                  required
                  name="bannerSmartphone"
                  @input="throttledSave"
                />
              </PageBlock>
            </v-col>
          </v-row>-->
        </div>
      </AutoSaveBlock>
    </FormValidator>
    <nuxt-child />
  </div>
</template>

<script>
import {
  Simple, Get, Put, Filter,
} from 'core-xhr';

export default {
  name: 'Site',
  async validate({ app: { store } }) {
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  async asyncData({ app: { $xhr } }) {
    try {
      const settingsData = await $xhr
        .send(new Get('settings').entity())
        .then(el => el.data.data.result)
        .catch(el => console.error(el));
      return { settingsData };
    } catch (e) {
      console.error(e);
      return {};
    }
  },
  meta: {
    breadcrumb: 'Сайт',
  },
  data() {
    return {
      metaBlockTitle: 'Основные мета теги',
      requireSettingsTitle: 'Основные настройки',
      socialTitle: 'Ссылки на социальные сети',
      requestFile: new Simple(),
    };
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  methods: {
    save(validate) {
      if (!validate()) return this.$store.dispatch('snack/error', 'Заполните обязательные поля!');

      const request = new Put('settings', { ...this.settingsData })
        .entity().addFilter(new Filter('id', 'eq', this.settingsData.id));

      this.$xhr.send(request).catch(err => this.$store.dispatch('snack/error', err));
    },
  },
};
</script>
