<template>
  <div
    class="mobile-menu"
    :style="`top:${headerHeading}; height: ${height}`"
    @click="close"
  >
    <div
      class="mobile-menu__container container"
    >
      <div
        v-if="username"
        class="user"
      >
        <div class="user-name">
          {{ username }}
        </div>
        <div class="user-bonus">
          Бонусный баланс: {{ bonusPoints || 0 }} ₽
        </div>
      </div>
      <div class="mobile-menu__buttons">
        <PersonAreaButtons />
      </div>
    </div>
  </div>
</template>

<script>
import PersonAreaButtons from '@/components/blocks/PersonAreaButtons';

export default {
  name: 'MobileMenu',
  components: {
    PersonAreaButtons,
  },
  props: {
    headerHeading: {
      type: String,
      default: '',
    },
  },
  computed: {
    height() {
      if (this.open) return `calc(var(--vh, 1vh) * 100 - ${this.headerHeading})`;
      return '0vh';
    },
    open() {
      return this.$store.getters['mobileMenu/getMenuStatus'];
    },
    username() {
      return this.$store.getters['user/getUser'].owner;
    },
    bonusPoints() {
      return this.$store.getters['user/getUser'].bonusPoints;
    },
  },
  methods: {
    close(e) {
      const t = e.target;
      const tags = ['A', 'BUTTON', 'SPAN'];
      if (!tags.includes(t.tagName)) return false;
      this.$store.dispatch('mobileMenu/close');
    },
  },
};
</script>

<style lang="stylus">
.mobile-menu
  position: sticky;
  left: 0
  top: 0;
  width: 100%
  background: $white-main;
  transition height .3s
  z-index: 100;
  display: flex;
  flex-direction column
  overflow hidden
  &__container
    flex-grow 1
    padding-top: 40px
    padding-bottom: 40px
    display flex
    flex-direction column
    & .user
      background-color: $grey-1
      margin: -40px -26px 0
      padding: 40px 26px
      &-name
        font-size: 18px
        font-weight: 500
      &-bonus
        padding-top: 8px
        font-size: 14px
        color: $blue-main
  &__buttons
    margin-top: auto;
</style>
