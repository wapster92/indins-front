<template>
  <div class="avatar">
    <div class="avatar__wrap">
      <picture v-if="!loading" class="avatar__picture">
        <img
          v-if="src"
          :src="src"
          alt=""
        >
        <img
          v-else
          src="@/assets/img/logo.jpg"
          alt=""
        >
      </picture>
      <div v-else class="avatar__loading">
        <Spinner></Spinner>
      </div>
      <input
        ref="avatar"
        type="file"
        class="avatar__input"
        @change="uploadFiles"
      >
      <ButtonEdit
        class="avatar__upload-btn"
        @click="openFileInput($refs.avatar)"
      />
    </div>
  </div>
</template>

<script>
import ButtonEdit from '@/components/UI/blocks/ButtonEdit';
import Spinner from "@/components/UI/blocks/Spinner";
export default {
  name: 'AvatarBlock',
  components: {
    ButtonEdit,
    Spinner
  },
  props: {
    src: {
      type: String,
      default: '/images/avatar.jpg',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    uploadFiles(e) {
      const file = e.target.files[0];
      this.$emit('change', file);
    },
    openFileInput(el) {
      el.click();
    },
  },
};
</script>

<style lang="stylus" scoped>
.avatar
  position: relative;
  width: 100px;
  height: 100px;
  overflow hidden
  @media screen and (min-width: 1050px)
    width: 200px;
    height: 200px;
  &__wrap
    width: 100%
    height: 100%
  &__input
    display: none;

  &__picture
    width: 100%
    height: 100%
    img
      width: 100%;
      height: 100%;
      object-fit cover
  &__loading
    width: 100%;
    height: 100%;
    background: #000;
  &__upload-btn
    position: absolute;
    bottom: 10px;
    right: 10px;
    @media screen and (min-width: 1050px)
      bottom: 20px;
      right 20px;
</style>
