const a = {
  age: "12",
  school: {
    info: {
      name: "12",
    },
  },
};

const b = new Proxy(a, {
  get(target, key) {
    console.log("target,key", target, key);
    return target[key];
  },
  set(target, key, val) {
    console.log("target,key,val", target, key, val);
    target[key] = val;
    return true;
  },
});

b.school.info.name = 12;
