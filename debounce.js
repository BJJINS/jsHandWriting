const debounce = (fn, delay) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      clearTimeout(timer);
      fn.apply(this, args);
    }, delay);
  };
};
