<template>
  <div class="wysiwyg">
    <client-only placeholder="loading...">
      <ckeditor-nuxt
        :key="key"
        ref="editor"
        :value="value"
        :config="editorConfig"
        :disabled="disabled"
        @input="$emit('input', $event)"
      />
    </client-only>
  </div>
</template>

<script>
import { Simple } from 'core-xhr';

class UploadAdapter {
  constructor(loader, vm) {
    this.loader = loader;
    this.vm = vm;
  }

  upload() {
    this.vm.$store.dispatch('snack/info', 'Загрузка файла');
    return this.loader.file.then(file => {
      const formData = new FormData();
      formData.set('file', file);
      formData.set('path', 'file-uploader');
      return this.vm.$xhr.send(
        new Simple('/image/reupload', formData, 'POST').authorization(),
      ).then(result => {
        this.vm.$store.dispatch('snack/info', 'Файл успешно загружен.');
        return { default: result.data.path };
      }).catch(reason => {
        console.log(reason);
        this.vm.$store.dispatch('snack/error', 'Не удалось загрузить файл!');
      });
    });
  }
}
export default {
  name: 'EditorOne',
  components: {
    'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt'); } },
  },
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
    tagName: {
      type: String,
      required: false,
      default: 'div',
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      load: null,
      key: null,
      editorConfig: {
        removePlugins: ['Title'],
        toolbar: {
          items: [
            'Undo',
            'Redo',
            '|',
            'Heading',
            '|',
            'Bold',
            'Italic',
            'strikethrough',
            'underline',
            'BlockQuote',
            '|',
            'Alignment',
            'Indent',
            'Outdent',
            '|',
            'Link',
            'ImageUpload',
            'MediaEmbed',
            '|',
            'NumberedList',
            'BulletedList',
            'InsertTable',
          ],
          shouldNotGroupWhenFull: false,
        },
        placeholder: 'Введите текст',
        image: {
          upload: ['jpeg, png, jpg'],
        },
        extraPlugins: [this.uploader()],
      },
      uploadRequest: new Simple(),
    };
  },
  watch: {
    load(val) {
      console.log('load', val);
    },
  },
  mounted() {
    console.log(process.client);
    // eslint-disable-next-line no-return-assign
    setTimeout(() => this.key = 'reRenderPanel', 2200);
  },
  methods: {
    uploader() {
      const vm = this;
      return editor => {
        // eslint-disable-next-line no-param-reassign
        editor.plugins.get('FileRepository').createUploadAdapter = loader => new UploadAdapter(loader, vm);
      };
    },
  },
};
</script>

<style lang="stylus">
.wysiwyg
  .ck-content
    min-height: 200px;
</style>
