/**
 * flat()指定一个深度扁平化数组
 * 需要注意的是：
 * 1.不传参数，flat的默认深度是1层
 * 2.flat会移除空项
 */

let arr = [1, 2, , 3, [4, 5, [6, 7]]];

console.log(arr.flat());

arr = new Array(10);
console.log(arr.flat());

//todo 其他方案