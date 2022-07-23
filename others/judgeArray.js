/**
 * Object string number symbol boolean bigint undefined null
 */

/**
 * 判断是否是数组
 */

const arr = [];
console.log(arr instanceof Array);

console.log(Object.prototype.toString.call(arr) === '[object Array]');

console.log(arr.constructor === Array);

Array.isArray(arr);