Function.prototype.myCall = function (_this, ...args) {
  const key = Symbol();
  _this[key] = this;
  const res = _this[key](...args);
  delete _this.fn;
  return res;
};

Function.prototype.myBind = function (_this, ...args) {
  const fn = this;
  return function F(...args2) {
    if (this instanceof F) {
      return new fn(...args, ...args2);
    }
    return fn.myCall(_this, ...args, ...args2);
  };
};
function Sum(a, b) {
  this.v = (this.v || 0) + a + b;
  return this;
}
const NewSum = Sum.myBind({ v: 1 }, 2);
console.log(NewSum(3));
console.log(new NewSum(3));

Function.prototype.myApply = function (_this, args) {
  return this.myCall(_this, ...args);
};
