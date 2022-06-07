<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="$emit('submit', $event)">
    <v-row class="ml-0">
      <v-col
        v-if="!isAddPage"
        cols="2"
        class="pa-0 pr-5">
        <SimpleText
          v-model="id"
          label="ID клуба"
          readonly
        />
      </v-col>
      <v-col
        v-if="!isAddPage"
        cols="10"
        class="pa-0 pr-5">
        <v-row>
          <SimpleButton
            class="ml-auto mr-3"
            @click="$router.push({name: 'clubs-id-logo', params: {id: $route.params.id}})"
          >Логотип</SimpleButton>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
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
        md="4"
        class="pa-0 pr-5">
        <SimpleText
          v-model="head"
          label="ФИО президента"
          required
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
        class="pa-0 pr-5">
        <SimpleText
          v-model="phone"
          label="Телефон"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
        class="pa-0 pr-5">
        <SimpleTextarea
          v-model="address"
          label="Адрес клуба"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
        class="pa-0 pr-5">
        <SimpleText
          v-model="site"
          label="Сайт"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
        class="pa-0 pr-5">
        <SimpleText
          v-model="email"
          label="Email"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
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
import { setComputedProperty } from '@/utils';

export default {
  name: 'ClubForm',
  props: {
    value: {
      type: Object,
      required: true,
    },
    isAddPage: {
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
      'logo',
      'id',
      'name',
      'head',
      'address',
      'site',
      'email',
      'phone',
      'isBlocked',
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
