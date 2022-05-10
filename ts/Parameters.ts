/**
 * infer 代表待推断类型，它的必须和 extends 条件约束类型一起使用。
 */
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
type ty = Flatten<[string, number]>; //string|number

/**
 * [string, number] 满足Type extends Array<infer Item>,
 * 因为不知道Item的类型，所以返回联合类型string|number
 */
// 定义函数类型
interface IFn {
  (age: number, name: string): void;
}

// type FnParameters = [age: number, name: string]
type FnParameters = Parameters<IFn>;

type _Parameters<F extends (...args) => any> = F extends (
  ...args: infer R
) => any
  ? R
  : never;

type _ReturnType<F extends (...args) => any> = F extends (...args) => infer R
  ? R
  : never;

type fun = (name: string, age: number) => { name: string; age: number };
type r = _ReturnType<fun>;
