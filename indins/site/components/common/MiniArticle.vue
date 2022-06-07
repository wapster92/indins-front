<template>
  <div class="mini-article">
    <div class="container">
      <div class="head">
        <SvgSprite
          :icon="icon"
          class="icon"
        />
        <h3 class="title">{{ title }}</h3>
      </div>
      <div class="body">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import SvgSprite from '@/components/common/svg/SvgSprite'
export default {
  name: 'MiniArticle',
  components: {
    SvgSprite
  },
  props: {
    icon: {
      type: String,
      default: '',
      required: true,
    },
    title: {
      type: String,
      default: '',
      required: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
.mini-article
  margin-top: 42px;
  @media screen and (max-width: 580px)
    overflow hidden
.container
  max-width 1188px;
  margin auto;
  padding: 0 24px;
.head
  display flex
  align-items center
  padding: 31px 38px;
  max-width 411px
  width: 100%;
  height: 132px;
  margin: 0 auto 27px;
  background: #F4F5F8;
  position: relative;
  &:after, &:before
    content: '';
    position absolute
    top: 0
    height 100%;
    width: 55px;
    background: #F4F5F8;
  &:before
    left: -55px;
    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 100%, 100% 50%);
  &:after
    right: -55px;
    clip-path: polygon(0% 0%, 100% 0, 0 50%, 100% 100%, 0% 100%);
  @media screen and (max-width: 580px)
    max-width 330px
    height: 120px;
    padding: 31px 21px;
.title
  font-weight: 700
  font-size: 25px
  color: #637EA8;
  margin-left: 98px;
  @media screen and (max-width: 580px)
    font-size: 20px
    margin-left: 67px;
.icon
  max-height 69px
  max-width 69px
  position absolute
  left: 30px;
  top: 0
  bottom: 0
  margin: auto 0;
  @media screen and (max-width: 580px)
    max-height 50px
    max-width 50px
    left: 20px
</style>
