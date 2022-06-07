<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="$emit('submit', $event)">
    <v-row class="ml-0">
      <v-col
        cols="12"
        sm="4"
        class="pa-0 pr-5">
        <v-menu
          :value="nameFocus && pets.length"
          offset-y
          max-height="60vh"
        >
          <template #activator="{ on }">
            <SimpleText
              ref="name"
              v-model="name"
              :prefix="namePrefix"
              :readonly="readOnly"
              label="Кличка"
              required
              v-on="on"
              @click.native="nameFocus = true"
              @blur="nameFocus = false"
            />
          </template>
          <v-list>
            <v-list-item
              v-for="(pet, index) in pets"
              :key="index"
            >
              <v-list-item-title>{{ pet.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col
        cols="12"
        sm="2"
        class="pa-0 pr-5">
        <SearchSelect
          v-model="gender"
          :request="genderRequest"
          :readonly="readOnly"
          list-width="100"
          no-deleted-filter
          placeholder="Пол"
          required
        />
      </v-col>
      <v-col
        cols="12"
        sm="4"
        class="pa-0 pr-5">
        <SimpleText
          v-model="breedingNumber"
          label="Номер"
          readonly
        />
      </v-col>
      <v-col
        cols="12"
        sm="2"
        class="pa-0 pr-5">
        <SearchSelect
          v-model="breedingNumberIndex"
          :request="breedingNumberIndexRequest"
          :readonly="readOnly"
          list-width="100"
          no-deleted-filter
          required
        />
      </v-col>
      <v-col
        cols="12"
        sm="3"
        class="pa-0 pr-5">
        <DateTimeField
          v-model="dateOfBirth"
          :readonly="readOnly"
          label="Дата рождения"
        />
      </v-col>
      <v-col
        cols="12"
        sm="3"
        class="pa-0 pr-5">
        <SearchSelect
          v-model="breed"
          :request="breedRequest"
          :readonly="readOnly"
          no-deleted-filter
          item-text="code"
          placeholder="Порода"
          list-width="300"
          required
        />
      </v-col>
      <v-col
        cols="12"
        sm="3"
        class="pa-0 pr-5">
        <SearchSelect
          v-model="color"
          :request="colorRequest"
          :readonly="readOnly"
          no-deleted-filter
          item-text="code"
          placeholder="Окрас"
          list-width="300"
          required
        />
      </v-col>
      <v-col
        cols="12"
        sm="3"
        class="pa-0 pr-5">
        <SimpleText
          v-model="oldNumber"
          :readonly="readOnly"
          label="Старый номер"
        />
      </v-col>
      <v-col
        cols="12"
        sm="3"
        class="pa-0 pr-5">
        <SimpleText
          v-model="chipNumber"
          :readonly="readOnly"
          label="Номер чипа"
        />
      </v-col>
      <v-col
        cols="12"
        sm="9"
        class="pa-0 pr-5">
        <SearchSelect
          v-model="titles"
          :request="titleRequest"
          :readonly="readOnly"
          :items-per-page="100"
          multiple
          no-deleted-filter
          placeholder="Титул"
          @click.native.capture="(evt) => {
            if (readOnly) {
              evt.stopPropagation()
              evt.preventDefault()
            }
          }"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import { setComputedProperty } from '@/utils';

export default {
  name: 'PetForm',
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
      genderRequest: new Get('genders'),
      breedingNumberIndexRequest: new Get('breedingNumberIndices'),
      breedRequest: new Get('breeds'),
      colorRequest: new Get('colors'),
      titleRequest: new Get('titles'),
      pets: [],
      nameFocus: false,
    };
  },
  computed: {
    ...[
      'name',
      'gender',
      'breedingNumber',
      'breedingNumberIndex',
      'dateOfBirth',
      'breed',
      'color',
      'oldNumber',
      'chipNumber',
      'titles',
    ].reduce((acc, name) => {
      acc[name] = setComputedProperty(name);
      return acc;
    }, {}),
    namePrefix() {
      return this.titles?.map(el => el.shortName).filter(el => el).join();
    },
  },
  watch: {
    name: {
      handler() {
        if (!this.readOnly) {
          this.getPets();
        }
      },
      immediate: true,
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      if (
        !this.gender
          || !this.breedingNumberIndex
          || !this.breed
          || !this.color
      ) {
        return false;
      }
      return this.valid;
    },
    async getPets() {
      const petRequest = (new Get('pets'))
        .collection()
        .addFilter(new Filter({
          field: 'deletedAt',
          filter: 'exists',
          value: false,
        }))
        .addFilter(new Filter({
          field: 'name',
          filter: 'like',
          value: this.name,
        }))
        .pagination(true)
        .count(true)
        .limitStart(0)
        .limitShown(50);
      const result = await this.$xhr.send(petRequest)
        .then(resp => resp.data.data.result)
        .catch(e => {
          this.$store.dispatch('snack/error', e.message || e.error);
        });
      this.pets = result;
    },
  },
};
</script>

<style lang="stylus" scoped></style>
