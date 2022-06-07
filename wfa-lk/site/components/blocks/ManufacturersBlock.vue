<template>
  <div class="manufacturers">
    <div class="manufacturers__container container">
      <PageTitle text="Производители" />
<!--      <div
        v-if="viewAllManufacturers"
        class="manufacturers__grid"
      >
        <NuxtLink
          v-for="cat of pets"
          :key="cat"
          :to="`/personal-area/pets-and-docks/${cat.id}`"
          href="#"
          class="manufacturers__item"
        >
          <picture class="manufacturers__avatar">
            <img
              :src="cat.photo || '/images/test.jpg'"
              alt=""
            >
          </picture>
          <span class="manufacturers__name">{{ cat.name }}</span>
        </NuxtLink>
      </div>-->
      <ManufacturersSlider
        :pets="pets"
        class="slider"
      />
<!--      <div class="button-wrap">
        <ButtonMain
          v-if="!viewAllManufacturers"
          class="view-all"
          light
          icon-right
          icon="UI/arrow-right"
          text="Показать всех"
          @click="toggleViewManufaturers"
        />
      </div>-->
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/UI/blocks/PageTitle';
import ManufacturersSlider from '@/components/blocks/ManufacturersSlider';
// import ButtonMain from '@/components/UI/blocks/ButtonMain';

export default {
  name: 'ManufacturersBlock',
  components: {
    PageTitle,
    ManufacturersSlider,
    /*ButtonMain,*/
  },
  props: {
    pets: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      viewAllManufacturers: false,
    };
  },
  methods: {
    toggleViewManufaturers() {
      this.viewAllManufacturers = !this.viewAllManufacturers;
    },
  },
};
</script>

<style lang="stylus" scoped>
.manufacturers
  background: $white-main;
  padding: 36px 0 70px;
  &__containter
    padding: 0 35px;
  &__grid
    display grid
    grid-template-columns repeat(auto-fit, minmax(88px, 1fr))
    gap 30px
    margin-top: 40px
    @media screen and (min-width: $tablet)
      grid-template-columns repeat(auto-fit, minmax(110px, 1fr))
      gap: 33px
    @media screen and (min-width: 1000px)
      grid-template-columns repeat(auto-fit, minmax(126px, 1fr))
  &__item
    display flex
    flex-direction: column;
    justify-content center
    align-items: center;

    &:hover, &:focus
      .manufacturers__name
        color: $red-main;

      .manufacturers__all
        color: $red-main;
        border-color: $red-main;

      .manufacturers__icon
        fill $red-main

  &__avatar
    width: 88px;
    height: 88px;
    border-radius: 50%;
    overflow hidden
    @media screen and (min-width: $tablet)
      width: 110px
      height: 110px
    @media screen and (min-width: 1000px)
      width: 126px;
      height: 126px;
  &__name
    color: $black-main;
    margin-top: 20px
    display: inline-flex;
    transition color .3s
    text-align: center;

  &__icon
    display: inline-flex;
    fill $blue-main
    width: 20px
    height: 20px
    margin-top: 19px
    transition fill .3s

  &__all
    display flex
    justify-content center
    align-items center
    width: 126px
    height: 126px
    border-radius: 50%;
    border: 2px solid $blue-main;
    background: $grey-1;
    color: $blue-main;
    font-size: 18px
    font-weight: 700;
    transition color .3s, border-color .3s

.button-wrap
  display flex
  justify-content: center;

.view-all
  max-width 362px
  width: 100%;
  margin: 40px auto 0;

.slider {
  margin-top: 40px
}
</style>
