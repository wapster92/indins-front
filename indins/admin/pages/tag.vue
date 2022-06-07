<template>
  <div class="fill-height">
    <DynamicListing
      :headers="headers"
      :request="request"
      :multiple-search="['name']"
      @item-click="openItem($event)"
    >
      <template #filters>
        <!--        <BooleanFilter-->
        <!--          name="isProjectType"-->
        <!--          label="Тип"-->
        <!--          false-text="Статья"-->
        <!--          true-text="Проект"-->
        <!--        />-->
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
        <AddItem :route="{ name: 'tag-id', params:{ id: 'add' } }" />
        <ColumnToggler :headers="heads" />
      </template>
      <template #columns>
        <TextColumn field="name" />
        <BoolColumn
          field="projectFilter"
          true-text="Да"
          false-text="-"
        />
        <BoolColumn
          field="articleFilter"
          true-text="Да"
          false-text="-"
        />
        <BoolColumn field="isActive" />
        <ActionColumn
          v-slot="{ item }"
          action-column
        >
          <DeleteItem
            :item="item"
            url-key="tag"
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
  name: 'Tag',
  async validate({ app: { store } }) {
    const accessRoles = ['ROLE_CONTENT'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  meta: {
    breadcrumb: 'Теги',
  },
  data() {
    return {
      request: new Get('tags'),
      headers: [
        { name: 'Название', field: 'name', space: '200px' },
        {
          name: 'На странице "Проект"',
          field: 'projectFilter',
          space: '250px',
          grow: false,
          noSort: true,
        },
        {
          name: 'На странице "Cтатья"', field: 'articleFilter', space: '250px', grow: false, noSort: true,
        },
        {
          name: 'Активен', field: 'isActive', space: '100px', grow: false, noSort: true,
        },
        { name: '', field: 'special:listing-actions', space: '150px' },
      ],
    };
  },
  methods: {
    openItem(item) {
      this.$router.push({ name: 'tag-id', params: { id: item.id } });
    },
  },
};
</script>
