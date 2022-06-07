<!-- eslint-disable -->
<template>
  <div
    v-scroll="onScroll"
    :class="{
      'scroll-top-btn_position': true,
      'scroll-top-btn_open': showButton
    }"
  >
    <div
      v-scroll-to="{ el: 'body' }"
      class="scroll-top-btn"
    >
      <div>
        <svg
          width="30"
          height="15"
          viewBox="0 0 30 15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15.5927 0.217905L28.8934 12.8304C29.2065 13.1275 29.2065 13.6035 28.8934 13.9006C28.5801 14.1975 28.0781 14.1975 27.7648 13.9006L15.0316 1.82607L2.29807 13.9006C1.98506 14.1975 1.48274 14.1975 1.16973 13.9006C1.01595 13.7548 0.933451 13.5589 0.933451 13.3683C0.933451 13.1778 1.01019 12.9816 1.16973 12.8361L14.4701 0.223368C14.7774 -0.0734569 15.2855 -0.0734569 15.5927 0.217905Z"/>
        </svg>
      </div>
      <div>
        <svg
          width="30"
          height="15"
          viewBox="0 0 30 15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15.5927 0.217905L28.8934 12.8304C29.2065 13.1275 29.2065 13.6035 28.8934 13.9006C28.5801 14.1975 28.0781 14.1975 27.7648 13.9006L15.0316 1.82607L2.29807 13.9006C1.98506 14.1975 1.48274 14.1975 1.16973 13.9006C1.01595 13.7548 0.933451 13.5589 0.933451 13.3683C0.933451 13.1778 1.01019 12.9816 1.16973 12.8361L14.4701 0.223368C14.7774 -0.0734569 15.2855 -0.0734569 15.5927 0.217905Z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScrollTopBtn',

  data: () => ({
    showButton: false,
  }),

  methods: {
    onScroll() {
      const offsetTop = window.pageYOffset || document.documentElement.scrollTop;

      this.showButton = offsetTop > 300;
    },
  },
};
</script>
