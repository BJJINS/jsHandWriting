/**
 * conditional Types 条件类型
 */

type isString<T> = T extends string ? true : false;
//str: true
let str: isString<string>;
/**
 * isString 类型内部通过 extends 关键字结合 ? 和 : 实现了所谓的 Conditional Types （条件类型）判断。
 * 其实所谓的条件类型就是这么简单，看起来和三元表达式非常相似，
 * 甚至你完全可以将它理解成为三元表达式。
 * 只不过它接受的是类型以及判断的是类型而已。
 * 其次，需要注意的是条件类型 a extends b ? c : d 仅仅支持在 type 关键字中使用。
 */

/**
 * 分发
 */

type getType<T extends string | number> = T extends string ? "a" : "b";
let a: getType<string>; //"a"
let b: getType<string | number>; //"a"|"b"
/**
 * 在getType中使用联合类型string|number,会触发分发
 * getType<string | number>就相当于getType<string>|getType<number>
 * 分发的条件:
 *  首先，毫无疑问分发一定是需要产生在 extends 产生的类型条件判断中，并且是前置类型。
 *  其次，分发一定是要满足联合类型，只有联合类型才会产生分发
 *  最后，分发一定要满足所谓的裸类型中才会产生效果(string是裸类型,而[string]不是)
 */

type getTestType<T extends string | number | string[]> = T extends string
  ? "a"
  : "b";

let c: getTestType<string | number | string[]>; //"a"|"b"

/**
 * Exclude的实现使用了分发
 */

type TypeA = string | number | boolean | symbol;
type _Exclude<T, K> = T extends K ? never : T;

let A: _Exclude<TypeA, boolean>;
