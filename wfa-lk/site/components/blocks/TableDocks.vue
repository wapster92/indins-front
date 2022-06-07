<template>
  <div class="table-docs-scroll">
    <div>
      <div class="table-docs">
        <div class="table-docs__row table-docs__row--head">
          <div class="table-docs__column table-docs__column--icon">
            <svg-icon name="personal-area/lapa" />
          </div>
          <div class="table-docs__column table-docs__column--name">
            Кличка
          </div>
          <div class="table-docs__column table-docs__column--color">
            Окрас
          </div>
          <div class="table-docs__column table-docs__column--breed">
            Порода
          </div>
          <div class="table-docs__column table-docs__column--number">
            Номер в реестре
          </div>
          <div class="table-docs__column table-docs__column--owner">
            Владелец
          </div>
        </div>
        <div
          v-for="pet of pets"
          class="table-docs__row table-docs__row--item"
          @click="goToPet(pet.id)"
        >
          <div class="table-docs__column table-docs__column--icon">
            <svg-icon
              v-show="pet.isManufacturer"
              name="personal-area/lapa"
            />
          </div>
          <div class="table-docs__column table-docs__column--name">
            {{ pet.name }}
          </div>
          <div class="table-docs__column table-docs__column--color">
            {{ (pet.color || {}).code || null }}
          </div>
          <div class="table-docs__column table-docs__column--breed">
            {{ (pet.breed || {}).code || null }}
          </div>
          <div class="table-docs__column table-docs__column--number">
            {{ pet.breedingNumber }}
          </div>
          <div class="table-docs__column table-docs__column--owner">
            {{ pet.fullNameOfOwner }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'TableDocks',
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    pets: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    goToPet(id) {
      this.$router.push({ path: `/personal-area/pets-and-docks/${id}` });
    },
  },
};
</script>

<style lang="stylus">
.table-docs-scroll
  width: 100%
  overflow auto
  display flex
  &::-webkit-scrollbar
    display:none;

.table-docs
  display grid
  grid-template-columns 1fr
  grid-auto-rows 49px
  grid-row-gap 1px
  background: $grey-stroke;
  padding: 1px;
  border-radius: 5px;
  overflow-y scroll
  max-height 552px
  min-width 100px
  width: 100%
  &__row
    display: grid;
    grid-template-columns 50px minmax(300px, 1fr) 150px 150px 200px minmax(300px, 1fr)
    background: $white-main;
    cursor pointer
    transition background-color .3s
    &--item
      &:hover, &:focus
        background: $grey-stroke;
    &:first-child
      border-top-right-radius 5px
      border-top-left-radius 5px
    &:last-child
      border-bottom-left-radius 5px
      border-bottom-right-radius 5px
    &--head
      background: $grey-1;
      font-weight: 500;
      font-size: 16px
      .table-docs__column--icon
        fill #B2BED3
  &__column
    display: flex;
    align-items center
    padding: 0 15px;
    &--icon
      justify-content center
      fill $blue-secondary
      .icon
        width: 20px
        height: 18px;

</style>
