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
          v-model="username"
          :rules="[
            uniqMixinFieldMap['username'] || 'Такой логин уже существует'
          ]"
          label="Логин"
          required
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="pa-0 pr-5">
        <SimpleText
          v-model="plainPassword"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'visibility_off' : 'visibility'"
          :required="isAddPage"
          label="Пароль"
          @click:append="showPassword = !showPassword"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="pa-0 pr-5">
        <SimpleText
          v-model="surname"
          label="Фамилия"
          required
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="pa-0 pr-5">
        <SimpleText
          v-model="name"
          label="Имя"
          required
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="pa-0 pr-5">
        <SimpleText
          v-model="patronymic"
          label="Отчество"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="pa-0 pr-5">
        <SimpleText
          v-model="phone"
          label="Телефон"
          required
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="pa-0 pr-5">
        <SimpleText
          v-model="email"
          label="Email"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="pa-0 pr-5">
        <SearchSelect
          v-model="roles"
          :request="roleRequest"
          multiple
          no-deleted-filter
          placeholder="Роли"
          required
        />
      </v-col>
      <v-col
        v-if="(roles || []).some(el => el.keyword === 'CLUB')"
        cols="12"
        sm="6"
        class="pa-0 pr-5">
        <SearchSelect
          v-model="club"
          :request="clubRequest"
          :item-filter="{
            isBlocked: false
          }"
          placeholder="Клуб"
        />
      </v-col>
      <v-col
        v-if="(roles || []).some(el => el.keyword === 'CLUB')"
        cols="12"
        sm="6"
        class="pa-0 pr-5">
        <SimpleText
          v-model="computedBalance"
          :rules="[
            v => !isNaN(parseFloat(v)) || 'Укажите число'
          ]"
          label="Баланс"
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
import { Get } from 'core-xhr';
import { setComputedProperty } from '@/utils';
import uniqMixin from '../../mixins/uniqMixin';

export default {
  name: 'UserForm',
  mixins: [uniqMixin],
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
      roleRequest: new Get('roles'),
      clubRequest: new Get('clubs'),
      showPassword: false,
    };
  },
  computed: {
    ...[
      'username',
      'plainPassword',
      'surname',
      'name',
      'patronymic',
      'phone',
      'email',
      'roles',
      'isBlocked',
      'club',
      'balance',
    ].reduce((acc, name) => {
      acc[name] = setComputedProperty(name);
      return acc;
    }, {}),
    uniqMixinFields() {
      return {
        username: this.username,
      };
    },
    computedBalance: {
      get() {
        return this.balance;
      },
      set(val) {
        this.balance = parseFloat(val);
      },
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      if ((this.roles || []).some(el => el.keyword === 'CLUB') && !this.club) {
        return false;
      }
      return this.valid;
    },
  },
};
</script>

<style lang="stylus" scoped></style>
