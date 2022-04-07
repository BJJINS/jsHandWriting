const myNew = function (...args) {
  const Constructor = args[0];
  const obj = {};
  Reflect.setPrototypeOf(obj, Constructor.prototype);
  const res = Constructor.apply(obj, args.slice(1));
  return res instanceof Object ? res : obj;
};
function P(v) {
  this.v = v;
}
const p = myNew(P, 1); // P {v: 1}
console.log(p.__proto__ === P.prototype);
