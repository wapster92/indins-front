<template>
  <DynamicListing class="listing">
    <TableListing
      name="users-activity"
      :headers="headers"
      :list="items"
      :hide-bottom="true"
    >
      <template #columns>
        <TextColumn
          field="fullName"
          label="ФИО"
        />
        <SlotColumn field="inComings">
          <template #default="{item}">
            <CallsColumn :calls="item.inComings" />
          </template>
        </SlotColumn>
        <SlotColumn field="outGoings">
          <template #default="{item}">
            <CallsColumn :calls="item.outGoings" />
          </template>
        </SlotColumn>
        <!--        <TextColumn field="onlineOrders" />-->
        <SlotColumn field="onlineOrders">
          <template #default="{item}">
            <CallsColumn :calls="item.onlineOrders" />
          </template>
        </SlotColumn>
        <TextColumn field="siteRequisition" />
      </template>
    </TableListing>
  </DynamicListing>
</template>

<script>
import CallsColumn from '~/components/slotColumns/CallsColumn';

export default {
  name: 'UserActivity',
  components: {
    CallsColumn,
  },
  props: {
    list: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      headers: [
        {
          name: 'ФИО', field: 'fullName', space: 150, minSpace: 150, noSort: true,
        },
        {
          name: 'Входящие', field: 'inComings', space: 100, minSpace: 100, noSort: true,
        },
        {
          name: 'Исходящие', field: 'outGoings', space: 100, minSpace: 100, noSort: true,
        },
        {
          name: 'Онлайн заказы', field: 'onlineOrders', space: 100, minSpace: 100, noSort: true,
        },
        {
          name: 'Заявки с сайта', field: 'siteRequisition', space: 100, minSpace: 100, noSort: true,
        },
      ],
    };
  },
  computed: {
    items() {
      const total = this.list.reduce((acc, item) => {
        acc.inComings += item.inComings[2] ?? 0;
        acc.outGoings += item.outGoings[2] ?? 0;
        acc.onlineOrders += Number(item.onlineOrders[2]) ?? 0;
        acc.siteRequisition += item.siteRequisition ?? 0;
        return acc;
      }, {
        fullName: 'Итого',
        inComings: 0,
        outGoings: 0,
        onlineOrders: 0,
        siteRequisition: 0,
      });
      const result = [...this.list];
      result.push(total);
      return result;
    },
  },
};
</script>

<style lang="stylus" scoped>
.listing-wrapper
  background: transparent
.table-listing
  padding-left: 0
  background: transparent
.listing
  >>>
  .table-listing
    margin: 0
    border: none;
    .table-row
      &:last-child
        border-bottom: none;
</style>
