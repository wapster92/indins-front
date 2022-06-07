<template>
  <div class="search">
    <ElInput
      v-model="innerValue"
      v-bind="$attrs"
      :placeholder="placeholder"
      class="search__input"
      @clear="$emit('input-clear')">
      <ElButton
        slot="append"
        class="search__button"
        icon="el-icon-search"
        @click.stop="$emit('click')"/>
    </ElInput>
  </div>
</template>

<script>
import ElInput from 'element-ui/lib/input';
import ElButton from 'element-ui/lib/button';
import 'element-ui/lib/theme-chalk/icon.css';
import 'element-ui/lib/theme-chalk/input.css';
import 'element-ui/lib/theme-chalk/button.css';

export default {
  name: 'TkSearch',
  components: {
    ElInput,
    ElButton,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localValue: '',
    };
  },
  computed: {
    innerValue: {
      get() { return this.value || this.localValue; },
      set(val) {
        this.localValue = val;
        this.$emit('input', val);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.search {
  height: 30px;
  @include min-media($md) {
    height: 40px;
  }
  &__input {
    height: 100%;
    &::v-deep .el-input__inner {
      height: 100%;
    }
  }
  &__button {
    width: 40px;
    height: 100%;
    &.el-button {
      padding: 0;
      background: $secondary-white;
    }
  }
}
</style>
