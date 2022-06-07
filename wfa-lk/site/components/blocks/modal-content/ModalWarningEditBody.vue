<template>
  <div class="body">
    <div class="text">
      Внимание, вы хотите отредактировать данные вашего питомца.
      Целевой взнос за изменение данных составляет 100 руб.
      Изменения вступят в силу сразу после оплаты взноса и
      прохождения внутренней модерации (может занять до 24 часов).
    </div>
    <div class="btns-wrap">
      <ButtonMain
        text="Принять"
        class="btn"
        @click="$emit('modal:confirm')"
      />
      <ButtonMain
        light
        text="Отменить"
        class="btn"
        @click="$emit('modal:close')"
      />
    </div>
  </div>
</template>

<script>
import ButtonMain from '@/components/UI/blocks/ButtonMain';

export default {
  name: 'ModalWarningEditBody',
  components: {
    ButtonMain,
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
    &:last-child
      margin-left: 20px
</style>
