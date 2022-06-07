<template>
  <div class="fill-height">
    <AppAdmin
      :main-menu="mainMenu"
      :user-menu="userMenu"
    >
      <template #toolbar>
        <SimpleSwitch
          v-model="dndStatus"
          @change="changeDndStatus"
        />
        <span>DND</span>
      </template>
    </AppAdmin>
    <CommonCallsPopup :tags="tags" />
    <CommonEmailsPopup :tags="tags" />
    <PopupComponent
      v-model="callWarningPopup"
      title="Звонок"
      text="Позвонить клиенту?"
      confirm-text="Да"
      reject-text="Нет"
      @click:confirm="makeCall"
      @click:reject="closeCallWarningPopup"
    />
    <PopupComponent
      v-model="warningPopup"
      title="Предупреждение"
      text="Вам не назначены роли в системе, обратитесь к администратору"
    >
      <template #buttons>
        <SimpleButton @click="warningPopup = false">
          Ок
        </SimpleButton>
      </template>
    </PopupComponent>
    <client-only>
      <notifications
        class="notify"
        :width="266"
        position="bottom right"
        :duration="10000"
      />
    </client-only>
  </div>
</template>

<script>
import { Simple } from 'core-xhr';
import { mapState } from 'vuex';
import moment from 'moment';
import CommonCallsPopup from '../components/popup/CommonCallsPopup';
import CommonEmailsPopup from '../components/popup/CommonEmailsPopup';

const userActivityTimeout = 10; // время в минутах

export default {
  name: 'LayoutComponent',
  components: {
    CommonCallsPopup,
    CommonEmailsPopup,
  },
  data() {
    return {
      mainMenu: [
        {
          routeTo: { name: 'users' },
          label: 'Пользователи',
          icon: 'group',
          accessRoles: ['ADMINISTRATOR'],
        },
        {
          routeTo: { name: 'calls' },
          label: 'Звонки',
          icon: 'mdi-phone-classic',
          accessRoles: ['CALLS'],
          /* count: this.newCalls, */
        },
        {
          routeTo: { name: 'applications-from-the-site' },
          label: 'Заявки с сайта',
          icon: 'mdi-email-open',
          accessRoles: ['ADMINISTRATOR', 'APPLICATIONSSITE'],
          count: this.newAppeals,
        },
        {
          routeTo: { name: 'online-orders' },
          label: 'Интернет-заказы',
          icon: 'mdi-cart',
          accessRoles: ['ONLINEORDERS'],
          count: this.waitingOrders,
        },
        {
          routeTo: { name: 'tags' },
          label: 'Справочник тэгов',
          icon: 'mdi-book-open-variant',
          accessRoles: ['ADMINISTRATOR'],
        },
        {
          routeTo: { name: 'analytics' },
          label: 'Аналитика',
          icon: 'mdi-google-analytics',
          accessRoles: ['ALL'],
        },
        {
          routeTo: { name: 'inner-subscriber' },
          label: 'Внутренний абонент',
          icon: 'mdi-sim',
          accessRoles: ['ADMINISTRATOR'],
        },
      ],
      userMenu: {},
      tags: [],
      dndStatus: false,
      newCalls: 0,
      waitingOrders: 0,
      newAppeals: 0,
      callWarningPopup: false,
      currentClientPhone: null,
      warningPopup: false,
      siteRequestionId: null,
      lastBridgeId: null,
    };
  },
  async fetch() {
    const promises = [
      this.$xhr.send(new Simple('/api/get_tags')),
      this.$xhr.send(new Simple(`/api/get_status/${this.userId}`)),
      this.$xhr.send(new Simple('/api/count_new_calls')),
      this.$xhr.send(new Simple('/api/get_count_waiting_orders')),
      this.$xhr.send(new Simple('/api/get_count_new_appeals')),
    ];
    const [tags, dndStatus, newCalls, waitingOrders, newAppeals] = await Promise.all(promises);
    this.tags = tags.data;
    this.dndStatus = dndStatus.data.status;
    this.addCountForMainMenu(
      [newCalls.data.calls, newAppeals.data.requisitions, waitingOrders.data.orders],
    );
  },
  computed: {
    ...mapState({
      userId: state => state.auth.id,
      workplaceNumber: state => state.auth.info.getWorkPlaceNumber,
      isBlocked: state => state.auth.info.isBlocked,
      roles: state => state.auth.roles,
    }),
  },
  watch: {
    isBlocked: {
      immediate: true,
      handler(val) {
        if (val) this.exit();
      },

    },
  },
  mounted() {
    this.resetUserActivityTimeout();
    this.activateActivityTracker();
    this.$socket.subscribe('Proxies\\__CG__\\App\\Entity\\User', this.watchDndStatus);
    this.$eventBus.on('openCallWarningPopup', this.openCallWarningPopup);
    setInterval(this.checkUserActivityTimeout, 60000);
    if (!this.roles.length) this.warningPopup = true;
    this.$socket.subscribe('App\\Entity\\CommonCall', this.bridgeCall);
    this.$socket.subscribe('App\\Entity\\SiteRequisition', this.getNewAppeals);
    this.$socket.subscribe('App\\Entity\\OnlineOrder', this.getWaitingOrders);
  },
  methods: {
    async changeDndStatus(e) {
      try {
        const body = {
          workplaceNumber: this.workplaceNumber,
          status: e,
          front: true,
        };
        const { data } = this.$xhr.send(new Simple('/api/change_dnd', body, 'POST'));
        if (!data?.success) {
          await this.$store.dispatch('snack/error', 'Вы не указали рабочее место');
          this.dndStatus = false;
        }
      } catch (err) {
        await this.$store.dispatch('snack/error', err.message || 'Произошла ошибка');
      }
    },
    watchDndStatus(e) {
      if (!e.id === this.userId) return;
      this.getDndStatus();
    },
    async getDndStatus() {
      try {
        const { data } = await this.$xhr.send(new Simple(`/api/get_status/${this.userId}`));
        this.dndStatus = data.status;
        await this.$store.dispatch('snack/info', 'Статус DND изменился');
      } catch (e) {
        await this.$store.dispatch('snack/error', 'Неудалось получить статус DND');
      }
    },
    resetUserActivityTimeout() {
      const data = moment().format('YYYY-MM-DD HH:mm');
      localStorage.setItem('lastActivity', data);
    },
    activateActivityTracker() {
      window.addEventListener('mousemove', this.resetUserActivityTimeout);
      window.addEventListener('scroll', this.resetUserActivityTimeout);
      window.addEventListener('keydown', this.resetUserActivityTimeout);
      window.addEventListener('resize', this.resetUserActivityTimeout);
    },
    checkUserActivityTimeout() {
      if (!this.dndStatus) return;
      const date = moment().format('YYYY-MM-DD HH:mm');

      const lastActivity = moment(localStorage.getItem('lastActivity')).add(userActivityTimeout, 'm');
      if (lastActivity.isBefore(date)) {
        this.changeDndStatus(true);
      }
    },
    addCountForMainMenu(arr) {
      // eslint-disable-next-line no-unused-vars
      const [calls, requisitions, orders] = arr;
      this.mainMenu.forEach(n => {
        const routeName = n?.routeTo?.name;
        // if (routeName === 'calls') n.count = calls > 99 ? '99+' : calls;
        if (routeName === 'applications-from-the-site') {
          // eslint-disable-next-line no-param-reassign
          n.count = this.setCount(requisitions);
        }
        if (routeName === 'online-orders') {
          // eslint-disable-next-line no-param-reassign
          n.count = this.setCount(orders);
        }
      });
    },
    setCount(value) {
      const val = Number(value);
      if (val === 0) {
        return null;
      }
      return val > 99 ? '99+' : val;
    },
    async makeCall() {
      if (this.currentClientPhone) {
        try {
          const body = {
            workplaceNumber: this.workplaceNumber,
            phone: this.currentClientPhone,
          };
          const { data } = await this.$xhr.send(new Simple('/api/create_call', body, 'POST'));
          if (data.success) {
            await this.$store.dispatch('snack/info', data.message || 'Совершается звонок');
            if (this.siteRequestionId) this.$eventBus.emit('openSiteRequestionPopup', this.siteRequestionId);
            this.closeCallWarningPopup();
          }
        } catch (e) {
          await this.$store.dispatch('snack/error', e.message || 'Произошла ошибка');
        }
      } else {
        await this.$store.dispatch('snack/error', 'Номер клиента неизвестен');
      }
    },
    closeCallWarningPopup() {
      this.callWarningPopup = false;
      this.currentClientPhone = null;
      this.siteRequestionId = null;
    },
    openCallWarningPopup(payload) {
      this.callWarningPopup = true;
      this.currentClientPhone = payload.phone;
      if (payload.siteRequestionId) {
        this.siteRequestionId = payload.siteRequestionId;
      }
    },
    exit() {
      this.$router.push({ path: '/auth/logout' });
    },
    async bridgeCall(e) {
      if (!this.roles.includes('CALLS')) return false;
      if (e.id === this.lastBridgeId) return false;
      this.lastBridgeId = e.id;
      try {
        const call = await this.$xhr.send(new Simple(`/api/get_common_call/${e.id}`));
        this.viewNotificationCall(call.data);
      } catch (err) {
        console.error(err);
      }
    },
    viewNotificationCall(obj) {
      const client = obj.clientName ?? obj.clientPhone;
      this.$notify({
        title: 'Входящий звонок',
        text: `Клиент: ${client} <br> Город: ${obj.city}`,
      });
    },
    async getNewAppeals() {
      const appeals = await this.$xhr.send(new Simple('/api/get_count_new_appeals'));
      const count = appeals.data.requisitions > 99 ? '99+' : appeals.data.requisitions;
      const idx = this.mainMenu.findIndex(n => n.label === 'Заявки с сайта');
      this.$set(this.mainMenu[idx], 'count', count);
    },
    async getWaitingOrders() {
      const waitingOrders = await this.$xhr.send(new Simple('/api/get_count_waiting_orders'));
      const count = waitingOrders.data.orders > 99 ? '99+' : waitingOrders.data.orders;
      const idx = this.mainMenu.findIndex(n => n.label === 'Интернет-заказы');
      this.$set(this.mainMenu[idx], 'count', count);
    },
  },
};
</script>

<style lang="stylus">
.nuxt-progress
  display: none !important
.main-toolbar
  grid-template: auto / 32px 1fr 60px 60px 60px !important
  @media(max-width: 959px)
    grid-template: auto / 32px 60px 60px 1fr 60px !important
.menu-toggle
  @media(max-width: 959px)
    grid-column: 5 !important
.breadcrumbs
  @media(max-width: 959px)
    grid-column: 4 !important

</style>
