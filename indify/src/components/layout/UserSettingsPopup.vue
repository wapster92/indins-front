<template>
  <PopupComponent
    v-model="visible"
    hide-title
    @click:confirm="confirm"
    @click:reject="reject"
  >
    <slot
      :get-user="getUser"
      :save-user="saveUser"
    />
    <template #buttons="slotProps">
      <slot
        name="popup-buttons"
        v-bind="slotProps"
      />
    </template>
  </PopupComponent>
</template>

<script>
import { Get, Put, Filter } from 'core-xhr';

export default {
  name: 'UserSettingsPopup',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.visible = val;
      },
    },
    visible(val) {
      if (val !== this.value) this.$emit('input', val);
    },
  },
  methods: {
    getUser() {
      const request = new Get('user-settings')
        .setPage('user-settings')
        .entity()
        .addFilter(new Filter('id', 'eq', 1));
      this.$xhr.send(request)
        .catch(this.$errorHandler('Не удалось получить данные о пользователе!'));
    },
    saveUser(data) {
      const request = new Put('user-settings', data)
        .setPage('user-settings')
        .entity()
        .addFilter(new Filter('id', 'eq', 1));
      this.$xhr.send(request)
        .catch(this.$errorHandler('Не удалось сохранить данные о пользователе!'));
    },
    confirm() {
      this.$emit('click:confirm');
    },
    reject() {
      this.$emit('click:reject');
    },
  },
}
</script>
