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

interface DeepProps {
  name: string;
  age: number;
  school: {
    middleSchool: string;
    highSchool: string;
  };
}

type _DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? _DeepPartial<T[K]> : T[K];
};

type d = _DeepPartial<DeepProps>;

const D: d = {
  name: "2",
  school: {
    middleSchool: "sdf",
  },
};
