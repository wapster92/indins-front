<template>
  <div
    class="file-input"
  >
    <div
      v-if="files"
      class="file-input__list"
    >
      <span
        v-if="label || info"
        class="date-input__info"
      >
        <FieldLabel
          v-if="label"
          :label="label"
        />
        <FieldInfo
          v-if="info"
          :info="info"
        />
      </span>
      <div
        v-for="(file, i) of files"
        :key="file.name"
        class="file-input__item"
      >
        <span>{{ file.name }}</span>
        <FieldIcon
          icon="close"
          class="file-input__delete"
          @click="deleteFile(i)"
        />
      </div>
    </div>
    <div
      v-show="files.length <= 0"
      class="file-input__fildset"
    >
      <input
        ref="fileInput"
        type="file"
        class="file-input__input"
        @change="addFiles"
      >
      <div
        class="file-input__button"
        @click="openFileUpload"
      >
        {{ text }}
        <FieldIcon icon="field-file" />
      </div>
    </div>
  </div>
</template>

<script>
import FieldIcon from '~/components/UI/fields/FieldIcon';
import FieldInfo from '~/components/UI/fields/FieldInfo';
import FieldLabel from '~/components/UI/fields/FieldLabel';

export default {
  name: 'FileInput',
  components: {
    FieldIcon,
    FieldInfo,
    FieldLabel,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    info: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: 'Загрузите документ',
    },
  },
  data() {
    return {
      files: [],
    };
  },
  methods: {
    openFileUpload() {
      this.$refs.fileInput.click();
    },
    addFiles(e) {
      this.files = Array.from(e.target.files);
      this.$emit('change', this.files[0]);
    },
    deleteFile(index) {
      this.files.splice(index, 1);
    },
  },
};
</script>

<style lang="stylus">
.file-input

  &__input
    display: none;
  &__button
    display flex
    align-items: center;
    height: 50px
    border: 2px solid $blue-main;
    color: $blue-main;
    font-size: 16px
    font-weight: 700;
    padding: 0 16px;
    background: $grey-1;
    border-radius: 5px;
    cursor pointer
    position: relative;
  &__list
    display: grid;
    grid-template-columns 1fr;
    padding: 0
    margin: 0;
    list-style-type none
  &__item
    position: relative;
    border: 1px solid $grey-stroke;
    border-radius: 5px;
    background: $grey-1;
    padding:0 40px 0 16px;
    height: 50px
    display: flex;
    align-items: center;
    overflow hidden
    span
      text-overflow ellipsis
      overflow hidden
      white-space: nowrap;
  &__delete
    cursor: pointer;
</style>
