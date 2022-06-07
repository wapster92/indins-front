export const debounce = (func, delay) => {
  let inDebounce;
  return function (...args) {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export function throttle(func, ms) {
  let allowCall = true;
  let timer = null;
  return function (...args) {
    if (allowCall) {
      func(...args);
      allowCall = false;
      setTimeout(() => {
        allowCall = true;
      }, ms);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, ms);
    }
  };
}
