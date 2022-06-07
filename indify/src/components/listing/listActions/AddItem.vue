<template>
  <div class="round-icon-button_wrapper">
    <div
      v-if="query || emit"
      class="round-icon-button info add-row-btn"
      @click="buttonController"
    >
      <v-icon
        color="#ffffff"
        size="25"
      >
        add
      </v-icon>
    </div>
    <nuxt-link
      v-else
      :to="to"
      class="round-icon-button info"
    >
      <v-icon
        color="white"
        size="25"
      >
        add
      </v-icon>
    </nuxt-link>
  </div>
</template>

<script>
import { Post } from 'core-xhr';

export default {
  name: 'AddItem',
  props: {
    route: {
      type: [String, Object, null],
      default: null,
    },
    emit: {
      type: Boolean,
      default: false
    },
    query: {
      type: [String, null],
      default: null,
    },
    requiredFields: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    to() {
      if (!this.route) {
        const addId = this.$route.name.match(/-id$/) === null;
        return {
          name: `${this.$route.name}${addId ? '-id' : ''}`,
          params: {
            id: 'add',
          },
        };
      }
      return this.route;
    },
  },
  methods: {
    buttonController() {
      if ( this.emit ) return this.$emit('click');
      if (this.query) this.saveNewRow()
    },
    async saveNewRow() {
      this.$store.dispatch('preloader/show')
      try {
        const request = new Post(this.query).setData({ ...this.requiredFields });
        await this.$xhr.send(request);
      } catch (error) {
        this.$errorHandler('Сохранить значение не удалось!')(error);
      }
      this.$store.dispatch('preloader/hide')
    },
  }
};
</script>

<style lang="stylus">
.round-icon-button
  &_wrapper
    display flex
    justify-content center
    align-items center
</style>
