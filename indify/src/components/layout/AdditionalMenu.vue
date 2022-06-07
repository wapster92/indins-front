<template>
  <div class="additional-global-menu">
    <v-btn
      class="menu-back-button"
      rounded
      depressed
      icon
      color="transparent"
      width="25"
      height="25"
      @click="goBack"
    >
      <v-icon
        size="23"
        color="#416FC8"
      >
        arrow_back
      </v-icon>
    </v-btn>
    <div class="additional-menu-current-route">
      {{ currentRouteName }}
    </div>
    <v-menu
      min-width="100vw"
      content-class="additional-menu-dropdown"
      v-model="dropdownIsVisible"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          :class="{ 'is-open': dropdownIsVisible }"
          class="additional-menu-dropdown-open"
          rounded
          icon
          color="transparent"
          width="32"
          height="32"
          v-on="on"
        >
          <svg
            width="10"
            height="5"
          >
            <path
              d="M0 0 L5 5 L 10 0 z"
              fill="#416FC8"
            />
          </svg>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in filteredItems"
          :key="item.label + index"
          :to="item.routeTo"
        >
          {{ item.label }}
        </v-list-item>
      </v-list>
    </v-menu>

  </div>
</template>

<script>
export default {
  name: 'AdditionalMenu',
  props: {
    submenu: {
      type: [Object, null],
      default: null,
    },
  },
  data() {
    return {
      dropdownIsVisible: false,
    };
  },
  computed: {
    items() {
      return this.submenu?.items || [];
    },
    currentRouteName() {
      const routeName = this.$route.name;
      return this.items.find(item => {
        if (!item.routeTo) return false;
        return routeName.match(item.routeTo.name);
      })?.label || '';
    },
    filteredItems() {
      return this.items
        .filter(item => item.label !== this.currentRouteName);
    },
  },
  methods: {
    goBack() {
      this.$router.push(this.submenu?.routeTo || '/');
    },
  },
}
</script>

<style lang="stylus">
.additional-global-menu
  display: flex
  flex-flow: row nowrap
  align-items: center
  height: 50px
  padding: 9px 16px 9px 24px
  background: #E9EBEF

.additional-menu-current-route
  height: 18px
  margin: 2px 0 0 18px
  font-size: 16px
  line-height: 16px
  color: #202124
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.additional-menu-dropdown-open.v-btn
  margin-left: auto
  &::before
    background-color: #F3F5F8
    opacity: 1
  &.theme--light:hover::before
    opacity: 1
  &.is-open
    svg
      transform: rotate(180deg)

.additional-menu-dropdown
  top: 101px!important
  height: calc(100vh - 101px)
  background: rgba(63, 74, 106, 0.4)
  filter: drop-shadow(0px 25px 20px rgba(63, 74, 106, 0.4))
  &.v-menu__content
    box-shadow: none
    border-top-left-radius: 0
    border-top-right-radius: 0
  .v-list
    border-bottom-left-radius: 4px
    border-bottom-right-radius: 4px
  .v-list-item
    min-height: 50px

@media(min-width: 960px)
  .additional-global-menu
    display: none
</style>