<template>
  <TitledPopup
    :value="dialog"
    :title="title"
  >
    <slot>{{ text }}</slot>
    <template v-slot:buttons>
      <SimpleButton
        outlined
        @click="reject"
      >Понятно</SimpleButton>
    </template>
  </TitledPopup>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      resolve: null,
      reject: null,
      promise: null,
    };
  },
  computed: {
    dialog: {
      get() {
        return this.promise instanceof Promise;
      },
      set() {
        this.promise = null;
      },
    },
  },
  methods: {
    async start() {
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      this.promise = await this.promise.catch(() => {
        this.promise = null;
        throw new Error();
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
</style>
