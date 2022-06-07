<template>
  <div class="fill-height">
    <DynamicListing
      :headers="headers"
      :request="request"
      :orders="[{ field: 'id', direction: 'DESC' }]"
      :multiple-search="['url', 'metaTitle']"
      @item-click="openItem($event)"
    >
      <template #filters>
        <BooleanFilter
          :default-value="false"
          name="deletedAt"
          label="Удалена"
          filter-type="exists"
          active
        />
      </template>
      <template #actions="{ headers: heads }">
        <AddItem :route="{ name: 'meta-id', params: { id: 'add' } }" />
        <ColumnToggler :headers="heads" />
      </template>
      <template #columns>
        <TextColumn field="metaTitle" />
        <TextColumn field="url" />
        <ActionColumn
          v-slot="{ item }"
          action-column
        >
          <DeleteItem
            :item="item"
            url-key="meta"
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
  name: 'Meta',
  async validate({ app: { store } }) {
    const accessRoles = ['ROLE_CONTENT'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  meta: {
    breadcrumb: 'Мета настройки',
  },
  data() {
    return {
      request: new Get('meta'),
      headers: [
        { name: 'MetaTitle', field: 'metaTitle', space: '200px' },
        { name: 'URL', field: 'url', space: '200px' },
        { name: '', field: 'special:listing-actions', space: '150px' },
      ],
    };
  },
  methods: {
    openItem(item) {
      this.$router.push({ name: 'meta-id', params: { id: item.id } });
    },
  },
};
</script>
