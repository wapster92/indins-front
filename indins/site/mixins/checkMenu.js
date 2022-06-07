export default {
  mounted() {
    this.checkMenuBack();
    this.checkFooterBack();
  },
  methods: {
    checkMenuBack() {
      if (this.page?.menuBack) {
        this.$store.commit('showMenuBack');
      } else {
        this.$store.commit('hideMenuBack');
      }
    },
    checkFooterBack() {
      if (this.page?.footerBack) {
        this.$store.commit('showFooterBack');
      } else {
        this.$store.commit('hideFooterBack');
      }
    },
  },
};
