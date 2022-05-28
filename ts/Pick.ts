interface b {
  name: string;
  age: number;
  school: { a: string };
}

type a = Pick<b, "age">;
type MyPick<T, K extends keyof T> = { [P in K]: T[P] };
