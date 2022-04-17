/**https://juejin.cn/post/6945319439772434469
 * 在executor抛出一个错误，则该promise的状态是reject
 * 如果在then的onFulfilled和onRejected中return 一个错误，则promise的状态保持不变，是onFulFilled的还是onFulFilled
 * 如果在then中抛出一个错误，则该promise的状态变成rejected
 *
 *
 * 在失败的then中如果没有返回失败的promise 或者 抛出错误，则该promise下一个then将是成功的
 */
//一个then没有写onRejected ,则相当于写了 reason=>{throw reason}

//.catch方法的返回值决定了下一个then方法执行那个回调，这和then链式调用的特性一样

//在then链中返回一个pending状态的promise，则该链式调用会被中间终止
class MyPromise {
  #state = "pending";
  #value = null;
  #thenHookQueue = [];
  constructor(executor) {
    if (typeof executor !== "function") {
      return;
    }
    try {
      executor(
        (value) => {
          this.#onState("fulfilled", value);
        },
        (reason) => {
          this.#onState("rejected", reason);
        }
      );
    } catch (error) {
      this.#onState("rejected", error);
    }
  }
  #onState(state, value) {
    if (this.#state !== "pending") {
      return;
    }
    this.#value = value;
    this.#state = state;
    //状态改变则遍历所有then中的回调函数，依次执行
    this.#onIterateHooks();
  }
  #onIterateHooks() {
    for (let i = 0; i < this.#thenHookQueue.length; i++) {
      const hookAction = this.#thenHookQueue[i];
      this.#onHooksResult(hookAction.hook, hookAction.executorHook);
    }
  }

  /**
   * hook 是当前promise.then的两个回调
   * executorHook 是当前promise.then返回的promise的executor回调
   */
  #onHooksResult(hook, executorHook) {
    queueMicrotask(() => {
      const thenHook =
        this.#state === "fulfilled" ? hook.onFulfilled : hook.onRejected;
      try {
        //onFulfilled 或者 onRejected 没传直接resolve(上一个promise的value)
        const hookResult =
          thenHook === undefined ? this : thenHook(this.#value);
        if (hookResult instanceof MyPromise) {
          //如果then返回的是promise,则通过then,来改变promise.then返回的promise的状态
          hookResult.then(executorHook.resolve, executorHook.reject);
        } else {
          executorHook.resolve(hookResult);
        }
      } catch (error) {
        executorHook.reject(error);
      }
    });
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.#state === "pending") {
        this.#thenHookQueue.push({
          hook: {onFulfilled, onRejected},
          executorHook: {resolve, reject},
        });
      } else {
        //同步直接执行
        this.#onHooksResult({onFulfilled, onRejected}, {resolve, reject});
      }
    });
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static resolve(param) {
    if (param instanceof MyPromise) {
      return param;
    }
    return new MyPromise((resolve) => {
      resolve(param);
    });
  }
  static reject(param) {
    if (param instanceof MyPromise) {
      return param;
    }
    return new MyPromise((_, reject) => {
      reject(param);
    });
  }
  static any(iterable) {
    return new MyPromise((resolve, reject) => {
      let len = iterable.length;
      if (len === 0) {
        reject("AggregateError: All promises were rejected");
        return;
      }
      iterable.forEach((value, i) => {
        MyPromise.resolve(value).then(resolve, () => {
          if (i === len - 1) {
            reject("AggregateError: All promises were rejected");
          }
        });
      });
    });
  }
  static all(iterable) {
    //Array,Map,Set,String ,都可以是iterable
    //这里只实现Array
    return new MyPromise((resolve, reject) => {
      const len = iterable.length;
      if (len === 0) {
        return resolve([]);
      }
      const res = [];
      let n = 0;
      for (let i = 0; i < len; i++) {
        MyPromise.resolve(iterable[i]).then(
          (value) => {
            res[i] = value;
            n++;
            if (n === len) {
              resolve(res);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      }
    });
  }
  static race(iterable) {
    //传入的所有Promise其中任何一个有状态转化为fulfilled或者rejected，则将执行对应的回调
    return new MyPromise((resolve, reject) => {
      if (iterable.length !== 0) {
        iterable.forEach((value) => {
          MyPromise.resolve(value).then(resolve, reject);
        });
      }
    });
  }
}

export default MyPromise;
