import { useState, useRef, useEffect } from "react";
/**
 * 判断一个promise是否在规定时间完成，如果是，不显示loading,反之，显示loading
 * @param {Promise} promise
 * @param {Number} timeoutMs promise的完成的规定时间
 * @param {Number} deferredTimeoutMs 将loading延迟deferredTimeoutMs，防止出现loading一闪而过
 * @returns [isLoading,result]
 */
function useLoadState(promise, timeoutMs = 200, deferredTimeoutMs = 200) {
  const [loadState, setLoadState] = useState([false, null]);
  if (!promise instanceof Promise) {
    return loadState;
  }
  const timerRef = useRef(null);
  const timer1Ref = useRef(null);
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setLoadState((preState) => {
        const [_, result] = preState;
        if (!result) {
          return [true, result];
        } else {
          return preState;
        }
      });
      clearTimeout(timerRef.current);
    }, timeoutMs);
    promise
      .then((result) => {
        setLoadState((pre) => [pre[0], result]);
        timer1Ref.current = setTimeout(() => {
          setLoadState((preState) => {
            const [isLoading, result] = preState;
            if (isLoading) {
              return [false, result];
            }
            return preState;
          });
          clearTimeout(timer1Ref.current);
        }, deferredTimeoutMs);
      })
      .catch((err) => {
        setLoadState((pre) => [pre[0], err]);
        timer1Ref.current = setTimeout(() => {
          setLoadState((preState) => {
            const [isLoading, error] = preState;
            if (isLoading) {
              return [false, error];
            }
            return preState;
          });
          clearTimeout(timer1Ref.current);
        }, deferredTimeoutMs);
      });

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(timer1Ref.current);
    };
  }, []);
  return loadState;
}
export default useLoadState;
