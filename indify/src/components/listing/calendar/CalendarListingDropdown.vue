<template>
  <v-menu
    v-model="show"
    offset-y
    top
    content-class="calendar-footer-dropdown"
  >
    <template #activator="{ on }">
      <div
        :class="{ 'is-active': show }"
        class="calendar-footer-dropdown-button"
        v-on="on"
      >
        {{ buttonText }}
        <svg
          width="8"
          height="4"
        >
          <path
            d="M0 4 L4 0 L8 4 z"
            fill="#888A91"
          />
        </svg>
      </div>
    </template>
    <ScrollComponent
      v-if="show"
      vertical
    />
    <v-list>
      <slot />
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'CalendarListingDropdown',
  props: {
    buttonText: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style lang="stylus">
.calendar-footer-dropdown
  max-height: 80vh
  overflow: hidden
  .v-list-item
    padding: 13px 22px
    min-height: 0
    text-transform: capitalize
    font-size: 14px
    line-height: 1
    &:hover
      &::before
        opacity: 0!important
      span
        color: #416FC8!important
    span
      color: #202124!important
      &.is-active
        color: #416FC8!important

.calendar-footer-dropdown-button
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  align-items: center
  height: 29px
  padding: 7px 10px
  font-size: 14px
  line-height: 1
  text-transform: capitalize
  color: #202124
  &:hover, &.is-active
    background: #F3F5F8
    border-radius: 4px
    cursor: pointer
  &.is-active
    color: #416FC8
  &:first-of-type
    margin-left: -10px

  svg
    margin: 3px 22px 0 11px
</style>
