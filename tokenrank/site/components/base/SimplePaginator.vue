<template>
  <div
    v-if="pagesCount > 1"
    class="simple-paginator__container">
    <div class="simple-paginator">
      <div
        :class="[
          'simple-paginator__item simple-paginator__arrow-prev',
          {'simple-paginator__arrow-prev--disabled': active === 1}
        ]"
        @click="prev">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="#1E1A1A"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.9999
            6.99999V8.99999H3.99991L9.49991
            14.5L8.07991
            15.92L0.159912
            7.99999L8.07991
            0.0799866L9.49991
            1.49999L3.99991
            6.99999H15.9999Z"
          />
        </svg>
      </div>
      <div
        v-for="(item, i) in paginatorData"
        :class="[
          'simple-paginator__item',
          item.class,
          {'simple-paginator__item--active': item.text === active}
        ]"
        :key="i"
        @click="setActive(item.text)">
        <span
          v-text="item.text"/>
      </div>
      <div
        :class="[
          'simple-paginator__item simple-paginator__arrow-next',
          {'simple-paginator__arrow-next--disabled': active === pagesCount}
        ]"
        @click="next">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="#1E1A1A"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.7738e-05
            6.99999V8.99999H12.0001L6.50009
            14.5L7.92009 15.92L15.8401
            7.99999L7.92009
            0.0799866L6.50009
            1.49999L12.0001
            6.99999H8.7738e-05Z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimplePaginator',
  props: {
    pagesCount: {
      type: Number,
      required: true,
    },
    maxItems: {
      type: Number,
      default: 3,
    },
  },
  data: () => ({
    active: 1,
    paginatorData: [],
  }),
  watch: {
    active() {
      this.preparePaginatorData();
      this.$emit('pageChanged', this.active);
    },
  },
  mounted() {
    this.preparePaginatorData();
  },
  methods: {
    preparePaginatorData() {
      let
        i = 1;
      let key = 0;

      while (i <= this.pagesCount) {
        if (this.pagesCount < this.maxItems + 4) {
          this.$set(this.paginatorData, key, {text: i, class: ''});
          key++;
        } else if (i <= this.maxItems || i >= this.pagesCount - this.maxItems) {
          this.$set(this.paginatorData, key, {text: i, class: ''});
          key++;
        }
        i++;
      }
      if (this.pagesCount > this.maxItems + 4) {
        if (this.active > this.maxItems && this.active <= this.pagesCount - this.maxItems) {
          this.$set(this.paginatorData, 1, {text: '...', class: 'simple-paginator__item--disabled'});
          this.$set(this.paginatorData, 2, {text: this.active - 1, class: ''});
          this.$set(this.paginatorData, 3, {text: this.active, class: ''});
          this.$set(this.paginatorData, 4, {text: this.active + 1, class: ''});
          this.$set(this.paginatorData, this.paginatorData.length - 2, {
            text: '...',
            class: 'simple-paginator__item--disabled'
          });
        } else {
          this.$set(this.paginatorData, this.maxItems, {text: '...', class: 'simple-paginator__item--disabled'});
        }
      }
    },
    prev() {
      if (this.active !== 1) {
        this.active--;
      }
    },
    setActive(value) {
      if (typeof value === 'number') {
        this.active = value;
      }
    },
    next() {
      if (this.active !== this.pagesCount) {
        this.active++;
      }
    },
  },
};
</script>
