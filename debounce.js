/**
 * 防抖：归一个固定时间如果固定时间没有在操作，就执行一次
 * @param fn
 * @param delay
 * @returns {(function(...[*]): void)|*}
 */
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
