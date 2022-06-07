<template>
  <div class="footer-button">
    <Button
      hide-border-on-hover
      border-color="#3f496a"
      color="#3f496a"
      bg-color="transparent"
      @click="clickHandler"
    >
      <span class="footer-button__btn">
        <span>{{ value.name }}</span>
        <span class="footer-button__btn__icon">
          <TransparentRightArrowSvg class-list="footer-button__btn__icon_transparent"/>
        </span>
      </span>
    </Button>
  </div>
</template>

<script>
import Button from '~/components/common/UI/Button';
import TransparentRightArrowSvg from '~/components/common/svg/TransparentRightArrowSvg';

export default {
  name: 'FooterButton',

  components: {
    Button,
    TransparentRightArrowSvg,
  },

  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    clickHandler() {
      this.$router.push({ path: this.value.link });
    },
  },
};
</script>
