<template>
  <div>
    <div
      class="subform-item-inputs"
      :class="{ 'full-width': !showActions || absoluteActions }"
    >
      <slot :item="item"/>
    </div>
    <div
      v-if="showActions"
      class="subform-item-actions"
      :class="{ 'is-absolute': absoluteActions }"
    >
      <slot
        name="actions"
        :add="addItem"
        :remove="removeItem"
        :clear="clearItem"
        :item="item"
      >
        <v-tooltip bottom v-if="clearable">
          <template #activator="{ on, attrs }">
            <v-btn
              class="icon-button subform-button"
              color="#888A91"
              outlined
              fab
              width="28"
              height="28"
              @click="clearItem"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon size="20">
                close
              </v-icon>
            </v-btn>
          </template>
          <span>Очистить поля</span>
        </v-tooltip>
        <v-tooltip bottom v-if="showDelete">
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              class="subform-button"
              color="#888A91"
              icon
              fab
              width="28"
              height="28"
              v-on="on"
              @click="removeItem"
            >
              <v-icon size="20">
                mdi-trash-can-outline
              </v-icon>
            </v-btn>
          </template>
          <span>Удалить элемент</span>
        </v-tooltip>
        <v-tooltip bottom v-if="showAdd || wastedSpaceAdd">
          <template #activator="{on, attrs}">
            <v-btn
              v-bind="attrs"
              :disabled="limitReached"
              :class="{ 'hide-from-view': !showAdd }"
              class="subform-button"
              color="#888A91"
              icon
              fab
              width="28"
              height="28"
              @click="addItem"
              v-on="on"
            >
              <v-icon size="20">
                add
              </v-icon>
            </v-btn>
          </template>
          <span>Добавить элемент</span>
        </v-tooltip>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubFormItem',
  inject: {
    add: {
      default: null,
    },
    remove: {
      default: null,
    },
    clear: {
      default: null,
    },
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
      validators: this.validators,
      addValidator: (name, info) => this.$set(this.validators, name, info),
      removeValidator: name => this.$delete(this.validators, name),
    };
  },
  props: {
    item: {
      type: (Object),
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    absoluteActions: {
      type: Boolean,
      default: false,
    },
    noDelete: {
      type: Boolean,
      default: false,
    },
    noAdd: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    limitReached: {
      type: Boolean,
      default: false,
    },
    wasteSpace: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      validators: {},
    };
  },
  computed: {
    showActions() {
      return this.showAdd || this.showDelete || this.clearable;
    },
    showAdd() {
      return !this.noAdd && this.index === this.length - 1;
    },
    showDelete() {
      return !this.noDelete && this.length > 1;
    },
    wastedSpaceAdd() {
      return this.wasteSpace && !this.noAdd;
    },
  },
  watch: {
    validators(val) {
      if (!val || Object.keys(val).length === 0 || !this.addValidator) return;
      this.addValidator(`subform-item${this.index}`, { func: this.validate });
    },
  },
  methods: {
    addItem() {
      if (!this.$getType(this.add)) return;
      this.add();
    },
    removeItem() {
      if (!this.$getType(this.remove)) return;
      this.remove(this.index);
    },
    clearItem() {
      if (!this.$getType(this.clear)) return;
      this.clear(this.index);
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
  },
};
</script>

<style lang="stylus">
.subform-item
  position: relative
  display: grid
  grid-template: auto \/ 1fr auto
  grid-gap: 8px

  &.is-block-mode
    border: 1px solid #dadada
    padding: 12px
    margin-top: 2px
    background-color: #ffffff

    & > .subform-item-actions
      padding: 8px 8px 0 0

.subform-item-inputs
  &.full-width
    grid-column: span 2

.subform-item-actions
  display: flex
  flex-flow: row wrap
  justify-content: flex-start
  align-items: flex-start
  padding: 16px 8px 0 0

  &.is-absolute
    position: absolute
    top: 8px
    right: 8px

  .v-btn:nth-of-type(n+2)
    margin-left: 5px

.hide-from-view
  visibility: hidden

.subform-button
  &.theme--light.v-btn
    border-radius: 3px
    &::before
      background-color: #F3F5F8!important
    &:hover
      &::before
        opacity: 1!important
      .v-icon
        color: rgb(65, 111, 200)
</style>
