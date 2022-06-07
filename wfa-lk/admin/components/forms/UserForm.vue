<template>
  <div>
    <v-row class="ma-0">
      <v-col
        v-if="value.hasOwnProperty('name')"
        cols="12"
        sm="6"
        class="pa-0"
      >
        <SimpleText
          v-model="name"
          label="Имя"
          name="name"
          required
        />
      </v-col>
      <v-col
        v-if="value.hasOwnProperty('phone')"
        cols="12"
        sm="6"
        class="pa-0"
      >
        <SimpleText
          v-model="phone"
          mode="phone"
          label="Телефон"
          name="phone"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="pa-0"
      >
        <SimpleText
          v-model="wallet.bonusPoints"
          mode="integer"
          label="Количество бонусных баллов"
          name="bonusPoints"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="pa-0"
      >
        <SimpleText
          v-model="bonusRules.accrualPercentage"
          mode="integer"
          label="Процент начисления"
          name="accrualPercentage"
        />
      </v-col>
      <v-col
        v-if="value.hasOwnProperty('roles')"
        cols="12"
        sm="6"
        class="pa-0"
      >
        <SearchSelect
          v-model="roles"
          :request="roleRequest"
          multiple
          :filter-list="roleFilters"
          item-text="name"
          label="Роли"
          name="plainPassword"
        />
      </v-col>

      <v-col
        v-if="value.hasOwnProperty('username')"
        cols="12"
        sm="6"
        class="pa-0"
      >
        <SimpleText
          v-model="username"
          label="Логин"
          name="login"
          required
        />
      </v-col>
      <v-col
        v-if="value.hasOwnProperty('plainPassword')"
        cols="12"
        sm="6"
        class="pa-0"
      >
        <SimpleText
          v-model="plainPassword"
          label="Пароль"
          name="plainPassword"
        />
      </v-col>

      <v-col
        v-if="value.hasOwnProperty('isActive')"
        cols="12"
        sm="4"
        class=" d-flex align-center"
      >
        <div class="d-flex ">
          <span class="pt-1 pr-1">
            Статус:
          </span>
          <span class="pt-1 pr-1">
            {{ isActive ? '  Активен' : '  Не активен' }}
          </span>
          <SimpleSwitch v-model="isActive" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Get, Simple, Filter } from 'core-xhr';
import { setComputedProperty } from '~/utils/setComputedProperty';

export default {
  name: 'UserForm',
  props: {
    value: {
      type: Object,
      required: true,
    },
    fields: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      signList: [],
      uploadRequest: new Simple(),
      roleRequest: (new Get('roles')),
      roleFilters: [new Filter({
        field: 'id',
        filter: 'eq',
        value: this.$route.name.includes('administrators') ? 1 : 2,
        mandatory: true,
      })],
      directoryRequest: new Get('directories'),
      // validate: () => {},
    };
  },
  computed: {
    ...[
      'surname',
      'name',
      'patronymic',
      'username',
      'plainPassword',
      'isActive',
      'phone',
      'roles',
      'wallet',
      'bonusRules',
    ].reduce((acc, name) => {
      acc[name] = setComputedProperty(name);
      return acc;
    }, {}),
  },
};
</script>
