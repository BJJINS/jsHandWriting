/**
 * 定义一个不能修改的对象
 * 1.不能添加属性
 * 2.不能修改属性
 * 3.不能删除属性
 * 4.不能访问不存在的属性
 * 5.不能给对象重新赋值
 * 6.不能对属性的属性进行过以上操作
 */

const obj = {
  age: 12, name: 'bjjin', info: {
    sex: 'male',
  },
};

/**
 * Object.freeze(obj) 只能对对象的第一层进行限制
 * 不能向这个对象添加新的属性
 * 不能修改其已有属性的值
 * 不能删除已有属性
 * 以及不能修改该对象已有属性的可枚举性、可配置性、可写性
 */
// // Object.freeze(obj);
// obj.age = 13;//不能修改
// delete obj.name;//不能删除
// obj.info.sex = 'female';//可以修改属性的属性
// obj.info.a = '34';//可以
// obj.a = 12;//不能添加
// console.log(obj);

//递归冻结所有属性
function deepFreeze(target) {
  const props = Object.getOwnPropertyNames(target);
  props.forEach(function(key) {
    const prop = target[key];
    if (typeof prop === 'object' && prop !== null) {
      deepFreeze(prop);
    }
  });
  Object.freeze(target);
}

deepFreeze(obj);
obj.age = 13;//不能修改
delete obj.name;//不能删除
obj.info.sex = 'female';//可以修改属性的属性
obj.info.a = '34';//不可以
obj.a = 12;//不能添加
console.log(obj);

/**
 * proxy 给上述禁止操作报错
 */

const objB = {
  age: 12, name: 'bjjin', info: {
    sex: 'male',
  },
};
const con = new Proxy(objB, {
  defineProperty(target, p, attributes) {
    throw Error('not delete' + p);
  },
  set(target, p, value, receiver) {
    console.log(p);
    throw Error('not modify' + p);
  },
  get(target, p) {

  },
});
con.age = 12;