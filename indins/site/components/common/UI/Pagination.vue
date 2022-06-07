<!-- eslint-disable max-len -->
<template>
  <client-only>
    <div class="pagination">
      <div class="pagination__container">
        <div
          :class="prevBtnClassList"
          data-arrow="prev"
          @click="changeActivePage"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="624.107px"
            height="444.802px"
            viewBox="94.286 193.371 624.107 444.802"
            enable-background="new 94.286 193.371 624.107 444.802"
            xml:space="preserve"
          >
            <g>
              <path
                d="M711.796,637.911L97.688,430.856c-2.007-0.678-3.37-2.546-3.401-4.664
                                c-0.031-2.119,1.276-4.028,3.263-4.763l614.105-227.745c2.057-0.764,4.374-0.095,5.709,1.649c1.335,1.743,1.375,4.153,0.101,5.941
                                L557.272,425.976l160.056,204.112c1.364,1.74,1.424,4.167,0.148,5.972c-0.956,1.351-2.492,2.113-4.083,2.113
                                C712.86,638.173,712.321,638.088,711.796,637.911z M114.27,425.893l584.861,197.195L547.096,429.202
                                c-1.368-1.743-1.424-4.177-0.14-5.983l152.922-214.502L114.27,425.893z"
              />
            </g>
          </svg>
        </div>
        <div
          :class="nextBtnClassList"
          data-arrow="next"
          @click="changeActivePage"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="624.107px"
            height="444.801px"
            viewBox="94.286 193.371 624.107 444.801"
            enable-background="new 94.286 193.371 624.107 444.801"
            xml:space="preserve"
          >
            <g>
              <path
                d="M99.287,638.173c-1.591,0-3.127-0.762-4.083-2.113c-1.276-1.805-1.216-4.232,0.148-5.972l160.056-204.112
                        L95.215,201.274c-1.274-1.788-1.234-4.198,0.101-5.941c1.335-1.744,3.652-2.413,5.709-1.649L715.13,421.429
                        c1.987,0.735,3.294,2.644,3.263,4.763c-0.031,2.118-1.394,3.986-3.401,4.664L100.884,637.911
                        C100.359,638.088,99.82,638.173,99.287,638.173z M112.802,208.717l152.922,214.502c1.284,1.806,1.228,4.24-0.14,5.983
                        L113.549,623.088L698.41,425.893L112.802,208.717z"
              />
            </g>
          </svg>
        </div>
        <div class="pagination__container__mobile-buttons">
          <div
            class="pagination__container__mobile-buttons__prev-btn"
            data-arrow="prev"
            @click="changeActivePage"
          >Назад</div>
          <div
            class="pagination__container__mobile-buttons__next-btn"
            data-arrow="next"
            @click="changeActivePage"
          >Дальше</div>
        </div>
        <div class="pagination__container__pages-block">
          <div
            v-for="(item, index) in pages"
            :key="item + index"
            :class="{
              'pagination__container__pages-block__page': true,
              'pagination__container__pages-block__page_active': item === localActivePage,
              'pagination__container__pages-block__page_filler': item === filler
            }"
            @click="changeActivePage($event, item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import { breakpointsMixin } from '~/mixins';

export default {
  name: 'Pagination',

  mixins: [
    breakpointsMixin,
  ],

  props: {
    pageCount: {
      type: Number,
      default: 1,
    },

    value: {
      type: Number,
      default: 1,
    },
  },

  data: () => ({
    desktopAmountElements: 10,
    mobileAmountElements: 7,
    elementsAroundActive: [],
    filler: '...',
  }),

  computed: {
    localActivePage: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },

    prevBtnDisabled() {
      return this.localActivePage <= 1;
    },

    nextBtnDisabled() {
      return this.localActivePage >= this.pageCount;
    },

    insideFirstPageGroup() {
      const insideCount = this.smAndDown ? 4 : 5;
      return this.localActivePage <= insideCount;
    },

    insideLastPageGroup() {
      const insideCount = this.smAndDown ? 4 : 5;
      return this.localActivePage >= this.pageCount - insideCount;
    },

    insideActiveGroup() {
      const activeIndex = this.elementsAroundActive.indexOf(this.localActivePage);
      return activeIndex > 0 && activeIndex < this.elementsAroundActive.length - 1;
    },

    amountElements() {
      return this.smAndDown ? this.mobileAmountElements : this.desktopAmountElements;
    },

    pages() {
      const totalElements = [];

      for (let i = 1; i <= this.pageCount; i++) {
        totalElements.push(i);
      }

      if (this.pageCount <= this.amountElements) {
        return totalElements;
      }

      this.setElementsAroundActive(totalElements);

      if (this.insideFirstPageGroup) {
        return [...this.elementsAroundActive, this.filler, totalElements[this.pageCount - 1]];
      }

      if (this.insideLastPageGroup) {
        return [totalElements[0], this.filler, ...this.elementsAroundActive];
      }

      return [
        totalElements[0],
        this.filler,
        ...this.elementsAroundActive,
        this.filler,
        totalElements[this.pageCount - 1],
      ];
    },

    prevBtnClassList() {
      return {
        'pagination__prev-btn': true,
        'pagination__prev-btn_disabled': this.prevBtnDisabled,
      };
    },

    nextBtnClassList() {
      return {
        'pagination__next-btn': true,
        'pagination__next-btn_disabled': this.nextBtnDisabled,
      };
    },
  },

  methods: {
    setElementsAroundActive(totalElements) {
      if (this.insideFirstPageGroup) {
        this.elementsAroundActive = totalElements.slice(0, this.amountElements - 2);
        this.activeGroup = false;
        return;
      }

      if (this.insideLastPageGroup) {
        this.elementsAroundActive = totalElements.slice(-(this.amountElements - 2));
        this.activeGroup = false;
        return;
      }

      if (this.activeGroup && this.insideActiveGroup) {
        return;
      }

      const activeIndex = totalElements.indexOf(this.localActivePage);
      const lastIndex = totalElements.length - 1;
      const startIndex = activeIndex - 2 >= 0 ? activeIndex - 2 : 0;
      const endCount = this.smAndDown ? 3 : 4;
      const endIndex = activeIndex + endCount <= lastIndex ? activeIndex + endCount : lastIndex;

      this.elementsAroundActive = totalElements.slice(startIndex, endIndex);
      this.activeGroup = true;
    },

    changeActivePage(event, pageNumber) {
      if (pageNumber === this.localActivePage) {
        return;
      }

      if (pageNumber === this.filler) {
        return;
      }

      let value = pageNumber || 0;

      if (!pageNumber) {
        switch (event.currentTarget.dataset.arrow) {
          case 'prev':
            value = this.localActivePage - 1 >= 0 ? this.localActivePage - 1 : 0;
            break;
          case 'next':
            value = this.localActivePage + 1 <= this.pageCount ? this.localActivePage + 1 : this.pageCount;
            break;
          default:
            break;
        }
      }
      this.$emit('pageChanged', value);
      this.localActivePage = value;
    },
  },
};
</script>
