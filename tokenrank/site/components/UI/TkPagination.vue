<template>
  <ul
    class="pagination">
    <li
      v-for="(page, i) of pages"
      :key="i"
      :class="[
        page.selected ? 'pagination__item--active' : '',
        page.disabled ? 'pagination__item--disable' : '',
        page.breakView ? 'pagination__item--doted' : '']"
      class="pagination__item">
      <a
        v-if="page.breakView"
        class="pagination__link pagination__link--doted"
        tabindex="0"><slot name="breakViewContent">{{ breakViewText }}</slot></a>
      <a
        v-else-if="page.disabled"
        class="pagination__link"
        tabindex="0">{{ page.content }}</a>
      <a
        v-else
        class="pagination__link"
        tabindex="0"
        @click="handlePageSelected(page.index + 1)"
        @keyup.enter="handlePageSelected(page.index + 1)">{{ page.content }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    forcePage: {
      type: Number,
      default: undefined,
    },
    clickHandler: {
      type: Function,
      default: () => { },
    },
    pageRange: {
      type: Number,
      default: 3,
    },
    marginPages: {
      type: Number,
      default: 1,
    },
    breakViewText: {
      type: String,
      default: '…',
    },
  },
  data() {
    return {
      innerValue: 1,
    };
  },
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(newValue) {
        // this.value = newValue;
        this.$emit('input', newValue);
      },
    },
    pages() {
      const items = {};
      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index++) {
          items[index] = {
            index,
            content: index + 1,
            selected: index === (this.selected - 1),
          };
        }
      } else {
        const halfPageRange = Math.floor(this.pageRange / 2);
        const setPageItem = index => {
          items[index] = {
            index,
            content: index + 1,
            selected: index === (this.selected - 1),
          };
        };
        const setBreakView = index => {
          items[index] = {
            disabled: true,
            breakView: true,
          };
        };
        // 1st - loop thru low end of margin pages
        for (let i = 0; i < this.marginPages; i++) {
          setPageItem(i);
        }
        // 2nd - loop thru selected range
        let selectedRangeLow = 0;
        if (this.selected - halfPageRange > 0) {
          selectedRangeLow = this.selected - 1 - halfPageRange;
        }
        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;
        if (selectedRangeHigh >= this.pageCount) {
          selectedRangeHigh = this.pageCount - 1;
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
        }
        for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i++) {
          setPageItem(i);
        }
        // Check if there is breakView in the left of selected range
        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1);
        }
        // Check if there is breakView in the right of selected range
        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1);
        }
        // 3rd - loop thru high end of margin pages
        for (let i = this.pageCount - 1; i >= this.pageCount - this.marginPages; i--) {
          setPageItem(i);
        }
      }
      return items;
    },
  },
  beforeUpdate() {
    if (this.forcePage === undefined) return;
    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage;
    }
  },
  methods: {
    handlePageSelected(selected) {
      if (this.selected === selected) return;
      this.selected = selected;
      this.clickHandler(selected);
    },
    prevPage() {
      if (this.selected <= 1) return;
      this.handlePageSelected(this.selected - 1);
    },
    nextPage() {
      if (this.selected >= this.pageCount) return;
      this.handlePageSelected(this.selected + 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  list-style-type: none;
  display: flex;
  justify-content: center;
  padding: 0;
  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $secondary-gray;
    background: $secondary-white;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    color: $primary-blue;
    cursor: pointer;
    margin: 0 5px;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    &--active, &:hover, &:focus {
      color: $secondary-white;
      background: $primary-blue;
      border-color: transparent;
    }
  }
  a {
    height: 100%;
    width: 100%;
    text-decoration: none;
    line-height: 16px;
    font-size: 16px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding-top: 3px;
    color: inherit;
    user-select: none;
  }
}
</style>
