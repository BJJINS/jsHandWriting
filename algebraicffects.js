//代数效应是函数编程的一个概念，用于将副作用从函数中脱离
const getUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('bjjin');
    }, 1000);
  });
};

const wrapPromise = (promise) => {
  let status = 'pending';
  let result;
  let suspender = promise.then(value => {
    status = 'success';
    result = value;
  }, reason => {
    status = 'error';
    result = reason;
  });
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else {
        return result;
      }
    },
  };
};