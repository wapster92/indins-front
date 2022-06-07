<template>
  <v-layout
    fill-height
  >
    <DynamicListing
      v-if="isExchangeListing"
      :multiple-search="['name', 'idName']"
      query="exchanges"
    >
      <template
        #actions
      >
        <AddItem :route="{ name: 'exchanges-id', params: { id: 'add' } }" />
        <ColumnToggler :headers="tableHeaders" />
      </template>

      <template #default="{ list: visibleList }">
        <TableListing
          v-if="visibleList.length"
          :list="visibleList"
          :headers="tableHeaders"
          name="exchangesTableListing"
          @item-click="openExchangeCard($event.item)"
        >
          <template #columns="{ item }">
            <TextColumn
              field="idName"
            />
            <TextColumn
              field="name"
            />
            <BoolColumn
              field="visible"
            />
            <ActionColumn>
              <DeleteItem
                :item="item"
                url-key="exchange"
                listing-key="Exchanges"
              />
            </ActionColumn>
          </template>
        </TableListing>
      </template>
    </DynamicListing>
    <nuxt-child />
    <DeletePopup
      listing-key="Exchanges"
    />
  </v-layout>
</template>

<script>
// import { ForbiddenError } from '@/utils/ForbiddenError.js';

export default {
  name: 'ExchangesPage',
  meta: {
    breadcrumb: 'Биржи',
  },
  // validate({ store }) {
  //   if (store.getters['auth/hasRole'](['GLOBAL_ADMINISTRATOR'])) return true;
  //   throw new ForbiddenError('У вас нет доступа к данной странице');
  // },
  data() {
    return {
      tableHeaders: [
        {
          name: 'ID', field: 'idName', space: 120, minSpace: 70, noSort: true,
        },
        {
          name: 'Название', field: 'name', space: 100, minSpace: 70, noSort: true,
        },
        {
          name: 'Показывать', field: 'visible', space: 120, minSpace: 70, noSort: true,
        },
        {
          name: '', field: 'special:listing-actions', space: 80, minSpace: 60, grow: false,
        },
      ],
    };
  },
  head() {
    return {
      title: 'Биржи',
    };
  },
  computed: {
    isExchangeListing() {
      return this.$route.name === 'exchanges';
    },
  },
  methods: {
    openExchangeCard({ id }) {
      if (id) {
        this.$router.push({ name: 'exchanges-id', params: { id } });
      }
    },
  },
};
</script>
