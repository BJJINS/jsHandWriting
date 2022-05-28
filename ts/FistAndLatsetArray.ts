type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];
type First<T extends (string | number | symbol)[]> = T[0];
type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3
type Latest<T extends any[]> = T extends [...infer V, infer R] ? R : never;
type a = Latest<arr1>;
