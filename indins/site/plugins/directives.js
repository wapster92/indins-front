/* eslint-disable */
import Vue from 'vue';

Vue.directive('scroll', {
  inserted(elem, binding) {
    const handler = binding.value;
    const { self = false } = binding.modifiers || {}

    const target = self
      ? elem
      : binding.arg
        ? document.querySelector(binding.arg)
        : window

    if (!target) {
      return
    }

    target.addEventListener('scroll', handler);

    elem._onScroll = {
      handler,
      target: self ? undefined : target,
    };
  },

  unbind(elem) {
    if (!elem._onScroll) {
      return;
    }

    const { handler, target = elem  } = elem._onScroll;

    target.removeEventListener('scroll', handler);
    delete elem._onScroll;
  },
});
