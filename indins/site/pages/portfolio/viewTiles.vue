<template>
  <div class="portfolio-grid">
    <div class="portfolio-grid__container">
      <div class="portfolio-item portfolio-item--tall">
        <div
          :class="`portfolio-tile-${value.url}`"
          class="portfolio-link"
        >
          <div
            v-for="(img, key) in value.images"
            :key="img + key"
            :class="img.class"
            :style="{
            'background-image': addUrlImg(img.src)}"
            :aria-label="img.alt"
            class="pii"
          />
          <div
            :class="{'color-black': isColorBlack}"
            class="portfolio-bottom"
          >
            <div class="portfolio-type">
              {{ value.tileTag }}
            </div>
            <div class="portfolio-description">
              {{ value.pageTitle }}
            </div>
          </div>
        </div>
      </div>
      <div class="portfolio-item portfolio-item--long">
        <div
          :class="`portfolio-tile-${value.url}`"
          class="portfolio-link"
        >
          <div
            v-for="(img, key) in value.images"
            :key="img + key"
            :class="img.class"
            :style="{
            'background-image': addUrlImg(img.src)}"
            :aria-label="img.alt"
            class="pii"
          />
          <div
            :class="{'color-black': isColorBlack}"
            class="portfolio-bottom"
          >
            <div class="portfolio-type">
              {{ value.tileTag }}
            </div>
            <div class="portfolio-description">
              {{ value.pageTitle }}
            </div>
          </div>
        </div>
      </div>
      <div class="portfolio-item portfolio-item--square">
        <div
          :class="`portfolio-tile-${value.url}`"
          class="portfolio-link"
        >
          <div
            v-for="(img, key) in value.images"
            :key="img + key"
            :class="img.class"
            :style="{
            'background-image': addUrlImg(img.src)}"
            :aria-label="img.alt"
            class="pii"
          />
          <div
            :class="{'color-black': isColorBlack}"
            class="portfolio-bottom"
          >
            <div class="portfolio-type">
              {{ value.tileTag }}
            </div>
            <div class="portfolio-description">
              {{ value.pageTitle }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Get, Filter } from 'core-xhr';
import { portfolioTileData } from '~/constants';

export default {
  name: 'ViewTiles',
  data() {
    return {
      value: {
        images: [],
      },
    };
  },
  async asyncData({ app: { $xhr }, route }) {
    const data = await $xhr.send(new Get('portfolio').entity().addFilter(new Filter('url', 'eq', route.query.url)));
    const { result } = data.data.data;
    const value = {
      ...portfolioTileData[result.url],
      url: result.url,
      tileTag: result.tileTag,
      pageTitle: result.pageTitle,
    };
    return {
      value,
    };
  },
  computed: {
    isColorBlack() {
    // console.log(this.value);
      return this.value && this.value.textColor === 'black';
    },
  },
  methods: {
    addUrlImg(value) {
      return !!value && (value.split('.').splice(-1, 1)[0] === 'svg' ? `url(${value})` : `url(${value}.webp)`);
    },
  },
};
</script>

<style lang="stylus">
  .portfolio-item
    cursor: pointer
    &--tall
      grid-area: auto / 1 / span 2 / span 1;
    &--long
      grid-area: auto / 2 / span 1 / span 2;
    &--square
      grid-area: auto / 2 / span 1 / span 1;
</style>
