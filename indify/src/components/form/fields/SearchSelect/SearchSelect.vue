<template>
  <div
    :class="{ 'is-compact': isCompact }"
    class="search-select"
    @keyup.tab="focusOnAutocomplete"
    @keydown.down="buttonDown"
    @keydown.up="buttonUp"
    @keydown.enter="buttonEnter"
  >
    <div
      :class="{
        'is-invalid': !validStatus,
        'is-active': showList,
        'with-triangle': canBeOpened && !isCompact,
      }"
      class="search-select-field"
    >
      <label
        :class="{ 'is-invalid': !validStatus }"
        class="search-select-label"
      >
        {{ labelText }}
      </label>
      <div
        :class="{ 'is-invalid': !validStatus }"
        class="search-select-values"
        @click="toggleList($event)"
      >
        <ScrollComponent class="d-none" horizontal></ScrollComponent>
        <SearchSelectChosen
          v-if="!hasValue && !showList"
          :item="{ name: placeholderText }"
          class="search-select-placeholder"
          item-text="name"
        />
        <SearchSelectChosen
          v-else-if="!multiple"
          :filled-items="filledItems"
          :item="localValue"
          :color-field="colorField"
          :item-text="itemText"
        />
        <SearchSelectChosen
          v-for="(item, index) in chosenList"
          v-else
          :key="'selected-' + (item.id || getName(item))"
          :item="item"
          :filled-items="filledItems"
          :deletable="!readonly"
          :item-text="itemText"
          :color-field="colorField"
          :is-last="index === chosenList.length - 1"
          :readonly="readonly"
          @unselect-item="unselectItem($event)"
        />
        <span
          v-if="multiple && hasValue && chosenDiff > 0"
          :class="{ 'with-filled-items': filledItems }"
          class="search-select-chosen-diff"
        >
          (+еще {{ chosenDiff }})
        </span>
        <input
          v-if="!searchInDropdown"
          v-model="stringFilter"
          :class="{ 'no-matches': !relevant && stringFilter }"
          class="search-select-filter"
          placeholder="Поиск"
          type="text"
          @blur="nullableByBlur"
          :disabled="readonly"
        >
      </div>
      <v-icon
        v-if="canBeOpened && !isCompact"
        class="search-select-triangle"
        @click="openList($event)"
      >
        mdi-menu-down
      </v-icon>
      <v-btn
        v-if="clearable && localValue && !readonly"
        class="close-btn select-clear-button"
        icon
        width="20"
        height="20"
        @click="clearValue"
      >
        <v-icon
          size="15"
          color="#416FC8"
        >
          close
        </v-icon>
      </v-btn>
    </div>
    <div
      v-if="!isCompact && showErrors"
      :style="{ 'visibility': !validStatus ? 'visible' : 'hidden' }"
      class="search-select-errors"
    >
      {{ errors }}
    </div>
    <div
      :class="{ 'is-visible': showList }"
      :style="{
        top: listCord.top ? listCord.top + 'px' : 'auto',
        // bottom: listCord.bottom ? listCord.bottom + 'px' : 'auto',
        right: listCord.right + 'px',
        left: listCord.left + 'px'
      }"
      class="search-select-items"
    >
      <div class="search-select-items-list scroll-component-element">
        <ScrollComponent vertical />
        <div
          v-if="searchInDropdown"
          class="search-select-filter-wrapper"
        >
          <input
            v-model="stringFilter"
            :class="{
              'no-matches': !relevant && stringFilter,
            }"
            class="search-select-filter in-dropdown"
            placeholder="Поиск"
            type="text"
          >
          <v-btn
            class="close-btn"
            icon
            width="20"
            height="20"
            @click="stringFilter = ''"
          >
            <v-icon
              size="18"
              color="#416FC8"
            >
              close
            </v-icon>
          </v-btn>
        </div>
        <div
          v-if="allowSelectAll && multiple && list.length !== 0"
          class="search-select-item"
          @click.capture.stop="selectAllItems"
        >
          <div
            class="search-select-checkbox is-selected"
          >
            <svg
              v-if="!allIsSelected"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#dadada"
                d="M1.75 0.25H12.25C13.075 0.25 13.75 0.925 13.75 1.75V12.25C13.75 13.075 13.075 13.75 12.25 13.75H1.75C0.925 13.75 0.25 13.075 0.25 12.25V1.75C0.25 0.925 0.925 0.25 1.75 0.25ZM4.97502 10.2175C5.26752 10.51 5.74002 10.51 6.03252 10.2175L11.7175 4.525C12.01 4.2325 12.01 3.76 11.7175 3.4675C11.425 3.175 10.9525 3.175 10.66 3.4675L5.50002 8.6275L3.34002 6.4675C3.04752 6.175 2.57502 6.175 2.28252 6.4675C2.14208 6.60762 2.06315 6.79786 2.06315 6.99625C2.06315 7.19463 2.14208 7.38487 2.28252 7.525L4.97502 10.2175Z"
                fill-rule="evenodd"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#dadada"
                d="M10.75 7.75H3.25V6.25H10.75V7.75ZM12.25 0.25H1.75C0.9175 0.25 0.25 0.9175 0.25 1.75V12.25C0.25 12.6478 0.408035 13.0294 0.68934 13.3107C0.970644 13.592 1.35218 13.75 1.75 13.75H12.25C12.6478 13.75 13.0294 13.592 13.3107 13.3107C13.592 13.0294 13.75 12.6478 13.75 12.25V1.75C13.75 0.9175 13.075 0.25 12.25 0.25Z"
                fill-rule="evenodd"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <span>{{ selectAllInfo.name }}</span>
        </div>
        <SearchSelectItem
          v-for="(item, index) in list"
          :key="getItemKey(item, index)"
          :class="{ 'search-select-item-chosen': chosenItem(index) }"
          :item="item"
          :item-text="itemText"
          :local-value="localValue"
          :multiple="multiple"
          :search-value="stringFilter"
          @select-item="selectItem($event)"
          @mouseenter.native="chosenElement = index"
        />
      </div>
      <div
        v-if="!list || list.length === 0"
        class="search-select-item no-items"
      >
        <v-icon
          class="mr-4"
          size="18"
          color="#CF4949"
        >
          error_outline
        </v-icon>
        <span>{{ emptyMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '../../../../helpers/decorators';
import { Get, Filter } from 'core-xhr';
import SearchSelectItem from './SearchSelectItem';
import SearchSelectChosen from './SearchSelectChosen';
import Trie from './Trie.js';
import validation from '../../mixins/validation';
import { getObjectField } from '../../../../helpers';
import ScrollComponent from "../../../ui-kit/ScrollComponent";

export default {
  name: 'SearchSelect',
  components: {
    SearchSelectItem, SearchSelectChosen, ScrollComponent
  },
  mixins: [validation],
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    itemText: {
      type: String,
      default: 'name',
    },
    itemSearchField: {
      type: [String, Array],
      default: '',
    },
    itemsPerPage: {
      type: Number,
      default: 30,
    },
    value: {
      type: [Object, String, Number, Array, null],
      default: null,
    },
    items: {
      type: Array,
      default: () => ([]),
    },
    query: {
      type: [Object, String, null],
      default: null,
    },
    emptyMessage: {
      type: String,
      default: 'Совпадений не найдено.',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    filledItems: {
      type: Boolean,
      default: false,
    },
    colorField: {
      type: String,
      default: '',
    },
    noDeletedFilter: {
      type: Boolean,
      default: false,
    },
    listWidth: {
      type: [String, Number],
      default: 'input',
    },
    delayRequest: {
      type: Boolean,
      default: false,
    },
    inputType: {
      type: [String, null],
      default: null,
      validator: value => {
        const types = ['compact', 'standart'];
        return !value || types.includes(value);
      },
    },
    showErrors: {
      type: Boolean,
      default: false,
    },
    dynamicKey: {
      type: [Function, null],
      default: null,
    },
    searchInDropdown: {
      type: Boolean,
      default: false,
    },
    allowSelectAll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localValue: null,
      localList: [],
      showList: false,
      stringFilter: '',
      // closeBarrier: true,
      currentPage: 1,
      blockInfiniteScroll: false,
      timer: null,
      reverseList: false,
      chosenElement: 0,
      listCord: {
        top: 0,
        bottom: 0,
        left: 0,
      },
      finishedDelayedRequest: false,
      trie: null,
      relevant: null,
      resizeObserver: null,
      numberOfVisibleItems: 0,
    };
  },
  computed: {
    currentInputType() {
      return this.inputType || (this.$vuetify.breakpoint.smAndDown
        ? 'standart'
        : 'compact');
    },
    isCompact() {
      return this.currentInputType === 'compact';
    },
    list() {
      return this.query
        ? this.getUnchosenList(this.localList, false, this.reverseList)
        : this.getUnchosenList(this.items, true, this.reverseList);
    },
    hasValue() {
      if (this.multiple) {
        return this.localValue && this.localValue.length !== 0;
      }
      //return !!this.localValue && this.localValue !== 0;
      return Boolean(this.localValue) || this.$getType(this.localValue) === 'Number';
    },
    labelText() {
      return this.isCompact
        ? this.label
        : this.label || this.placeholder;
    },
    labelIsVisible() {
      if (this.label && this.placeholder) return true;
      return this.labelText && this.hasValue;
    },
    placeholderText() {
      return this.isCompact
        ? this.placeholder || '...'
        : this.placeholder || this.label;
    },
    errors() {
      if (this.validStatus) return '';
      return `${this.errorList
        .reduce((acc, msg) => `${acc + msg}; `, '').slice(0, -2)}.`;
    },
    validStatus() {
      return !(Array.isArray(this.errorList) && this.errorList.length > 0);
    },
    canBeOpened() {
      return !this.readonly && this.list.length;
    },
    chosenList() {
      return this.numberOfVisibleItems > 0 && Array.isArray(this.localValue)
        ? this.localValue.slice(0, this.numberOfVisibleItems)
        : this.localValue;
    },
    chosenDiff() {
      return this.multiple
        ? this.localValue?.length - this.chosenList.length
        : 0;
    },
    allIsSelected() {
      if (!this.multiple) return false;
      return Array.isArray(this.localValue) && this.localValue.length === this.list.length;
    },
    selectAllInfo() {
      return this.allIsSelected
        ? { name: 'Снять выделение' }
        : { name: 'Выделить все' };
    },
  },
  watch: {
    query: {
      handler(val) {
        if (val && !this.delayRequest) {
          (async () => {
            await this.getList()
            if (this.value) await this.setItemToInput()
          })()
        }
      },
      immediate: true,
    },
    value(val) {
      const type = this.$getType(val);
      if (val && type === 'Object') {
        this.localValue = { ...val };
      } else if (val && type === 'Array') {
        this.localValue = [...val];
      } else {
        this.localValue = val;
      }
    },
    localValue: {
      handler(val) {
        if (!val) return
        if (this.multiple) this.recalculateChosen();
        if (val !== this.value && JSON.stringify(val) !== JSON.stringify(this.value)) {
          if (!this.multiple && val.id !== this.value?.id) {
            this.$emit('input', val);
            this.clearErrorMessages();
          } else if (this.multiple) {
            this.$emit('input', val);
            this.clearErrorMessages();
            this.recalculateChosen();
          }
        }
      },
      deep: true,
    },
    reverseList() {
      this.chosenElement = this.list.length - 1;
    },
    filters() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.currentPage = 1;
        if (!this.delayRequest || this.finishedDelayedRequest) {
          this.finishedDelayedRequest = true;
          this.getList();
        }

        this.blockInfiniteScroll = false;
        this.timer = null;
      }, 700);
    },
    list: {
      immediate: true,
      handler(value) {
        if (!value) return
        this.trie = new Trie();
        const words = [];
        value.forEach(item => {
          const name = String(getObjectField(item, this.itemText));
          if (!name) return;
          const parts = name.replace(/[\s]{2, }/g, ' ').split(' ');
          parts.forEach(part => {
            if (!part) return;
            words.push(part);
          });
        });
        this.trie.addWords(words);
      },
    },
    stringFilter() {
      this.searchQueryChanged();
    },
    showList(val) {
      if (!val) this.autoSelect();
    },
  },
  created() {
    this.searchQueryChanged = debounce(this.searchQueryChanged, 300);
  },

  async mounted() {
    if (this.value && !this.query) await this.setItemToInput()
    document.addEventListener('click', this.closeList);
    this.$eventBus.on('close-list', this.closeList);
    this.resizeObserver = new ResizeObserver(this.recalculateChosen);
    this.resizeObserver.observe(this.$el);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeList);
    this.$eventBus.off('close-list', this.closeList);
  },
  methods: {
    nullableByBlur() {
      setTimeout(()=>{this.stringFilter = ''}, 300)
    },
    setItemToInput() {
      if (this.$getType(this.value) === 'Array') {
        this.value.forEach(item => this.selectItem(item));
      } else if (this.list.length && !this.multiple && this.value)  {
        let currItemIndex = this.list.findIndex(el => el.id === this.value.id)
        if(currItemIndex >= 0) this.selectItem(this.list[currItemIndex])
        else this.selectItem(this.value);
      } else {
        this.selectItem(this.value);
      }
    },
    recalculateChosen() {
      if (!this.multiple || !Array.isArray(this.localValue)) return;
      const valuesElement = this.$el.querySelector('.search-select-values');
      const elementWidth = valuesElement.clientWidth - 122;
      const children = this.localValue;
      let childrenWidth = 52;
      let counter = 0;
      for (let i = 0; i < children.length; i++) {
        const text = `${getObjectField(children[i], this.itemText)}`;
        counter++;
        childrenWidth += 21 + text.length * 7;
        if (childrenWidth > elementWidth) {
          counter--;
          break;
        }
      }
      this.numberOfVisibleItems = counter || 1;
    },
    async searchQueryChanged() {
      await this.getList();
      let relevant = this.trie.findRelevant(this.stringFilter);

      const fittingValues = this.list.filter(item => {
        const name = getObjectField(item, this.itemText);
        if (this.$getType(name) !== 'String') return;
        return name.toLowerCase().match(new RegExp(`^${relevant}`, 'i')) !== null
          || name.toLowerCase().match(new RegExp(`\\s${relevant}`, 'i')) !== null;
      });
      fittingValues.sort((left, right) => {
        const leftValue = getObjectField(left, this.itemText);
        const rightValue = getObjectField(right, this.itemText);
        if (
          leftValue.slice(0, relevant.length).toLowerCase() === relevant
          && rightValue.slice(0, relevant.length).toLowerCase() !== relevant
        ) return -1;
        if (
          rightValue.slice(0, relevant.length).toLowerCase() === relevant
          && leftValue.slice(0, relevant.length).toLowerCase() !== relevant
        ) return 1;
        if (leftValue > rightValue) return 1;
        if (leftValue < rightValue) return -1;
        return 0;
      });

      const search =  getObjectField(fittingValues[0], this.itemText);
      const index = this.list
        .findIndex(item => {
          const name = getObjectField(item, this.itemText);
          if (this.$getType(name) !== 'String') return;
          return name === search;
        });

      if (index === -1) {
        this.relevant = null;
        return;
      }
      relevant = this.list[index];
      this.$set(this, 'relevant', relevant);
      // this.relevant = this.list[index];
      this.list.splice(index, 1);
      // (this.reverseList) ? this.list.push(this.relevant) : this.list.unshift(this.relevant);
      this.list.unshift(relevant);
      this.chosenElement = 0;
    },
    autoSelect() {
      if (!this.multiple && !this.localValue && this.relevant && !this.showList) {
        this.selectItem(this.relevant);
      }
      this.relevant = null;
    },
    removeOptionalFilters(request) {
      // eslint-disable-next-line no-underscore-dangle
      return request._filter.filter(filter => filter.mandatory);
    },
    getUnchosenList(list, useStringFilter = false, reverse = false) {
      if (!this.localValue || this.multiple) {
        return reverse
          ? list.slice().reverse()
          : list;
      }
      const result = [];
      const values = this.$getType(this.localValue) === 'Array'
        ? this.localValue
        : [this.localValue];
      const hashMap = {};

      values.forEach(value => {
        const type = this.$getType(value);
        hashMap[type === 'Object' ? value.id : value] = true;
      });
      let i = reverse ? list.length - 1 : 0;
      const condition = () => (reverse ? i >= 0 : i < list.length);
      const increment = () => (reverse ? i-- : i++);
      while (condition()) {
        const item = list[i];
        const type = this.$getType(item);
        if (!hashMap[type === 'Object' ? item.id : item]) {
          result.push(item);
        }
        increment();
      }

      return useStringFilter
        ? result.filter(item => {
          const value = this.getName(item).toString().toLowerCase();
          const regExp = this.stringFilter.toLowerCase();
          return value.match(regExp) !== null;
        })
        : result;
    },
    getFilters(request) {
      if (!request) return;

      const filters = this.removeOptionalFilters(request);
      if (!this.noDeletedFilter) {
        filters.push(new Filter('deletedAt', 'exists', false));
      }

      const searchType = this.$getType(this.itemSearchField);
      if (searchType === 'Array') {
        this.itemSearchField.forEach((field, index) => {
          const multipleFilter = new Filter(
            field,
            'multiple',
            this.stringFilter,
            index !== 0,
          );
          filters.push(multipleFilter);
        });
        return filters;
      }

      const field = searchType === 'String' && this.itemSearchField
        ? this.itemSearchField
        : this.itemText;
      filters.push(new Filter(field, 'multiple', this.stringFilter));

      return filters;
    },
    async getList() {
      const type = this.$getType(this.query);
      if (type !== 'Object' && type !== 'String') return;

      const request = type === 'Object' ? this.query : new Get(this.query);
      request
        .setFilter(this.getFilters(request))
        .setOrder([{ field: this.itemText, direction: 'ASC' }])
        .pagination(true)
        .count(true)
        .limitStart((this.currentPage - 1) * this.itemsPerPage)
        .limitShown(this.itemsPerPage);

      const response = await this.$xhr.send(request)
        .catch(this.$errorHandler());
      if (response) {
        this.localList = response.data.data.result;
      }
      return response;
    },
    async getNextPage() {
      if (!this.query || this.blockInfiniteScroll) return;
      this.currentPage += 1;
      const oldList = this.localList;
      this.localList = [];
      const response = await this.getList();
      this.localList = oldList.concat(this.localList);
      if (response.data.pagination.all >= this.currentPage) this.blockInfiniteScroll = true;
    },
    getName(value) {
      const type = this.$getType(value);
      if (type === 'String' || type === 'Number') return value;
      return type === 'Object' ? getObjectField(value, this.itemText) : '';
    },
    chosenItem(index) {
      // if (this.reverseList) {
      //   return (this.list.length - 1 - index === this.chosenElement);
      // }
      return index === this.chosenElement;
    },
    buttonUp() {
      let result = this.chosenElement -1;
      if (result < 0) result = 0;
      this.chosenElement = result;
    },
    buttonDown() {
      let result = this.chosenElement + 1;
      if (result >= this.list.length) result = this.list.length - 1;
      this.chosenElement = result;
    },
    async buttonEnter() {
      this.selectItem(this.list[this.chosenElement]);
      this.relevant = null;
      this.stringFilter = '';
      await this.$nextTick();
      if (this.chosenElement === this.list.length && this.chosenElement.length !== 0) {
        this.chosenElement -= 1;
      }
    },
    listCordController() {
      const element = this.$el;
      const documentHeight = document.documentElement.clientHeight;
      const documentWidth = document.documentElement.clientWidth;
      const selectToBottomDocument = documentHeight - element.getBoundingClientRect().bottom;
      const selectToTopDocument = element.getBoundingClientRect().top;
      let listHeight;
      if (this.list && this.list.length !== 0) {
        listHeight = this.list.length * 36 + 4;
      } else {
        listHeight = 50;
      }
      if (listHeight > 460) listHeight = 460;

      let right = documentWidth - element.getBoundingClientRect().right;
      const left = element.getBoundingClientRect().left + 8;

      if (this.listWidth === 'default') {
        right = documentWidth - left - 308;
      }
      if (this.$getType(+this.listWidth) === 'Number') {
        right = documentWidth - left - (+this.listWidth);
      }

      this.reverseList = selectToBottomDocument < selectToTopDocument;
      const [main, other] = this.reverseList ? ['bottom', 'top'] : ['top', 'bottom'];
      this.listCord = {
        left,
        right: right + 8,
        top: main === 'top'
          ? Math.max(element.getBoundingClientRect().bottom - (this.isCompact ? -4 : 2), 0)
          : 0,
        bottom: main === 'bottom'
          ? Math.max(documentHeight - element.getBoundingClientRect().bottom + (this.isCompact ? 35 : 62), 0)
          : 0,
      };

      const otherCoord = documentHeight - this.listCord[main] - listHeight;
      this.listCord[other] = otherCoord > 0 ? otherCoord : 20;
    },
    toggleList(event) {
      // return this.showList
      //   ? this.closeList(event, true)
      //   : this.openList(event);
      this.openList(event)
    },
    openList(event) {
      if (this.readonly || event.target.closest('.close-btn')) return;
      if (this.delayRequest && !this.finishedDelayedRequest) {
        this.getList();
        this.finishedDelayedRequest = true;
      }

      if (this.isCompact && !this.multiple && this.localValue) {
        this.relevant = this.localValue;
        this.selectItem(null);
        const type = this.$getType(this.relevant);
        this.chosenElement = this.list
          .findIndex(elem => {
            if (type === 'Object') return elem.id === this.relevant.id;
            return elem === this.relevant;
          });
      }
      this.showList = true;
      this.focusOnAutocomplete();

      this.listCordController();
      document.addEventListener('scroll', this.listCordController, true);
      window.addEventListener('resize', this.listCordController, false);
      this.$options.unWatchList = this.$watch('list', this.listCordController);
      // this.closeBarrier = true;
      // this.$eventBus.emit('close-list');
    },
    closeList(event, force) {
      // if (this.closeBarrier) {
      //   this.closeBarrier = false;
      //   return;
      // }
      if (
        !event
        || ((event.target.closest('.search-select') === null || force)
        && !event.target.closest('.close-btn')
        && !event.target.closest('.search-select-item')
        && !event.target.closest('.search-select-placeholder'))
      ) {
        this.showList = false;
        document.removeEventListener('scroll', this.listCordController, true);
        window.removeEventListener('resize', this.listCordController, false);
        if (this.$options.unWatchList) this.$options.unWatchList();
        // this.blurAutocomplete();
      }
    },
    selectAllItems() {
      if (this.allIsSelected) {
        this.localValue.splice(0, this.localValue.length);
        return;
      }
      this.localValue.splice(0, this.localValue.length, ...this.list);
    },
    async selectItem(item) {
      if (this.multiple) {
        if (!item) return;
        if (this.$getType(this.localValue) !== 'Array') {
          if (this.localValue) {
            this.localValue = [this.localValue, item];
          } else {
            this.localValue = [];
          }
        }
        const chosenIndex = this.checkChosen(item);
        if (chosenIndex !== false) {
          this.localValue.splice(chosenIndex, 1);
          return;
        }
        this.localValue.push(item);
        return;
      }
      this.localValue = item;
      if (item) {
        this.relevant = null;
        this.blurAutocomplete();
        this.stringFilter = '';
      }
      this.closeList();
    },
    unselectItem(item) {
      if (this.$getType(this.localValue) !== 'Array') return;
      if (this.$getType(item) === 'String' || this.$getType(item) === 'Number') {
        for (let i = 0; i < this.localValue.length; i++) {
          if (item === this.localValue[i]) {
            this.localValue.splice(i, 1);
            if (this.showList) this.focusOnAutocomplete();
            if (this.chosenElement < 0) this.chosenElement = 0;
            break;
          }
        }
        return;
      }
      const unselected = JSON.stringify(item);
      for (let i = 0; i < this.localValue.length; i++) {
        if (JSON.stringify(this.localValue[i]) === unselected) {
          this.localValue.splice(i, 1);
          if (this.showList) this.focusOnAutocomplete();
          if (this.chosenElement < 0) this.chosenElement = 0;
          return;
        }
      }
    },
    clearValue() {
      this.localValue = this.multiple ? [] : null;
      this.$emit('input', this.localValue)
    },
    checkChosen(item) {
      if (!item || this.$getType(this.localValue) !== 'Array') return true;
      const type = this.$getType(item);
      if (type === 'String' || type === 'Number') {
        const index = this.localValue.findIndex(elem => elem === item);
        return index === -1 ? false : index;
      }
      if (type === 'Object') {
        const itemString = item.id !== undefined ? null : JSON.stringify(item);
        for (let i = 0; i < this.localValue.length; i++) {
          if (itemString && JSON.stringify(this.localValue[i]) === itemString) {
            return i;
          } else if (item.id && item.id === this.localValue[i].id) {
            return i;
          }
        }
      }
      return false;
    },
    focusOnAutocomplete() {
      const input = this.$el.querySelector('.search-select-filter');
      if (input) input.focus();
    },
    blurAutocomplete() {
      const input = this.$el.querySelector('.search-select-filter');
      if (input) input.blur();
    },
    validateRules() {
      let result = true;
      // eslint-disable-next-line no-restricted-syntax
      for (const rule of this.rules) {
        const type = this.$getType(rule);
        if (type === 'Function') {
          const ruleValue = rule(this.localValue);
          if (!ruleValue) result = false;
          if (this.$getType(ruleValue) === 'String') {
            this.addErrorMessage(ruleValue);
            result = false;
          }
        }
        if (type === 'Boolean' && !rule) {
          result = false;
        }
        if (type === 'String' && rule) {
          this.addErrorMessage(rule);
          result = false;
        }
      }
      return result;
    },
    getItemKey(item, index) {
      if (!item) return `no-item-${index}`
      if (this.$getType(this.dynamicKey) !== 'Function') {
        return `selectable- ${(item.id || this.getName(item))}`;
      }
      return this.dynamicKey(item, index);
    },
  },
};
</script>

<style lang="stylus">
.search-select
  position: relative
  display: flex
  flex-flow: column nowrap
  justify-content: flex-end
  width: 100%
  padding: 6px 12px 7px
  height: 54px
  margin-bottom: 0
  background-color: #ffffff
  &.is-compact
    display: block
    height: auto
    padding: 5px 12px 4px
    .search-select-field
      display: grid
      grid-template: 100% \/ 122px minmax(0, 1fr)
      height: 21px
      padding: 0
      margin-bottom: 0
      &::before
        left: auto
        right: 0
        width: calc(100% - 122px)
        background: transparent
        opacity: 1
      &.is-invalid::before
        background: #CF4949
      &.is-active::before
        background: #416fc8
    .search-select-values
      width: auto
      min-height: auto
      padding: 0
    .search-select-chosen, .search-select-placeholder
      height: 100%
      padding: 0
    .search-select-chosen
      .close-btn
        margin-top: 1px
      .filled-items
        margin: 0 6px 0 0
        padding: 0 8px
        line-height: 14px
        height: 16px
        margin-bottom: 4px
        .close-btn
          width: 21px
          height: 21px
          margin-top: 0
    .search-select-label
      position: static
      z-index: 1
      display: inline-block
      width: 122px
      min-width: 122px
      height: 21px
      padding: 3px 8px 3px 0
      font-size: 14px
      overflow: hidden
      text-overflow: ellipsis
      color: #888a91
      opacity: 1
    .search-select-items
      padding-top: 0
    .search-select-chosen-diff
      padding-top: 0
    .search-select-filter
      margin-bottom: -1px

.search-select-field
  position: relative
  display: flex
  flex-flow: row nowrap
  min-height: 14px
  margin-bottom: 3px
  padding: 0
  cursor: pointer
  &::before, &::after
    content: ''
    position: absolute
    bottom: 0
    left: 0
    z-index: 2
    display: block
    width: 100%
    height: 1px
    background: #313131
    opacity: 0.2
  &::after
    content: ''
    left: 50%
    z-index: 3
    transform: translateX(-50%)
    opacity: 1
    width: 0
    height: 2px
    background: #416FC8
    transition: width 0.3s ease
  &.is-active
    &::before
      background: #416FC8
      opacity: 1
  &.is-invalid
    color: #CF4949
    .search-select-placeholder
      color: #CF4949
  &.with-triangle
    padding-right: 24px

.search-select-triangle
  position: absolute!important
  top: 50%
  right: 0
  transform: translateY(-50%)
  color: #919191

.search-select-label
  position: absolute
  top: -5px
  left: 0
  z-index: 1
  display: inline-block
  width: 100%
  height: 12px
  color: #888a90
  font-size: 12px
  line-height: 1
  text-overflow: ellipsis
  overflow: hidden
  &.is-invalid
    color: #CF4949

.search-select-values
  position relative
  flex-grow: 2
  display: flex
  flex-flow: row nowrap
  align-items: center
  justify-content: flex-start
  width: 100%
  height: 100%
  min-height: 32px
  padding: 5px 0 4px
  overflow: hidden
  &.is-invalid
    color: #cf4949
    .search-select-placeholder
      color: #cf4949!important

.search-select-errors
  min-height: 14px
  max-width: 100%
  color: #cf4949
  font-size: 12px
  line-height: 12px
  word-break: break-word
  word-wrap: break-word
  -webkit-hyphens: auto
  -ms-hyphens: auto
  hyphens: auto

.search-select-items
  position: fixed
  z-index: 102
  display: flex
  flex-flow: column nowrap
  height: 0
  max-height: 460px
  padding: 0
  border-radius: 4px
  background: #ffffff
  overflow: hidden auto
  transition: height 0.3s ease, top .1s, bottom .1s
  &.is-visible
    height: auto
    box-shadow: 0 5px 20px rgba(63, 74, 106, 0.4);

.search-select-items-list
  padding: 6px 0

.search-select-filter
  position: relative
  height: 21px
  min-width: 0
  padding: 3px 0 4px
  margin-bottom: -7px
  outline: none
  box-shadow: none
  font-size: 14px
  &::placeholder
    opacity: 0
  &:hover:not(:focus)
    cursor: pointer

  &.no-matches
    color: #CF4949

  &.in-dropdown
    width: 100%
    height: 20px
    padding-right: 25px
    border-bottom: 1px solid #416FC8

.search-select-filter-wrapper
  position: relative
  padding: 0 17px
  margin-bottom: 10px
  .close-btn
    position: absolute
    right: 15px
    top: 1px
    z-index: 1

.select-clear-button.v-btn
  position: absolute
  top: 50%
  right: 23px
  transform: translateY(-50%)
  &.theme--light.v-btn:hover::before, &.theme--light::before
    opacity: 1
    background: #F3F5F8!important

.search-select-chosen-diff
  display: inline-block
  padding-top: 6px
  margin-bottom: 1px
  font-size: 12px
  line-height: 12px
  white-space: nowrap
  color: #888A90
  &.with-filled-items
    margin-bottom: 4px

@media(max-width: 959px)
  .search-select, .search-select.is-compact
    padding-left: 8px
    padding-right: 8px
</style>
