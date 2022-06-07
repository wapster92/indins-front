<template>
  <button
    class="button-edit"
    @click="$emit('click')"
  >
    <svg-icon name="UI/edit" />
  </button>
</template>

<script>
export default {
  name: 'ButtonEdit',
};
</script>

<style lang="stylus" scoped>
.button-edit
  display: flex;
  justify-content center
  align-items center
  width: 30px;
  height: 30px;
  background: $white-main;
  border: 2px solid $blue-main;
  border-radius: 5px;
  cursor pointer
  transition: border-color .3s
  padding: 0
  @media screen and (min-width: 1050px)
    width: 40px;
    height: 40px
  &:hover, &:focus
    border-color: $red-main;
    .icon
      fill $red-main;
  .icon
    width: 15px;
    height: 15px;
    transition fill .3s
    fill $blue-main;
</style>
