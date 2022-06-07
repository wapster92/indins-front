<template>
  <div
    :class="{ 'no-title': !title }"
    class="i-comments_wrapper"
  >
    <PageBlock
      v-if="title"
      :title="title"
      v-model="showList"
      :allow-minimize="allowMinimize"
      class="pb-0"
      no-content
    />
    <transition name="fade" appear>
      <client-only>
        <div class="i-comments_content-wrapper" v-show="showList">
          <div v-if="!loading" class="i-comments_content">
            <ICommentListing
              :key="state"
              class="fill-height"
              v-bind="$attrs"
              :items="localItems"
              :save-query="query"
              @send-comment="saveItem"
              #default="{ item }"
            >
              <slot name="item" :item="item"/>
            </ICommentListing>
            <ICommentsField
              v-bind="$attrs"
              class="i-comments_content_input-block"
              :query="query"
              @send-comment="saveItem"
            />
          </div>
          <div class="i-comments_preloader" v-else>
            <slot name="preloader">
              <img :src="preloaderImg" alt="preloader">
            </slot>
          </div>
        </div>
      </client-only>
    </transition>
  </div>
</template>

<script>
import { Get } from 'core-xhr';
import ICommentListing from "./ICommentListing";
import ICommentsField from "./ICommentsField";
import PageBlock from "../../blocks/PageBlock";
import preloaderImg from '../../../icons/preloader.svg';

export default {
  name: "IComments",
  props: {
    query: {
      type: [String, Object, null],
      default: null
    },
    value: {
      type: [Array, null],
      default: null
    },
    allowMinimize: {
      type: Boolean,
      default: true
    },
    title: {
      type: [String, null],
      default: null
    },
  },
  components: {
    ICommentListing,
    PageBlock,
    ICommentsField,
  },
  data() {
    return {
      localItems: null,
      showList: true,
      subscribeEntityArr: [],
      state: null,
      loading: false
    }
  },
  watch: {
    value: {
      async handler(val) {
        if (val instanceof Array) {
          this.localItems = [...val]
          this.state = `items ${this.localItems.length}`
        }
      },
      immediate: true,
      deep: true
    },
    query: {
      async handler(val) {
        if (!val) return;
        let request = this.getRequest(val)
        this.localItems = await this.getItems(request)
        this.state = `query ${this.localItems.length}`
      },
      immediate: true,
      deep: true
    },
    subscribeEntityArr(arr) {
      if (arr.length) {
        // this.subscribeEntityArr.forEach(el => {
        //   this.$subscribe(() => el, () => this.getItems(this.value));
        // });
        this.$subscribe(() => arr, async () => { this.localItems = await this.getItems(this.getRequest(this.query))})
      }
    },
  },
  computed: {
    preloaderImg() {
      return preloaderImg;
    },
  },
  methods: {
    getRequest(queryString) {
      if (queryString.constructor === Object) {
        return queryString
      }
      if (queryString.constructor === String) {
        return new Get(queryString)
          .limitShown(500)
          .subscribe(true)
          .pagination()
      }
    },
    async getItems(request) {
      this.loading = true
      let resp = await this.$xhr.send(request)
        .catch(this.$errorHandler)
      this.loading = false
      if (!resp) return []
      if (resp?.data?.data?.result) {
        this.subscribeEntityArr = resp.data.data.entity
        return resp?.data?.data?.result
      }
    },
    saveItem(val) {
      if (!val) return;
      let newVal = {...val}
      let index = -1;
      let arr = [...this.localItems];
      try {
        index = arr.findIndex(el => {
          if (el.id === val.id) console.log(el.id, val.id, el.id === val.id);
          return el.id === val.id
        });
      } catch (e) {
        console.error(e);
      }
         if (index >= 0) {
        arr[index] = newVal
      } else {
        let id = arr[arr.length-1].id + 1
        newVal = {...val, id }
        arr.push(newVal)
      }

      this.localItems = [...arr]
      this.$emit('send-comment', newVal);
      this.$emit('input', this.localItems)
    }
  }
}
</script>

<style lang="stylus">
.i-comments
  &_wrapper
    display: grid
    grid-template: 42px minmax(0, 1fr) \/ 100%
    height: 100%
  &.no-title
    grid-template-rows: minmax(0, 1fr)
  &_content
    display: grid
    grid-template: 1fr auto \/ 100%
    padding: 2px
    height: 100%
    &_input-block
      margin-top: 2px
  &_content-wrapper
    height: 100%
  &_preloader
    display flex
    justify-content center
    align-items center
    height 100%
</style>