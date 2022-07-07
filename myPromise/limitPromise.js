const asyncPool = (limit, array) => {
  if (array.length === 0) {
    return Promise.resolve([]);
  }
  
  const ret = [];
  const executing = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    ret.push(item);
    if (array.length >= limit) {
      const p = item.then(() => executing.splice(executing.indexOf(item), 1));
      executing.push(p);
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.allSettled(ret);
};

const a = asyncPool(2, [1000, 5000, 3000, 2000]);
a.then((value) => {
  console.log("sssssssss", value);
});