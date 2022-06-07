<template>
  <v-avatar
    :width="diameter"
    :height="diameter"
    :min-width="diameter"
    :max-height="diameter"
    :color="stringToColor"
    v-bind="$attrs"
  >
    <div
      v-if="item"
      class="i-avatar-initials"
    >
      <img
        v-if="imageRoute"
        class="i-avatar-img"
        :src="imageRoute"
        :alt="''"
      >
      <span
        v-if="imageRoute"
        class="i-avatar-alt-img"
      >
        {{ initials }}
      </span>
      <span v-else>
        {{ initials }}
      </span>
    </div>
  </v-avatar>
</template>

<script>
import { getObjectField } from '../../helpers/index';

export default {

  name: 'IAvatar',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    image: {
      type: [Function, String, null],
      default: null,
    },
    diameter: {
      type: [Number, String],
      default: 32,
    },
  },
  computed: {
    initials() {
      if (!this.item) return '';
      const { getFullName, fullName, name, surname } = this.item;
      if (getFullName || fullName) {
        const names = getFullName || fullName;
        const parts = names.split(' ');
        return parts[0].charAt(0) + parts[1].charAt(0);
      }
      if (name && surname) return name[0] + surname[0];
      if (name) return name.slice(0, 2);
      if (surname) return name.slice(0, 2);
      return '';
    },
    imageRoute() {
      if (this.image) {
        return (this.image.constructor === String)
          ? this.routeCompute(getObjectField(this.item, this.image))
          : this.routeCompute(this.image(this.item));
      }
      return null;
    },
    stringToColor() {
      if (!this.initials) return '#4e4e4e';
      const str = this.initials;
      let arr = str.split('');
      arr.push(str[0]);
      let n = (arr[0] === arr[1]) ? 100 : 0
      arr = arr.map(el => this.lessThen255(el.charCodeAt(0)));
      return `rgb(${arr[0]}, ${arr[1] - 50}, ${arr[2] - n})`;
    },
  },
  methods: {
    routeCompute(url) {
      if (!url) return;
      return url.replace(/\/upload\/file-uploader\//gi, `/image/crop_${Number(this.diameter) + 10}x${Number(this.diameter) + 10}/file-uploader_`);
    },
    lessThen255(num) {
      if (num < 110) return num + num;
      if (num < 255 && num > 110) return num;
      // if (num < 255) return num;
      return this.lessThen255(num / 2);
    },
  },
};
</script>

<style lang="stylus">
.i-avatar-initials
  span
    display: block
    color: #E6F6FC
    font-size: 12px

.i-avatar-img
  top: -2px;
  left: -1px;
  position: absolute
  z-index: 2

.i-avatar-alt-img
  z-index: 1

</style>
