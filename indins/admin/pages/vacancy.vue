<template>
  <div class="fill-height">
    <DynamicListing
      v-show="!$route.params.id"
      :headers="headers"
      :request="request"
      :orders="[{ field: 'id', direction: 'DESC' }]"
      :multiple-search="['url', 'title']"
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
        <AddItem :route="{ name: 'vacancy-id', params:{ id: 'add' } }" />
        <ColumnToggler :headers="heads" />
      </template>
      <template #columns>
        <TextColumn field="url" />
        <TextColumn field="title" />
        <BoolColumn field="isActive" />
        <ActionColumn
          v-slot="{ item }"
          action-column
        >
          <DeleteItem
            :item="item"
            url-key="vacancy"
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
  name: 'Vacancy',
  async validate({ app: { store } }) {
    const accessRoles = ['ROLE_CONTENT'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  meta: {
    breadcrumb: 'Вакансии',
  },
  data() {
    return {
      request: new Get('vacancy'),
      headers: [
        { name: 'Заголовок', field: 'title', space: '200px' },
        { name: 'URL', field: 'url', space: '200px' },
        {
          name: 'Активна', field: 'isActive', space: '100px', grow: false,
        },
        { name: '', field: 'special:listing-actions', space: '150px' },
      ],
    };
  },
  methods: {
    openItem(item) {
      this.$router.push({ name: 'vacancy-id', params: { id: item.id } });
    },
  },
};
</script>
