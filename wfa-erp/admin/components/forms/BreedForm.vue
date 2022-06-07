<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="$emit('submit', $event)">
    <v-row class="ml-0">
      <v-col
        cols="12"
        class="pa-0 pr-5">
        <SimpleText
          v-model="name"
          :rules="[
            uniqMixinFieldMap['name'] || 'Такое название уже существует'
          ]"
          label="Название"
          required
        />
      </v-col>
      <v-col
        cols="12"
        class="pa-0 pr-5">
        <SimpleText
          v-model="code"
          label="Код"
          required
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { setComputedProperty } from '@/utils';
import uniqMixin from '../../mixins/uniqMixin';

export default {
  name: 'BreedForm',
  mixins: [uniqMixin],
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
      'code',
    ].reduce((acc, name) => {
      acc[name] = setComputedProperty(name);
      return acc;
    }, {}),
    uniqMixinFields() {
      return {
        name: this.name,
      };
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
