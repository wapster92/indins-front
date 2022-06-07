<template>
  <div class="fill-height">
    <DefaultDictionary
      :massive-actions="false"
      :headers="tableHeaders"
      :multiple-search="['name']"
      query="filters"
      allow-deleted
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
        <AddItem :route="{ name: 'filters-id', params: { id: 'add' } }" />
        <ColumnToggler :headers="tableHeaders" />
      </template>
      <template #columns>
        <TextColumn
          field="name"
        />
        <TextColumn
          field="rl"
          empty="0"
        />
        <TextColumn
          field="rh"
          empty="0"
        />
        <TextColumn
          field="pdl"
          empty="0"
        />
        <TextColumn
          field="pdh"
          empty="0"
        />
        <TextColumn
          field="pwl"
          empty="0"
        />
        <TextColumn
          field="pwh"
          empty="0"
        />
        <TextColumn
          field="pml"
          empty="0"
        />
        <TextColumn
          field="pmh"
          empty="0"
        />
      </template>
    </DefaultDictionary>
    <DeletePopup listing-key="Pages" />
    <nuxt-child />
  </div>
</template>

<script>

export default {
  name: 'Filters',
  validate({ store }) { return store.getters['auth/hasRole']('ADMIN'); },
  meta: {
    breadcrumb: 'Фильтры',
  },
  data() {
    return {
      tableHeaders: [
        {
          name: 'Название', field: 'name', space: 300, minSpace: 200,
        },
        {
          name: 'Rmin', field: 'rl', space: 100, minSpace: 100,
        },
        {
          name: 'Rmax', field: 'rh', space: 100, minSpace: 100,
        },
        {
          name: 'Dmin', field: 'pdl', space: 100, minSpace: 100,
        },
        {
          name: 'Dmax', field: 'pdh', space: 100, minSpace: 100,
        },

        {
          name: 'Wmin', field: 'pwl', space: 100, minSpace: 100,
        },
        {
          name: 'Wmax', field: 'pwh', space: 100, minSpace: 100,
        },
        {
          name: 'Mmin', field: 'pml', space: 100, minSpace: 100,
        },
        {
          name: 'Mmax', field: 'pmh', space: 100, minSpace: 100,
        },
      ],
    };
  },
  head() {
    return {
      title: 'Фильтры',
    };
  },
  computed: {

  },
  methods: {
    openItem({ item }) {
      this.$router.push({
        name: 'filters-id',
        params: { id: item.id },
      });
    },
  },
};
</script>
