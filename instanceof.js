function instance_of(target, origin) {
  let prototype = Reflect.getPrototypeOf(target);
  while (prototype) {
    if (prototype === origin.prototype) {
      return true;
    }
    prototype = Reflect.getPrototypeOf(prototype);
  }
  return false;
}

const a = [];
const b = {};

function Foo() {}

const c = new Foo();

function Child() {}

function Father() {}

Child.prototype = new Father();

const d = new Child();

console.log(instance_of(a, Array)); // true
console.log(instance_of(b, Object)); // true
console.log(instance_of(b, Array)); // false
console.log(instance_of(a, Object)); // true
console.log(instance_of(c, Foo)); // true
console.log(instance_of(d, Child)); // true
console.log(instance_of(d, Father)); // true
