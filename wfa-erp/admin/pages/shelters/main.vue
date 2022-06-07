<template>
  <div class="fill-height">
    <DynamicListing
      :headers="headers"
      :request="request"
      :multiple-search="['name', 'owner', 'phone', 'translatedName']"
      @item-click="openItem($event)"
    >
      <template v-slot:filters>
        <BooleanFilter
          :default-value="false"
          name="isBlocked"
          label="Блокирован"
          filter-type="bool"
          active
        />
      </template>
      <template v-slot:actions="{headers}">
        <AddItem :route="{name: 'shelters-id', params:{id: 'add'}}"/>
        <ColumnToggler :headers="headers"/>
      </template>
      <template v-slot:columns>
        <TextColumn field="translatedName"/>
        <TextColumn field="name"/>
        <TextColumn field="number"/>
        <TextColumn field="owner"/>
        <TextColumn field="phone"/>
        <BoolColumn
          field="isBlocked"
          false-text="-"/>
        <ActionColumn action-column>
          <template v-slot:default="{item}">
            <DeleteItem
              :item="item"
              url-key="shelters"/>
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
  name: 'Shelters',
  data: () => ({
    request: new Get('shelters')
      .addFilter(new Filter({
        field: 'deletedAt',
        filter: 'exists',
        value: false,
        mandatory: true,
      }))
      .collection()
      .pagination(true)
      .count(true)
      .limitStart(0)
      .limitShown(50),
    headers: [
      { name: 'Название на англ.', field: 'translatedName', space: '200px' },
      { name: 'Название', field: 'name', space: '200px' },
      { name: 'Регистрационный номер', field: 'number', space: '200px' },
      { name: 'ФИО владельца', field: 'owner', space: '200px' },
      { name: 'Телефон владельца', field: 'phone', space: '200px' },
      { name: 'Блокирован', field: 'isBlocked', space: '200px' },
      { name: '', field: 'special:listing-actions', space: '80px' },
    ],
  }),
  methods: {
    openItem(item) {
      this.$router.push({ name: 'shelters-id', params: { id: item.id } });
    },
  },
};
</script>
