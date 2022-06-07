<template>
  <v-container
    fluid
  >
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="4"
        class="exchange-logo-wrapper"
      >
        <v-container>
          <v-row>
            <v-col cols="12">
              <FileUploader
                v-model="logo"
                :class="{ 'has-logo': logo }"
                class="exchange-logo-uploader"
                accept="image/jpeg,image/png,image/gif,image/svg+xml,image/webp,image/apng,image/avif"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="6"
          >
            <TextInput
              v-model="idName"
              label="ID name"
              class="unbordered"
              input-type="standart"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <TextInput
              v-model="ticker"
              label="Тикер"
              input-type="standart"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <TextInput
              v-model="name"
              label="Название"
              input-type="standart"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <TextInput
              v-model="link"
              label="Сайт"
              input-type="standart"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <TextareaInput
          v-model="description"
          label="Описание"
          input-type="standart"
        />
      </v-col>
      <v-col
        cols="12"
      >
        <TextInput
          v-model="github"
          label="Репозиторий"
          input-type="standart"
        />
      </v-col>
      <v-col
        cols="6"
      >
        <SimpleSwitch
          v-model="visible"
          label="Показывать"
          input-type="standart"
        />
      </v-col>
      <v-col
        cols="6"
      >
        <SimpleSwitch
          v-model="isDeleted"
          label="Удалена"
          input-type="standart"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MainInfo',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...[
      'logo',
      'ticker',
      'name',
      'idName',
      'link',
      'description',
      'github',
      'visible',
      'isDeleted',
    ].reduce((acc, name) => {
      acc[name] = {
        get() {
          return this.value[name];
        },
        set(val) {
          this.$emit('input', {
            ...this.value,
            [name]: val,
          });
        },
      };
      return acc;
    }, {}),
  },
};
</script>

<style scoped>

</style>
