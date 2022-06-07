<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="$emit('submit', $event)">
    <v-row class="ml-0">
      <v-col
        cols="12"
        sm="6"
        md="4"
        class="pa-0 pr-5">
        <SearchSelect
          :value="value"
          :request="clubRequest"
          :readonly="readOnly"
          item-text="name"
          list-width="200"
          no-deleted-filter
          placeholder="Название"
          clearable
          @input="$emit('input', $event)"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
        class="pa-0 pr-5">
        <SimpleText
          :value="head"
          label="ФИО президента"
          readonly
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
        class="pa-0 pr-5">
        <SimpleText
          :value="phone"
          label="Телефон"
          readonly
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="8"
        class="pa-0 pr-5">
        <SimpleTextarea
          :value="address"
          label="Адрес клуба"
          readonly
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
        class="pa-0 pr-5">
        <SimpleText
          :value="site"
          label="Сайт"
          readonly
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { Get } from 'core-xhr';

export default {
  name: 'PetClubForm',
  props: {
    value: {
      type: Object,
      required: false,
      default: null,
    },
    isAddPage: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: true,
      clubRequest: new Get('clubs'),
    };
  },
  computed: {
    head() {
      return (this.value || {}).head;
    },
    address() {
      return (this.value || {}).address;
    },
    site() {
      return (this.value || {}).site;
    },
    phone() {
      return (this.value || {}).phone;
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      return this.valid;
    },
  },
};
</script>

<style lang="stylus" scoped></style>
