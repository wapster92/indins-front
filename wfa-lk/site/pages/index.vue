<template>
  <div class="index-page">
    <div class="index-page__container container">
      <div class="index-b">
<!--        <h1 class="index-b__title">
          РФО Онлайн это:
        </h1>
        <ul class="index-b__list">
          <li class="index-b__item">
            <span class="index-b__text">Регистрация питомцев в реестре РФО</span>
          </li>
          <li class="index-b__item">
            <span class="index-b__text">Регистрация питомника</span>
          </li>
          <li class="index-b__item">
            <span class="index-b__text">Актировка помета</span>
          </li>
          <li class="index-b__item">
            <span class="index-b__text">Заказ и получение документов в 3 клика</span>
          </li>
          <li class="index-b__item">
            <span class="index-b__text">Регистрация на выставки и обучения</span>
          </li>
        </ul>
        <ButtonMain
          class="index-b__button"
          text="Кабинет заводчика"
          light
          path="/personal-area"
        />-->
        <picture class="index-b__picture">
          <img
            src="@/assets/img/kote.jpg"
            alt=""
          >
        </picture>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonMain from '~/components/UI/blocks/ButtonMain';
export default {
  components: {
    ButtonMain,
  },
  data() {
    return {
      check: null,
      select: null,
      options: [
        'foo',
        'bar',
        'baz',
      ],
      info: 'Существует два способа связывания объекта и метки. Первый заключается в использовании идентификатора id внутри элемента формы и указании его имени в качестве атрибута ',
    };
  },
};
</script>

<style lang="stylus">
.index-page
  padding: 40px 0 60px;
  //background: #1F3763 url('@/assets/img/index-b.svg') no-repeat;
  background-size: cover;
  height: 100%;
  flex-grow 1
  display flex
  flex-direction column
  justify-content center
  overflow-x hidden
  @media screen and (min-width: $tablet)
    background: none;
    justify-content flex-start
.index-b
  color: $white-main;
  position: relative;
  @media screen and (min-width: $tablet)
    //background: #1F3763 url('@/assets/img/index-b.svg') no-repeat;
    background-size: cover;
    padding: 40px 46px 147px;
    border-radius: 5px;
  &__title
    font-size: 30px;
    font-weight: 700
    margin: 0
    @media screen and (min-width: 400px)
      font-size: 35px;
  &__list
    margin-top: 38px
    padding-left: 20px
    color: #A4BDEB;
  &__item
    margin-bottom: 15px
  &__text
    color: $white-main;
  &__picture
    /*display: none;
    position: absolute;
    bottom: 0;
    right: 0;*/
    width: 100%
    height: auto;
    /*@media screen and (min-width: $tablet)
      display: inline-flex;*/
    img
      width: 100%
      height: auto;
  &__button
    margin-top: 56px
    @media screen and (min-width: $tablet)
      display: none;
</style>
