<template>
  <el-popover
    :visible-arrow="false"
    placement="top"
    width="271"
    trigger="hover">
    <template #default>
      <slot name="content">
        <span class="el-popover__content-default">
          Оценка рассчитывается на основании фундаментальных и финансовых показателей
        </span>
      </slot>
    </template>
    <template #reference>
      <slot>sdfsdf</slot>
    </template>
  </el-popover>
</template>

<script>
import ElPopover from 'element-ui/lib/popover';
import 'element-ui/lib/theme-chalk/popover.css';

export default {
  name: 'TkPopover',
  components: { ElPopover },
};

</script>

<style lang="scss" scoped>
.el-popover__content-default {
  font-size: 16px;
  color: $secondary-medium-black;
  word-break: normal;
  text-align: left;
  @include flex-start;
}
</style>

<style lang="scss">
.el-popover {
  display: none;
  @media only screen and (min-width: $md) {
    display: block;
    border-radius: 8px;
    filter: drop-shadow(0 0 rgba(63, 98, 159, 0.1));
    padding: 18px;
  }
}
</style>
