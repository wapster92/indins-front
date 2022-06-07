<template>
  <div class="personal-area">
    <nuxt-child />
    <Modal v-if="!!modalStatus">
      <template #body>
        <ContributionBlock
          title="Оформление подписки"
          class="subscribe-modal"
          :sum="sum"
          :load-payment="loadPayment"
          :url="url"
          :bonus-payment="false"
          :text="`Вы оформляете подписку на использование дополнительного функционала личного кабинета сроком на 1 год, до ${dateTime}`"
          @click="paySubscribe"
        />
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/main/Modal';
import ContributionBlock from '@/components/blocks/ContributionBlock';
import { Get, Filter, Simple } from 'core-xhr';

export default {
  name: 'PersonalArea',
  components: {
    Modal,
    ContributionBlock,
  },
  data() {
    return {
      sum: null,
      paymentLink: null,
      loadPayment: false,
      url: '',
    };
  },
  async fetch() {
    try {
      const sum = await this.$xhr.send(new Get('sum').entity().addFilter(new Filter('serviceType.id', 'eq', 3)));

      this.sum = sum.data.data.result.cost;
    } catch (e) {
      console.error(e);
    }
  },
  computed: {
    modalStatus() {
      return (this.$store.getters['modal/getModalStatus']('subscribe') || {}).status;
    },
    dateTime() {
      const d = new Date();
      const year = d.getFullYear();
      const month = d.getMonth();
      const day = d.getDate();
      return new Date(year + 1, month, day).toLocaleDateString();
    },
    shelterOwner() {
      return this.$store.getters['user/getUser'].shelter.owner;
    },
    clubName() {
      return this.$store.getters['user/getUser'].shelter.clubName;
    },
  },
  mounted() {
    this.$socket.subscribe('App\\Entity\\Wallet', this.setBonusBalance);
  },
  async created() {
    await this.setBonusBalance();
  },
  destroyed() {
    this.$socket.unsubscribe('App\\Entity\\Wallet', this.setBonusBalance);
  },
  methods: {
    async setBonusBalance() {
      if (this.$store.getters['user/getUser'].auth) {
        try {
          const res = await this.$xhr.send(new Simple('/api/bonus/get_bonus_balance').authorization());
          this.$store.commit('user/setBonusPoints', res?.data?.result?.bonus ?? 0);
        } catch (e) {
          console.error(e);
        }
      }
    },
    async paySubscribe() {
      if (this.paymentLink) return window.open(this.paymentLink, '_blank');
      try {
        this.loadPayment = true;
        const body = {
          amount: this.sum,
          servicesData: [{
            serviceTypeId: 3,
            params: {
              shelterName: this.shelterName,
              clubName: this.clubName,
            },
          }],
        };
        const pay = await this.$xhr.send((new Simple('/api/tinkoff/create_payment', body, 'POST')).authorization());
        if (pay.data.success) {
          this.paymentLink = pay.data.result.url;
          this.url = pay.data.result.url;
          this.loadPayment = false;
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style lang="stylus">
  .personal-area
    background: $grey-1;
    flex-grow 1
    padding: 30px 0 0
  .subscribe-modal
    text-align: center;
    margin: 0 auto
    .contribution-block__wrap
      margin: 0 auto;
</style>
