/**
 * filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
 * 需要注意的是：
 * 1.filter不会改变原始数组
 * 2.callback 只会在已经赋值的索引上被调用，
 * 对于那些已经被删除或者从未被赋值的索引不会被调用。那些没有通过 callback 测试的元素会被跳过，不会被包含在新数组中。
 * 3.filter 遍历的元素范围在第一次调用 callback 之前就已经确定了。
 * 在调用 filter 之后被添加到数组中的元素不会被 filter 遍历到。
 * 如果已经存在的元素被改变了，则他们传入 callback 的值是 filter 遍历到它们那一刻的值。
 * 被删除或从来未被赋值的元素不会被遍历到。
 * 4.可以指定callback的this(当然不能是箭头函数)
 */
let a = {name: 'cat'};
const arr = [1, 3, , 4];//空格并没有被callback执行
let n = 0;
arr.filter(v => {
  n += 1;
  console.log(v);
});
console.log(n);

arr.filter(function(){console.log(this === a);}, a);