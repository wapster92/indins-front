<template>
  <div class="fill-height">
    <DynamicListing
      :headers="headers"
      :request="request"
      :orders="[{ field: 'name', direction: 'DESC' }]"
      @item-click="openItem($event)"
    >
      <template #actions="{ headers: heads }">
        <AddItem :route="{ name: 'calltracking-phones-id', params: { id: 'add' } }" />
        <ColumnToggler :headers="heads" />
      </template>
      <template #filters>
        <TextFilter
          name="virtualPhone"
          label="Виртуальный телефон"
          filter-type="like"
        />
        <TextFilter
          name="referrer"
          label="referrer"
          filter-type="like"
        />
        <TextFilter
          name="URI"
          label="Страница входа"
          filter-type="like"
        />
        <TextFilter
          name="UTMSource"
          label="UTMSource"
          filter-type="like"
        />
        <TextFilter
          name="UTMContent"
          label="UTMContent"
          filter-type="like"
        />
        <TextFilter
          name="UTMMedium"
          label="UTMMedium"
          filter-type="like"
        />
        <TextFilter
          name="UTMCampaign"
          label="UTMCampaign"
          filter-type="like"
        />
        <TextFilter
          name="UTMTerm"
          label="UTMTerm"
          filter-type="like"
        />
        <TextFilter
          name="UTMKeyword"
          label="UTMKeyword"
          filter-type="like"
        />
        <TextFilter
          name="UTMFastLink"
          label="UTMFastLink"
          filter-type="like"
        />
      </template>
      <template #columns>
        <TextColumn field="virtualPhone" />
        <TextColumn field="referrer" />
        <TextColumn field="URI" />
        <TextColumn field="UTMSource" />
        <TextColumn field="UTMContent" />
        <TextColumn field="UTMMedium" />
        <TextColumn field="UTMCampaign" />
        <TextColumn field="UTMTerm" />
        <TextColumn field="UTMKeyword" />
        <TextColumn field="UTMFastLink" />
        <ActionColumn
          v-slot="{ item }"
          action-column
        >
          <DeleteItem
            :item="item"
            url-key="calltracking_phones"
          />
        </ActionColumn>
      </template>
    </DynamicListing>
    <nuxt-child />
    <DeletePopup />
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';

export default {
  name: 'CalltrackingPhones',
  async validate({ app: { store } }) {
    const accessRoles = ['ROLE_APPEAL'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  meta: {
    breadcrumb: 'Телефоны',
  },
  data() {
    return {
      request: new Get('calltracking_phones')
        .addFilter(new Filter('deletedAt', 'exists', false, false, true)),
      headers: [
        { name: 'Виртуальный телефон', field: 'virtualPhone', space: '200px' },
        { name: 'referrer', field: 'referrer', space: '150px' },
        { name: 'Страница входа', field: 'URI', space: '150px' },
        { name: 'UTMSource', field: 'UTMSource', space: '150px' },
        { name: 'UTMContent', field: 'UTMContent', space: '150px' },
        { name: 'UTMMedium', field: 'UTMMedium', space: '150px' },
        { name: 'UTMCampaign', field: 'UTMCampaign', space: '150px' },
        { name: 'UTMTerm', field: 'UTMTerm', space: '150px' },
        { name: 'UTMKeyword', field: 'UTMKeyword', space: '150px' },
        { name: 'UTMFastLink', field: 'UTMFastLink', space: '150px' },
        { name: '', field: 'special:listing-actions', space: '50px' },
      ],
    };
  },
  methods: {
    openItem(item) {
      this.$router.push({ name: 'calltracking-phones-id', params: { id: item.id } });
    },
  },
};
</script>
