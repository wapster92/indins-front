<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="$emit('submit', $event)">
    <v-row class="ml-0">
      <v-col
        cols="12"
        sm="6"
        class="pa-0 pr-5">
        <SimpleText
          v-model="name"
          label="Название"
          required
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="pa-0 pr-5">
        <SimpleText
          v-model="translatedName"
          label="Название (eng)"
          required
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="pa-0 pr-5">
        <SimpleText
          v-model="number"
          label="Регистрационный номер"
          readonly
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="pa-0 pr-5">
        <SimpleText
          v-model="owner"
          label="ФИО владельца"
          required
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="pa-0 pr-5">
        <SimpleText
          v-model="oldNumber"
          label="Старый рег.номер"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="pa-0 pr-5">
        <SimpleText
          v-mask="'+7 (###) ###-##-##'"
          v-model="phone"
          label="Телефон"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="pa-0 pr-5">
        <SimpleText
          v-model="address"
          label="Адрес"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="pa-0 pr-5 mb-7">
        <SimpleText
          v-model="email"
          mode="email"
          label="E-mail"
        />
      </v-col>
      <v-col
        cols="12"
        sm="3"
        class="pa-0 pr-5 mb-7">
        <SimpleSwitch
          v-model="isBlocked"
          label="Заблокирован"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mask } from 'vue-the-mask';
import { setComputedProperty } from '@/utils';

export default {
  name: 'ShelterForm',
  directives: {
    mask,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      valid: true,
    };
  },
  computed: {
    ...[
      'name',
      'translatedName',
      'number',
      'oldNumber',
      'owner',
      'phone',
      'email',
      'address',
      'isBlocked',
    ].reduce((acc, name) => {
      acc[name] = setComputedProperty(name);
      return acc;
    }, {}),
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      if (
        !this.name
        || !this.translatedName
        || !this.owner
      ) {
        return false;
      }
      return this.valid;
    },
  },
};
</script>
