<template>
  <DynamicListing class="listing">
    <TableListing
      name="users-activity"
      :headers="headers"
      :list="list"
      :hide-bottom="true"
    >
      <template #columns>
        <TextColumn
          field="operator"
        />
        <TextColumn field="spam" />
        <TextColumn field="manager" />
        <TextColumn field="сonsultation" />
        <TextColumn field="invice" />
        <TextColumn field="total" />
      </template>
    </TableListing>
  </DynamicListing>
</template>

<script>
export default {
  name: 'AnaliticsTags',
  components: {

  },
  props: {
    items: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      headers: [
        {
          name: 'ФИО', field: 'operator', space: 150, minSpace: 150, noSort: true,
        },
        {
          name: 'Спам', field: 'spam', space: 100, minSpace: 100, noSort: true,
        },
        {
          name: 'На менеджера', field: 'manager', space: 100, minSpace: 100, noSort: true,
        },
        {
          name: 'Консультация', field: 'сonsultation', space: 100, minSpace: 100, noSort: true,
        },
        {
          name: 'Выписан счет', field: 'invice', space: 100, minSpace: 100, noSort: true,
        },
        {
          name: 'Итого', field: 'total', space: 150, minSpace: 150, noSort: true,
        },
      ],
    };
  },
  computed: {
    list() {
      if (this.items.length) {
        const items = this.items.reduce((acc, item) => {
          const tags = this.countTags(item.tags);
          const data = {
            operator: item.operator,
            spam: tags['Спам'] ?? 0,
            manager: tags['На менеджера'] ?? 0,
            сonsultation: tags['Консультация'] ?? 0,
            invice: tags['Выписан счет'] ?? 0,
            total: tags.total ?? 0,
          };
          acc.push(data);
          return acc;
        }, []);
        const total = this.totalCount(items);
        items.push(total);
        return items;
      }
      return [];
    },
  },
  methods: {
    countTags(tags) {
      return tags.reduce((acc, tag) => {
        acc[tag.tag] = tag.count;
        acc.total += Number(tag.count);
        return acc;
      }, { total: 0 });
    },
    totalCount(list) {
      return list.reduce((acc, item) => {
        acc.spam += Number(item?.spam) ?? 0;
        acc.manager += Number(item?.manager) ?? 0;
        acc.сonsultation += Number(item?.сonsultation) ?? 0;
        acc.invice += Number(item?.invice) ?? 0;
        acc.total += Number(item?.total) ?? 0;
        return acc;
      }, {
        operator: 'Итого',
        spam: 0,
        manager: 0,
        сonsultation: 0,
        invice: 0,
        total: 0,
      });
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
