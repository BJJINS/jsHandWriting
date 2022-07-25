/**
 * 节流：一段时间执行一次
 * @param fn
 * @param delay
 * @returns {(function(...[*]): void)|*}
 */

const throttle = (fn, delay) => {
    let timer = null;
    return function (...arg) {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            clearTimeout((timer));
            fn.apply(this, arg);
        }, delay)
    }
}