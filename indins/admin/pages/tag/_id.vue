<template>
  <FormPopup
    :title="dialogTitle"
    :close-route-to="closeRoute"
    value
    width="500"
    @click:confirm="save($event)"
  >
    <v-row no-gutters>
      <v-col cols="8">
        <SimpleText
          v-model="tag.name"
          label="Название"
          name="name"
          required
        />
      </v-col>
      <v-col cols="4">
        <SimpleSwitch
          v-model="tag.isActive"
          hide-details
          :label="tag.isActive ? 'Активен':'Не активен'"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col
        class="mt-2"
        cols="12"
      >
        <SimpleCheck
          v-model="tag.projectFilter"
          label="Использовать в фильтрах на странице &quot;Портфолио&quot; на сайте"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col
        class="mt-6"
        cols="12"
      >
        <SimpleCheck
          v-model="tag.articleFilter"
          label="Использовать в фильтрах на странице &quot;Статьи&quot; на сайте"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col
        class="mt-6"
        cols="12"
      >
        <SimpleSlider
          v-model="tag.sort"
          max="100"
          min="0"
          label="Сортировка"
          slot-right
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
  name: 'TagPage',
  meta: {
    breadcrumb() {
      return this.tag.name || 'Добавление';
    },
  },
  async asyncData({ app: { $xhr }, error, route }) {
    const id = parseInt(route.params.id) || null;
    if (!id) {
      return {};
    }

    const data = await $xhr
      .send(
        new Get('tag').entity().addFilter(new Filter('id', 'eq', id)),
      )
      .then(response => response.data.data.result)
      .catch(reason => console.error(reason) ^ error(reason.message || reason.error));

    const {
      name, articleFilter, projectFilter, isActive, sort,
    } = data;

    return {
      id,
      tag: {
        name, articleFilter, projectFilter, isActive, sort,
      },
    };
  },
  data() {
    return {
      id: null,
      tag: {},
      uploadRequest: new Simple(),
      valid: false,
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
        ? new Post('tag').entity()
        : new Put('tag')
          .entity()
          .addFilter(new Filter('id', 'eq', this.id));
    },
    closeRoute() {
      return { name: 'tag' };
    },
  },
  methods: {
    async save(isValid) {
      if (!isValid) {
        await this.$store.dispatch('snack/error', 'Заполните обязательные поля');
        return;
      }
      this.$store.dispatch('snack/notify', 'Подождите...');

      const request = this.entityRequest.setData({ ...this.tag });

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
