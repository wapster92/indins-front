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
          v-model="fullNameOfOwner"
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
          v-model="phoneOfOwner"
          :readonly="readOnly"
          label="Телефон"
          required
        />
      </v-col>
      <v-col
        cols="6"
        class="pa-0 pr-5">
        <SimpleText
          v-model="addressOfOwner"
          :readonly="readOnly"
          label="Адрес"
          required
        />
      </v-col>
      <v-col
        cols="6"
        class="pa-0 pr-5">
        <SearchSelect
          v-model="shelter"
          :request="shelterRequest"
          :readonly="readOnly || !canChangeShelter"
          :clearable="!(readOnly || !canChangeShelter)"
          item-text="translatedName"
          list-width="200"
          no-deleted-filter
          placeholder="Питомник"
        />
      </v-col>
    </v-row>
    <slot/>
  </v-form>
</template>

<script>
// import { setComputedProperty } from '@/utils';
import { Get } from 'core-xhr';

const setComputedProperty = name => ({
  get() {
    return this.value[name];
  },
  set(value) {
    this.value[name] = value;
    this.$emit('input', {
      ...this.value,
      [name]: value,
    });
  },
});
export default {
  name: 'PetOwnerForm',
  props: {
    value: {
      type: Object,
      required: true,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    canChangeShelter: {
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
    ...[
      'fullNameOfOwner',
      'phoneOfOwner',
      'nurseryOfOwner',
      'addressOfOwner',
      'shelter',
    ].reduce((acc, name) => {
      acc[name] = setComputedProperty(name);
      return acc;
    }, {}),
  },
  watch: {
    shelter(val, oldVal) {
      this.$nextTick(() => {
        if (val !== oldVal) {
          this.fullNameOfOwner = val.owner;
          this.phoneOfOwner = val.phone;
          this.addressOfOwner = val.address;
        }
      });
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
