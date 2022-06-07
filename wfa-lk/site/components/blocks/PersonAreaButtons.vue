<template>
  <div class="person-area-buttons">
    <div
      v-if="!isPersonalArea"
      class="person-area-buttons__button"
    >
      <ButtonMain
        path="/personal-area"
        text="Кабинет заводчика"
      />
    </div>
    <div
      v-if="isPersonalArea && !subscription"
      class="person-area-buttons__button"
    >
      <ButtonMain
        text="Оформить подписку"
        @click="openModal"
      />
    </div>
    <div
      v-if="isPersonalArea && subscription"
      class="person-area-buttons__button"
    >
      <SubscribeText />
    </div>
    <div
      v-if="isPersonalArea"
      class="person-area-buttons__button"
    >
      <ButtonMain
        text="Помощь"
        @click="goToHelp"
      />
    </div>
    <div
      v-if="isPersonalArea"
      class="person-area-buttons__button"
    >
      <ButtonMain
        text="Выйти"
        light
        @click="logOut"
      />
    </div>
  </div>
</template>

<script>
import ButtonMain from '@/components/UI/blocks/ButtonMain';
import SubscribeText from '@/components/blocks/SubscribeText';

export default {
  name: 'PersonAreaButtons',
  components: {
    ButtonMain,
    SubscribeText,
  },
  computed: {
    isPersonalArea() {
      return (this.$route.name || '').includes('personal-area');
    },
    subscription() {
      return this.$store.getters['user/getUser'].isSubscriber;
    },
  },
  methods: {
    openModal() {
      this.$store.dispatch('modal/open', 'subscribe');
    },
    logOut() {
      this.$router.push('/auth/login');
      this.$store.dispatch('user/actionLogout');
    },
    goToHelp() {
      this.$router.push('/personal-area/help')
    }
  },
};
</script>

<style lang="stylus">
.person-area-buttons
  display: flex;
  flex-direction column
  &__button
    margin-bottom: 40px;
    &:last-child
      margin-bottom: 0;

</style>
