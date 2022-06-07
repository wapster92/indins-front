<template>
  <div class="fill-height">
    <DynamicListing
      :headers="headers"
      :request="request"
      :orders="[{ field: 'id', direction: 'DESC' }]"
      :multiple-search="['username', 'surname', 'name', 'patronymic']"
      @item-click="openItem($event)"
    >
      <template #filters>
        <RelationFilter
          name="roles.keyWord"
          label="Роли"
          entity="roles"
          field-text="name"
          filter-by="keyWord"
        />
        <BooleanFilter
          :default-value="true"
          name="isActive"
          label="Активна"
          active
        />
        <BooleanFilter
          :default-value="false"
          name="deletedAt"
          label="Удалена"
          filter-type="exists"
          active
        />
      </template>
      <template #actions="{ headers: heads }">
        <AddItem :route="{ name: 'users-id', params:{ id: 'add' } }" />
        <ColumnToggler :headers="heads" />
      </template>
      <template #columns>
        <TextColumn field="id" />
        <TextColumn field="username" />
        <TextColumn field="fullName" />
        <ListColumn field="roles.name" />
        <BoolColumn field="isActive" />
        <ActionColumn
          v-slot="{ item }"
          action-column
        >
          <DeleteItem
            v-if="isNotTheSameUser(item)"
            :item="item"
            url-key="users"
          />
        </ActionColumn>
      </template>
    </DynamicListing>
    <nuxt-child />
    <DeletePopup />
  </div>
</template>

<script>
import { Get } from 'core-xhr';

export default {
  name: 'Users',
  async validate({ app: { store } }) {
    const accessRoles = ['ROLE_ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  meta: {
    breadcrumb: 'Пользователи',
  },
  data() {
    return {
      request: new Get('users'),
      headers: [
        { name: 'Логин', field: 'username', space: '200px' },
        { name: 'ФИО', field: 'fullName', space: '200px' },
        { name: 'Роли', field: 'roles.name', space: '200px' },
        {
          name: 'Активна', field: 'isActive', space: '100px', grow: false,
        },
        { name: '', field: 'special:listing-actions', space: '150px' },
      ],
    };
  },
  methods: {
    openItem(item) {
      this.$router.push({ name: 'users-id', params: { id: item.id } });
    },
    isNotTheSameUser(item) {
      return item.id !== this.$store.state.auth.id;
    },
  },
};
</script>
