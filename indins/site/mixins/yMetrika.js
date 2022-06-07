/* eslint-disable */
export default {
  mounted() {
    this.hit();
  },
  watch: {
    $route() {
      this.hit();
    },
  },
  methods: {
    hit() {
      // Error: ym is not defined!
      /* setTimeout(()=>{
        const url = document.location.pathname;
        const referer = document.location.href;
        ym(26690535, 'hit', url, {
          referer,
        });
      } ,4000)*/
    },
  },
};
