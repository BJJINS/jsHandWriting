import { useState } from "react";
const isFunction = (param: unknown): param is Function =>
  typeof param === "function";
type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((preState: Readonly<S>) => Pick<S, K> | S | null)
) => void;

function useSetState<S extends Record<string, any>>(
  initialState: S | (() => S)
): [S, SetState<S>] {
  const [state, setState] = useState(initialState);
  const setMergeState = (param) => {
    const isFunc = isFunction(param);
    setState((preState) => {
      const newState = isFunc ? param(preState) : param;
      return newState ? { ...preState, ...newState } : preState;
    });
  };
  return [state, setMergeState];
}

export default useSetState;
