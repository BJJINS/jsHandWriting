/**
 * 箭头函数比普通函数更加简洁
 *  如果没有参数，只写括号即可
 *  如果只有一个参数，只写这个参数即可
 *  如果函数体的返回值只有一句，可以省略大括号
 *  如果函数体不需要返回值，且只有一句话，可以给这个语句前面加一个void关键字。最常用的就是调用一个函数：
 */

const a = () => void 3;
const b = () => 3;

console.log("ssssss", a());
console.log("ssssss", b());

/**
 * 箭头函数没有this,不能当构造函数，call、apply、bind无法改变其this指向
 * 箭头函数没有arguments
 * 箭头函数没有prototype
 * 箭头函数不能当Generator函数，不能使用yield
 */

console.log(a.prototype);
