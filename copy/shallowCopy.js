const obj = {
  a: 1,
  bool: true,
  c: undefined,
  d: null,
  e: /1/g,
  f: new Date(),
  g: () => {
    console.log("aa");
  },
  h: new Set(),
  i: new Map(),
  j: [],
  k: {},
};
obj.k.cycle = obj;
obj.j.push(obj);
/**
 * Object.assign
 * assignObj 中的cycle 还是原来的obj
 */
const assignObj = Object.assign({}, obj);

//扩展运算符
const newObj = { ...obj };

//数组的concat,slice
const user1 = ["法医",{eat:"面条",sport:"篮球"}];
const user2 = user1.slice();
const user3 = user1.concat();
console.log(user1);//{ '法医', like: {eat: '面条', sport: '篮球'}}
console.log(user2);//{ '法医', like: {eat: '面条', sport: '篮球'}}
console.log(user3);//{ '法医', like: {eat: '面条', sport: '篮球'}}
