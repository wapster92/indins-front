<template>
  <div
    v-if="files.length"
    class="dynamic-comments-uploaded"
  >
    <DynamicCommentsFileItem
      v-for="(file, index) of visibleFiles"
      :key="'file' + index"
      :file="file"
      class="dynamic-comments-uploaded-item"
      is-link
    />
    <div
      v-if="files.length > 2"
      class="dynamic-comments-more-files"
      @click="toggleFiles"
    >
      <span>{{ moreFilesText }}</span>
      <div class="more-files-arrow">
        <v-icon
          size="18"
          color="#416FC8"
        >
          {{ moreFilesIcon }}
        </v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import DynamicCommentsFileItem from './DynamicCommentsFileItem';

export default {
  name: 'DynamicCommentsFiles',
  components: {
    DynamicCommentsFileItem,
  },
  props: {
    files: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showAllFiles: false,
    };
  },
  computed: {
    visibleFiles() {
      return this.showAllFiles ? this.files : this.files.slice(0, 2);
    },
    moreFilesText() {
      return this.showAllFiles
        ? `Скрыть ${ this.files.length - 2 }`
        : `Еще ${ this.files.length - 2 }`;
    },
    moreFilesIcon() {
      return this.showAllFiles ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    },
  },
  methods: {
    toggleFiles() {
      this.showAllFiles = !this.showAllFiles;
    },
    numberToString(n) {
      const textForms = ['файл', 'файла', 'файлов'];
      n = Math.abs(n) % 100;
      const n1 = n % 10;
      if (n > 10 && n < 20) return textForms[2];
      if (n1 > 1 && n1 < 5) return textForms[1];
      if (n1 === 1) return textForms[0];
      return textForms[2];
    },
  },
};
</script>

<style lang="stylus">
.dynamic-comments-more-files
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  background: #F3F5F8
  height: 20px
  padding-left: 10px
  margin-top: 10px
  font-size: 13px
  &:hover
    cursor: pointer
  .more-files-arrow
    width: 20px
    height: 20px
    margin-left: 10px
    text-align: center
    background: #E9EBEF
</style>
