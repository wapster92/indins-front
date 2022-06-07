<template>
  <div>
    <PopupComponent
      v-model="visible"
      :close-route-to="closeRoute"
      :title="title"
      form-mode
      width="670"
      @click:confirm="saveUser($event)"
    >
      <v-container
        fluid
        class="pa-0"
      >
        <v-row no-gutters>
          <v-col
            v-if="user"
            cols="12"
            sm="4"
            class="user-photo-wrapper"
          >
            <FileUploader
              v-model="user.photo"
              :class="{ 'has-photo': user.photo }"
              class="user-photo-uploader"
              accept="image/jpeg,image/png,image/gif,image/svg+xml,image/webp,image/apng,image/avif"
            />
          </v-col>
          <v-col
            cols="12"
            sm="8"
          >
            <v-row no-gutters>
              <v-col cols="12">
                <TextareaInput
                  v-model="user.surname"
                  label="Фамилия"
                  name="surname"
                  input-type="standart"
                  required
                />
              </v-col>
              <v-col cols="12">
                <TextInput
                  v-model="user.name"
                  label="Имя"
                  name="name"
                  input-type="standart"
                  required
                />
              </v-col>
              <v-col cols="12">
                <TextInput
                  v-model="user.patronymic"
                  label="Отчество"
                  input-type="standart"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <TextInput
              v-model="user.username"
              label="Логин"
              name="login"
              input-type="standart"
              autocomplete="new-password"
              required
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <TextInput
              v-model="user.plainPassword"
              label="Пароль"
              type="password"
              autocomplete="new-password"
              input-type="standart"
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <TextInput
              v-model="user.position"
              label="Должность"
              input-type="standart"
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <TextInput
              v-model="user.phone"
              label="Телефон"
              mode="phone"
              input-type="standart"
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <TextInput
              v-model="user.email"
              label="Почта"
              mode="email"
              input-type="standart"
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <TextInput
              v-model="user.telegramId"
              label="Телеграм ID"
              input-type="standart"
            />
          </v-col>
          <v-col
            cols="12"
            sm="8"
          >
            <SearchSelect
              v-model="user.roles"
              label="Роли"
              placeholder="Менеджер"
              query="roles"
              multiple
              filled-items
              input-type="standart"
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
            class="d-flex align-center"
          >
            <SimpleSwitch
              v-model="user.isBlocked"
              label="Заблокирован"
              input-type="standart"
            />
          </v-col>
        </v-row>
      </v-container>
    </PopupComponent>
    <nuxt-child />
  </div>
</template>

<script>
import {
  Get, Filter, Post, Put,
} from 'core-xhr';

async function getUser(xhr, store, userId) {
  const request = new Get('user')
    .addFilter(new Filter('id', 'eq', userId));
  try {
    const response = await xhr.send(request);
    if (!response || !response.data.data.result[0]) return;
    return response.data.data.result[0];
  } catch (e) {
    store.dispatch('snack/error', 'Не удалось получить информацию о пользователе!');
  }
}

export default {
  name: 'UserPage',
  validate({ store }) { return store.getters['auth/hasRole']('ADMIN'); },
  async asyncData({ app: { $xhr }, store, params }) {
    if (params.id === 'add') return {};
    const user = await getUser($xhr, store, params.id);
    if (!user) return {};
    return { user };
  },
  data() {
    return {
      visible: true,
      user: {
        photo: null,
        name: '',
        surname: '',
        patronymic: '',
        username: '',
        plainPassword: null,
        position: '',
        phone: '',
        email: '',
        telegramId: '',
        roles: [],
        isBlocked: false,
      },
    };
  },
  computed: {
    title() {
      return `${this.isAddPage ? 'Создание' : 'Редактирование'} пользователя`;
    },
    userId() {
      return this.$route.params.id;
    },
    isAddPage() {
      return this.userId === 'add';
    },
    closeRoute() {
      return { name: 'users' };
    },
  },
  // mounted() {
  //   this.getUser();
  // },
  methods: {
    async getUser() {
      if (this.isAddPage) return;
      this.user = await getUser(this.$xhr, this.$showError, this.userId);
    },
    async saveUser(isValid) {
      if (!isValid) return;
      const request = this.isAddPage
        ? new Post('user')
        : new Put('user').addFilter(new Filter('id', 'eq', this.userId));

      const requestData = { ...this.user };
      if (!requestData.plainPassword) delete requestData.plainPassword;
      const toDelete = ['id', 'createdAt', 'deletedAt', 'articles'];
      toDelete.forEach(key => {
        delete requestData[key];
      });
      request.setData(requestData);

      const response = await this.$xhr.send(request)
        .catch(this.$showError('Не удалось сохранить информацию о пользователе!'));
      if (!response) return;

      this.$store.dispatch('snack/info', 'Информация о пользователе сохранена.');
      this.visible = false;
    },
  },
};
</script>

<style lang="stylus">
.user-photo-uploader
  padding: 0 12px 0
  .file-uploader
    padding: 20px
  .file-uploader-text
    text-align: left
  .v-btn__content
    font-size: 15px
    font-weight: 500
  .app-btn.v-btn
    padding: 0 13px!important
  .uploaded-files img
    height: 162px

.user-photo-uploader.has-photo
  display: inline-block
  .file-uploader
    padding: 0

.user-photo-wrapper
  text-align: center
</style>
