<template>
  <div class="pet-card-information">
    <div class="pet-card-information__container semi-container">
      <div class="pet-card-information__avatar">
        <PetAvatar :src="src" />
      </div>
      <div class="pet-card-information__info">
        <span
          v-show="viewTitles"
          class="pet-card-information__title"
        >
          {{ viewTitles }}
        </span>
        <span class="pet-card-information__name">
          {{ name }}
        </span>
        <p class="pet-card-information__shelter-name">
          {{ shelter }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import PetAvatar from '@/components/blocks/PetAvatar';

export default {
  name: 'PetCardInformation',
  components: {
    PetAvatar,
  },
  props: {
    src: {
      type: String,
      default: '',
    },
    titles: {
      type: Array,
      default: () => ([]),
    },
    name: {
      type: String,
      default: '',
    },
    shelter: {
      type: String,
      default: '',
    },
  },
  computed: {
    viewTitles() {
      if (this.titles.length <= 0) return '';
      return this.titles.map(n => n.shortName).join(', ');
    },
  },
};
</script>

<style lang="stylus" scoped>
.pet-card-information
  padding: 0 0 30px;
  &__container
    display flex
    flex-direction column
    @media screen and (min-width 640px)
      flex-direction row

  &__avatar
    margin-bottom: 20px
    display flex
    justify-content: center;

  &__info
    font-weight: 300
    font-size: 20px;
    text-align: center;
    color: $grey-2;
    padding: 15px
  &__title
    color: $red-secondary;
    display: inline-block;
    margin-right: 10px
  &__shelter-name
    margin-top: 20px
</style>
