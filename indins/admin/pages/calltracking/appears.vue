<template>
  <div class="fill-height">
    <DynamicListing
      :headers="headers"
      :request="request"
      :orders="[{ field: 'createdAt', direction: 'DESC' }]"
      massive-actions
      massive-actions-count
      @item-click="openItem($event)"
    >
      <template #actions="{ headers: heads }">
        <ColumnToggler :headers="heads" />
      </template>
      <template #filters>
        <RelationFilter
          :items="typeItems"
          :local-list="typeItems"
          name="name"
          label="Тип"
          filter-type="like"
          filter-by="name"
        />
        <DateFilter
          label="Дата создания"
          name="createdAt"
          range
          filter-type="range"
        />
        <BooleanFilter
          :default-value="false"
          active
          label="Обработан"
          name="processed"
        />
      </template>
      <template #columns>
        <TextColumn field="id" />
        <TextColumn field="name" />
        <DateColumn
          field="createdAt"
          format="DD.MM.YY HH:mm"
        />
        <TextColumn field="phone" />
        <FuncColumn
          :func="getAudioBoolean"
          field="call"
        />
        <FuncColumn
          :func="getCallDuration"
          field="callDuration"
        />
        <RelationColumn field="session.UTMSource" />
        <BoolColumn field="processed" />
        <RelationColumn field="callTrackingBackCall.title" />
        <ActionColumn
          v-slot="{ item }"
          action-column
        >
          <v-btn
            v-if="!item.processed"
            small
            outlined
            color="#416fc8"
            @click="processedItem(item)"
          >
            Обработать
          </v-btn>
        </ActionColumn>
      </template>
      <template #massive-actions="{ selected }">
        <MassiveChange
          :request="massiveRequest"
          :selected="selected"
        />
      </template>
    </DynamicListing>
    <nuxt-child />
    <DeletePopup />
  </div>
</template>

<script>
import { Filter, Get, Put } from 'core-xhr';
import MassiveChange from '../../components/massiveChange';

export default {
  components: {
    MassiveChange,
  },
  async validate({ app: { store } }) {
    const accessRoles = ['ROLE_APPEAL'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  meta: {
    breadcrumb: 'Обращения',
  },
  async asyncData({ app: { $xhr }, error }) {
    const data = await $xhr.send(
      new Get('calltracking_appears')
        .collection()
        .addFilter(new Filter('deletedAt', 'exists', false)),
    )
      .then(res => res.data.data.result)
      .catch(e => error(e));

    const typeItems = [];

    data.forEach(e => {
      // eslint-disable-next-line no-shadow
      if (!typeItems.map(e => e.name).includes(e.name)) {
        typeItems.push({ name: e.name });
      }
    });

    return {
      typeItems,
    };
  },
  data() {
    return {
      request: new Get('calltracking_appears')
        .addFilter(new Filter('deletedAt', 'exists', false, false, true)),
      massiveRequest: new Put('calltracking_appears', { processed: true }),
      headers: [
        { name: '№', field: 'id', space: '50px' },
        { name: 'Тип', field: 'name', space: '150px' },
        { name: 'Дата', field: 'createdAt', space: '150px' },
        { name: 'Телефон', field: 'phone', space: '200px' },
        { name: 'Запись', field: 'call', space: '100px' },
        { name: 'Длительность', field: 'callDuration', space: '200px' },
        { name: 'UTMSource', field: 'session.UTMSource', space: '200px' },
        { name: 'Обработан', field: 'processed', space: '100px' },
        { name: 'Title', field: 'callTrackingBackCall.title', space: '250px' },
        { name: '', field: 'special:listing-actions', space: '150px' },
      ],
      typeItems: [],
    };
  },
  methods: {
    openItem(item) {
      this.$router.push({ name: 'calltracking-appears-id', params: { id: item.id } });
    },
    getAudioBoolean(item) {
      return item.call?.audio ? 'Да' : 'Нет';
    },
    getCallDuration(item) {
      return item.call?.duration
        ? `${Math.floor((item.call.duration / 1000000))} сек`
        : '-';
    },
    async processedItem(item) {
      if (!item.id) {
        await this.$store.dispatch('snack/error', 'Не передан идентификатор обращения');
        return;
      }
      const request = new Put('calltracking_appears', { processed: true })
        .addFilter(new Filter('id', 'eq', item.id));
      try {
        // noinspection JSUnresolvedVariable
        await this.$xhr.send(request);
        await this.$store.dispatch('snack/notify', 'Сохранено');
      } catch (e) {
        await this.$store.dispatch('snack/error', 'Не передан идентификатор обращения');
      }
    },
  },
};
</script>
