<template>
  <v-layout fill-height>
    <!--    TODO добавить пропу для фильтрации по удаленным после обновления indify-->
    <DefaultDictionary
      :headers="tableHeaders"
      :multiple-search="['name', 'surname', 'phone', 'position' ]"
      query="users"
      skip-first-request
      resizable-columns
      allow-deleted
      @item-click="openUserForm($event)"
    >
      <template #actions>
        <AddItem :route="{ name: 'users-id', params: { id: 'add' } }" />
        <ColumnToggler />
      </template>

      <template #filters>
        <RelationFilter
          label="Роль"
          filter-by="id"
          item-text="name"
          name="roles.id"
          query="roles"
        />
        <BooleanFilter
          label="Заблокирован"
          name="isBlocked"
        />
        <BooleanFilter
          :default-value="false"
          label="Удален"
          name="deletedAt"
          filter-type="exists"
          active
        />
      </template>

      <template #columns>
        <TextColumn
          field="surname"
          clickable-group="detail"
        />
        <TextColumn
          field="name"
          clickable-group="detail"
        />
        <TextColumn
          field="patronymic"
          clickable-group="detail"
        />
        <TextColumn field="position" />
        <ListColumn field="roles.name" />
        <TextColumn field="email" />
        <ActionColumn>
          <template #default="{ item }">
            <DeleteItem
              :item="item"
              url-key="user"
              listing-key="Users"
            />
          </template>
        </ActionColumn>
      </template>
    </DefaultDictionary>
    <nuxt-child />
    <DeletePopup
      listing-key="Users"
    />
  </v-layout>
</template>

<script>
import { ForbiddenError } from '@/utils/ForbiddenError';

export default {
  name: 'UsersPage',
  meta: {
    breadcrumb: 'Пользователи',
  },
  validate({ store }) {
    if (store.getters['auth/hasRole']('ADMINISTRATOR')) return true;
    throw new ForbiddenError('У вас нет доступа к данной странице');
    // return store.getters['auth/hasRole']('ADMINISTRATOR');
  },
  data() {
    return {
      tableHeaders: [
        { name: 'Фамилия', field: 'surname' },
        { name: 'Имя', field: 'name' },
        { name: 'Отчество', field: 'patronymic' },
        { name: 'Должность', field: 'position' },
        { name: 'Роли', field: 'roles.name' },
        { name: 'Email', field: 'email', space: 150 },
        {
          name: '', field: 'special:listing-actions', space: 100, minSpace: 100,
        },
      ],
    };
  },
  methods: {
    openUserForm({ item: user }) {
      if (!user) return;
      this.$router.push({
        name: 'users-id',
        params: { id: user.id },
      });
    },
  },
};
</script>
