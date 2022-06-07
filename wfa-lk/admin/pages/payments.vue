<template>
  <div class="fill-height">
    <DynamicListing
      :headers="head"
      :request="request"
      :orders="[{field: 'paymentDate', direction: 'DESC'}]"
      subscribe="App\Entity\Payment"
      :multiple-search="['shelterName', 'clubName', 'serviceType.type']"
      filter-type="multiple"
      massive-actions
      massive-actions-count
      @item-click="openItem($event)"
    >
      <template #filters>
        <DateFilter
          name="paymentDate"
          range
          label="Даты"
        />
        <BooleanFilter
          filter-type="exists"
          name="deletedAt"
          label="Погашен"
        />
      </template>
      <template #actions="{headers}">
        <!--        <AddItem :route="{name: 'payments-id', params:{id: 'add'}}" />-->
        <ColumnToggler :headers="headers" />
      </template>
      <template #columns>
        <DateColumn field="paymentDate" />
        <SlotColumn
          v-slot="{item}"
          field="shelterName"
        >
          {{ getShelterName(item) }}
        </SlotColumn>
        <SlotColumn
          v-slot="{ item }"
          field="serviceType.type"
        >
          {{ getServiceType(item) }}
        </SlotColumn>
        <SlotColumn
          v-slot="{ item }"
          field="clubName"
        >
          {{ getClubName(item) }}
        </SlotColumn>
        <TextColumn field="amount" />
        <SlotColumn
          v-slot="{item}"
          field="serviceType.sums.rfoCost"
        >
          {{ (calculateCost(item) || {}).rfo }}
        </SlotColumn>
        <SlotColumn
          v-slot="{item}"
          field="serviceType.sums.clubCost"
        >
          {{ (calculateCost(item) || {}).club }}
        </SlotColumn>
        <IconColumn
          field="status"
          :get-icon="setStatusIcon"
          :icon-props="{size: 24}"
        />
        <SlotColumn
          v-slot="{item}"
          field="deletedAt"
        >
          {{ !!item.deletedAt ? 'Да' : 'Нет' }}
        </SlotColumn>
        <ActionColumn
          v-slot="{ item }"
          action-column
        >
          <SimpleButton @click="toRepayOnly(item.id, item.deletedAt)">
            {{ !!item.deletedAt ? 'Возобновить' : 'Погасить' }}
          </SimpleButton>
        </ActionColumn>
      </template>
      <template #massive-actions="{selected}">
        <SimpleButton
          v-show="isStatus(selected)"
          @click="toRepay(selected)"
        >
          Погасить
        </SimpleButton>
      </template>
    </DynamicListing>
    <nuxt-child />
    <DeletePopup />
  </div>
</template>

<script>
import {
  Get, Delete, Put, Filter,
} from 'core-xhr';
import moment from 'moment';

export default {
  name: 'Payments',
  async validate({ app: { store } }) {
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
  meta: {
    breadcrumb: 'Платежи',
  },
  data() {
    return {
      request: new Get('payments'),
      deleteRequest: new Delete('payments'),
      head: [
        { name: 'Дата оплаты', field: 'paymentDate', space: '120px' },
        { name: 'Название питомника', field: 'shelterName', space: '200px' },
        { name: 'Название услуги', field: 'serviceType.type', space: '300px' },
        { name: 'Название клуба', field: 'clubName', space: '150px' },
        { name: 'Стоимость', field: 'amount', space: '100px' },
        { name: 'Цена ВФА', field: 'serviceType.sums.rfoCost', space: '100px' },
        { name: 'Цена клуба', field: 'serviceType.sums.clubCost', space: '100px' },
        { name: 'Статус', field: 'status', space: '100px' },
        { name: 'Погашен', field: 'deletedAt', space: '100px' },
        {
          name: '', field: 'special:listing-actions', space: '150px', grow: false,
        },
      ],
    };
  },
  computed: {
    currentTime() {
      return moment().format('YYYY-MM-DD HH:mm:ss');
    },
  },
  methods: {
    openItem(item) {
      console.warn(item);
      // this.$router.push({ name: 'payments-id', params: { id: item.id } });
    },
    isStatus(val) {
      return val.some(el => el.deletedAt === null);
    },
    declOfNum(n, textForms) {
      // eslint-disable-next-line no-param-reassign
      n = Math.abs(n) % 100;
      const n1 = n % 10;
      if (n > 10 && n < 20) { return textForms[2]; }
      if (n1 > 1 && n1 < 5) { return textForms[1]; }
      if (n1 === 1) { return textForms[0]; }
      return textForms[2];
    },
    async toRepay(val) {
      const items = val.filter(el => el.deletedAt === null);
      const requests = items.map(el => this.$xhr.send(new Put('payments').entity().addFilter(new Filter('id', 'eq', el.id)).setData({ deletedAt: this.currentTime })));
      try {
        if (requests.length > 0) {
          const sendItems = await Promise.all(requests);
          await this.$store.dispatch('snack/notify', `${sendItems.length} ${this.declOfNum(sendItems.length, ['платеж', 'платежа', 'платежей'])} было погашено`);
        }
      } catch (e) {
        await this.$store.dispatch('snack/error', 'Что-то пошло не так');
      }
    },
    async toRepayOnly(id, val) {
      try {
        const data = val ? null : this.currentTime;
        await this.$xhr.send(new Put('payments').entity().addFilter(new Filter('id', 'eq', id)).setData({ deletedAt: data }));

        await this.$store.dispatch('snack/notify', 'Платеж был изменен');
      } catch (e) {
        await this.$store.dispatch('snack/error', 'Что-то пошло не так');
      }
    },
    getShelterName(item) {
      const names = item.services
        .map(n => n?.params?.shelterName ?? n?.params?.shelter?.name)
        .filter(n => !!n);
      return [...new Set(names)].join();
    },
    getServiceType(item) {
      const names = item.services
        .map(n => n?.serviceType?.type)
        .filter(n => !!n);
      return [...new Set(names)].join();
    },
    getClubName(item) {
      const names = item.services
        .map(n => n?.params?.clubName ?? n?.params?.club?.name)
        .filter(n => !!n);
      return [...new Set(names)].join();
    },
    // eslint-disable-next-line no-unused-vars
    calculateCost(item) {
      const costs = item?.services.reduce((acc, n) => {
        n?.serviceType?.sums.forEach(k => {
          acc.rfo += k.rfoCost;
          acc.club += k.clubCost;
        });
        return acc;
      }, { rfo: 0, club: 0 });
      return costs;
    },
    // eslint-disable-next-line no-unused-vars
    setStatusIcon(item) {
      if (item.status === 'CONFIRMED') return 'mdi-check-circle';
      return 'mdi-close-circle-outline';
    },
  },
};
</script>
