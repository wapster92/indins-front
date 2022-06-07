<template>
  <FormPopup
    ref="form"
    :value="true"
    :title="dialogTitle"
    :close-route-to="{ name: 'colors' }"
    width="480"
    @click:confirm="save"
  >
    <ColorForm
      ref="itemForm"
      v-model="item"
      @submit="save"
    />
  </FormPopup>
</template>

<script>
import {
  Post, Get, Put, Filter,
} from 'core-xhr';
import ColorForm from '@/components/forms/ColorForm';

export default {
  name: 'ColorPage',
  components: { ColorForm },
  meta: {
    breadcrumb() {
      return this.item.name || 'Добавление';
    },
  },
  async validate({ app: { store } }) {
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  async asyncData({ app: { $xhr }, error, route }) {
    const itemId = parseInt(route.params.id) || null;
    if (!itemId) {
      return {};
    }
    const data = await $xhr
      .send(
        new Get('color').entity().addFilter(new Filter('id', 'eq', itemId)),
      )
      .then(response => response.data.data.result)
      .catch(
        reason => console.error(reason) ^ error(reason.message || reason.error),
      );

    const {
      name,
      code,
    } = data;

    return {
      itemId,
      item: {
        name,
        code,
      },
    };
  },
  data() {
    return {
      itemId: null,
      item: {
        name: null,
        code: null,
      },
    };
  },
  computed: {
    isAddPage() {
      return this.$route.params.id === 'add';
    },
    dialogTitle() {
      return this.isAddPage ? 'Добавить окрас' : 'Редактировать окрас';
    },
    entityRequest() {
      return this.isAddPage
        ? new Post('color').entity()
        : new Put('color')
          .entity()
          .addFilter(new Filter('id', 'eq', this.itemId));
    },
  },
  methods: {
    save() {
      if (!this.$refs.itemForm.validate()) {
        this.$store.dispatch('snack/error', 'Заполните обязательные поля');
        return;
      }
      this.$store.dispatch('snack/notify', 'Подождите...');
      const request = this.entityRequest.setData({ ...this.item });
      this.$xhr
        .send(request)
        .then(() => {
          this.$store.dispatch('snack/notify', 'Сохранено');
          this.$refs.form.close();
        })
        .catch(e => {
          this.$store.dispatch('snack/error', e.message || e.error);
        });
    },
  },
};
</script>

<style lang="stylus" scoped></style>
