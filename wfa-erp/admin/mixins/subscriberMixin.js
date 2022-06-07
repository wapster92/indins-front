export default {
  methods: {
    setSubscriber(entity, handler) {
      this.$socket.subscribe([
        `App\\Entity\\${entity}`,
      ], handler);
      this.$on('hook:beforeDestroy', () => this.$socket.unsubscribe(handler));
    },
  },
};
