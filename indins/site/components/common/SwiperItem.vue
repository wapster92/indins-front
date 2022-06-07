<template>
  <div class="swiper-slide">
    <nuxt-link
      v-if="data.link"
      :to="data.link"
      :class="data.areaClass"
      class="swipe-item"
    >
      <!--      <div-->
      <!--        v-if="data.link"-->
      <!--        :class="data.areaClass"-->
      <!--        class="swipe-item"-->
      <!--      >-->
      <div
        v-if="data.icon || data.iconHover"
        class="swipe-icon"
      >
        <span
          v-if="data.icon"
          :style="`background-image: url('${data.icon}')`"
          class="at-rest"
        />
        <span
          v-if="data.iconHover"
          :style="`background-image: url('` + data.iconHover + `')`"
          class="on-hover"
        />
      </div>
      <div
        v-if="data.title"
        :class="data.titleClass"
        class="swipe-title"
        v-html="data.title"
      />
      <!--</div>-->
    </nuxt-link>
    <div v-else>
      <div
        v-if="data.icon"
        class="swipe-item"
      >
        <div class="swipe-icon">
          <span
            v-if="data.icon"
            :style="`background-image: url(${data.icon})`"
            class="at-rest"
          />
          <span
            v-if="data.iconHover"
            :style="`background-image: url('` + data.iconHover + `')`"
            class="on-hover"
          />
        </div>
      </div>
      <div
        v-if="data.title"
        :class="data.titleClass"
        class="swipe-title"
        v-html="data.title"
      />

    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
