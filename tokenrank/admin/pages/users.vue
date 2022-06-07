<template>
  <v-layout fill-height>
    <DynamicListing
      :multiple-search="['name', 'surname']"
      query="users"
      :orders="{ createdAt: 'DESC' }"
    >
      <template
        #actions
      >
        <AddItem :route="{ name: 'users-id', params: { id: 'add' } }" />
        <ColumnToggler :headers="tableHeaders" />
      </template>

      <template #default="{ list: visibleList }">
        <TableListing
          v-if="visibleList.length"
          :list="visibleList"
          :headers="tableHeaders"
          name="usersTableListing"
          @item-click="openUserCard($event.item)"
        >
          <template #columns="{ item }">
            <TextColumn
              field="surname"
            />
            <TextColumn
              field="name"
            />
            <TextColumn
              field="patronymic"
            />
            <ListColumn
              field="roles.name"
            />
            <ActionColumn>
              <DeleteItem
                :item="item"
                url-key="user"
                listing-key="Users"
              />
            </ActionColumn>
          </template>
        </TableListing>
      </template>
    </DynamicListing>
    <nuxt-child />
    <DeletePopup
      listing-key="Users"
    />
  </v-layout>
</template>

<script>
// import { ForbiddenError } from '@/utils/ForbiddenError.js';

export default {
  name: 'UsersPage',
  meta: {
    breadcrumb: 'Пользователи',
  },
  // validate({ store }) {
  //   if (store.getters['auth/hasRole'](['GLOBAL_ADMINISTRATOR'])) return true;
  //   throw new ForbiddenError('У вас нет доступа к данной странице');
  // },
  data() {
    return {
      tableHeaders: [
        {
          name: 'Фамилия', field: 'surname', space: 120, minSpace: 70, noSort: true,
        },
        {
          name: 'Имя', field: 'name', space: 100, minSpace: 70, noSort: true,
        },
        {
          name: 'Отчество', field: 'patronymic', space: 120, minSpace: 70, noSort: true,
        },
        {
          name: 'Роли', field: 'roles.name', space: 150, minSpace: 100, noSort: true,
        },
        {
          name: '', field: 'special:listing-actions', space: 80, minSpace: 60, grow: false,
        },
      ],
    };
  },
  head() {
    return {
      title: 'Пользователи',
    };
  },
  methods: {
    openUserCard({ id }) {
      if (id) {
        this.$router.push({ name: 'users-id', params: { id } });
      }
    },
  },
};
</script>
