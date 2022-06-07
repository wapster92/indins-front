<template>
  <div class="fill-height">
    <DynamicListing
      :headers="headers"
      :request="request"
      :multiple-search="['name', 'code']"
      @item-click="openItem($event)"
    >
      <template v-slot:filters/>
      <template v-slot:actions="{headers}">
        <AddItem :route="{name: 'breeds-id', params:{id: 'add'}}"/>
        <ColumnToggler :headers="headers"/>
      </template>
      <template v-slot:columns>
        <TextColumn field="code"/>
        <TextColumn field="name"/>
        <ActionColumn action-column>
          <template v-slot:default="{item}">
            <DeleteItem
              :item="item"
              url-key="breeds"/>
          </template>
        </ActionColumn>
      </template>
    </DynamicListing>
    <nuxt-child/>
    <DeletePopup/>
  </div>
</template>

<script>
import { Get } from 'core-xhr';

export default {
  async validate({ app: { store } }) {
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  meta: {
    breadcrumb: 'Порода',
  },
  name: 'Breeds',
  data: () => ({
    request: new Get('breeds')
      .collection()
      .pagination(true)
      .count(true)
      .limitStart(0)
      .limitShown(50),
    headers: [
      { name: 'Код', field: 'code', space: '200px' },
      { name: 'Название', field: 'name', space: '200px' },
      { name: '', field: 'special:listing-actions', space: '80px' },
    ],
  }),
  methods: {
    openItem(item) {
      this.$router.push({ name: 'breeds-id', params: { id: item.id } });
    },
  },
};
</script>
