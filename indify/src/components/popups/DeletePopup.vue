<template>
  <PopupComponent
    v-model="show"
    :title="title"
    :text="text"
    :confirm-text="confirmText"
    @click:confirm="confirm"
  />
</template>

<script>
import { Delete, Filter, Put } from 'core-xhr';

export default {
  name: 'DeletePopup',
  props: {
    listingKey: {
      type: [String, null],
      default: null,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
      item: null,
      urlKey: '',
    };
  },
  computed: {
    isDeleted() {
      return this.item && !!this.item.deletedAt;
    },
    title() {
      return this.isDeleted ? 'Восстановление записи' : 'Удаление записи';
    },
    text() {
      return this.isDeleted
        ? 'Вы уверены что хотите восстановить запись?'
        : 'Вы уверены что хотите удалить запись?';
    },
    confirmText() {
      return this.isDeleted ? 'Восстановить' : 'Удалить';
    },
  },
  watch: {
    show(val) {
      if (!val) this.item = null;
      if (val === this.value) return;
      this.$emit('input', val);
    },
    value: {
      immediate: true,
      handler(val) {
        this.show = val;
      },
    },
  },
  mounted() {
    this.$eventBus.on('delete-popup', this.handler);
  },
  beforeDestroy() {
    this.$eventBus.off('delete-popup', this.handler);
  },
  methods: {
    openPopup({ item, urlKey }) {
      this.show = true;
      this.item = item;
      this.urlKey = urlKey;
    },
    createRequest() {
      if (this.isDeleted) {
        return new Put(this.urlKey)
          .entity()
          .setData({ deletedAt: null })
          .addFilter(new Filter('id', 'eq', this.item.id));
      }

      return new Delete(this.urlKey)
        .entity()
        .addFilter(new Filter('id', 'eq', this.item.id));
    },
    confirm() {
      const errorMessage = this.isDeleted
        ? 'Не удалось восстановить запись'
        : 'Не удалось удалить запись';
      if (!this.urlKey) {
        this.$store.dispatch(
          'snack/error',
          `${errorMessage} - не передан запрос!`,
        );
        this.reset();
        return;
      }
      const request = this.createRequest();
      this.$xhr.send(request)
        .then(() => {
          this.$emit(`success-${this.isDeleted ? 'restore' : 'delete'}`);
          this.reset();
        })
        .catch(this.$errorHandler(errorMessage));
    },
    reset() {
      this.item = null;
      this.urlKey = '';
      this.show = false;
    },
    handler(data) {
      if (data.listingKey === this.listingKey) this.openPopup(data);
    },
  },
};
</script>
