<template>
  <div class="fill-height">
    <DynamicListing
      v-show="!$route.params.id"
      :headers="headers"
      :request="request"
      :orders="[{ field: 'sort', direction: 'DESC' }]"
      :multiple-search="['url', 'shortName']"
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
          name="isShowOnMain"
          label="На главной"
        />
        <RelationFilter
          name="tags.id"
          entity="tags"
          item-text="name"
          label="Тег"
          filter-type="ineq"
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
        <AddItem :route="{ name: 'project-id', params: { id: 'add' } }" />
        <ColumnToggler :headers="heads" />
      </template>
      <template #columns>
        <TextColumn field="sort" />
        <TextColumn field="shortName" />
        <TextColumn field="url" />
        <BoolColumn field="isShowOnMain" />
        <ListColumn field="tags.name" />
        <BoolColumn field="isActive" />
        <ActionColumn
          v-slot="{ item }"
          action-column
        >
          <DeleteItem
            :item="item"
            url-key="project"
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
  name: 'Project',
  async validate({ app: { store } }) {
    const accessRoles = ['ROLE_CONTENT'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  meta: {
    breadcrumb: 'Портфолио',
  },
  data() {
    return {
      request: new Get('projects'),
      headers: [
        {
          name: 'Приоритет', field: 'sort', space: '100px', grow: false,
        },

        { name: 'Название', field: 'shortName', space: '200px' },
        { name: 'URL', field: 'url', space: '200px' },
        {
          name: 'На главной', field: 'isShowOnMain', space: '140px', grow: false,
        },
        { name: 'Теги', field: 'tags.name', space: '200px' },
        {
          name: 'Активна', field: 'isActive', space: '100px', grow: false,
        },
        { name: '', field: 'special:listing-actions', space: '100px' },
      ],
    };
  },
  methods: {
    openItem(item) {
      this.$router.push({ name: 'project-id', params: { id: item.id } });
    },
  },
};
</script>
