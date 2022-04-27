const map = new Map();
const object = {};

/**
 * Map于Object相同点
 * 1.都以键值对的形式存储数据
 * 2.都存储键不同的值
 */

object[NaN] = 12;
object[NaN] = 34;
map.set(NaN, '1');
map.set(NaN, '2');

/**
 * Map和Object不同点
 * 1.Map可以使用任意类型的值作为key
 * 2.object只能使用string作为key,其他类型的值会被转换为字符串
 * 3.Map按顺序存储，object，不能保证顺序(填入Object的元素key是自动按照字符串排序的，数字排在前面)
 * 4.Map可迭代，可直接拿到长度，Object都不行
 */
const o = {};
map.set(o, 12);
object[o] = 12;
object['jack'] = 1;
object[0] = 2;
object['tom'] = 4;
object[/1/g] = 23;
console.log(map);
console.log(object);//{ '0': 2, NaN: 34, '[object Object]': 12, jack: 1, tom: 4, '/1/g': 23 }

