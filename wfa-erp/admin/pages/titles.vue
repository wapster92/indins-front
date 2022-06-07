<template>
  <div class="fill-height">
    <DynamicListing
      :headers="headers"
      :list="list"
      :request="request"
      :multiple-search="['name', 'translatedName']"
      @item-click="openItem($event)"
    >
      <template v-slot:filters/>
      <template v-slot:actions="{headers}">
        <AddItem :route="{name: 'titles-id', params:{id: 'add'}}"/>
        <ColumnToggler :headers="headers"/>
      </template>
      <template v-slot:columns>
        <TextColumn field="shortName"/>
        <TextColumn field="name"/>
        <TextColumn field="translatedName"/>
        <ActionColumn action-column>
          <template v-slot:default="{item}">
            <DeleteItem
              :item="item"
              url-key="titles"/>
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
    breadcrumb: 'Список титулов',
  },
  name: 'Titles',
  data: () => ({
    request: new Get('titles')
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
      { name: 'Код', field: 'shortName', space: '200px' },
      { name: 'Название', field: 'name', space: '200px' },
      { name: 'Название (eng)', field: 'translatedName', space: '200px' },
      { name: '', field: 'special:listing-actions', space: '80px' },
    ],
    list: [],
  }),
  methods: {
    openItem(item) {
      this.$router.push({ name: 'titles-id', params: { id: item.id } });
    },
  },
};
</script>
