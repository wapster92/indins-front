<template>
  <ElSelect
    ref="selectRef"
    v-model="localValue"
    v-bind="$attrs"
    :loading="loading"
    :placeholder="placeholder"
    loading-text="Пожалуйста, подождите">
    <template
      v-slot:empty
      v-if="!loading">
      <ElInput
        v-if="filter"
        v-model="stringFilter"
        clearable
        placeholder="Введите название"
        @input="inputFilter($event)"/>
      <div class="empty__warning-container">Данных не найдено.</div>
    </template>
    <ElInput
      v-if="filter"
      v-model="stringFilter"
      clearable
      placeholder="Введите название"
      @input="inputFilter($event)"/>
    <ElOption
      v-for="item of list"
      :key="item.name"
      :label="item.ticker"
      :value="item.name">
      <span>{{ item.name }}</span>
      <TkTag v-if="item.ticker">{{ item.ticker }}</TkTag>
    </ElOption>
  </ElSelect>
</template>

<script>
import ElSelect from 'element-ui/lib/select';
import ElOption from 'element-ui/lib/option';
import ElInput from 'element-ui/lib/input';
import 'element-ui/lib/theme-chalk/select.css';
import 'element-ui/lib/theme-chalk/select-dropdown.css';
import 'element-ui/lib/theme-chalk/option.css';
import 'element-ui/lib/theme-chalk/option-group.css';
import 'element-ui/lib/theme-chalk/input.css';
import 'element-ui/lib/theme-chalk/icon.css';
import { Filter, Get } from 'core-xhr';
import TkTag from './buttons/TkTag';
import { getType } from '@/utils/helpers';
import { debounce } from '@/utils/decorators';

export default {
  name: 'TkSelect',
  components: {
    ElSelect, ElOption, TkTag, ElInput,
  },
  props: {
    filter: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => ([]),
    },
    placeholder: {
      type: String,
      default: 'Фильтр по криптовалюте',
    },
    query: {
      type: [Object, String, null],
      default: null,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    itemText: {
      type: String,
      default: 'name',
    },
    itemSearchField: {
      type: [String, Array],
      default: '',
    },
    noDeletedFilter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      stringFilter: '',
      localList: [],
      itemsToShow: [],
      cachedItems: null,
      localValue: null,
      loading: false,
      apiPagination: {
        currentPage: 1,
        itemsPerPage: 100,
        scrollPossible: true,
      },
      el: null,
      elParentHeight: null,
    };
  },
  computed: {
    list() {
      return this.query ? this.localList : this.itemsToShow;
    },
  },
  watch: {
    query: {
      handler(val) {
        if (val) {
          (async () => {
            await this.getList();
          })();
        }
      },
      immediate: true,
    },
    localValue(val) {
      if (!val) return;
      const emitValueId = this.list.find(el => el.name === val)?.id;
      if (emitValueId != null) {
        this.$emit('input', emitValueId);
      }
    },
    'el.move': {
      handler(val) {
        const percentage = parseFloat(this.el.size) / 100;
        const currentlyScrolled = (val / 100) * this.elParentHeight.$el.clientHeight * percentage
          + this.elParentHeight.$el.clientHeight * percentage;
        if ((this.elParentHeight.$el.clientHeight <= currentlyScrolled)
          && !!this.elParentHeight.$el.clientHeight) {
          this.load(); // this.nextPage будет после написания бэка
        }
      },
    },
    items: {
      handler(val) {
        this.itemsToShow = val.slice(0);
        this.cachedItems = val.slice(0);
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    // eslint-disable-next-line no-underscore-dangle
    this.el = this.$refs.selectRef?.$children[1]?.$children[0]?._vnode?.children[2]?.child;
    this.elParentHeight = this.$refs.selectRef?.$children[1]?.$children[0];
    this.inputFilter = debounce(this.inputFilter, 500);
  },
  methods: {
    async inputFilter(char) {
      if (!char) {
        this.query ? await this.getList() : this.itemsToShow = this.cachedItems.slice(0);
        return;
      }
      await this.searchByString(char);
    },
    async searchByString(val) {
      if (!this.query) {
        this.itemsToShow = this.itemsToShow.filter(el => el.name.includes(val) || el.label.includes(val));
      } else {
        await this.getList(val);
      }
    },
    async load() {
      if (!this.query || !this.apiPagination.scrollPossible) return;
      this.loading = true;
      await this.getNextPage();
      this.loading = false;
    },
    async getList(filterStr) {
      const type = getType(this.query);
      if (type !== 'Object' && type !== 'String') return;

      const request = type === 'Object' ? this.query : new Get(this.query);
      request
        .setFilter(this.getFilters(request, filterStr))
        .setOrder([{ field: this.itemText, direction: 'ASC' }])
        .pagination(true)
        .count(true)
        .limitStart((this.apiPagination.currentPage - 1) * this.apiPagination.itemsPerPage)
        .limitShown(filterStr ? 100 : this.apiPagination.itemsPerPage);

      try {
        const response = await this.$xhr.send(request);
        if (response.data.data?.result?.length) {
          this.localList = response.data.data.result;
        }
        return response;
      } catch (e) {
        console.log(e);
      }
    },
    getFilters(request, str) {
      if (!request) return;

      const filters = request._filter;
      if (!this.noDeletedFilter) {
        filters.push(new Filter('deletedAt', 'exists', false));
      }
      if (str) {
        const searchType = getType(this.itemSearchField);
        if (searchType === 'Array') {
          this.itemSearchField.forEach((field, idx) => {
            const likeFilter = new Filter(
              field,
              'like',
              this.stringFilter,
              idx !== 0,
            );
            filters.push(likeFilter);
          });
          return filters;
        }

        const field = searchType === 'String' && this.itemSearchField
          ? this.itemSearchField
          : this.itemText;
        filters.push(new Filter(field, 'like', this.stringFilter));
      }
      return filters;
    },
    async getNextPage() {
      this.apiPagination.currentPage += 1;
      const oldList = this.localList;
      this.localList = [];
      const response = await this.getList();
      this.localList = oldList.concat(this.localList);
      if (response?.data?.pagination?.all >= this.apiPagination.currentPage) this.apiPagination.scrollPossible = false;
    },
  },
};
</script>

<style lang="scss">
.el-select {
  .el-input {
    &__inner::placeholder {
      color: $primary-blue;
    }
    &__suffix {
      .el-input__icon {
        color: $primary-blue;
      }
    }
  }
}
.el-select-dropdown {
  .el-select-dropdown__item {
    color: $secondary-medium-black;
    @include flex-start;
    gap: 10px;
    &.hover {
      background-color: $secondary-light-color
    }
  }
  .el-input {
    width: calc(100% - 40px);
    margin-left: 20px;
    padding-top: 6px;
    &__inner {
      border: none;
      border-bottom: 1px solid $secondary-gray;
      border-radius: 0;
      height: 24px;
      padding: 0;
      &::placeholder {
        color: $secondary-gray;
      }
    }
  }
}
.empty__warning-container {
  width: calc(100% - 40px);
  max-width: 200px;
  margin-left: 20px;
  padding-top: 6px;
  padding-bottom: 5px;
  font-size: 14px;
}
</style>
