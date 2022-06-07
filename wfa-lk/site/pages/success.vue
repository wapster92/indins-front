<template>
  <div class="success-page">
    <div class="container">
      <picture class="success-cat">
        <!--        <source
          type="image/webp"
          srcset="@/assets/img/success-cat.webp"
        >-->
        <img
          src="@/assets/img/success.svg"
          alt=""
        >
      </picture>
      <!--      <h4 class="title">
        Оплата прошла успешно
      </h4>-->
      <!--      <div class="success-text">
        Ваша заявка успешно оплачена и отправлена на модерацию. <br>
        Время модерации занимает до 24 часов.
      </div>-->
      <div class="back-page">
        <ButtonMain
          path="/personal-area"
          text="Вернуться в личный кабинет"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonMain from '@/components/UI/blocks/ButtonMain';

export default {
  name: 'Success',
  components: {
    ButtonMain,
  },
  computed: {
    backPage() {
      return this.$route.query['back-page'];
    },
  },
};
</script>

<style lang="stylus" scoped>
.success-page
  display: flex;
  flex-direction: column;
  flex 1
  justify-content center
  padding: 40px 0;
.success-cat
  max-width 300px
  width: 100%;
  display: flex;
  margin: 0 auto
  border-radius: 40px;
  overflow hidden
  img
    width: 100%
    height: auto;
.title
  text-align: center;
  color: $blue-main;
  font-size: 18px;
  margin: 45px 0 0;
  @media screen and (min-width 500px)
    font-size: 24px
.back-page
  display flex
  justify-content: center;
  align-items: center;
  margin-top: 45px;
.success-text
  text-align: center;
  margin: 25px 0 0;
</style>
