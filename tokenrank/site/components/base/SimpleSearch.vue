<template>
  <div
    :class="{ 'search--active': visible }"
    class="search search--inactive">
    <form
      class="search-form"
      @submit.prevent="search">
      <input
        v-model="request"
        placeholder="Поиск"
        type="text"
        class="search-form__input">
      <TkButton
        :small="true"
        class="search-form__btn"
      ><span>Найти</span></TkButton>
    </form>
  </div>
</template>
<script>
import TkButton from '../UI/buttons/TkButton';

export default {
  name: 'SimpleSearch',
  components: { TkButton },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      request: '',
    };
  },
  methods: {
    search() {
      this.$emit('input', this.request);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 100vw;
  background-color: #F4F7FF;
  overflow: hidden;
  transition: all .3s ease-out;
  @include flex-center;
  &--inactive {
    height: 0;
    opacity: 0;
  }
  &--active {
    display: flex;
    opacity: 1;
    height: auto;
    box-shadow: inset 0 0 20px 0 rgba(63, 98, 159, 0.15);
  }
  &-form {
    width: 91%;
    display: flex;
    justify-content: center;
    align-items: baseline;

    &__input {
      min-width: 244px;
      margin: 0 16px 0 0;
      border: none;
      background-color: #F4F7FF;
      border-bottom: 1px solid $secondary-gray;
      font-size: $default-mobile;
      line-height: 14px;

      &:focus-visible, &:active {
        outline: none;
        border-bottom: 1px solid $secondary-gray;
      }
    }
    &__btn {
      font-size: $default-mobile;
      min-height: 22px;
      padding: 4px;
      margin: 17px 0 15px 0;
    }
  }
}
</style>
