<template>
  <header class="header">
    <div class="header__container container">
      <nuxt-link
        to="/"
        class="header__logo logo"
      >
        <img
          src="@/assets/img/logo.svg"
          alt="Logo"
          class="logo__img"
        >
      </nuxt-link>
      <ToggleButton @click="toggleMenu" />
      <div class="header__buttons">
        <ButtonMain
          v-if="!personalAreaPage"
          class="header__button"
          text="Кабинет заводчика"
          path="/personal-area"
        />
        <SubscribeText
          v-if="personalAreaPage && subscribe"
          class="header__button header__button--subscribe"
        />
        <ButtonMain
          v-if="personalAreaPage && !subscribe"
          class="header__button"
          text="Оформить подписку"
          @click="openModal"
        />
        <ButtonMain
          v-if="personalAreaPage"
          class="header__button header__button--exit"
          text="Помощь"
          @click="goToHelp"
        />
        <ButtonMain
          v-if="personalAreaPage"
          class="header__button header__button--exit"
          text="Выйти"
          light
          @click="exit"
        />
      </div>
    </div>
  </header>
</template>

<script>
import SubscribeText from '@/components/blocks/SubscribeText';
import { Simple } from 'core-xhr';
import ToggleButton from '~/components/blocks/ToggleButton';
import ButtonMain from '../UI/blocks/ButtonMain';

export default {
  name: 'HeaderMain',
  components: {
    ToggleButton,
    ButtonMain,
    SubscribeText,
  },
  data() {
    return {
      windowWidth: null,
    };
  },
  computed: {
    auth() {
      return this.$store.getters['user/getUser'].auth;
    },
    personalAreaPage() {
      const { name } = this.$route;
      return (name || '').includes('personal-area');
    },
    subscribe() {
      return this.$store.getters['user/getUser'].isSubscriber;
    },
  },
  mounted() {

  },
  methods: {
    openModal() {
      this.$store.dispatch('modal/open', 'subscribe');
    },
    toggleMenu() {
      this.$store.dispatch('mobileMenu/toogle');
    },
    exit() {
      this.$xhr.send(new Simple('/api/auth/logout', {}, 'POST'))
        .then(() => {
          this.$cookies.removeAll();
          this.$router.push('/');
          this.$store.dispatch('user/actionLogout');
        })
        .catch(e => console.error(e));
    },
    goToHelp() {
      this.$router.push('/personal-area/help');
    },
  },
};
</script>

<style lang="stylus">
.header
  background: $white-main;
  box-shadow: 0 0 30px rgba(39, 55, 112, 0.1);
  padding: 15px 0;
  overflow-x hidden
  @media screen and (min-width: 1025px)
    padding: 20px 0;
  &__container
    display: flex;
    justify-content: space-between
    align-items center
  &__buttons
    display: none;
    @media screen and (min-width: 1025px)
      display: inline-flex;
  &__button
    &--exit
      margin-left: 40px
    &--subscribe
      display: none;
      @media screen and (min-width 906px)
        display flex

.header__logo
  height: 69px;

.logo
  display: flex;
  width: 150px;
  @media screen and (min-width: 1025px)
    width: 240px
</style>
