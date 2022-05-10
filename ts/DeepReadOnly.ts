interface Person {
  name: string;
  age: number;
  school: {
    middleSchool: string;
    highSchool: string;
  };
}
type _Readonly<T> = { readonly [K in keyof T]: T[K] };
type P = _Readonly<Person>;

type DeepReadOnly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadOnly<T[K]> : T[K];
};

type DP = DeepReadOnly<Person>;

const person: DP = {
  name: "bjjin",
  age: 11,
  school: {
    middleSchool: "string",
    highSchool: "string",
  },
};

// person.name = "sdf";
// person.school.highSchool = "sdf";
