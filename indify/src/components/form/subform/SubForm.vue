<template>
  <div class="component-wrapper">
    <div class="subform-wrapper">
      <div
        v-if="blockMode"
        class="subform-top"
      >
        <slot
          name="title"
          :title="title"
        >
          <span class="subform-title">
            {{ title }}
          </span>
        </slot>
        <div class="subform-btn-rows">
          <div
            v-if="showAddTop"
            class="subform-add-in-title"
          >
            <slot
              name="add-button"
              :limit-reached="limitReached"
              :add="addSubFormItem"
              :remove="deleteSubFormItem"
              :clear="clearSubFormItem"
            >
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <AddButton
                    v-bind="attrs"
                    :disabled="limitReached"
                    class="subform-add-top"
                    v-on="on"
                    @click="addSubFormItem"
                  />
                </template>
                <span>Добавить элемент</span>
              </v-tooltip>
            </slot>
          </div>
          <MinimizeButton
            v-if="allowMinimize"
            v-model="minimized"
            class="subform-minimize"
            @input="toggleMinimize"
          />
        </div>
      </div>
      <div
        v-show="!minimized"
        :style="{
          'height': height,
          'max-height': maxHeight,
        }"
        class="subform-items-wrapper"
      >
        <ScrollComponent
          vertical
        />
        <SubFormItem
          v-for="(subformItem, index) in localValue"
          :key="'subform-item' + index"
          :class="classes"
          :item="subformItem"
          :index="index"
          :length="localValue.length"
          :no-add="noAddItem"
          :no-delete="noDelete"
          :clearable="clearable"
          :limit-reached="limitReached"
          :absolute-actions="absoluteActions"
          :waste-space="wasteSpace"
        >
          <template #default="{ item }">
            <slot
              :item="item"
              :index="index"
            />
          </template>
          <template #actions="{ add, remove, clear }">
            <slot
              :limit-reached="limitReached"
              :add="add"
              :remove="remove"
              :clear="clear"
              :index="index"
              :item="subformItem"
              name="actions"
            />
          </template>
        </SubFormItem>
      </div>
    </div>
  </div>
</template>

<script>
import SubFormItem from './SubFormItem';
import ScrollComponent from "../../ui-kit/ScrollComponent";

export default {
  name: 'SubForm',
  components: {
    ScrollComponent,
    SubFormItem,
  },
  inject: {
    validators: {
      default: null,
    },
    addValidator: {
      default: null,
    },
    removeValidator: {
      default: null,
    },
  },
  provide() {
    return {
      add: this.addSubFormItem,
      remove: this.deleteSubFormItem,
      clear: this.clearSubFormItem,
      validators: this.validators,
      addValidator: (name, info) => this.$set(this.validators, name, info),
      removeValidator: name => this.$delete(this.validators, name),
    };
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    requiredFields: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: '',
    },
    absoluteActions: {
      type: Boolean,
      default: false,
    },
    showAddTop: {
      type: Boolean,
      default: false,
    },
    noAddItem: {
      type: Boolean,
      default: false,
    },
    noDelete: {
      type: Boolean,
      default: false,
    },
    limitNumber: {
      type: [Number, String],
      default: 0,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    itemClasses: {
      type: String,
      default: '',
    },
    reverseAdd: {
      type: Boolean,
      default: false,
    },
    blockMode: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '100%',
    },
    maxHeight: {
      type: String,
      default: '100%',
    },
    name: {
      type: String,
      default: '',
    },
    wasteSpace: {
      type: Boolean,
      default: false,
    },
    addOnMount: {
      type: Boolean,
      default: false,
    },
    allowMinimize: {
      type: Boolean,
      default: false,
    },
    isMinimized: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localValue: [],
      componentData: [],
      validators: {},
      minimized: false,
    };
  },
  computed: {
    limitReached() {
      const num = +this.limitNumber;
      if (num <= 0 || this.$getType(num) !== 'Number') {
        return false;
      }
      return this.localValue.length >= num;
    },
    classes() {
      let base = 'subform-item';
      if (this.blockMode) base += ' is-block-mode';
      return base + (this.itemClasses ? ` ${this.itemClasses}` : '');
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.localValue = val;
      },
    },
    localValue: {
      deep: true,
      handler(val) {
        this.$emit('input', val);
      },
    },
    name: {
      immediate: true,
      handler(val, oldVal) {
        if (
          val
          && this.$getType(this.validate).match('Function') !== null
          && this.validators
          && this.addValidator
        ) {
          this.addValidator(this.name, { func: this.validate });
          if (oldVal && this.removeValidator) this.removeValidator(oldVal);
        }
      },
    },
    isMinimized: {
      immediate: true,
      handler(value) {
        if (this.$getType(value) !== 'Boolean') return;
        this.minimized = value;
      },
    },
  },
  mounted() {
    if (this.localValue.length === 0 && this.addOnMount) this.addSubFormItem();
  },
  methods: {
    clearSubFormItem(index) {
      const localItem = this.localValue[index];
      Object.keys(localItem).forEach(key => {
        const val = this.requiredFields[key] === undefined
          ? null
          : this.requiredFields[key];
        this.$set(localItem, key, val);
      });
      this.$emit('element-cleared', localItem);
      this.$emit('change');
    },
    deleteSubFormItem(index) {
      this.$emit(
        'element-removed',
        this.localValue.splice(index, 1)[0],
      );
      this.$emit('change');
    },
    addSubFormItem() {
      if (this.limitReached) return;
      const defaultObject = { ...this.requiredFields };
      if (this.reverseAdd) this.localValue.unshift(defaultObject);
      if (!this.reverseAdd) this.localValue.push(defaultObject);
      this.$emit('element-added', defaultObject);
    },
    validate() {
      let result = true;
      Object.keys(this.validators).forEach(key => {
        const { func } = this.validators[key];
        if (this.$getType(func).match('Function') === null) return;
        if (!func()) result = false;
      });
      return result;
    },
    toggleMinimize() {
      this.$emit('update:is-minimized', this.minimized);
    },
  },
};
</script>

<style lang="stylus">
.subform-wrapper
  overflow: hidden
  &.hide-details
    .subform-item
      padding: 0
      border: none
      display: flex
      align-items flex-end
    .subform-item-actions
      width: 10%
      right: 0
  .component-wrapper
    height: 100%

.subform-top
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  align-items: center
  width: 100%
  height: 42px
  padding: 6px 24px 6px 24px;
  background: #F8FAFE;
  border: 1px solid #DADADA;
  & + .subform-item
    border-top: 1px solid lightgrey
    padding-top: 10px

.subform-btn-rows
  display flex

.subform-minimize
  margin-left: 16px

.subform-items-wrapper
  position: relative
  height: calc(100% - 42px)
  overflow: hidden

.subform-title
  font-size: 14px;
  line-height: 16px;
  color: #202124;
  font-weight: 500

@media(max-width: 959px)
  .subform-top
    padding-left: 20px
    padding-right: 20px
</style>
