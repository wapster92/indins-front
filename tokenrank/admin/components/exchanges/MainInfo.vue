<template>
  <PageBlock title="Основная информация">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="4"
        class="exchange-logo-wrapper"
      >
        <FileUploader
          v-model="exchange.logo"
          :class="{ 'has-logo': exchange.logo }"
          class="exchange-logo-uploader"
          accept="image/jpeg,image/png,image/gif,image/svg+xml,image/webp,image/apng,image/avif"
          @input="$emit('input')"
        />
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
              v-model="exchange.idName"
              label="ID name"
              name="idName"
              class="unbordered"
              input-type="standart"
              required
              @input="$emit('input')"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <TextInput
              v-model="totalVolume"
              label="Объем за 24 ч, $"
              class="unbordered"
              name="volume"
              readonly
              input-type="standart"
              @input="$emit('input')"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="12"
          >
            <TextInput
              v-model="exchange.name"
              label="Название"
              input-type="standart"
              required
              @input="$emit('input')"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="6"
          >
            <TextInput
              v-model="exchange.year"
              label="Год"
              name="year"
              input-type="standart"
              @input="$emit('input')"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <TextInput
              v-model="exchange.country"
              label="Страна"
              input-type="standart"
              @input="$emit('input')"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row
      class="custom-row"
      no-gutters
    >
      <v-col
        cols="12"
        sm="12"
      >
        <TextareaInput
          v-model="exchange.description"
          label="Описание"
          input-type="standart"
          @input="$emit('input')"
        />
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col
        cols="12"
        sm="6"
      >
        <SimpleSwitch
          v-model="exchange.visible"
          label="Показывать"
          input-type="standart"
          @click="exchange.visible = !exchange.visible"
          @input="$emit('input')"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <SimpleSwitch
          v-model="exchange.isActual"
          label="Учитывать в статистике"
          input-type="standart"
          @click="exchange.isActual = !exchange.isActual"
          @input="$emit('input')"
        />
      </v-col>
    </v-row>
  </PageBlock>
</template>

<script>
export default {
  name: 'MainInfo',
  props: {
    exc: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      exchange: null,
    };
  },
  computed: {
    totalVolume() {
      return Number(this.exchange.volume).toLocaleString('ru-RU');
    },
  },
  created() {
    this.exchange = this.exc;
  },
};
</script>

<style lang="stylus" scoped>
.exchange-logo-uploader
  padding: 0 12px 0
  .file-uploader
    padding: 20px
  .file-uploader-text
    text-align: left
  .v-btn__content
    font-size: 15px
    font-weight: 500
  .app-btn.v-btn
    padding: 0 13px!important
  .uploaded-files img
    height: 162px

.exchange-logo-uploader.has-photo
  display: inline-block
  .file-uploader
    padding: 0

.exchange-logo-wrapper
  text-align: center
.unbordered
  & >>> .v-input__slot::before
    border: none;
.custom-row
  margin-top: 8px;
</style>
