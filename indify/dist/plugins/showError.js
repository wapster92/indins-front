export default ({app: { store }}, inject) => {
  function showError(text) {
    return function(error) {
      console.error(error);
      store.dispatch('snack/error', text || error);
    };
  }

  inject('showError', showError);
}