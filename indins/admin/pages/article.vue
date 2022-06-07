<template>
  <div class="fill-height">
    <DynamicListing
      v-show="!$route.params.id"
      :headers="headers"
      :request="request"
      :orders="[{ field: 'id', direction: 'DESC' }]"
      :multiple-search="['url', 'title', 'author']"
      @item-click="openItem($event)"
    >
      <template #filters>
        <TextFilter
          name="author"
          label="Автор"
          filter-type="like"
        />
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
        <RelationFilter
          name="tags.id"
          entity="tags"
          item-text="name"
          label="Тег"
          filter-type="ineq"
        />
        <DateFilter
          name="publicationDateTime"
          label="Дата публикации"
          range
          filter-type="range"
        />
      </template>
      <template #actions="{ headers: heads }">
        <AddItem :route="{ name: 'article-id', params: { id: 'add' } }" />
        <ColumnToggler :headers="heads" />
      </template>
      <template #columns>
        <TextColumn field="url" />
        <TextColumn field="title" />
        <TextColumn field="author" />
        <BoolColumn field="isActive" />
        <ListColumn field="tags.name" />
        <DateColumn field="publicationDateTime" />
        <ActionColumn
          v-slot="{ item }"
          action-column
        >
          <DeleteItem
            :item="item"
            url-key="article"
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
  name: 'Article',
  async validate({ app: { store } }) {
    const accessRoles = ['ROLE_CONTENT'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  meta: {
    breadcrumb: 'Статьи',
  },
  data() {
    return {
      request: new Get('article'),
      headers: [
        { name: 'URL', field: 'url', space: '200px' },
        { name: 'Заголовок', field: 'title', space: '200px' },
        { name: 'Автор', field: 'author', space: '200px' },
        {
          name: 'Активна', field: 'isActive', space: '100px', grow: false,
        },
        { name: 'Теги', field: 'tags.name', space: '150px' },
        { name: 'Дата публикации', field: 'publicationDateTime', space: '150px' },
        {
          name: '', field: 'special:listing-actions', space: '100px', grow: false,
        },
      ],
    };
  },
  methods: {
    openItem(item) {
      this.$router.push({ name: 'article-id', params: { id: item.id } });
    },
  },
};
</script>
