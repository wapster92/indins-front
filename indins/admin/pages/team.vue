<template>
  <div class="fill-height">
    <DynamicListing
      :headers="headers"
      :request="request"
      :orders="[{ field: 'id', direction: 'DESC' }]"
      :multiple-search="['name', 'position']"
      @item-click="openItem($event)"
    >
      <template #filters>
        <BooleanFilter
          default-value
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
        <AddItem :route="{ name: 'team-id', params: { id: 'add' } }" />
        <ColumnToggler :headers="heads" />
      </template>
      <template #columns>
        <TextColumn field="name" />
        <TextColumn field="position" />
        <BoolColumn field="isActive" />
        <ActionColumn
          v-slot="{ item }"
          action-column
        >
          <DeleteItem
            :item="item"
            url-key="team"
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
  name: 'Team',
  async validate({ app: { store } }) {
    const accessRoles = ['ROLE_CONTENT'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  meta: {
    breadcrumb: 'Команда',
  },
  data() {
    return {
      request: new Get('team'),
      headers: [
        { name: 'ФИО', field: 'name', space: '200px' },
        { name: 'Должность', field: 'position', space: '200px' },
        {
          name: 'Активна', field: 'isActive', space: '100px', grow: false,
        },
        { name: '', field: 'special:listing-actions', space: '150px' },
      ],
    };
  },
  methods: {
    openItem(item) {
      this.$router.push({ name: 'team-id', params: { id: item.id } });
    },
  },
};
</script>
