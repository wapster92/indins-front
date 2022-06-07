<template>
  <div class="wysiwyg">
    <ckeditor-nuxt
      :key="key"
      :value="value"
      :config="editorConfig"
      :disabled="disabled"
      ref="editor"
      @input="$emit('input', $event)"
    />
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
  name: 'SimpleWysiwyg',
  components: {
    'ckeditor-nuxt': async () => {
      if (process.client) {
        try {
          return await import('@blowstack/ckeditor-nuxt');
        } catch (e) {
          console.error('Установите пакет @blowstack/ckeditor-nuxt');
        }
      }
    },
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
      default: 'div'
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    items: {
      type: Array,
      default: () => [
        'Undo',
        'Redo',
        '|',
        'Heading',
        '|',
        'Bold',
        'Italic',
        // 'strikethrough',
        'underline',
        'BlockQuote',
        '|',
        // 'Alignment',
        // 'Indent',
        // 'Outdent',
        // '|',
        'Link',
        'ImageUpload',
        // 'MediaEmbed',
        // '|',
        // 'NumberedList',
        // 'BulletedList',
        // 'InsertTable',
      ]
    },
    shouldNotGroupWhenFull: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Введите текст'
    },
    uploadedImageTypes: {
      type: Array,
      default: () => ['jpeg', 'png', 'jpg']
    }
  },
  data() {
    return {
      load: null,
      key: null,
      uploadRequest: new Simple(),
    };
  },
  watch: {
    load(val) {
      console.log('load', val)
    }
  },
  methods: {
    uploader() {
      const vm = this;
      return editor => {
        editor.plugins.get('FileRepository').createUploadAdapter = loader => new UploadAdapter(loader, vm);
      };
    },
  },
  mounted() {
    setTimeout(() => this.key = 'reRenderPanel', 1200);
  },
  computed: {
    editorConfig() {
      return {
        removePlugins: ['Title'],
        toolbar: {
          items: this.items,
          shouldNotGroupWhenFull: this.shouldNotGroupWhenFull,
        },
        placeholder: this.placeholder,
        image: {
          upload: this.uploadedImageTypes,
        },
        extraPlugins: [this.uploader()],
      }
    }
  }
};
</script>

<style lang="stylus">
.wysiwyg
  .ck-content
    min-height: 200px;

.ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused
  box-shadow: none!important
</style>
