<template>
  <FormPopup
    :title="dialogTitle"
    :close-route-to="closeRoute"
    value
    width="768"
    @click:confirm="save($event)"
  >
    <v-row no-gutters>
      <v-col
        sm="6"
        md="6"
        cols="12"
      >
        <SimpleText
          v-model="user.username"
          label="Логин"
          name="login"
          required
          autocomplete="new-password"
        />
      </v-col>
      <v-col
        sm="6"
        md="6"
        cols="12"
      >
        <SimpleText
          v-model="user.plainPassword"
          :required="isAddPage"
          name="plain-password"
          label="Пароль"
          type="password"
          autocomplete="new-password"
        />
      </v-col>
      <v-col
        xs="12"
        sm="4"
        cols="12"
      >
        <!--suppress JSUnresolvedVariable -->
        <SimpleText
          v-model="user.surname"
          :rules="[$fieldValidator.defaultMaxLength]"
          name="surname"
          label="Фамилия"
          required
        />
      </v-col>
      <v-col
        xs="12"
        sm="4"
        cols="12"
      >
        <!--suppress JSUnresolvedVariable -->
        <SimpleText
          v-model="user.name"
          :rules="[$fieldValidator.defaultMaxLength]"
          name="name"
          label="Имя"
          required
        />
      </v-col>
      <v-col
        xs="12"
        sm="4"
        cols="12"
      >
        <!--suppress JSUnresolvedVariable -->
        <SimpleText
          v-model="user.patronymic"
          :rules="[$fieldValidator.defaultMaxLength]"
          label="Отчество"
          name="patronymic"
          required
        />
      </v-col>
      <v-col
        sm="12"
        md="12"
        cols="12"
      >
        <SearchSelect
          v-model="user.roles"
          :request="rolesRequest"
          multiple
          filled-items
          placeholder="Роли"
          name="roles"
          required
        />
      </v-col>
      <v-col
        v-if="!isAddPage"
        sm="12"
        md="12"
        cols="12"
      >
        <SimpleSwitch
          v-model="user.isActive"
          class="mb-0 pb-0 mt-3"
          hide-details
          label="Активна"
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
  name: 'UserPage',
  meta: {
    breadcrumb() {
      return this.user.name || this.user.username || 'Добавление';
    },
  },
  async asyncData({ app: { $xhr }, error, route }) {
    const id = parseInt(route.params.id) || null;
    if (!id) {
      return {};
    }
    const data = await $xhr
      .send(
        new Get('users').entity().addFilter(new Filter('id', 'eq', id)),
      )
      .then(response => response.data.data.result)
      .catch(reason => console.error(reason) ^ error(reason.message || reason.error));

    const {
      name, surname, patronymic, username, plainPassword, roles, isActive,
    } = data;
    return {
      id,
      user: {
        name, surname, patronymic, username, plainPassword, roles, isActive,
      },
    };
  },
  data() {
    return {
      id: null,
      showPassword: false,
      user: {
        username: null,
        plainPassword: null,
        name: null,
        surname: null,
        patronymic: null,
        roles: null,
        isActive: true,
      },
      uploadRequest: new Simple(),
      rolesRequest: new Get('roles'),
      uniqueUsername: null,
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
        ? new Post('users').entity()
        : new Put('users')
          .entity()
          .addFilter(new Filter('id', 'eq', this.id));
    },
    closeRoute() {
      return { name: 'users' };
    },
  },
  methods: {
    async checkUniqueUsername() {
      const filters = [
        new Filter('username', 'eq', this.user.username),
        new Filter('deletedAt', 'exists', false),
      ];
      const request = new Get('users').setFilter(filters);
      try {
        // noinspection JSUnresolvedVariable
        const data = await this.$xhr.send(request);
        if (!this.isAddPage) {
          if (data.data.data.result.length === 1) {
            if (this.id === data.data.data.result[0].id) {
              this.uniqueUsername = true;
            }
          } else if (data.data.data.result.length === 0) {
            this.uniqueUsername = true;
          }
        } else {
          this.uniqueUsername = data.data.data.result.length === 0;
        }
      } catch (e) { console.error(e); }
    },
    async save(isValid) {
      if (!isValid) {
        this.$store.dispatch('snack/error', 'Заполните обязательные поля');
        return;
      }
      await this.checkUniqueUsername();
      if (!this.uniqueUsername) {
        this.$store.dispatch('snack/error', 'Логин существует');
        return;
      }
      this.$store.dispatch('snack/notify', 'Подождите...');
      const request = this.entityRequest.setData(this.user);
      // noinspection JSUnresolvedVariable
      this.$xhr
        .send(request)
        .then(() => {
          this.$store.dispatch('snack/notify', 'Сохранено');
          this.$router.push(this.closeRoute);
        })
        .catch(e => {
          this.$store.dispatch('snack/error', e.message || e.error);
        });
    },
  },
};
</script>
