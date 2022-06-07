<template>
  <div class="more-project-button">
    <div class="more-project-button__container">
      <div class="more-project-button__container__wrapper">
        <Button
          active
          bg-color="#414a69"
          @click="onClick"
        >
          <span class="more-project-button__container__wrapper__content">
            <span>{{ data.text }}</span>
            <span class="more-project-button__container__wrapper__content__icon"/>
          </span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '~/components/common/UI/Button';

export default {
  name: 'MoreProjectButton',

  components: {
    Button,
  },

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    onClick() {
      this.$router.push({ path: this.data.url });
    },
  },
};
</script>
