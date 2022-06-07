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
          v-model="shortName"
          label="Код"
          required
        />
      </v-col>
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
    </v-row>
  </v-form>
</template>

<script>
import { setComputedProperty } from '@/utils';

export default {
  name: 'TitleForm',
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
      'shortName',
      'name',
      'translatedName',
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
