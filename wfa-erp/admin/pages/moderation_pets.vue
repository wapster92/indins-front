<template>
  <div class="fill-height">
    <DynamicListing
      :headers="headers"
      :request="request"
      :orders="[{field: 'createdAt', direction: 'DESC'}]"
      :multiple-search="['shelter.name', 'name']"
      filter-type="multiple"
      @item-click="openItem($event)"
    >
      <template v-slot:filters>
        <RelationFilter
          :default-value="{status: 'В ожидании', id: 1}"
          entity="moderation-status"
          no-deleted-filter
          active
          label="Модерация"
          item-text="status"
          name="moderationStatus.id"
        />
        <DateFilter
          range
          label="Дата модерации"
          name="createdAt"/>
      </template>
      <template v-slot:actions="{headers}">
        <ColumnToggler :headers="headers"/>
      </template>
      <template v-slot:columns>
        <DateColumn field="createdAt"/>
        <RelationColumn field="incomingParams.name"/>
        <RelationColumn field="incomingParams.shelter.name"/>
        <RelationColumn field="incomingParams.breed.name"/>
        <RelationColumn field="incomingParams.color.name"/>
        <RelationColumn field="moderationStatus.status"/>
      </template>
    </DynamicListing>
    <nuxt-child/>
    <DeletePopup/>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';

export default {
  name: 'ModerationPets',
  async validate({ app: { store } }) {
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  data: () => ({
    headers: [
      { name: 'Дата заявки', field: 'createdAt', space: '200px' },
      { name: 'Кличка', field: 'incomingParams.name', space: '200px' },
      { name: 'Питомник', field: 'incomingParams.shelter.name', space: '200px' },
      { name: 'Порода', field: 'incomingParams.breed.name', space: '200px' },
      { name: 'Окрас', field: 'incomingParams.color.name', space: '200px' },
      { name: 'Статус модерации', field: 'moderationStatus.status', space: '200px' },
    ],
    request: new Get('moderation-pets')
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
      this.$router.push({ name: 'moderation_pets-id', params: { id: item.id } });
    },
  },
};
</script>
