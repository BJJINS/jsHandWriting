type p = Exclude<"name" | "age" | "sex", "name" | "age">;
type MyExclude<T, U> = T extends U ? never : T;
type P = MyExclude<"name" | "age" | "sex", "name" | "age">;
