function runPromiseInSequence(array, value) {
  return array.reduce(
    (promiseChain, currentFunction) => promiseChain.then(currentFunction),
    Promise.resolve(value)
  );
}
function pipe(...functions) {
  return (input) => functions.reduce((acc, fn) => fn(acc), input);
}

const _reduce = (callback, initValue) => {
  const arr = this;
  let base = typeof initValue === "undefined" ? arr[0] : initValue;
  const startPoint = typeof initValue === "undefined" ? 1 : 0;
  arr.slice(startPoint).forEach((val, index) => {
    base = callback(base, val, index + startPoint, arr);
  });
  return base;
};
