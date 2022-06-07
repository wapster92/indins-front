<template>
  <div
    :class="{'only-input': !displayFilter}"
    class="filters">
    <div
      :class="{ active: filtersAreShown, invisible: !displayFilter }"
      class="filters__icon-wrapper"
      @click="filtersAreShown = !filtersAreShown">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.22222 12H7.77778C8.20556 12 8.55556 11.6625 8.55556 11.25C8.55556 10.8375 8.20556 10.5 7.77778 10.5H6.22222C5.79444 10.5 5.44444 10.8375 5.44444 11.25C5.44444 11.6625 5.79444 12 6.22222 12ZM0 3.75C0 4.1625 0.35 4.5 0.777778 4.5H13.2222C13.65 4.5 14 4.1625 14 3.75C14 3.3375 13.65 3 13.2222 3H0.777778C0.35 3 0 3.3375 0 3.75ZM3.11111 8.25H10.8889C11.3167 8.25 11.6667 7.9125 11.6667 7.5C11.6667 7.0875 11.3167 6.75 10.8889 6.75H3.11111C2.68333 6.75 2.33333 7.0875 2.33333 7.5C2.33333 7.9125 2.68333 8.25 3.11111 8.25Z"
          fill="#3F629F"/>
      </svg>
    </div>
    <TkSearch
      clearable
      class="filters__search-bar search-bar"
      @input-clear="$emit('input-clear')"
      @click="constructFilters('text')"
      @input="filterString = $event"/>
    <div
      v-if="condition"
      class="filter">
      <div
        :class="{ 'filters-visible': filterToShowIdx != null }"
        class="filter__type-area types">
        <TkFilterButton
          v-for="(filter, idx) of filters"
          :key="idx"
          :idx="idx"
          :active-idx="filterToShowIdx"
          @change-filter="chooseFilter($event)">{{ filter.name }}</TkFilterButton>
      </div>
      <div
        v-if="filterToShowIdx != null"
        class="filter__sliders slider">
        <div
          v-for="rate in filters[filterToShowIdx].slidersData"
          :key="rate.title"
          class="slider__wrapper">
          <span><span class="slider__title">{{ rate.title }}</span> {{ rate.data | stringVal }}</span>
          <ElSlider
            v-model="rate.data"
            :show-tooltip="false"
            range/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElSlider from 'element-ui/lib/slider';
import { Filter, Get } from 'core-xhr';
import TkFilterButton from '@/components/UI/buttons/TkFilterButton';
import TkButton from '@/components/UI/buttons/TkButton';
import 'element-ui/lib/theme-chalk/slider.css';
import { getType } from '@/utils/helpers';
import TkSearch from './TkSearch';
import { debounce } from '@/utils/decorators';

const getFilters = async xhr => {
  const request = new Get('filters').addFilter(new Filter('visible', 'bool', true));
  try {
    const response = await xhr.send(request);
    if (!response.data?.data?.result.length) return;
    return response.data.data;
  } catch (e) {
    console.log(e);
  }
};

export default {
  name: 'TkFilter',
  components: {
    TkSearch, TkFilterButton, TkButton, ElSlider,
  },
  filters: {
    stringVal(val) {
      return val.join(' - ');
    },
  },
  async fetch() {
    if (!this.displayFilter) return;
    const filters = await getFilters(this.$xhr);
    if (filters?.result.length) {
      this.filters = filters.result.map(filter => ({
        id: filter?.id,
        name: filter?.name,
        slidersData: {
          overall: {
            data: [filter?.rl, filter?.rh],
            title: 'Оценка: ',
          },
          weeklyRating: {
            data: [filter?.pwl, filter?.pwh],
            title: 'Неделя: ',
          },
          dailyRating: {
            data: [filter?.pdl, filter?.pdh],
            title: '24 часа: ',
          },
          monthlyRating: {
            data: [filter?.pml, filter?.pmh],
            title: 'Месяц: ',
          },
        },
      }));
    }
  },
  props: {
    displayFilter: {
      type: Boolean,
      default: true,
    },
    query: {
      type: [Object, String, null],
      default: null,
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
    hideInvisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filterToShowIdx: null,
      filtersAreShown: false,
      filterString: '',
      filters: [],
    };
  },
  computed: {
    windowWidth() {
      const val = this.$store.state.screen.windowWidth > 720;
      this.toggleFilters(val);
      return val;
    },
    condition() {
      return this.filtersAreShown && this.displayFilter && this.filters.length;
    },
  },
  watch: {
    windowWidth(val) {
      this.toggleFilters(val);
    },
    filters: {
      handler() {
        if (this.filterToShowIdx) {
          this.debouncedFiltersConstruction();
        }
      },
      deep: true,
    },
  },
  methods: {
    toggleFilters(val) {
      if (val) this.filtersAreShown = true;
    },
    chooseFilter(idx) {
      this.filterToShowIdx = this.filterToShowIdx === idx ? null : idx;
      if (!this.filterToShowIdx) this.$emit('input-clear');
    },
    debouncedFiltersConstruction: debounce(function (e) {
      this.constructFilters(e);
    }, 1500),
    constructFilters(mode) {
      const filters = [];
      if (mode === 'text' || this.filterString) {
        const searchType = getType(this.itemSearchField);
        if (searchType === 'Array') {
          this.itemSearchField.forEach((field, idx) => {
            const filter = {
              field,
              operator: 'multiple',
              value: this.filterString,
              orFilter: idx !== 0,
            };
            filters.push(filter);
          });
        }
        if (searchType === 'String') {
          const field = this.itemSearchField
            ? this.itemSearchField
            : this.itemText;
          filters.push({ field, operator: 'like', value: this.filterString });
        }
      }
      if (this.filters.length && this.filtersAreShown && this.filterToShowIdx != null) {
        const customFilters = [
          { field: 'rate', operator: 'gte', value: this.filters[this.filterToShowIdx].slidersData.overall.data[0] },
          { field: 'rate', operator: 'lte', value: this.filters[this.filterToShowIdx].slidersData.overall.data[1] },
          { field: 'pdl', operator: 'gte', value: this.filters[this.filterToShowIdx].slidersData.dailyRating.data[0] },
          { field: 'pdh', operator: 'lte', value: this.filters[this.filterToShowIdx].slidersData.dailyRating.data[1] },
          { field: 'pwl', operator: 'gte', value: this.filters[this.filterToShowIdx].slidersData.weeklyRating.data[0] },
          { field: 'pwh', operator: 'lte', value: this.filters[this.filterToShowIdx].slidersData.weeklyRating.data[1] },
          { field: 'pml', operator: 'gte', value: this.filters[this.filterToShowIdx].slidersData.monthlyRating.data[0] },
          { field: 'pmh', operator: 'lte', value: this.filters[this.filterToShowIdx].slidersData.monthlyRating.data[1] },
        ];
        customFilters.forEach(el => filters.push(el));
      }
      this.$emit('constructed-filters', filters);
    },
  },
};
</script>

<style lang="scss" scoped>
.filters {
  display: grid;
  grid-template-areas: "icon bar"
                      "filters filters";
  grid-template-columns: 30px 1fr;
  column-gap: 10px;
  row-gap: 20px;
  @include min-media($md + 1) {
    display: flex;
    flex-direction: column;
  }
  &.only-input {
    grid-template-columns: 1fr;
    grid-template-areas: none;
    & .search-bar {
      grid-area: unset;
    }
  }
  &__icon-wrapper {
    width: 30px;
    height: 40px;
    grid-area: icon;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px $secondary-gray solid;
    border-radius: 4px;
    background: transparent;
    margin-right: 10px;
    @include min-media($md + 1) {
      display: none;
    }
    &.active {
      background: $primary-blue;
      svg {
        path {
          fill: white;
        }
      }
    }
    &.invisible {
      display: none;
    }
  }
  &__search-bar {
    width: 100%;
    grid-area: bar;
    border-radius: 4px;
    min-height: 40px;
    border: 1px $secondary-gray solid;
    &:focus-within {
      border-color: $primary-blue;
    }
    @include min-media($md + 1) {
      max-width: 384px;
    }
    input {
      width: 100%;
      border: none;
      padding: 8px;
      outline: none;
      @include min-media($md + 1) {
        padding: 12px 20px;
      }
    }
  }

}
.search-bar {
  display: flex;
  max-height: 30px;
  &__icon-wrapper {
    border-left: 1px $secondary-gray solid;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 11px 8px 9px;
    img {
      cursor: pointer;
    }
  }
}
.filter {
  grid-area: filters;
  padding: 16px 16px 20px;
  background: #FFF;
  border-radius: 8px;
  box-shadow: 0 0 18px rgba(63, 98, 159, 0.28);
  @include min-media($md + 1) {
    padding: 16px 0 20px;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    column-gap: 15%;
    border-radius: 0;
    box-shadow: none;
  }
  &__type-area {
    display: flex;
    flex-wrap: wrap;
    &.filters-visible {
      @include max-media($md) {
        margin-bottom: 15px;
      }
    }
    .button-filter {
      font-size: 12px;
      margin-right: 8px;
      margin-bottom: 10px;
      @include min-media($md + 1) {
        height: 32px;
      }
    }
  }
  & .button-main {
    width: 186px;
    margin: 15px auto 0;
    @include min-media($md + 1) {
      display: none;
    }
  }
}
.slider {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.25rem;
  row-gap: 0.75rem;
  @include min-media($md + 1) {
    max-height: 126px;
  }
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    & > span {
      color: $secondary-medium-black;
    }
    & > div {
      width: 100%;
    }
  }
  &__title {
    color: $primary-blue;
  }
}
</style>
<style lang="scss">
.el-slider {
  &__bar {
    background: $primary-blue;
  }
  &__button {
    border-color: $primary-blue;
  }
}
</style>
