<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="$emit('submit', $event)">
    <v-row class="ml-0">
      <v-col
        cols="12"
        sm="5"
        class="pa-0 pr-5">
        <SimpleText
          v-model="fullNameOfBreeder"
          :readonly="readOnly"
          label="ФИО"
          required
        />
      </v-col>
      <v-col
        cols="12"
        sm="4"
        class="pa-0 pr-5">
        <SimpleText
          v-mask="$utils.masks.phone"
          v-model="phoneOfBreeder"
          :readonly="readOnly"
          label="Телефон"
          required
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { setComputedProperty } from '@/utils';

export default {
  name: 'PetBreederForm',
  props: {
    value: {
      type: Object,
      required: true,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: true,
    };
  },
  computed: {
    ...[
      'fullNameOfBreeder',
      'phoneOfBreeder',
    ].reduce((acc, name) => {
      acc[name] = setComputedProperty(name);
      return acc;
    }, {}),
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
