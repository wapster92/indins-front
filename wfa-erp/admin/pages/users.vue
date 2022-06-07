<template>
  <div class="fill-height">
    <DynamicListing
      :headers="headers"
      :list="list"
      :request="request"
      :multiple-search="['surname', 'name', 'patronymic', 'phone', 'email']"
      filter-type="multiple"
      @item-click="openItem($event)"
    >
      <template v-slot:filters>
        <RelationFilter
          label="Роли"
          entity="roles"
          name="roles.id"
          no-deleted-filter/>
        <BooleanFilter
          :default-value="false"
          name="isBlocked"
          label="Заблокирован"
          filter-type="bool"
          active
        />
      </template>
      <template v-slot:actions="{headers}">
        <AddItem :route="{name: 'users-id', params:{id: 'add'}}"/>
        <ColumnToggler :headers="headers"/>
      </template>
      <template v-slot:columns>
        <TextColumn field="surname"/>
        <TextColumn field="name"/>
        <TextColumn field="patronymic"/>
        <TextColumn field="phone"/>
        <BoolColumn
          field="isBlocked"
          false-text="-"/>
        <ListColumn field="roles.name"/>
        <ActionColumn action-column>
          <template v-slot:default="{item}">
            <DeleteItem
              :item="item"
              url-key="users"/>
          </template>
        </ActionColumn>
      </template>
    </DynamicListing>
    <nuxt-child/>
    <DeletePopup/>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';

export default {
  async validate({ app: { store } }) {
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  meta: {
    breadcrumb: 'Пользователи',
  },
  name: 'Users',
  data: () => ({
    request: new Get('users')
      .collection()
      .addFilter(new Filter({
        field: 'deletedAt',
        filter: 'exists',
        value: false,
        mandatory: true,
      }))
      .pagination(true)
      .count(true)
      .limitStart(0)
      .limitShown(50),
    headers: [
      { name: 'Фамилия', field: 'surname', space: '200px' },
      { name: 'Имя', field: 'name', space: '200px' },
      { name: 'Отчество', field: 'patronymic', space: '200px' },
      { name: 'Телефон', field: 'phone', space: '200px' },
      { name: 'Заблокирован', field: 'isBlocked', space: '200px' },
      { name: 'Роли', field: 'roles.name', space: '200px' },
      { name: '', field: 'special:listing-actions', space: '80px' },
    ],
    list: [],
  }),
  methods: {
    openItem(item) {
      this.$router.push({ name: 'users-id', params: { id: item.id } });
    },
  },
};
</script>
