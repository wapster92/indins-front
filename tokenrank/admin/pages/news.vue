<template>
  <v-layout fill-height>
    <DynamicListing
      v-if="isNewsListing"
      query="news"
      :multiple-search="['name', 'description']"
      :orders="{ createdAt: 'DESC' }"
    >
      <template
        #actions
      >
        <AddItem :route="{ name: 'news-id', params: { id: 'add' } }" />
        <ColumnToggler :headers="tableHeaders" />
      </template>
      <template #filters>
        <TextFilter
          name="name"
          label="Название"
          filter-type="like"
        />
        <RelationFilter
          label="Биржа"
          name="exchange.id"
          query="exchanges"
        />
        <RelationFilter
          label="Монета"
          name="token.id"
          query="tokens"
        />
        <DateFilter
          label="Дата"
          name="createdAt"
          range
        />
        <BooleanFilter
          label="Проверено"
          name="isChecked"
        />
        <BooleanFilter
          label="Опубликовано"
          name="isPublished"
        />
        <RelationFilter
          label="Пользователь"
          name="user.id"
          query="users"
        />
      </template>

      <template #default="{ list: visibleList }">
        <TableListing
          :list="visibleList"
          :headers="tableHeaders"
          name="newsTableListing"
          @item-click="openNewsCard($event.item)"
        >
          <template #columns="{ item }">
            <TextColumn
              field="name"
            />
            <TextColumn
              field="createdAt"
            />
            <BoolColumn
              field="isChecked"
            />
            <BoolColumn
              field="isPublished"
            />
            <RelationColumn
              field="user.name"
            />
            <ActionColumn>
              <DeleteItem
                :item="item"
                url-key="token"
                listing-key="Tokens"
              />
            </ActionColumn>
          </template>
        </TableListing>
      </template>
    </DynamicListing>
    <nuxt-child />
    <DeletePopup
      listing-key="Tokens"
    />
  </v-layout>
</template>

<script>
// import { ForbiddenError } from '@/utils/ForbiddenError.js';

export default {
  name: 'NewsPage',
  meta: {
    breadcrumb: 'Новости',
  },
  // validate({ store }) {
  //   if (store.getters['auth/hasRole'](['GLOBAL_ADMINISTRATOR'])) return true;
  //   throw new ForbiddenError('У вас нет доступа к данной странице');
  // },
  data() {
    return {
      tableHeaders: [
        {
          name: 'Название', field: 'name', space: 120, minSpace: 70, noSort: true,
        },
        {
          name: 'Дата и время', field: 'createdAt', space: 100, minSpace: 70, noSort: true,
        },
        {
          name: 'Проверено', field: 'isChecked', space: 100, minSpace: 70, noSort: true,
        },
        {
          name: 'Опубликовано', field: 'isPublished', space: 100, minSpace: 70, noSort: true,
        },
        {
          name: 'Пользователь', field: 'user.name', space: 100, minSpace: 70, noSort: true,
        },
        {
          name: '', field: 'special:listing-actions', space: 80, minSpace: 60, grow: false,
        },
      ],
    };
  },
  head() {
    return {
      title: 'Новости',
    };
  },
  computed: {
    isNewsListing() {
      return this.$route.name === 'news';
    },
  },
  methods: {
    openNewsCard({ id }) {
      if (id) {
        this.$router.push({ name: 'news-id', params: { id } });
      }
    },
  },
};
</script>
