<template>
  <div class="port-order">
    <div class="portfolio-container">
      <div class="port-order__list">
        <div
          v-for="(item, i) of data.items"
          :key="item.icon"
          class="port-order__item"
        >
          <div
            v-if="i % 2 === 0"
            class="port-order__line port-order__line--right"
          >
            <svg-icon
              class="port-order__line-icon"
              name="port-order/right-line"
            />
          </div>
          <div
            v-else
            class="port-order__line port-order__line--left"
          >
            <svg-icon
              class="port-order__line-icon"
              name="port-order/left-line"
            />
          </div>
          <div class="port-order__icon">
            <div class="port-order__number">{{ i + 1 }}</div>
            <svg-icon
              :name="item.icon"
              class="port-order__sprite"
            />
          </div>
          <div class="port-order__body">
            <div class="port-order__title">{{ item.title }}</div>
            <div
              class="port-order__text"
              v-html="item.text"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortOrder',
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {

  },
};
</script>
