<template>
  <v-input
    :class="{'v-input--is-focused': isFocused}"
    v-bind="$attrs"
    :color="defaultColor"
    :rules="localRules"
    :value="localValue"
    class="simpleCKeditor__component simple-CKeditor"
  >
    <div class="simple-CKeditor__slot">
      <label
        :for="id"
        class="v-label"
      >{{ label }}</label>
      <client-only>
        <textarea
          :id="id"
          ref="editor"
          :value="localValue"
          :config="config"
          class="simpleTextarea__component"
        />
      </client-only>
    </div>
  </v-input>
</template>

<script>
/* eslint-disable */
import fieldModel from 'indify/src/components/form/mixins/fieldModel';
import defaultColor from 'indify/src/components/form/mixins/defaultColor';

export default {
  mixins: [fieldModel, defaultColor],
  props: {
    label: String,
    minHeight: {
      type: Number,
      default: 50,
    },
    value: {
      type: String,
    },
    id: {
      type: String,
      default: 'editor',
    },
    height: {
      type: String,
      default: '90px',
    },
    toolbar: {
      type: Array,
      default: () => [
        ['Undo', 'Redo'],
        ['Bold', 'Italic', 'Strike'],
        ['NumberedList', 'BulletedList'],
        ['Cut', 'Copy', 'Paste'],
      ],
    },
    language: {
      type: String,
      default: 'en',
    },
    extraplugins: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      config: {
        toolbar: {},
      },
      isFocused: false,
    };
  },
  computed: {
    modeDevelopment() {
      return process.env.NODE_ENV === 'development';
    },
  },
  mounted() {
    const ckeditorId = this.id;
    if (process.client) {
      setTimeout(() => {
        CKEDITOR.config.allowedContent = true;
        CKEDITOR.replace(ckeditorId, {
          removePlugins: 'spellchecker',
          removeButtons: 'About, IFrame, spellchecker',
          extraPlugins: 'uploadwidget, uploadimage, maximize, autogrow',
          filebrowserImageUploadUrl: this.modeDevelopment ? `https://${location.hostname}/api/image_upload_editor` : '/api/image_upload_editor',
        });
        const currentCK = CKEDITOR.instances[ckeditorId];
        currentCK.config.allowedContent = true;
        currentCK.on('change', () => {
          const ckeditorData = CKEDITOR.instances[ckeditorId].getData();
          clearTimeout(this.$options.debounceTimeout);
          this.$options.debounceTimeout = setTimeout(() => this.localValue = ckeditorData, 300);
        });
        currentCK.on('focus', () => {
          this.$emit('focusEditor');
        });
        currentCK.on('blur', () => {
          this.$emit('blueEditor');
        });
      }, 0);
    }
  },
  beforeUpdate() {
    const ckeditorValue = this.localValue;
    const ckeditorId = this.id;

    if (process.client) {
      setTimeout(() => {
        if (ckeditorValue !== CKEDITOR.instances[ckeditorId].getData()) {
          // CKEDITOR.instances[ckeditorId].setData(ckeditorValue)
        }
      }, 0);
    }
  },

  destroyed() {
    const ckeditorId = this.id;
    if (process.client) {
      setTimeout(() => {
        if (CKEDITOR.instances[ckeditorId]) {
          CKEDITOR.instances[ckeditorId].destroy();
        }
      }, 0);
    }
  },
  methods: {},
};
</script>

<style lang="stylus">
.simple-CKeditor__slot
  width: 100%
  .cke_top, .cke_bottom
    background: transparent
</style>
