<template>
  <div class="fill-height">
    <DefaultDictionary
      :query="query"
      :headers="tableHeaders"
      :orders="{'orderType.inWork': 'ASC', createdAt: 'DESC'}"
      :default-orders="{'orderType.inWork': 'ASC'}"
      :multiple-search="['orderNumber', 'clientName', 'managerName']"
      @item-click="itemClick($event)"
    >
      <template #filters>
        <RelationFilter
          name="orderType"
          item-text="title"
          :items="orderTypesItems"
          label="Тег"
        />
        <DateFilter
          name="createdAt"
          label="Период дат"
          range
          active
          :default-value="week"
        />
        <RelationFilter
          name="operator"
          query="operators"
          label="Оператор"
          item-text="fullName"
          multiple-search-field="surname"
        />
        <BooleanFilter
          name="orderType.inWork"
          label="В обработке"
          active
        />
      </template>
      <template #columns>
        <SlotColumn field="createdAt">
          <template #default="{item}">
            <div class="indicator-wrap">
              <span
                v-if="indicatorView(item)"
                class="indicator"
              />
              <span>{{ item.createdAt }}</span>
            </div>
          </template>
        </SlotColumn>
        <ChipColumn
          field="orderType.title"
          color-field="orderType.color"
          clickable-group="type"
        />
        <TextColumn
          field="orderNumber"
        />
        <TextColumn
          field="accountNumber"
        />
        <RelationColumn
          field="operator.fullName"
        />
        <TextColumn
          field="clientName"
          clickable-group="call"
        />
        <TextColumn
          field="managerName"
        />
        <TextColumn
          field="contact"
        />
        <PhoneColumn
          field="phone"
          clickable-group="call"
        />
        <TextColumn
          field="email"
        />
        <TextColumn
          field="city"
        />
      </template>
    </DefaultDictionary>
    <NuxtChild />
  </div>
</template>

<script>
import { Filter, Get, Put } from 'core-xhr';
import moment from 'moment';
import { mapState } from 'vuex';
import { ForbiddenError } from '../utils/ForbiddenError';

export default {
  name: 'OnlineOrders',
  validate({ store }) {
    if (store.getters['auth/hasRole'](['ONLINEORDERS'])) return true;
    throw new ForbiddenError('У вас нет доступа к данной странице');
  },
  meta: {
    breadcrumb: 'Интернет-заказы',
  },
  async asyncData({ app: { $xhr } }) {
    const orderTypes = await $xhr.send(new Get('order-types'));
    // const badOrders = ['Отгружен', 'Отменен']
    // const badOrderIds = orderTypes.data.data.result.filter(({title}) => badOrders.includes(title))
    return {
      orderTypes: orderTypes.data.data.result,
    };
  },
  data() {
    return {
      query: new Get('online-orders').setFilter([
        new Filter('orderType.id', 'neq', 3, false, true),
        new Filter('orderType.id', 'neq', 4, false, true),
      ]),
      tableHeaders: [
        {
          name: 'Дата/время', field: 'createdAt', space: 200, minSpace: 200,
        },
        {
          name: 'Тег', field: 'orderType.title', space: 200, minSpace: 200,
        },
        {
          name: '№ заказа', field: 'orderNumber', space: 200, minSpace: 200,
        },
        {
          name: '№ счета', field: 'accountNumber', space: 200, minSpace: 200,
        },
        {
          name: 'Оператор', field: 'operator.fullName', space: 200, minSpace: 200,
        },
        {
          name: 'Клиент', field: 'clientName', space: 400, minSpace: 400,
        },
        {
          name: 'Менеджер', field: 'managerName', space: 300, minSpace: 300,
        },
        {
          name: 'Контакт', field: 'contact', space: 200, minSpace: 200,
        },
        {
          name: 'Телефон', field: 'phone', space: 200, minSpace: 200,
        },
        {
          name: 'E-mail', field: 'email', space: 200, minSpace: 200,
        },
        {
          name: 'Город', field: 'city', space: 200, minSpace: 200,
        },
      ],
      orderTypes: [],
      week: [`${moment().subtract(7, 'days').format('YYYY-MM-DD')}T00:00:00`, `${moment().format('YYYY-MM-DD')}T23:59:59`],
    };
  },
  computed: {
    ...mapState({
      userId: state => state.auth.id,
    }),
    workplace() {
      return this.$store.state.auth.info.getWorkPlaceNumber;
    },
    orderTypesItems() {
      const badIds = [3, 4];
      if (!this.orderTypes.length) return [];
      return this.orderTypes.filter(({ id }) => !badIds.includes(id));
    },
  },
  methods: {
    itemClick({ item, field }) {
      // if (item.operator && item.operator?.id !== this.userId) return this.$store.dispatch('snack/error', 'Данное обращение в обработке у другого оператора');
      if (field === 'phone' || field === 'clientName') {
        this.openCallPopup(item);
        this.addOperator(item);
      }
      if (field === 'orderType.title') {
        this.addOperator(item);
        // if (item.externalUrl) return this.$store.dispatch('snack/error', 'Ссылки не существует');

        if (item.externalUrl) window.open(item.externalUrl);
        else return this.$store.dispatch('snack/error', 'Отдел разработки не смог получить ссылку на заказ');
      }
    },
    openCallPopup(item) {
      if (item.phone) {
        this.$eventBus.emit('openCallWarningPopup', { phone: item.phone });
      }
    },
    indicatorView(val) {
      const now = moment();
      const date = moment(val.createdAt);
      const endDate = date.add(15, 'm');
      return now.isSameOrAfter(endDate) && !val.orderType.inWork;
    },
    async addOperator(item) {
      if (item.operator) return;
      try {
        const req = await this.$xhr.send(new Put('online-orders')
          .entity()
          .addFilter(new Filter('id', 'eq', item.id))
          .setData({ operator: { id: this.userId }, inWork: true }));
        if (req.data.data.success) {
          await this.$store.dispatch('snack/info', 'Вы обрабатываете данное обращение');
        }
      } catch (e) {
        this.$store.dispatch('snack/error', e.message || 'Произошла ошибка');
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
 .indicator
   display: flex;
   width: 6px;
   height: 6px;
   background-color: #CF4949;
   margin-right: 6px
   border-radius: 50%;

 .indicator-wrap
   display: flex;
   align-items center;
</style>
