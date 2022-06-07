<template>
  <div
    :class="{ 'no-title': !title }"
    class="dynamic-comments-wrapper"
  >
    <PageBlock
      v-if="title"
      v-model="minimized"
      :title="title"
      :allow-minimize="allowMinimize"
      class="pb-0"
      no-content
    />
    <div
      v-show="!minimized"
      class="component-wrapper"
    >
      <div class="dynamic-comments">
        <div class="dynamic-comments-list">
          <ScrollComponent
            v-model="scrollPosition"
            horizontal
            vertical
          />
          <DynamicCommentsItem
            v-for="(item, index) in items"
            :key="index"
            :comment="item"
            :author-field="authorField"
            :file-upload="fileUpload"
            :files-field="filesField"
            :field-query="addQuery || query"
            :edited-comment="editedComment"
            @edit-comment="editComment($event)"
            @stop-editting-comment="editComment(null)"
          >
            <template #default="slotProps">
              <slot
                v-bind="slotProps"
                name="replace-comment"
              />
            </template>
            <template #replace-avatar="slotProps">
              <slot
                v-bind="slotProps"
                :item="item"
                name="replace-avatar"
              />
            </template>
            <template #comment-buttons="slotProps">
              <slot
                v-bind="slotProps"
                name="comment-buttons"
              />
            </template>
          </DynamicCommentsItem>
        </div>
<!--        <DynamicCommentsProvider>-->
<!--          <slot-->
<!--            name="additional-block"-->
<!--          />-->
<!--        </DynamicCommentsProvider>-->
<!--        <DynamicCommentsInjector />-->
        <DynamicCommentsField
          v-slot="slotProps"
          v-if="!readonly && (addQuery || query)"
          :query="addQuery || query"
          :has-additional-block="hasAdditionalBlock"
          :max-field-height="maxFieldHeight"
          :file-upload="fileUpload"
          :files-field="filesField"
          :attach-field="attachField"
          :attach-id="attachId"
          :author-field="authorField"
        >
          <slot
            v-bind="slotProps"
            name="field"
          />
        </DynamicCommentsField>
      </div>
    </div>
  </div>
</template>

<script>
import { Get, Filter } from 'core-xhr';
import DynamicCommentsItem from './DynamicCommentsItem';
import DynamicCommentsFileItem from './DynamicCommentsFileItem';
import ScrollComponent from "../../ui-kit/ScrollComponent";
import DynamicCommentsProvider from './DynamicCommentsProvider';
import DynamicCommentsInjector from './DynamicCommentsInjector';
import DynamicCommentsField from './DynamicCommentsField';

export default {
  name: 'DynamicComments',
  components: {
    ScrollComponent,
    DynamicCommentsItem,
    DynamicCommentsFileItem,
    DynamicCommentsProvider,
    DynamicCommentsInjector,
    DynamicCommentsField,
  },
  provide() {
    return {
      additionalBlock: this.additionalNode,
      clearAdditionalBlock: () => this.clearAdditionalBlock(),
      setAdditionalBlock: vnode => this.setAdditionalBlock(vnode),
    };
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: () => ([]),
    },
    query: {
      type: [Object, String],
      default: '',
    },
    addQuery: {
      type: [String, Object, null],
      default: null,
    },
    attachField: {
      type: String,
      default: '',
    },
    attachId: {
      type: [String, Number],
      default: '',
    },
    authorField: {
      type: String,
      default: 'user',
    },
    fileUpload: {
      type: Boolean,
      default: false,
    },
    filesField: {
      type: String,
      default: 'commentFiles',
    },
    subscribe: {
      type: [String, Array],
      default: () => [],
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    allowDeleted: {
      type: Boolean,
      default: false,
    },
    customGetRequest: {
      type: [Function, null],
      default: null,
    },
    allowMinimize: {
      type: Boolean,
      default: false,
    },
    isMinimized: {
      type: Boolean,
      default: false,
    },
    maxFieldHeight: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      localList: [],
      hasAdditionalBlock: false,
      minimized: false,
      additionalNode: {
        value: null,
      },
      scrollPosition: {
        x: 0,
        y: 0,
        xScrollDistance: 0,
        yScrollDistance: 0,
      },
      editedComment: null,
    };
  },
  computed: {
    items() {
      return this.query ? this.localList : this.list;
    },
  },
  watch: {
    // Не использую immediate вотчер, потому что $subscribe на сервере не существует.
    query(value) {
      this.subscribeToEntities();
    },
    isMinimized: {
      immediate: true,
      handler(value) {
        if (this.$getType(value) !== 'Boolean') return;
        this.minimized = value;
      },
    },
  },
  created() {
    const unwatch = this.$watch('scrollPosition', value => {
      if (value.yScrollDistance === 0) return;
      this.scrollPosition.y = this.scrollPosition.yScrollDistance;
      unwatch();
    }, { deep: true });
  },
  mounted() {
    this.subscribeToEntities();
  },
  methods: {
    editComment(comment) {
      this.editedComment = comment;
    },
    subscribeToEntities() {
      if (!this.query) return;
      this.getComments();
      const entities = this.$getType(this.subscribe) === 'String'
        ? [`App\\Entity\\${this.subscribe}`]
        : this.subscribe.map(name => `App\\Entity\\${name}`);
      this.$subscribe(() => entities, () => this.getComments());
    },
    getMandatoryFilters(request) {
      return request._filter.filter(filter => filter.mandatory) || [];
    },
    getFilters(request) {
      const filters = this.getMandatoryFilters(request);
      const found = filters.find(filter => filter.field === 'deletedAt');
      if (!this.allowDeleted && !found) {
        filters.push(new Filter('deletedAt', 'exists', false));
      }
      return filters;
    },
    async getComments() {
      if (this.customGetRequest) {
        this.localList = await this.customGetRequest();
        return;
      }
      if (!this.query) return;
      const type = this.$getType(this.query);
      let request;
      if (type === 'String') request = new Get(this.query);
      if (type === 'Object') request = this.query;
      request
        .setFilter(this.getFilters(request))
        .subscribe(true);

      const response = await this.$xhr.send(request)
        .catch(this.$errorHandler('Не удалось получить список комментариев!'));
      if (!response) return;
      if (
        !this.subscribe
        || (Array.isArray(this.subscribe) && this.subscribe.length === 0)
      ) {
        this.$subscribe(() => response.data.data.entity, () => this.getComments());
      }

      this.localList = response.data.data.result;
    },
    clearAdditionalBlock() {
      this.additionalNode.value = null;
      this.hasAdditionalBlock = false;
    },
    setAdditionalBlock(vnode) {
      this.additionalNode.value = vnode;
      this.hasAdditionalBlock = true;
    },
  },
};
</script>

<style lang="stylus">
.dynamic-comments-wrapper
  display: grid
  grid-template: 42px minmax(0, 1fr) \/ 100%
  height: 100%
  &.no-title
    grid-template-rows: minmax(0, 1fr)

.dynamic-comments
  height: 100%
  display: flex
  flex-direction: column
  justify-content: flex-end

.dynamic-comments-list
  position: relative
  overflow: hidden
  background: white

  &::-webkit-scrollbar
    width: 6px

  &::-webkit-scrollbar-thumb
    background: rgba(136, 138, 145, 0.2)
    border-radius: 4px

  .dynamic-comments-uploaded
    padding-left: 0
</style>
