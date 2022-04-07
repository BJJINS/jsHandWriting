const isObject = (data) => {
    return typeof data === "object" && !!data;
};

const map = new WeakMap();

const deeClone = (data) => {
    if (!isObject(data)) {
        return data;
    }
    if (map.has(data)) {
        return map.get(data);
    }
    let cloneData;
    if (data instanceof Date) {
        cloneData = data.constructor(data);
        return cloneData;
    }

    if (data instanceof RegExp) {
        cloneData = data.constructor(data.source, data.flags);
        cloneData.lastIndex = data.lastIndex;
        return cloneData;
    }
    cloneData = new data.constructor();
    if (data instanceof Set) {
        data.forEach((value) => {
            cloneData.add(deeClone(value));
        });
        return cloneData;
    }

    if (data instanceof Map) {
        data.forEach((value, key) => {
            cloneData.set(key, deeClone(value));
        });
        return cloneData;
    }

    const keys = Reflect.ownKeys(data);
    const docs = Reflect.getOwnPropertyDescriptor(data);
    cloneData = Object.create(Reflect.getPrototypeOf(data), docs);
    map.set(data, cloneData);
    for (let key of keys) {
        const value = data[key];
        cloneData[key] = deeClone(value);
    }

    return cloneData;
};
const e = Symbol(1);
const data = {
    [e]: "23",
    a: undefined,
    b: null,
    c: /134/gi,
    d: new Date(),
};
data.target = data;
const newData = deeClone(data);
console.log(deeClone(data));
//TODO 循环版本
//https://yanhaijing.com/tags/