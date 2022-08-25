import Reaction from "./reaction.js";
const deepProxy = (val, handler) => {
  if (typeof val !== "object") {
    return val;
  }
  for (const key in val) {
    val[key] = deepProxy(val[key], handler);
  }
  return new Proxy(val, handler());
};
const createObservable = (val) => {
  const handler = () => {
    // 每个属性都对应一个新的 reaction 实例
    let reaction = new Reaction(); // 每个属性都有自己对应的那个  reaction
    return {
      get(target, key) {
        // 获取对象属性时，进行依赖函数的收集，一个属性可以对多个函数
        reaction.collect();
        return Reflect.get(target, key);
      },
      set(target, key, value) {
        // 当属性值改变的时候，我们依次执行该属性依赖的函数。放在 set 改值之后执行，这样 autorun 函数中就能拿到最新的属性值
        const val = Reflect.set(target, key, value);
        reaction.run();
        return val;
      },
    };
  };
  return deepProxy(val, handler);
};
const observable = (target) => {
  return createObservable(target);
};
export default observable;
