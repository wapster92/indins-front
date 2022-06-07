<template>
  <v-dialog
    v-model="show"
    :width="width"
    :content-class="contentClass"
    overlay-color="#3F4A6A"
    overlay-opacity="0.3"
    persistent
    @keydown.esc="closeClick"
    @click:outside="closeClick"
  >
    <template #activator="{ on }">
      <slot
        name="activator"
        :on="on"
      />
    </template>
    <component
      :is="wrapperTagName"
      v-slot="{ validate }"
      :class="{
        'filled-title': !transparentTitle,
        'hide-buttons': hideButtons,
        'hide-title': hideTitle,
        'form-popup': formMode,
      }"
      class="popup-wrapper"
    >
      <div
        v-if="!hideTitle"
        class="popup-title"
      >
        <div class="popup-title-content">
          {{ title }}
        </div>
        <button
          class="icon-button popup-close"
          @click="closeClick"
        >
          <v-icon
            size="24"
            color="#D3D4DB"
          >
            close
          </v-icon>
        </button>
      </div>
      <div class="popup-content">
        <ScrollComponent
          vertical
          horizontal
        />
        <slot
          :validate="validate"
          :confirm="confirm"
          :reject="reject"
          :close="close"
        >
          {{ text }}
        </slot>
      </div>
      <div
        v-if="!hideButtons"
        class="popup-buttons"
      >
        <slot
          name="buttons"
          :validate="validate"
          :confirm="confirm"
          :reject="reject"
          :close="close"
        >
          <SimpleButton
            :disabled="isDelayed"
            color="infoOut"
            outlined
            @click="reject"
          >
            {{ rejectText }}
          </SimpleButton>
          <SimpleButton
            :disabled="isDelayed"
            @click="confirm(validate)"
          >
            {{ confirmText }}
          </SimpleButton>
        </slot>
      </div>
    </component>
  </v-dialog>
</template>

<script>
import ScrollComponent from '../ui-kit/ScrollComponent';
import PopupWrapper from './PopupWrapper';
import { debounce } from './../../helpers/decorators';

export default {
  name: 'PopupComponent',
  components: {
    PopupWrapper,
    ScrollComponent,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: 'Сохранить',
    },
    rejectText: {
      type: String,
      default: 'Отмена',
    },
    closeRouteTo: {
      type: [String, Object, null],
      default: null,
    },
    hideButtons: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [String, Number],
      default: 480,
    },
    transparentTitle: {
      type: Boolean,
      default: false,
    },
    dontCloseOnReject: {
      type: Boolean,
      default: false,
    },
    formMode: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
    hideTitle: {
      type: Boolean,
      default: false,
    },
    contentClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: false,
      isDelayed: false,
    };
  },
  computed: {
    wrapperTagName() {
      return this.formMode ? 'FormValidator' : 'PopupWrapper';
    },
  },
  watch: {
    show(val) {
      if (val !== this.val) {
        this.$emit('input', val);
      }
      if (!val && this.closeRouteTo) {
        this.$router.push(this.closeRouteTo);
      }
    },
    value: {
      immediate: true,
      handler(val) {
        this.show = val;
      },
    },
  },
  created() {
    this.removeBlock = debounce(this.removeBlock, 800);
  },
  methods: {
    removeBlock() {
      this.isDelayed = false;
    },
    delaySecondClick() {
      this.isDelayed = true;
      this.removeBlock();
    },
    reject() {
      this.delaySecondClick();
      this.$emit('click:reject');
      this.close();
    },
    confirm(validate) {
      this.delaySecondClick();
      this.$emit('click:confirm', validate ? validate() : null);
    },
    closeClick() {
      this.$emit('click:close');
      this.close();
    },
    close() {
      if (!this.dontCloseOnReject) this.show = false;
    },
  },
};
</script>

<style lang="stylus">
.popup-wrapper
  position: relative
  display: grid
  grid-template: 64px 1fr 84px \/ 100%
  height: 100%
  background: #ffffff
  overflow: hidden
  &.hide-title
    grid-template-rows: 1fr 84px
  &.hide-buttons
    grid-template-rows: 64px 1fr
    &.hide-title
      grid-template-rows: 100%
  &.filled-title
    .popup-title
      background: #F3F5F8

.popup-title
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  align-items: center
  padding: 20px 38px
  color: #202124
  font: 500 18px/21px Ubuntu, sans-serif
  &_content
    max-width: 80%;
    overflow: hidden
  &.filled
    padding-top: 22px
    background: #F3F5F8

.popup-content
  position: relative
  padding: 27px 38px 18px
  font: 14px/16px Ubuntu, sans-serif
  overflow: hidden
  @media screen and (min-width: 960px)
    max-height: calc(80vh - 65px - 76px)

.form-popup .popup-content
  padding: 20px 26px

.popup-buttons
  display: flex
  flex-flow: row nowrap
  justify-content: flex-end
  align-items: flex-start
  padding: 10px 30px 38px
  .simple-button-wrapper
    margin: 0 0 0 17px

.popup-close
  width: 20px
  height: 24px

@media(max-width: 959px)
  .popup-wrapper
    grid-template: 60px 1fr 60px \/ 100%
    &.hide-title
      grid-template-rows: 1fr 60px
    &.hide-buttons
      grid-template-rows: 60px 1fr
      &.hide-title
        grid-template-rows: 100%
  .form-popup .popup-content
    padding: 27px 12px 7px
  .popup-content
    padding: 27px 20px 7px
  .popup-title
    padding: 20px 20px
    font-size: 20px
    line-height: 23px
    .popup-close .v-icon
      color: #416fc8!important
  .popup-buttons
    padding: 5px 20px 20px
    .simple-button-wrapper
      margin-top: 0
      margin-bottom 0
</style>
