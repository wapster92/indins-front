<template>
  <PageBlock>
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="4"
        class="news-image-wrapper"
      >
        <FileUploader
          v-model="news.image"
          :class="{ 'has-image': news.image }"
          class="news-image-uploader"
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
            sm="12"
          >
            <TextInput
              v-model="news.url"
              label="URL"
              name="url"
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
              v-model="news.name"
              label="Название"
              name="name"
              required
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
            <DateTimeField
              v-model="news.year"
              label="Дата"
              name="date"
              input-type="standart"
              @input="$emit('input')"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <DateTimeField
              v-model="news.time"
              label="Время"
              time-only
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
          v-model="news.description"
          label="Описание"
          name="description"
          required
          input-type="standart"
          @input="$emit('input')"
        />
      </v-col>
    </v-row>
    <v-row
      class="custom-row"
      no-gutters
    >
      <v-col
        cols="12"
        sm="6"
      >
        <SearchSelect
          v-model="news.exchange"
          label="Биржа"
          input-type="standart"
          query="exchanges"
          @input="$emit('input')"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <SearchSelect
          v-model="news.token"
          label="Монета"
          input-type="standart"
          query="tokens"
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
          v-model="news.isChecked"
          label="Проверено"
          input-type="standart"
          @click="news.isChecked = !news.isChecked"
          @input="$emit('input')"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <SimpleSwitch
          v-model="news.isPublished"
          label="Опубликовано"
          input-type="standart"
          @click="news.isPublished = !news.isPublished"
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
    feed: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      news: null,
    };
  },
  created() {
    this.news = this.feed;
  },
};
</script>

<style lang="stylus" scoped>
.news-image-uploader
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

.news-image-uploader.has-photo
  display: inline-block
.file-uploader
  padding: 0

.news-image-wrapper
  text-align: center
.custom-row
  margin-top: 8px;
</style>
