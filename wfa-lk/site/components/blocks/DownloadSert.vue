<template>
  <a
    class="link"
  >
    <SvgIcon name="personal-area/download" />
    <span v-if="!generated">Скачать сертификат</span>
    <span v-else>Подождите идет генерация документа</span>
  </a>
</template>

<script>
export default {
  name: 'DownloadSert',
  props: {
    generated: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus" scoped>

.link
  display: flex;
  align-items center
  font-weight: 700;
  transition fill .3s;
  font-size: 14px
  height: 100px;
  background: $white-main;
  flex-direction: column;
  border-radius: 5px
  justify-content: center;
  margin-left: 5px;
  padding: 0 10px;
  @media screen and (min-width: 420px)
    font-size: 18px;
    padding: 0 30px;
  @media screen and (min-width: 517px)
    background: transparent;
    flex-direction: row;
    padding: 0;
  &:hover, &:focus
    cursor pointer
    .icon
      fill: $red-main
  .icon
    width: 12px;
    height: 14px;
    fill $blue-main
    margin-right: 14px
    margin-bottom: 7px
    @media screen and (min-width: 517px)
      margin-bottom: 0
</style>
