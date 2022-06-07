export function debounce (func, ms) {
  let timer = null;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, ms);
  }
}

export function throttle (func, ms) {
  let allowCall = true;
  let timer = null;
  return function(...args) {
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
  }
}