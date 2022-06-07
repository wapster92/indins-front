const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1264,
  xl: 1904,
};

export const breakpointsMixin = {
  data() {
    return {
      clientWidth: null,
    };
  },
  computed: {
    xsOnly() {
      return this.clientWidth < breakpoints.sm;
    },
    smOnly() {
      return this.clientWidth >= breakpoints.sm && this.clientWidth < breakpoints.md;
    },
    mdOnly() {
      return this.clientWidth >= breakpoints.md && this.clientWidth < breakpoints.lg;
    },
    lgOnly() {
      return this.clientWidth >= breakpoints.lg && this.clientWidth < breakpoints.xl;
    },
    xlOnly() {
      return this.clientWidth >= breakpoints.xl;
    },
    smAndDown() {
      return this.clientWidth < breakpoints.md;
    },
    smAndUp() {
      return this.clientWidth >= breakpoints.sm;
    },
    mdAndDown() {
      return this.clientWidth < breakpoints.lg;
    },
    mdAndUp() {
      return this.clientWidth >= breakpoints.md;
    },
    lgAndDown() {
      return this.clientWidth < breakpoints.xl;
    },
    lgAndUp() {
      return this.clientWidth >= breakpoints.lg;
    },
  },
  methods: {
    update() {
      this.clientWidth = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0,
      );
    },
  },
  created() {
    if (process.client) {
      this.update();
      window.addEventListener('resize', this.update);
    }
  },
  beforeDestroy() {
    if (process.client) {
      window.removeEventListener('resize', this.update);
    }
  },
};
