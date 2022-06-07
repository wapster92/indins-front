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
          :request="shelterRequest"
          :readonly="readOnly"
          item-text="translatedName"
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
          :value="owner"
          label="ФИО владельца"
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
    </v-row>
  </v-form>
</template>

<script>
import { Get } from 'core-xhr';

export default {
  name: 'PetShelterForm',
  props: {
    value: {
      type: Object,
      required: false,
      default: null,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: true,
      shelterRequest: new Get('shelters'),
    };
  },
  computed: {
    owner() {
      return (this.value || {}).owner;
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
