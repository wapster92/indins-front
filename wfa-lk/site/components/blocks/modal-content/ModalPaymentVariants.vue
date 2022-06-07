<template>
  <div class="body">
    <div class="text">
      Ваш бонусный баланс составляет: {{ bonusPoints || 0 }} ₽
    </div>
    <div class="btns-wrap">
      <ButtonMain
        text="Оплатить бонусами"
        class="btn"
        @click="$emit('modal:bonuses')"
      />
      <PayButton
        :url="url"
        :load-payment="loadPayment"
        @click="$emit('modal:money')"
      />
    </div>
  </div>
</template>

<script>
import ButtonMain from '@/components/UI/blocks/ButtonMain';
import PayButton from '@/components/UI/blocks/PayButton';

export default {
  name: 'ModalWarningEditBody',
  components: {
    ButtonMain,
    PayButton,
  },
  props: {
    url: {
      type: String,
      default: '',
    },
    loadPayment: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    bonusPoints() {
      return this.$store.getters['user/getUser'].bonusPoints;
    },
  },
};
</script>

<style lang="stylus" scoped>
.body
  height: 100%
  display: grid
  grid-template-rows 1fr auto
.text
  display: flex
  justify-content: center;
  align-items: center
  text-align: center
.btns-wrap
  display: flex
  justify-content: center;
  .btn
    &:first-child
      margin-right: 20px
</style>
