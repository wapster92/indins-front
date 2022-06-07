<template>
  <div class="fill-height">
    <DynamicListing
      :headers="headers"
      :list="list"
      :request="request"
      :multiple-search="['name', 'head', 'phone']"
      @item-click="openItem($event)"
    >
      <template v-slot:filters>
        <BooleanFilter
          :default-value="false"
          name="isBlocked"
          label="Блокирован"
          filter-type="bool"
          active
        />
      </template>
      <template v-slot:actions="{headers}">
        <AddItem :route="{name: 'clubs-id', params:{id: 'add'}}"/>
        <ColumnToggler :headers="headers"/>
      </template>
      <template v-slot:columns>
        <TextColumn field="name"/>
        <TextColumn field="head"/>
        <TextColumn field="phone"/>
        <BoolColumn
          field="isBlocked"
          false-text="-"/>
        <ActionColumn action-column>
          <template v-slot:default="{item}">
            <RemoveRestoreButton :item="item" @click="blockedClub(item.id, item.isBlocked)"/>
          </template>
        </ActionColumn>
      </template>
    </DynamicListing>
    <nuxt-child/>
    <DeletePopup/>
  </div>
</template>

<script>
import { Get, Put, Filter } from 'core-xhr';
import RemoveRestoreButton from '@/components/buttons/RemoveRestoreButton';

export default {
  name: 'Clubs',
  components: {
    RemoveRestoreButton,
  },
  async validate({ app: { store } }) {
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  data: () => ({
    request: new Get('clubs')
      .collection()
      .pagination(true)
      .count(true)
      .limitStart(0)
      .limitShown(50),
    headers: [
      { name: 'Название', field: 'name', space: '200px' },
      { name: 'Президент (ФИО)', field: 'head', space: '200px' },
      { name: 'Телефон', field: 'phone', space: '200px' },
      { name: 'Блокирован', field: 'isBlocked', space: '200px' },
      { name: '', field: 'special:listing-actions', space: '80px' },
    ],
    list: [],
  }),
  methods: {
    openItem(item) {
      this.$router.push({ name: 'clubs-id', params: { id: item.id } });
    },
    blockedClub(id, value) {
      this.$xhr.send(new Put('club').entity().addFilter(new Filter('id', 'ed', id)).setData({ isBlocked: !value }));
    },
  },
};
</script>
