<template>
  <PopupComponent
    v-model="show"
    :title="popupTitle"
    :text="popupMessage"
    :confirm-text="popupConfirm"
    @click:confirm="confirm"
  >
    <template #activator="{on}">
      <MassiveActionButton
        v-bind="buttonProps"
        :disabled="number === 0"
        :selected="selected"
        text="Удалить"
        v-on="on"
      />
    </template>
  </PopupComponent>
</template>

<script>
import { Filter, Delete } from 'core-xhr';

export default {
  name: 'DeleteMultiple',
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
      default: 'Удаление записей',
    },
    popupMessage: {
      type: String,
      default: 'Удалить все выбранные записи?',
    },
    popupConfirm: {
      type: String,
      default: 'Удалить',
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
    notDeletedItems() {
      return this.selected.filter(el => !el.deletedAt);
    },
    number() {
      return this.$getType(this.notDeletedItems) === 'Array'
        ? this.notDeletedItems.length
        : 0;
    },
  },
  methods: {
    confirm() {
      const type = this.$getType(this.query);
      if (!this.$xhr || (type !== 'String' && type !== 'Object')) {
        this.$store.dispatch(
          'snack/error',
          'Невозможно удалить записи - не был передан запрос!',
        );
        this.show = false;
        return;
      }

      const request = type === 'Object' ? this.query : new Delete(this.query);

      request
        .setFilter([new Filter('id', 'ineq', this.notDeletedItems.map(el => el.id))])
        .limitStart(0)
        .limitShown(this.notDeletedItems.length);

      this.$xhr.send(request)
        .then(() => {
          this.show = false;
          if (this.clearSelection) this.clearSelection();
        })
        .catch(this.$errorHandler('Не удалось удалить элементы!'));
    },
  },
};
</script>
