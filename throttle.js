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