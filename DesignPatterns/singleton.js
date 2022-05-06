/**
 * 单列模式
 * 规定一个类只有一个实例，并且提供可全局访问点；
 */

function Singleton(name) {
  this.name = name;
}

Singleton.prototype.getName = function() {
  return this.name;
};

const createSingleton = (function() {
  let instance = null;
  return function(param) {
    if (instance) {
      return instance;
    }
    instance = new Singleton(param);
    return instance;
  };
})();

let obj = createSingleton('bjjin');
let obj1 = createSingleton('bj');

console.log(obj === obj1);