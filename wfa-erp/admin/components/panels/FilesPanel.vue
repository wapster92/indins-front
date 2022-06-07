<template>
  <div>
    <div class="pa-2">
      <div
        v-if="value.length"
        class="d-flex flex-wrap w-100 mb-2"
      >
        <div
          v-for="(file, index) of value"
          :key="'comment-file-' + index"
          class="mx-2 mb-2"
        >
          <v-btn
            :color="getChipExtension(file)"
            label
            class="px-0 py-0 d-flex justify-center"
          >
            <a
              :href="file.url"
              target="_blank"
              download
              style="text-decoration: none"
            >
              <v-icon>mdi-cloud-download</v-icon>
            </a>
          </v-btn>
          <!--          <div class="app-comments__uploaded-info">
            <div>
              <a
                :href="file.url"
                target="_blank"
                download
                style="color:#000; text-decoration: none"
              >
                {{ file.name }}
              </a>
              <span>
                <a
                  :href="file.url"
                  target="_blank"
                  download
                >
                  ({{ file.size }})
                </a>
              </span>
            </div>
            &lt;!&ndash;            <v-btn&ndash;&gt;
            &lt;!&ndash;              v-if="canRemove"&ndash;&gt;
            &lt;!&ndash;              depressed&ndash;&gt;
            &lt;!&ndash;              width="24"&ndash;&gt;
            &lt;!&ndash;              height="24"&ndash;&gt;
            &lt;!&ndash;              max-width="24"&ndash;&gt;
            &lt;!&ndash;              min-width="0"&ndash;&gt;
            &lt;!&ndash;              class="px-0 py-0"&ndash;&gt;
            &lt;!&ndash;              color="transparent"&ndash;&gt;
            &lt;!&ndash;              @click="removeFile(index)"&ndash;&gt;
            &lt;!&ndash;            >&ndash;&gt;
            &lt;!&ndash;              <v-icon style="font-size: 20px">&ndash;&gt;
            &lt;!&ndash;                close&ndash;&gt;
            &lt;!&ndash;              </v-icon>&ndash;&gt;
            &lt;!&ndash;            </v-btn>&ndash;&gt;
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FilesPanel',

  props: {
    value: {
      type: Array,
      default: () => [],
    },
    canRemove: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // files: this.filesArr || [],
    };
  },
  methods: {
    getChipExtension(file) {
      const defaultExt = this.$defaultConfig.mimeTypes.defaultMime.color;
      const mime = file.url.substring(file.url.lastIndexOf('.') + 1, file.url.length);
      if (!mime) return defaultExt;
      const type = Object.keys(this.$defaultConfig.mimeTypes)
        .filter(n => this.$defaultConfig.mimeTypes[n].ext === mime)
        .join();
      return this.$defaultConfig.mimeTypes[type]?.color || defaultExt;
    },

    // removeFile(index) {
    //   const convertToArray = Array.from(this.value);
    //   convertToArray.splice(index, 1);
    //   // this.value = convertToArray;
    //   this.totalWeight = this.value.reduce((acc, item) => acc + item.size, 0);
    //   this.$emit('input', convertToArray);
    // },
  },
};

</script>

<style scoped>

</style>
