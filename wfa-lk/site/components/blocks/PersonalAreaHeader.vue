<template>
  <div class="personal-header">
    <div class="personal-header__container container">
      <div class="personal-header__head">
        <a
          href="#"
          class="personal-header__back"
          @click="goToBack"
        ><svg-icon
          class="personal-header__icon"
          name="UI/back"
        />
          Вернуться назад</a>
      </div>
      <div class="personal-header__title-wrap">
        <PageTitle
          class="personal-header__title"
          :text="title"
        />
        <UserNameHeader class="mt"></UserNameHeader>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '~/components/UI/blocks/PageTitle';
import UserNameHeader from "@/components/blocks/UserNameHeader";

export default {
  name: 'PersonalAreaHeader',
  components: {
    PageTitle,
    UserNameHeader
  },
  props: {
    title: {
      type: String,
      default: 'Заголовок',
    },
  },
  computed: {
    username() {
      return this.$store.getters['user/getUser'].owner;
    },
  },
  methods: {
    goToBack(e) {
      e.preventDefault();
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="stylus">
  .personal-header
    padding: 0 0 30px;
    &__title
      margin-bottom: 0
      margin-top: 19px
    &__head
      display: flex;
      justify-content: space-between;
    &__back
      font-size: 14px
      color: $black-main;
      display inline-flex
      padding-left: 32px
      position: relative;
      align-items: center;
      &:hover, &:focus
        .personal-header__icon
          fill $red-main
    &__icon
      width: 18px
      height: 13px;
      position: absolute;
      left: 0
      top: 0
      bottom: 0
      margin: auto 0;
      fill $blue-main
      transition fill .3s
    &__title-wrap
      display flex
      justify-content: space-between;
      align-items flex-end
</style>
