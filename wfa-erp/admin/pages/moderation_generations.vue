<template>
  <div class="fill-height">
    <DynamicListing
      v-show="!$route.params.id"
      :headers="headers"
      :request="request"
      :orders="[{field: 'createdAt', direction: 'DESC'}]"
      :multiple-search="['pets.shelter.name', 'pets.letter']"
      filter-type="multiple"
      @item-click="openItem($event)"
    >
      <template v-slot:actions="{headers}">
        <ColumnToggler :headers="headers"/>
      </template>
      <template v-slot:columns>
        <DateColumn field="createdAt"/>
        <RelationColumn field="incomingParams.letter"/>
        <RelationColumn field="incomingParams.shelter.name"/>
      </template>
    </DynamicListing>
    <nuxt-child/>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';

export default {
  name: 'ModerationLitter',
  async validate({ app: { store } }) {
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  data: () => ({
    headers: [
      { name: 'Дата заявки', field: 'createdAt', space: '200px' },
      { name: 'Буква помета', field: 'incomingParams.letter', space: '200px' },
      { name: 'Питомник', field: 'incomingParams.shelter.name', space: '200px' },
    ],
    request: new Get('moderation-generations')
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
  }),
  methods: {
    openItem(item) {
      this.$router.push({ name: 'moderation_generations-id', params: { id: item.id } });
    },
  },
};
</script>
