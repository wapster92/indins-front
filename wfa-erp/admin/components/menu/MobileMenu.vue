<template>
  <div>
    <v-menu
      v-model="isOpen"
      offset-y
      min-width="100%"
    >
      <template v-slot:activator="{ on }">
        <v-row
          class="ma-0 mobile-menu w-100"
          style="position: fixed"
          v-on="on"
        >
          <v-col
            cols="2"
            @click="$emit('back')"
          >
            <v-row class="justify-end ma-0">
              <v-icon>arrow_back</v-icon>
            </v-row>
          </v-col>
          <v-col cols="8">
            {{ title }}
          </v-col>
          <v-col cols="2">
            <v-row class="justify-end ma-0">
              <v-icon>arrow_drop_down</v-icon>
            </v-row>
          </v-col>
        </v-row>
      </template>

      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item"
          link
        >
          <v-list-item-title
            @click="title = item"
            v-text="item"
          />
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'MobileMenu',
  props: {
    value: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    title: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
  .mobile-menu
    background-color #eeeeee
    z-index 15
</style>
