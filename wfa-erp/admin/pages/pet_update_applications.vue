<template>
  <div class="fill-height">
    <DynamicListing
      :headers="headers"
      :request="request"
      :orders="[{field: 'createdAt', direction: 'DESC'}]"
      :multiple-search="['pet.shelter.name', 'pet.name']"
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
        <RelationColumn field="pet.shelter.name"/>
        <RelationColumn field="pet.name"/>
        <RelationColumn field="moderationStatus.status"/>
      </template>
    </DynamicListing>
    <NuxtChild/>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';

export default {
  async validate({ store }) {
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  meta: {
    breadcrumb: 'Заявки на редактирование',
  },
  name: 'EditApplications',
  data() {
    return {
      request: new Get('applications')
        .collection()
        .addFilter(new Filter({
          field: 'deletedAt',
          filter: 'exists',
          value: false,
          mandatory: true,
        })),
      headers: [
        { name: 'Дата заявки', field: 'createdAt', space: '200px' },
        { name: 'Питомник', field: 'pet.shelter.name', space: '200px' },
        { name: 'Кличка', field: 'pet.name', space: '200px' },
        { name: 'Статус', field: 'moderationStatus.status', space: '200px' },
      ],
    };
  },
  methods: {
    openItem({ id }) {
      this.$router.push({ name: 'pet_update_applications-id', params: { id } });
    },
  },
};
</script>
