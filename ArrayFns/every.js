/**
 * every()方法检测一个数组的所有元素是否都能通过某个函数的检测，返回一个boolean
 * 需要注意的是：
 * 1.空数组会返回true;
 * 2.callback只会检测那些被复制的索引，被删除和未复制的索引不会执行callback
 * 3.被检测数组的范围在执行时就已经确定，后面添加的元素和删除的元素不会被执行callback
 * 4.如果元素被更改，则执行callback时是修改后的值
 * 5.可以提供一个thisArg，用于改变callback的this指向
 */

let arr = [];
console.log(arr.every(() => {}));//true

arr = new Array(10);
arr.every(value => {console.log('value', value);});//不会执行callback

arr = [1, 2, 3];
arr.every(value => {
  console.log('value1', value);
  // arr.push(12);//12 不会被callback执行
  return true;
});

arr.every(value => {
  console.log('value2', value);
  // arr.pop();//3 不会被callback执行
  return true;
});
//添加新元素和删除元素都不会被callback执行，

arr.every(value => {
  console.log('value3', value);// 1,6,3
  arr[1] = 6;
  return true;
});