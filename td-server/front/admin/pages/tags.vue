<template>
  <div class="fill-height">
    <DefaultDictionary
      query="tags"
      :headers="tableHeaders"
      :multiple-search="['title']"
      @item-click="openModalEdit"
    >
      <template #actions>
        <AddItem />
      </template>
      <template #columns>
        <ChipColumn
          field="title"
          color-field="color"
        />
      </template>
    </DefaultDictionary>
    <NuxtChild />
  </div>
</template>

<script>
import { ForbiddenError } from '../utils/ForbiddenError';

export default {
  name: 'Tags',
  validate({ store }) {
    if (store.getters['auth/hasRole']('ADMINISTRATOR')) return true;
    throw new ForbiddenError('У вас нет доступа к данной странице');
  },
  meta: {
    breadcrumb: 'Справочник тэгов',
  },
  data() {
    return {
      tableHeaders: [
        {
          name: 'Наименование', field: 'title', space: 400, minSpace: 400,
        },
      ],
    };
  },
  methods: {
    openModalEdit(item) {
      this.$router.push({ name: 'tags-id', params: { id: item.item.id } });
    },
  },
};
</script>
