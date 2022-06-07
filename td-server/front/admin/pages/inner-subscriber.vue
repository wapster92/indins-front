<template>
  <div class="fill-height">
    <DefaultDictionary
      :headers="tableHeaders"
      query="work-places"
      :multiple-search="['name']"
      class="subscriber-grid"
    >
      <template #filters>
        <BooleanFilter
          label="Заблокирован"
          name="isBlocked"
          active
        />
      </template>
      <template #columns="{ item }">
        <TextColumn field="name" />
        <BoolColumn field="isBlocked" />
        <ActionColumn>
          <ClickAction
            :icon="item.isBlocked ? 'lock_open' : 'lock'"
            @click="changeBlock(item)"
          />
        </ActionColumn>
      </template>
    </DefaultDictionary>
    <NuxtChild />
  </div>
</template>

<script>
import { Filter, Put } from 'core-xhr';
import { ForbiddenError } from '../utils/ForbiddenError';

export default {
  name: 'InnerSubscriber',
  validate({ store }) {
    if (store.getters['auth/hasRole']('ADMINISTRATOR')) return true;
    throw new ForbiddenError('У вас нет доступа к данной странице');
  },
  meta: {
    breadcrumb: 'Внутренний абонент',
  },
  data() {
    return {
      tableHeaders: [
        {
          name: 'Номер внутреннего абонента', field: 'name', minSpace: 300, space: 300, grow: false,
        },
        {
          name: 'Заблокирован', field: 'isBlocked', minSpace: 300, space: 300,
        },
        {
          name: '', field: 'special:listing-actions', grow: true,
        },
      ],
    };
  },
  methods: {
    async changeBlock({ id, isBlocked }) {
      try {
        const res = await this.$xhr.send(
          new Put('work-places')
            .entity()
            .addFilter(new Filter('id', 'eq', id))
            .setData({ isBlocked: !isBlocked }),
        );
        if (res.data.success) {
          this.$store.dispatch(
            'snack/info',
            !isBlocked ? 'Внутренний абонент заблокирован' : 'Внутренний абонент разблокирован',
          );
        }
      } catch (e) {
        this.$store.dispatch('snack/error', e.message || 'Произошла ошибка');
      }
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>
