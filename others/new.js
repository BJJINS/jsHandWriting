function P(v) {
  this.v = v;
}

const p = _new(P, 1); // P {v: 1}
console.log(p.__proto__ === P.prototype);

function _new(...args) {
  const [Constructor, ...params] = args;
  let obj = {};
  Reflect.setPrototypeOf(obj, Constructor.prototype);
  const res = Constructor.apply(obj, params);
  return res instanceof Object ? res : obj;
}