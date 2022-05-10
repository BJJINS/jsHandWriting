/**
 * 在 TypeScript 中同样存在一个高级类型 unknown ，
 * 它可以代表任意类型的值，这一点和 any 是非常类型的。
 *
 * unknown类型可以接收任意类型的值，但并不支持将unknown赋值给其他类型。
 * any类型同样支持接收任意类型的值，同时赋值给其他任意类型（除了never）。
 */
let myName: unknown;

myName = 1;
// ts error: unknown 无法被调用，这被认为是不安全的
// myName();
// 使用typeof保护myName类型为function
if (typeof myName === "function") {
  // 此时myName的类型从unknown变为function
  // 可以正常调用
  myName();
}
