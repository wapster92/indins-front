<template>
  <div
    id="nav-icon2"
    class="toggle-button"
    :class="{open: isOpen}"
    @click="toggleButton"
  >
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
  </div>
</template>

<script>
export default {
  name: 'ToggleButton',
  computed: {
    isOpen() {
      return this.$store.getters['mobileMenu/getMenuStatus'];
    },
  },
  methods: {
    toggleButton(e) {
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="stylus">
#nav-icon2
  width: 39px;
  height: 28px;
  position: relative;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  cursor: pointer;
  @media screen and (min-width: 1025px)
    display: none;

#nav-icon2 span
  display: block;
  position: absolute;
  height: 3px;
  width: 50%;
  background: $black-main;
  opacity: 1;
  transform: rotate(0deg);
  transition: .25s ease-in-out;

#nav-icon2 span:nth-child(even) {
  left: 50%;
  border-radius: 0 5px 5px 0;
}

#nav-icon2 span:nth-child(odd) {
  left:0;
  border-radius: 5px 0 0 5px;
}

#nav-icon2 span:nth-child(1), #nav-icon2 span:nth-child(2) {
  top: 0;
}

#nav-icon2 span:nth-child(3), #nav-icon2 span:nth-child(4) {
  top: calc(50% - 3px / 2);
}

#nav-icon2 span:nth-child(5), #nav-icon2 span:nth-child(6) {
  bottom: 0
}

#nav-icon2.open span:nth-child(1),#nav-icon2.open span:nth-child(6) {
  transform: rotate(45deg);
}

#nav-icon2.open span:nth-child(2),#nav-icon2.open span:nth-child(5) {
  transform: rotate(-45deg);
}

#nav-icon2.open span:nth-child(1) {
  left: 5px;
  top: 7px;
}

#nav-icon2.open span:nth-child(2) {
  left: calc(50% - 2px);
  top: 7px;
}

#nav-icon2.open span:nth-child(3) {
  left: -50%;
  opacity: 0;
}

#nav-icon2.open span:nth-child(4) {
  left: 100%;
  opacity: 0;
}

#nav-icon2.open span:nth-child(5) {
  left: 5px;
  top: 20px;
}

#nav-icon2.open span:nth-child(6) {
  left: calc(50% - 2px);
  top: 20px;
}
/*.toggle-button
  width: 60px;
  height: 45px;
  position: relative;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  cursor: pointer;
  span
    display: block;
    position: absolute;
    height: 9px;
    width: 100%;
    background: #d3531a;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
    &:nth-child(even)
      left: 50%;
      border-radius: 0 9px 9px 0;
    &:nth-child(odd)
      left:0;
      border-radius: 9px 0 0 9px;
    &:nth-child(1), &:nth-child(2)
      top: 0;
    &:nth-child(3), &:nth-child(4)
      top: 18px;
    &:nth-child(5), &:nth-child(6)
      top: 36px;
  &.open
    span
      &:nth-child(1), &:nth-child(6)
        transform: rotate(45deg);
      &:nth-child(2), &:nth-child(5)
        transform: rotate(-45deg);
      &:nth-child(1)
        left: 5px;
        top: 7px;
      &:nth-child(2)
        left: calc(50% - 5px);
        top: 7px;
      &:nth-child(3)
        left: -50%;
        opacity: 0;
      &:nth-child(4)
        left: 100%;
        opacity: 0;
      &:nth-child(5)
        left: 5px;
        top: 29px;
      &:nth-child(6)
        left: calc(50% - 5px);
        top: 29px;*/
</style>
