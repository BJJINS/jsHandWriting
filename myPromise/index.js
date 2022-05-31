//todo cath方法和then的第二个参数区别
class MyPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  PromiseState = MyPromise.PENDING;
  PromiseResult = null;
  callbacksQueue = [];
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];
  constructor(executor) {
    let resolve = (value) => {
      this.changeState(MyPromise.FULFILLED, value);
    };
    let reject = (reason) => {
      this.changeState(MyPromise.REJECTED, reason);
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      this.changeState(MyPromise.REJECTED, error);
    }
  }
  changeState(state, value) {
    if (this.PromiseState !== MyPromise.PENDING) {
      return;
    }
    this.PromiseState = state;
    this.PromiseResult = value;
    queueMicrotask(() => {
      if (this.PromiseState === MyPromise.FULFILLED) {
        this.onFulfilledCallbacks.forEach((cb) => cb(value));
      } else {
        this.onRejectedCallbacks.forEach((cb) => cb(value));
      }
    });
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onFulfilled
        : (reason) => {
            throw reason;
          };

    return new MyPromise((resolve, reject) => {
      if (this.PromiseState === MyPromise.PENDING) {
        //用一个Promise连续调用then方法时需要用数组保存
        //p.then() p.then() 而不是p.then().then()
        this.onFulfilledCallbacks.push(() => {
          try {
            resolve(onFulfilled(this.PromiseResult));
          } catch (error) {
            reject(error);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            reject(onRejected(this.PromiseResult));
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.PromiseState === MyPromise.FULFILLED) {
        queueMicrotask(() => {
          //这里是异步任务，当onFulfilled报错时，executor无法try/catch
          //原因是执行异步的方法时外部的函数环境以及退出调用栈
          try {
            resolve(onFulfilled(this.PromiseResult));
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.PromiseState === MyPromise.REJECTED) {
        queueMicrotask(() => {
          try {
            reject(onRejected(this.PromiseResult));
          } catch (error) {
            reject(error);
          }
        });
      }
    });
  }
}
export default MyPromise;

MyPromise.deferred = function () {
  let result = {};
  result.promise = new MyPromise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
};

// module.exports = MyPromise;
