<template>
  <v-layout fill-height>
    <template v-if="!isListingPage">
      <DynamicListing
        query="tokens"
        allow-deleted
        :orders="{ createdAt: 'DESC' }"
        :multiple-search="['idName', 'name', 'ticker',]"
      >
        <template
          #actions
        >
          <ColumnToggler :headers="tableHeaders" />
        </template>
        <template #filters />

        <template #default="{ list: visibleList }">
          <TableListing
            :list="visibleList"
            :headers="tableHeaders"
            name="tokensTableListing"
            @item-click="openTokenCard($event.item)"
          >
            <template #columns="{ item }">
              <TextColumn
                field="idName"
              />
              <TextColumn
                field="name"
              />
              <TextColumn
                field="ticker"
              />
              <BoolColumn
                field="visible"
              />
              <BoolColumn
                field="isDeleted"
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
      <DeletePopup
        listing-key="Tokens"
      />
    </template>
    <template v-else>
      <nuxt-child />
    </template>
  </v-layout>
</template>

<script>
// import { ForbiddenError } from '@/utils/ForbiddenError.js';

export default {
  name: 'TokensPage',
  meta: {
    breadcrumb: 'Монеты',
  },
  // validate({ store }) {
  //   if (store.getters['auth/hasRole'](['GLOBAL_ADMINISTRATOR'])) return true;
  //   throw new ForbiddenError('У вас нет доступа к данной странице');
  // },
  data() {
    return {
      tableHeaders: [
        {
          name: 'ID', field: 'idName', space: 120, minSpace: 70, grow: true,
        },
        {
          name: 'Название', field: 'name', space: 200, minSpace: 70, grow: true,
        },
        {
          name: 'Тикер', field: 'ticker', space: 100, minSpace: 70, grow: true,
        },
        {
          name: 'Показывать', field: 'visible', space: 100, minSpace: 70, grow: true,
        },
        {
          name: 'Удалена', field: 'isDeleted', space: 100, minSpace: 70, grow: true,
        },
        {
          name: '', field: 'special:listing-actions', space: 80, minSpace: 60, grow: true,
        },
      ],
    };
  },
  head() {
    return {
      title: 'Монеты',
    };
  },
  computed: {
    isListingPage() {
      return !!this.$route.params.id;
    },
  },
  methods: {
    openTokenCard({ id }) {
      if (id) {
        this.$router.push({ name: 'tokens-id', params: { id } });
      }
    },
  },
};
</script>
