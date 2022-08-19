/**
 * 防抖：归一个固定时间如果固定时间没有在操作，就执行一次
 * @param fn
 * @param delay
 * @returns {(function(...[*]): void)|*}
 */

function debounce(func, delay, immediate = true) {
  let timeout = null;
  function debounced(...args) {
    const context = this;
    if (immediate) {
      func.apply(context, args);
      immediate = false;
    }
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(context, args);
      clearTimeout(timeout);
    }, delay);
  }
  debounced.cancel = function () {
    clearTimeout(timeout);
    immediate = false;
  };
  return debounced;
}
