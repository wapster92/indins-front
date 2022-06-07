<template>
  <div class="massive-actions-wrapper">
    <MassiveActions v-if="!isMobile">
      <slot></slot>
    </MassiveActions>
    <MassiveActionsPopup v-else>
      <slot></slot>
    </MassiveActionsPopup>
  </div>
</template>
<script>
import MassiveActions from './MassiveActions';
import MassiveActionsPopup from './MassiveActionsPopup';

export default {
  name: 'MassiveActionsWrapper',
  components: {
    MassiveActions, MassiveActionsPopup,
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
}
</script>

<style lang="stylus">
@media (max-width: 959px)
  .massive-actions-wrapper
    width: 100%
</style>