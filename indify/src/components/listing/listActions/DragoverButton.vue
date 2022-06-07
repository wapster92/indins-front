<template>
  <div class="dragover-button">
    <SimpleButton
      v-if="!somethingIsDragged"
      v-bind="$attrs"
      v-on="$listeners"
    >
      {{ label }}
    </SimpleButton>
    <div
      v-else
      class="dragover-field"
      :class="{ 'is-hovered': hoverEffect }"
      @dragover="draggedOver"
      @dragleave="draggedOut"
    >
      <span>{{ label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DragoverButton',
  inject: {
    draggedItem: {
      default: null,
    },
  },
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      hoverEffect: false,
    };
  },
  computed: {
    somethingIsDragged() {
      return this.draggedItem?.item !== null;
    },
  },
  watch: {
    'draggedItem.item': function (val, oldVal) {
      if (!val && oldVal && this.hoverEffect) this.emitEvent(oldVal);
      this.hoverEffect = false;
    },
  },
  methods: {
    draggedOver() {
      this.hoverEffect = true;
    },
    draggedOut() {
      this.hoverEffect = false;
    },
    emitEvent(item) {
      this.$emit('item-drop', item);
    },
  },
};
</script>

<style lang="stylus">
dashed_border_small($color = #dadada)
  return linear-gradient(to right, $color 60%, rgba(255,255,255,0) 0%) bottom\/10px 1px repeat-x\,
  linear-gradient($color 60%, rgba(255,255,255,0) 0%) right\/1px 10px repeat-y\,
  linear-gradient(to right, $color 60%, rgba(255,255,255,0) 0%) top\/10px 1px repeat-x\,
  linear-gradient($color 60%, rgba(255,255,255,0) 0%) left\/1px 10px repeat-y

.dragover-field
  display: flex
  flex-flow: row nowrap
  justify-content: center
  padding: 31px
  background: dashed_border_small()
  &.is-hovered
    background: dashed_border_small(#416FC8)
</style>
