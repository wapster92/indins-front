<template>
  <PopupComponent
    v-model="show"
    :title="popupTitle"
    :text="popupMessage"
    :confirm-text="popupConfirm"
    @click:confirm="confirm"
  >
    <template #activator="{ on }">
      <MassiveActionButton
        v-bind="buttonProps"
        :disabled="number === 0"
        :selected="selected"
        text="Восстановить"
        v-on="on"
      />
    </template>
  </PopupComponent>
</template>

<script>
import { Filter, Put } from 'core-xhr';

export default {
  name: 'RestoreMultiple',
  props: {
    selected: {
      type: Array,
      default: () => ([]),
    },
    query: {
      type: [Object, String, null],
      default: null,
    },
    popupTitle: {
      type: String,
      default: 'Восстановление записей',
    },
    popupMessage: {
      type: String,
      default: 'Восстановить все выбранные записи?',
    },
    popupConfirm: {
      type: String,
      default: 'Восстановить',
    },
    buttonProps: {
      type: Object,
      default: () => ({}),
    },
    clearSelection: {
      type: [Function, null],
      default: null,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    deletedItems() {
      return this.selected.filter(el => !!el.deletedAt);
    },
    number() {
      return this.$getType(this.deletedItems) === 'Array'
        ? this.deletedItems.length
        : 0;
    },
  },
  methods: {
    confirm() {
      const type = this.$getType(this.query);
      if (!this.$xhr || (type !== 'String' && type !== 'Object')) {
        this.$store.dispatch(
          'snack/error',
          'Невозможно восстановить записи - не был передан запрос!',
        );
        this.show = false;
        return;
      }

      const request = type === 'Object' ? this.query : new Put(this.query);

      request
        .setData({ deletedAt: null })
        .setFilter([new Filter('id', 'ineq', this.deletedItems.map(el => el.id))])
        .limitStart(0)
        .limitShown(this.deletedItems.length);

      this.$xhr.send(request)
        .then(() => {
          this.show = false;
          if (this.clearSelection) this.clearSelection();
        })
        .catch(this.$errorHandler('Не удалось восстановить элементы!'));
    },
  },
};
</script>
