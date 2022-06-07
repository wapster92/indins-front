<template>
  <div class="i-comment-files_wrapper">
    <ul class="i-comment-files">
      <li v-for="(file, index) of visibleFiles"
           :key="'file' + index"
           class="i-comment-files_item"
      >
        <slot>
          <IFileChip
            v-if="view === 'chip'"
            :file="file"
            is-link
            v-bind="$attrs"
            @click.native.stop="$emit('click-file', file)"
            @remove-file="removeItem(index)"
          />
          <IFileImg
            v-if="view === 'img'"
            :file="file"
            hide-edit
            @click.native.stop="$emit('click-file', file)"
            @remove-file="removeItem(index)"
          />
        </slot>
      </li>
      <li
        v-if="state !== 'some'"
        class="i-comment-files_item"
        @click.stop="toggleState"
      >
        <div class="i-comment-files_more">
        <span class="i-comment-files_text">
          {{ moreFilesText }}
        </span>
          <v-icon
            size="18"
            color="info"
          >
            {{ moreFilesIcon }}
          </v-icon>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import IFileChip from './IFileChip';
import IFileImg from './IFileImg'

export default {
  name: 'IFiles',
  components: {
    IFileChip,
    IFileImg
  },
  props: {
    value: {
      type: [Array, null],
      default: null
    },
    view: {
      type: String,
      default: 'chip'
    }
  },
  data() {
    return {
      state: 'some',
      rootWidth: 0,
      fileRowWidth: 0,
      // maxWidth: 0,
      visibleFiles: [],
      cutFiles: [],
      unCutFiles: [],
    };
  },
  computed: {
    moreFilesText() {
      return this.state === 'show-all'
        ? `Скрыть ${ this.cutFiles.length }`
        : `Еще ${ this.cutFiles.length }`;
    },
    moreFilesIcon() {
      return this.state === 'show-all' ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    },
  },
  watch: {
    value: {
      async handler(val) {
        if (!val) return
        this.visibleFiles = [...val]
        this.unCutFiles = [...val]
        this.cutFiles = []
        await this.fileListCutter()
        this.state = (this.cutFiles.length) ? 'hide-all' : 'some'
      },
      deep: true,
      immediate: true
    },
    state: {
      handler(val) {
        this.$emit('state', val)
        if (val === 'show-all') {
          // this.maxWidth = this.rootWidth
          this.visibleFiles = [...this.value]
        }
        if (val === 'hide-all') {
          // this.maxWidth = 'auto'
          this.visibleFiles = this.unCutFiles
        }
        if (val === 'some') {
          // this.maxWidth = 'auto'
        }
      },
      immediate: true
    },
  },
  mounted() {
    this.rootWidth = this.$el.clientWidth
  },
  methods: {
    toggleState() {
      if (this.state === 'hide-all') {
        this.state = 'show-all';
        return
      }
      if (this.state === 'show-all') {
        this.state = 'hide-all';
        return;
      }
    },
    async fileListCutter() {
      await this.$nextTick(async ()=> {
        let fileRow = this.$el.querySelector('.i-comment-files')
        let wrapper = this.$el
        this.fileRowWidth = fileRow?.offsetWidth || 0
        let fullLength = this.fileRowWidth + 100
        console.log(this.fileRowWidth, this.rootWidth)
        if (fullLength > this.rootWidth || wrapper.offsetHeight > 110) {
          let cutItem = this.unCutFiles.pop()
          this.cutFiles.push(cutItem)
          this.visibleFiles = [...this.unCutFiles]
          await this.fileListCutter()
        }
      })
    },

    removeItem(index) {
      let arr = [...this.value]
      arr.splice(index, 1);
      console.log('removeItem', arr)
      this.$emit('input', arr);
    },
  },
};
</script>

<style lang="stylus">
.i-comment-files
  display initial
  margin-top -10px
  &_more
    display flex
    font-size 13px
    height 22px
    background-color: #f3f5f8
    border-radius 2px
    cursor: pointer
    &_arrow
      display flex
  &_text
    padding 0 2px 0 8px
    display flex
    align-items center
  &_wrapper
    width 100%
  &_item
    display inline-block
    padding 10px 10px 0 0
    vertical-align top
    //.i-file-img__item
    //  margin: 10px 10px 0 0
    //  display: inline-block
    //  vertical-align: top

.v-application
  .i-comment-files_wrapper
    ul
      padding-left 0
</style>
