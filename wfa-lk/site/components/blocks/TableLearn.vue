<template>
  <div class="table-learn-scroll">
    <div>
      <div class="table-learn">
        <div class="table-learn__row table-learn__row--head">
          <div class="table-learn__column table-learn__column--icon" />
          <div class="table-learn__column table-learn__column--name">
            Название
          </div>
          <div class="table-learn__column table-learn__column--learns">
            Количество лекций
          </div>
          <div class="table-learn__column table-learn__column--sum">
            Стоимость
          </div>
        </div>
        <div
          v-for="learn in learnsTransform"
          :key="learn.id"
          class="table-learn__row table-learn__row--item"
        >
          <div class="table-learn__column table-learn__column--icon">
            <div
              class="checker"
              :class="{'checker--active': learn.checked}"
              @click="check(learn)"
            >
              <SvgIcon name="personal-area/checker" />
            </div>
          </div>
          <div class="table-learn__column table-learn__column--name">
            {{ learn.serviceType.type }}
          </div>
          <div class="table-learn__column table-learn__column--learns">
            {{ learn.serviceType.lessonsNumber }}
          </div>
          <div class="table-learn__column table-learn__column--sum">
            {{ learn.cost }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableLearn',
  props: {
    learns: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      learnsTransform: this.transformData(),
    };
  },
  methods: {
    transformData() {
      return this.learns.reduce((acc, k) => {
        acc[k.id] = { ...k, checked: false };
        return acc;
      }, {});
    },
    check(val) {
      val.checked = !val.checked;
      const arr = Object.values(this.learnsTransform).filter(el => el.checked)
        .map(el => ({
          serviceTypeId: el.serviceType.id,
          cost: el.cost,
        }));
      this.$emit('input', arr);
    },
  },
};
</script>

<style lang="stylus" scoped>
.table-learn-scroll
  width: 100%
  overflow auto
  display flex
  &::-webkit-scrollbar
    display:none;

.table-learn
  display grid
  grid-template-columns 1fr
  grid-auto-rows 49px
  grid-row-gap 1px
  background: $grey-stroke;
  padding: 1px;
  border-radius: 5px;
  //overflow hidden
  min-width 100px
  width: 100%
  &__row
    display: grid;
    grid-template-columns 50px minmax(300px, 1fr) minmax(100px, 185px) minmax(100px, 130px)
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
      .table-learn__column--icon
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
.checker
  width: 18px;
  height: 18px;
  fill transparent
  border: 2px solid $blue-secondary;
  border-radius: 2px;
  position: relative;
  transition fill .3s
  cursor pointer
  &--active
    fill $blue-main
  .icon
    width: 18px
    height: 18px
    position: absolute;
    top: -2px
    left: -2px
</style>
