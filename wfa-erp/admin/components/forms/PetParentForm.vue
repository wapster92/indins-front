<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="$emit('submit', $event)">
    <v-row class="ml-0">
      <v-col
        cols="12"
        class="pa-0 pr-5">
        <div class="pl-2">Отец</div>
      </v-col>
      <v-col
        cols="12"
        sm="5"
        class="pa-0 pr-5">
        <SearchSelect
          v-model="father"
          :request="petRequest"
          :readonly="readOnly"
          :item-filter="{
            'gender.id': MALE_ID
          }"
          :filter-list="filterList"
          placeholder="Кличка"
        />
      </v-col>
      <v-col
        cols="12"
        sm="3"
        class="pa-0 pr-5">
        <SimpleText
          :value="(father || {}).breedingNumber"
          label="Номер"
          readonly
        />
      </v-col>
      <v-col
        cols="12"
        sm="3"
        class="pa-0 pr-5">
        <SimpleText
          :value="((father || {}).color || {}).name"
          label="Окрас"
          readonly
        />
      </v-col>
      <v-col
        cols="1"
        class="pa-0 pr-5">
        <v-btn
          :href="`/pets/${father ? father.id : ''}`"
          :disabled="!father"
          target="_blank"
          icon
        >
          <v-icon>link</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="ml-0">
      <v-col
        cols="12"
        class="pa-0 pr-5">
        <div class="pl-2">Мать</div>
      </v-col>
      <v-col
        cols="12"
        sm="5"
        class="pa-0 pr-5">
        <SearchSelect
          v-model="mother"
          :request="petRequest"
          :readonly="readOnly"
          :item-filter="{
            'gender.id': FEMALE_ID
          }"
          :filter-list="filterList"
          placeholder="Кличка"
        />
      </v-col>
      <v-col
        cols="12"
        sm="3"
        class="pa-0 pr-5">
        <SimpleText
          :value="(mother || {}).breedingNumber"
          label="Номер"
          readonly
        />
      </v-col>
      <v-col
        cols="12"
        sm="3"
        class="pa-0 pr-5">
        <SimpleText
          :value="((mother || {}).color || {}).name"
          label="Окрас"
          readonly
        />
      </v-col>
      <v-col
        cols="1"
        class="pa-0 pr-5">
        <v-btn
          :href="`/pets/${mother ? mother.id : ''}`"
          :disabled="!mother"
          target="_blank"
          icon
        >
          <v-icon>link</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import { setComputedProperty } from '@/utils';

export default {
  name: 'PetParentForm',
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
      FEMALE_ID: 2,
      MALE_ID: 1,
      searchFather: false,
      searchMother: false,
      valid: true,
      filterList: [
        new Filter({
          field: 'isApproved',
          filter: 'bool',
          value: true,
          mandatory: true,
        }),
      ],
    };
  },
  computed: {
    ...[
      'father',
      'mother',
    ].reduce((acc, name) => {
      acc[name] = setComputedProperty(name);
      return acc;
    }, {}),
    petRequest() {
      return this.readOnly ? new Get('pets-club') : new Get('pets');
    },
  },
  watch: {
    father() {
      this.searchFather = false;
    },
    mother() {
      this.searchMother = false;
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
