interface A {
  name: string;
  age: number;
}

type a = Readonly<A>;
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };

type c = MyReadonly<A>;
