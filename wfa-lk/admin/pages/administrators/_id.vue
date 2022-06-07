<template>
  <FormPopup
    ref="form"
    :value="true"
    :title="dialogTitle"
    :close-route-to="{ name: 'administrators' }"
    width="768"
    @click:confirm="save"
  >
    <UserForm
      ref="itemForm"
      v-model="item"
    />
  </FormPopup>
</template>

<script>
import {
  Post, Get, Put, Filter,
} from 'core-xhr';
import UserForm from '@/components/forms/UserForm';

export default {
  name: 'AdministratorPage',
  components: { UserForm },
  meta: {
    breadcrumb() {
      return this.item.name || 'Добавление';
    },
  },
  async validate({ app: { store } }) {
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  async asyncData({ app: { $xhr }, route }) {
    const itemId = parseInt(route.params.id) || null;
    if (!itemId) {
      return {};
    }
    let data = await $xhr
      .send(
        new Get('user').entity().addFilter(new Filter('id', 'eq', itemId)),
      )
      .then(response => response.data.data.result)
      .catch(er => console.error(er));

    if (!data) data = {};

    const {
      surname,
      name,
      patronymic,
      username,
      plainPassword,
      isActive,
      phone,
      roles,
    } = data;

    return {
      itemId,
      item: {
        surname,
        name,
        patronymic,
        username,
        plainPassword,
        isActive,
        phone,
        roles,
      },
    };
  },
  data() {
    return {
      itemId: null,
      item: {
        surname: '',
        name: '',
        patronymic: '',
        username: '',
        plainPassword: '',
        isActive: '',
        phone: '',
        roles: [],
      },
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
        ? new Post('user').entity()
        : new Put('user')
          .entity()
          .addFilter(new Filter('id', 'eq', this.itemId));
    },
  },
  methods: {
    save(...val) {
      if (!val[0]) {
        this.$store.dispatch('snack/error', 'Заполните обязательные поля');
        return;
      }
      this.$store.dispatch('snack/notify', 'Подождите...');
      const request = this.entityRequest.setData({
        ...this.item,
      });
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
