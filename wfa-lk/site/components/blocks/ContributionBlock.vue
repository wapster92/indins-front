<template>
  <div class="contribution-block">
    <div class="contribution-block__container semi-container">
      <div class="contribution-block__wrap">
        <h3 class="contribution-block__title">
          {{ title }}
        </h3>
        <div
          v-if="annotation"
          class="contribution-block__annotation"
          v-html="annotation"
        />
        <p class="contribution-block__sum">
          Сумма к оплате: <span>{{ sum }} руб.</span>
        </p>
        <p
          class="contribution-block__text"
          v-html="text"
        />
        <ButtonMain
          v-if="bonusPayment && hasEnoughBonuses"
          text="Оплатить"
          class="btn"
          @click="openModal"
        />
        <PayButton
          v-else
          :url="url"
          :load-payment="loadPayment"
          @click="$emit('click')"
        />
      </div>
    </div>
    <nuxt-child />
    <Modal v-if="!!modalPaymentVariants">
      <template #body>
        <ModalPaymentVariants
          :url="url"
          :load-payment="loadPayment"
          @modal:bonuses="$emit('bonuses')"
          @modal:money="$emit('click')"
        />
      </template>
    </Modal>
  </div>
</template>

<script>

import Modal from '@/components/main/Modal';
import ButtonMain from '@/components/UI/blocks/ButtonMain';
import PayButton from '@/components/UI/blocks/PayButton';
import ModalPaymentVariants from '@/components/blocks/modal-content/ModalPaymentVariants';

export default {
  name: 'ContributionBlock',
  components: {
    Modal,
    ButtonMain,
    PayButton,
    ModalPaymentVariants,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    sum: {
      type: Number,
      default: null,
    },
    text: {
      type: String,
      default: 'После нажатия на кнопку “Оплатить взнос”,<br> вы будете перенаправлены на страницу оплаты',
    },
    annotation: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    loadPayment: {
      type: Boolean,
      default: false,
    },
    bonusPayment: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    modalPaymentVariants() {
      return (this.$store.getters['modal/getModalStatus']('paymentVariantsModal') || {}).status;
    },
    hasEnoughBonuses() {
      return this.$store.getters['user/getUser'].bonusPoints >= this.sum;
    },
  },
  methods: {
    openModal() {
      if (this.bonusPayment) {
        this.$store.dispatch('modal/open', 'paymentVariantsModal');
      }
    },
  },
};
</script>

<style lang="stylus">
.contribution-block
  padding: 55px 0 70px;
  &__title
    font-size: 24px
    font-weight: 500
    margin-bottom: 46px
  &__sum
    font-weight: 500;
    font-size: 16px
    color: $grey-2;
    margin-bottom: 46px
    span
      color: $blue-main;
      font-size: 24px;
      font-weight: 500
  &__text
    font-size: 16px;
    color: $grey-2;
    margin-bottom: 52px
  /*&__wrap
    max-width 500px*/
  &__annotation
    color: $grey-2;
    font-size: 16px
    font-weight: 400
    p
      margin-bottom: 45px
      line-height: 25px;
    a
      text-decoration: underline;
</style>
