<template>
  <div
    v-if="itemsList"
    :class="data.areaClass"
    class="begin-area"
  >
    <div class="begin-area__container">
      <div class="begin-nav">
        <div
          v-for="(item, i) in itemsList"
          :key="i"
          :class="{active: i === activeID}"
          class="begin-nav-item"
          @click="switchActive(i)"
        >
          <div class="is-icon">
            <div>
              <span>{{ i + 1 }}</span>
            </div>
          </div>
          <h3
            v-if="item.title"
            :class="item.titleClass"
            class="is-title"
            v-html="item.title"
          />
          <div class="is-arrow">
            <span/>
          </div>
          <div
            v-if="item.text"
            :class="item.textClass"
            class="is-text"
            v-html="item.text"
          />
        </div>
      </div>
      <div
        v-if="itemsList[activeID].text"
        :class="itemsList[activeID].textClass"
        class="begin-text"
        v-html="itemsList[activeID].text"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'BeginBlock',

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      itemsList: [],
      activeID: 0,
    };
  },

  created() {
    if (this.data.items) {
      this.itemsList = this.data.items;
    }
  },

  methods: {
    switchActive(id) {
      if (id !== this.activeID) {
        this.activeID = id;
      }
    },
  },
};
</script>
