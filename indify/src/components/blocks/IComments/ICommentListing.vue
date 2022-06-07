<template>
  <div class="scroll-component-element i-comment-listing">
      <ScrollComponent
        v-model="scrollPosition"
        vertical
      />
      <div
        v-for="(item, index) in currentItems"
        :key="index + item.id"
      >
        <slot :item="item" :index="index">
          <ICommentItem
            :value="item"
            :query="saveQuery"
            @send-comment="$emit('send-comment', $event)"
            :files-field="filesField"
            :author-field="authorField"
            :allow-edit="allowEdit"
          />
        </slot>
      </div>
    <div class="i-comment-listing_bottom-spacer"/>
  </div>
</template>

<script>
// import { Filter, Get } from 'core-xhr';
import moment from 'moment';
import ICommentItem from "./ICommentItem";
import ScrollComponent from "../../ui-kit/ScrollComponent";

export default {
  name: 'ICommentListing',
  props: {
    saveQuery: {
      type: [String, Object, null],
      default: null
    },
    items: {
      type: [Array, null],
      default: null,
    },
    queries: {
      type: [Array, null],
      default: null,
    },
    lastItemsInBottom: {
      type: Boolean,
      default: false,
    },
    filesField: {
      type: [String, null],
      default: null,
    },
    authorField: {
      type: String,
      default: 'user',
    },
    allowEdit: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ICommentItem,
    ScrollComponent
  },
  data() {
    return {
      currentItems: [],
      scrollPosition: {
        x: 0,
        y: 0,
        xScrollDistance: 0,
        yScrollDistance: 0,
      },
      subscribeEntityArr: [],
      textIsCut: false, // what for?
    };
  },
  watch: {
    subscribeEntityArr(arr) {
      if (arr.length) {
        this.subscribeEntityArr.forEach(el => {
          this.$subscribe(() => el, () => this.setCurrentItems(this.items));
        });
      }
    },
    items: {
      async handler(arr) {
        if (!arr) return
        await this.setCurrentItems(arr)
      },
      deep: true,
      immediate: true
    },
    queries: {
      async handler(arr) {
        if (!arr) return
        await this.setCurrentItems()
      },
      deep: true,
      immediate: true
    },
  },
  mounted() {
    const unwatch = this.$watch('scrollPosition', val => {
      if (val.yScrollDistance) {
        this.scrollPosition.y = val.yScrollDistance;
        unwatch();
      }
    }, { deep: true });
  },
  methods: {
    async setCurrentItems(arr) {
      let existingItems = [];
        if (this.queries) {
          existingItems = await this.itemsRequest();
        }
      this.currentItems = [...existingItems, ...arr];
      this.scrollPosition = {};
      this.$nextTick(() => {
        this.$set(this.scrollPosition, 'y', this.scrollPosition.yScrollDistance);
      });
    },
    async itemsRequest() {
      const promiseArr = [];
      this.queries.forEach(el => {
        if (el) {
          promiseArr.push(this.$xhr.send(el.subscribe(true)));
        }
      });
      const response = await Promise.all(promiseArr);
      const items = this.sortPseudoComments(response.map(el => el.data.data.result).flat());
      if (!this.subscribeEntityArr.length) {
        this.subscribeEntityArr = response
          .map(el => el.data.data.entity)
          .flat();
      }
      return this.lastItemsInBottom ? items.reverse() : items;
    },
    sortPseudoComments(items) {
      const middlePoint = Math.floor(items.length / 2);
      const firstHalf = items.slice(0, middlePoint);
      const secondHalf = items.slice(middlePoint);
      const firstHalfSorted = firstHalf.length > 1
        ? this.sortPseudoComments(firstHalf)
        : firstHalf;
      const secondHalfSorted = secondHalf.length > 1
        ? this.sortPseudoComments(secondHalf)
        : secondHalf;
      return this.mergeArrays(firstHalfSorted, secondHalfSorted);
    },
    mergeArrays(firstList, secondList) {
      const result = [];
      let i = 0;
      let j = 0;
      while (i < firstList.length && j < secondList.length) {
        let firstDate;
        let secondDate;
        if (firstList[i].deletedAt) firstDate = moment(firstList[i].deletedAt, 'YYYY-MM-DD HH:mm:ss');
        else firstDate = moment(firstList[i].createdAt, 'YYYY-MM-DD HH:mm:ss');
        if (secondList[j].deletedAt) secondDate = moment(secondList[j].deletedAt, 'YYYY-MM-DD HH:mm:ss');
        else secondDate = moment(firstList[i].createdAt, 'YYYY-MM-DD HH:mm:ss');

        if (firstDate.isSameOrBefore(secondDate)) {
          result.push(firstList[i]);
          i++;
        } else {
          result.push(secondList[j]);
          j++;
        }
      }
      while (i < firstList.length) {
        result.push(firstList[i]);
        i++;
      }
      while (j < secondList.length) {
        result.push(secondList[j]);
        j++;
      }
      return result;
    },
  },
};
</script>

<style lang="stylus">
.i-comment-listing
  height 100%
  border 1px solid #DADADA
  &_bottom-spacer
    height 50px

</style>
