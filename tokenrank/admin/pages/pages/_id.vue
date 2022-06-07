<template>
  <div class="w-100">
    <FormValidator v-slot="{validate}">
      <v-row no-gutters>
        <v-col md="6">
          <PageBlock title="Основная информация">
            <v-row no-gutters>
              <v-col md="7">
                <TextInput
                  v-model="page.url"
                  label="URL"
                  name="url"
                  required
                  input-type="standart"
                  @input="throttledSave(validate)"
                />
              </v-col>
              <v-col md="5">
                <DateTimeField
                  v-model="page.updatedAt"
                  label="Отредактировано"
                  placeholder="Дата"
                  input-type="standart"
                  readonly
                />
              </v-col>
              <v-col cols="12">
                <TextInput
                  v-model="page.name"
                  label="Title"
                  name="name"
                  required
                  input-type="standart"
                  @input="throttledSave(validate)"
                />
              </v-col>
              <v-col cols="12">
                <TextInput
                  v-model="page.metaTitle"
                  label="Meta Title"
                  name="metaTitle"
                  input-type="standart"
                  @input="throttledSave(validate)"
                />
              </v-col>
              <v-col cols="12">
                <TextInput
                  v-model="page.metaKeywords"
                  label="Meta Keywords"
                  name="metaKeywords"
                  input-type="standart"
                  @input="throttledSave(validate)"
                />
              </v-col>
              <v-col cols="12">
                <TextareaInput
                  v-model="page.metaDescription"
                  label="Meta Description"
                  name="metaDescription"
                  input-type="standart"
                  @input="throttledSave(validate)"
                />
              </v-col>
            </v-row>
          </PageBlock>
        </v-col>
        <v-col md="6">
          <PageBlock
            no-padding
            title="Текстовый редактор"
          >
            <client-only
              :key="key"
              placeholder="Загрузка"
            >
              <SimpleWysiwyg
                v-model="page.description"
              />
            </client-only>
          </PageBlock>
        </v-col>
      </v-row>
    </FormValidator>
  </div>
</template>

<script>

import {
  Filter, Get, Post, Put,
} from 'core-xhr';

async function getPage(xhr, store, pageId) {
  const request = new Get('pages')
    .addFilter(new Filter('id', 'eq', pageId));
  try {
    const response = await xhr.send(request);
    if (!response || !response.data.data.result[0]) return;
    return response.data.data.result[0];
  } catch (e) {
    store.dispatch('snack/error', 'Не удалось получить информацию о странице!');
  }
}

export default {
  name: 'Id',
  components: {

    SimpleWysiwyg: async () => {
      if (process.client) {
        // eslint-disable-next-line no-return-await
        return await import('indify/src/components/subsidiary/SimpleWysiwyg');
      }
    },
  },
  meta: {
    breadcrumb: {
      immediate: false,
      handler({ route }) {
        return route.params.id === 'add' ? 'Новая страница' : this.page.name;
      },
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      ++vm.key;
    });
  },
  async asyncData({ app: { $xhr }, store, params }) {
    if (params.id === 'add') return {};
    const page = await getPage($xhr, store, params.id);
    if (!page) return {};
    return { page };
  },
  data() {
    return {
      page: {
        url: '',
        updatedAt: '',
        name: '',
        metaTitle: '',
        metaKeywords: '',
        metaDescription: '',
        description: '',
      },
      key: 0,
    };
  },
  computed: {
    isAddPage() {
      return this.$route.params.id === 'add';
    },
  },
  methods: {
    throttledSave(validate) {
      this.$store.dispatch('autosaveStore/toggle', {
        isVisible: true,
        confirmHandler: () => this.save(validate),
        rejectHandler: () => this.reject(),
      });
    },
    async save(valid) {
      if (!valid()) return false;
      const request = this.isAddPage
        ? new Post('pages')
        : new Put('pages').addFilter(new Filter('id', 'eq', this.$route.params.id));
      request.setData(this.page);
      try {
        const res = await this.$xhr.send(request);
        if (res.data.success) {
          this.$router.push({ name: 'pages' });
          this.$store.dispatch('snack/info', 'Информация сохранена.');
        }
      } catch (e) {
        this.$showError(e.message || 'Не удалось сохранить информацию!');
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

<style scoped>

</style>
