/**
 * 循环
 * keyOf
 */

interface IProps {
  name: string;
  age: number;
}

type a = {
  [K in keyof IProps]: boolean;
};

type _Partial<T> = { [K in keyof T]?: T[K] };

type i = _Partial<IProps>;
