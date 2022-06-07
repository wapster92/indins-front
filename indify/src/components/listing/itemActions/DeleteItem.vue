<template>
  <button
    v-if="show"
    class="listing-icon-button"
    @click="openPopup"
  >
    <v-icon size="18">
      {{ icon }}
    </v-icon>
  </button>
</template>

<script>
export default {
  name: 'DeleteItem',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    urlKey: {
      type: String,
      default: '',
    },
    listingKey: {
      type: String,
      default: null,
    },
    noRestore: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isDeleted() {
      return this.item && !!this.item.deletedAt;
    },
    icon() {
      return this.isDeleted ? 'restore_from_trash' : 'delete';
    },
    show() {
      return !this.noRestore || (this.noRestore && !this.isDeleted);
    },
  },
  methods: {
    openPopup() {
      this.$eventBus.emit('delete-popup', {
        item: this.item,
        urlKey: this.urlKey,
        listingKey: this.listingKey,
      });
    },
  },
};
</script>
