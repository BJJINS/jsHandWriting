const set = new Set();
const map = new Map();
/**
 * Map与Set的相同点
 * 1.Map和Set都存储不重复的值
 * 2.顺序存储，顺序读取
 */

/**
 * Map与Set的不同点
 * 1.Map以[key,value]的形式存储，Set以[value,value]的形式存储
 */

/**
 * ================Set=================
 * 1.Set 对象允许你储存任何类型的唯一值，无论是原始值或者是对象引用。
 * 2.向Set加入值时不会发生类型转换
 * 3.Set判断两个值是否相等，类似于===，却别是NaN === NaN 是false,而Set内部判断是true
 * add(value)：新增，相当于 array里的push。
 * delete(value)：存在即删除集合中value。
 * has(value)：判断集合中是否存在 value。
 * clear()：清空集合。
 */
//Set 对象允许你储存任何类型的唯一值，无论是原始值或者是对象引用。
set.add(Symbol(1));
set.add(Symbol(2));
set.add(NaN);
set.add(NaN);
console.log(set);

/**
 * ===================Map===============
 * set(key, value)：向字典中添加新元素。
 * get(key)：通过键查找特定的数值并返回。
 * has(key)：判断字典中是否存在键key。
 * delete(key)：通过键 key 从字典中移除对应的数据。
 * clear()：将这个字典中的所有元素删除。
 */