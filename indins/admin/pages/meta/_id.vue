<template>
  <FormPopup
    :title="dialogTitle"
    :close-route-to="closeRoute"
    value
    width="768"
    @click:confirm="save($event)"
  >
    <v-row no-gutters>
      <v-col cols="12">
        <SimpleText
          v-model="page.url"
          label="URL"
          name="url"
          required
        />
      </v-col>
      <v-col
        sm="6"
        md="6"
        cols="12"
      >
        <SimpleText
          v-model="page.metaTitle"
          label="MetaTitle"
          name="meta-title"
          required
        />
      </v-col>
      <v-col
        sm="6"
        md="6"
        cols="12"
      >
        <SimpleTextarea
          v-model="page.metaKeywords"
          label="MetaKeywords"
          name="meta-keywords"
          required
        />
      </v-col>
      <v-col cols="12">
        <SimpleText
          v-model="page.metaDescription"
          :rules="[$fieldValidator.metaDescriptionMaxLength]"
          counter="180"
          label="MetaDescription"
          name="meta-description"
          required
        />
      </v-col>
    </v-row>
  </FormPopup>
</template>

<script>
import {
  Post, Get, Put, Filter, Simple,
} from 'core-xhr';

export default {
  name: 'MetaPage',
  meta: {
    breadcrumb() {
      return this.page.url || 'Добавление';
    },
  },
  async asyncData({ app: { $xhr }, error, route }) {
    const id = parseInt(route.params.id) || null;
    if (!id) {
      return {};
    }
    const data = await $xhr
      .send(
        new Get('meta').entity().addFilter(new Filter('id', 'eq', id)),
      )
      .then(response => response.data.data.result)
      .catch(reason => console.error(reason) ^ error(reason.message || reason.error));

    const {
      url, metaTitle, metaDescription, metaKeywords,
    } = data;

    return {
      id,
      page: {
        url, metaTitle, metaDescription, metaKeywords,
      },
    };
  },
  data() {
    return {
      id: null,
      page: {
        url: null,
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
      return this.isAddPage
        ? new Post('meta').entity()
        : new Put('meta')
          .entity()
          .addFilter(new Filter('id', 'eq', this.id));
    },
    closeRoute() {
      return { name: 'meta' };
    },
  },
  methods: {
    async checkUniqueValue() {
      const filters = [
        new Filter('url', 'eq', this.page.url),
        new Filter('deletedAt', 'exists', false),
      ];
      const request = new Get('meta').setFilter(filters);
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
    async save(isValid) {
      if (!isValid) {
        this.$store.dispatch('snack/error', 'Заполните обязательные поля');
        return;
      }
      await this.checkUniqueValue();

      if (!this.isUrlUnique) {
        this.$store.dispatch('snack/error', 'Страница с таким url уже существует');
        return;
      }

      this.$store.dispatch('snack/notify', 'Подождите...');

      const request = this.entityRequest.setData({ ...this.page });

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
  },
};
</script>
