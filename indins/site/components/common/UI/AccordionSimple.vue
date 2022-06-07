<template>
  <div
    v-if="hasDefaultSlot"
    :class="[data.areaClass, {'accordion-open' : isOpen}]"
    class="accordion-simple-area"
  >
    <div class="accordion-simple-area__container">
      <div
        :class="data.headerClass"
        class="accordion-simple-head"
        @click="switcher"
      >
        <div
          :class="data.titleClass"
          class="is-title"
          v-html="data.title"
        />
        <div class="is-nav">
          <span class="is-name">{{ arrowName }}</span>
          <span class="is-arrow">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="381.737px"
              height="201.649px"
              viewBox="-90.045 90.044 381.737 201.649"
              enable-background="new -90.045 90.044 381.737 201.649"
              xml:space="preserve"
            >
              <path
                d="M108.416,288.504l180.078-180.082c2.16-2.078,3.199-4.879,3.199-7.598c0-2.722-1.117-5.519-3.199-7.601
                  c-4.238-4.239-11.039-4.239-15.277,0L100.814,265.621L-71.584,93.223c-4.242-4.239-11.039-4.239-15.281,0
                  c-4.239,4.242-4.239,11.039,0,15.281L93.217,288.582C97.377,292.742,104.256,292.742,108.416,288.504z"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div class="accordion-simple-body">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccordionSimple',

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      isOpen: false,
      arrowName: 'Показать',
      arrowNameForClose: 'Скрыть',
      arrowNameForOpen: 'Показать',
    };
  },

  computed: {
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
  },

  created() {
    if (this.data.arrowNameClose) {
      this.arrowNameForClose = this.data.arrowNameClose;
    }

    if (this.data.arrowNameOpen) {
      this.arrowNameForOpen = this.data.arrowNameOpen;
    }

    this.isOpen = !!this.data.open;
    this.arrowName = this.isOpen ? this.arrowNameForClose : this.arrowNameForOpen;
  },

  methods: {
    switcher() {
      this.isOpen = !this.isOpen;
      this.arrowName = this.isOpen ? this.arrowNameForClose : this.arrowNameForOpen;
    },
  },
};
</script>
