<template>
  <div class="fill-height">
    <DynamicListing
      :headers="head"
      :request="request"
      :orders="[{field: 'surname', direction: 'DESC'}]"
      :multiple-search="['name', 'username', 'phone']"
      filter-type="multiple"
      @item-click="openItem($event)"
    >
      <template #filters>
        <BooleanFilter
          :default-value="true"
          name="isActive"
          label="Статус"
          true-text="Активен"
          false-text="Не активен"
          active
        />
      </template>
      <template #actions="{headers}">
        <AddItem :route="{name: 'administrators-id', params:{id: 'add'}}" />
        <ColumnToggler :headers="headers" />
      </template>
      <template #columns>
        <TextColumn field="name" />
        <PhoneColumn field="phone" />
        <ListColumn field="roles.name" />
        <BoolColumn
          field="isActive"
          true-text="Активен"
          false-text="Не активен"
        />
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
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  meta: {
    breadcrumb: 'Пользователи',
  },
  data: () => ({
    request: new Get('users')
      .collection()
      .pagination(true)
      .count(true)
      .limitStart(0)
      .limitShown(50),
    head: [
      { name: 'Ф.И.О', field: 'name', space: '200px' },
      { name: 'Телефон', field: 'phone', space: '200px' },
      { name: 'Роли', field: 'roles.name', space: '200px' },
      { name: 'Статус', field: 'isActive', space: '200px' },
    ],
  }),
  methods: {
    openItem(item) {
      this.$router.push({ name: 'administrators-id', params: { id: item.id } });
    },
  },
};
</script>
