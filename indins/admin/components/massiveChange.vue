<template>
  <TitledPopup
    v-model="show"
    :title="title"
    :text="text"
    :confirm-text="confirmText"
    @click:confirm="confirm"
  >
    <template #activator="{on}">
      <button
        :disabled="number === 0"
        class="default-button"
        v-on="on"
      >
        Обработать {{ number }}
      </button>
    </template>
  </TitledPopup>
</template>

<script>
import { Filter } from 'core-xhr';

export default {
  name: 'MassiveChange',
  props: {
    selected: {
      type: Array,
      default: () => ([]),
    },
    request: {
      type: [Object, null],
      default: null,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    item() {
      return this.selected[0] || null;
    },
    title() {
      return this.item && this.item.deleted ? 'Восстановление записей' : 'Обработать записи';
    },
    text() {
      return this.item && this.item.deleted
        ? 'Восстановить все выбранные записи?'
        : 'Обработать все выбранные записи?';
    },
    confirmText() {
      return this.item && this.item.deleted ? 'Восстановить' : 'Обработать';
    },
    number() {
      return this.$getType(this.selected) === 'Array' ? this.selected.length : 0;
    },
  },
  methods: {
    confirm() {
      if (!this.$xhr || !this.request) {
        this.$store.dispatch('snack/error', 'Невозможно обработать записи - не был передан запрос!');
        this.show = false;
        return;
      }

      this.request.setFilter([new Filter('id', 'ineq', this.selected.reduce((acc, sel) => `${acc + sel.id},`, '').slice(0, -1))]);
      // eslint-disable-next-line no-return-assign
      this.$xhr.send(this.request).then(() => this.show = false)
        .catch(console.error);
    },
  },
};
</script>
