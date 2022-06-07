<template>
  <div class="fill-height">
    <template v-if="!isListingPage">
      <DefaultDictionary
        :massive-actions="false"
        :headers="tableHeaders"
        :multiple-search="['name']"
        query="pages"
        @item-click="openItem($event)"
      >
        <template #filters>
          <TextFilter
            name="name"
            label="Наименование"
            filter-type="like"
          />
        </template>
        <template #actions>
          <AddItem :route="{ name: 'pages-id', params: { id: 'add' } }" />
          <ColumnToggler :headers="tableHeaders" />
        </template>
        <template #columns>
          <TextColumn
            field="name"
          />
          <TextColumn
            field="url"
          />
          <DateColumn field="updatedAt" />
          <ActionColumn v-slot="{ item }">
            <DeleteItem
              :item="item"
              url-key="pages"
              listing-key="Pages"
            />
          </ActionColumn>
        </template>
      </DefaultDictionary>
      <DeletePopup listing-key="Pages" />
    </template>
    <template v-else>
      <nuxt-child />
    </template>
  </div>
</template>

<script>

export default {
  name: 'Pages',
  validate({ store }) { return store.getters['auth/hasRole']('ADMIN'); },
  meta: {
    breadcrumb: 'Страницы',
  },
  data() {
    return {
      tableHeaders: [
        {
          name: 'Название', field: 'name', space: 200, minSpace: 200,
        },
        {
          name: 'URL', field: 'url', space: 200, minSpace: 200,
        },
        {
          name: 'Отредактировано', field: 'updatedAt', space: 200, minSpace: 200,
        },
        {
          name: '', field: 'special:listing-actions', space: 70, minSpace: 70,
        },
      ],
    };
  },
  head() {
    return {
      title: 'Страницы',
    };
  },
  computed: {
    isListingPage() {
      return !!this.$route.params.id;
    },
  },
  methods: {
    openItem({ item }) {
      this.$router.push({
        name: 'pages-id',
        params: { id: item.id },
      });
    },
  },
};
</script>
