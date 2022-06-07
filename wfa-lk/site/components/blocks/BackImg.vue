<template>
  <div class="back-img">
    <picture
      v-if="!loading"
      class="back-img__img"
    >
      <img
        v-if="src"
        :src="src"
        alt=""
      >
      <img
        v-else
        src="@/assets/img/cats.jpg"
        alt=""
      >
    </picture>
    <div
      v-else
      class="back-img__loading"
    >
      <Spinner />
    </div>
    <input
      ref="back-img"
      type="file"
      class="back-img__input"
      @change="uploadFiles"
    >
    <ButtonEdit
      class="back-img__upload-btn"
      @click="openFileInput($refs['back-img'])"
    />
  </div>
</template>

<script>
import ButtonEdit from '@/components/UI/blocks/ButtonEdit';
import Spinner from '@/components/UI/blocks/Spinner';

export default {
  name: 'BackImg',
  components: {
    ButtonEdit,
    Spinner,
  },
  props: {
    src: {
      type: String,
      default: '/images/cats.jpg',
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
.back-img
  margin-bottom: 54px
  min-height 100px
  @media screen and (min-width: 1050px)
    min-height 200px
  &__img
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    img
      width: 100%;
      height: 100%;
      object-fit cover
      flex-grow 1
  &__input
    display: none;
  &__upload-btn
    position: absolute;
    bottom: 6%;
    right: 2%;
    @media screen and (min-width: 1050px)
      bottom: 40px
      right: 40px
  &__loading
    max-height 250px
    display  flex
    justify-content: center;
    align-items: center;
    background: $white-main;
    @media screen and (min-width: 1050px)
      max-height  400px
</style>
