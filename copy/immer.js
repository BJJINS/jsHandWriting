// draft的标识符
const DRAFTABLE = Symbol.for("immer-draftable");

// 是否是原生对象
const isPlainObject = (value) => {
  const objectCtorString = Object.prototype.constructor.toString();

  if (!value || typeof value !== "object") return false;
  const proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  const Ctor =
    Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;

  if (Ctor === Object) return true;

  return (
    typeof Ctor == "function" &&
    Function.toString.call(Ctor) === objectCtorString
  );
};

// 判断是否是一个draft(一个代理对象)
const isDraftable = (value) => !!value && !!value[DRAFTABLE];

function produce(baseState, fn) {
  const drafts = new Map();
  const copies = new Map();

  const objectTraps = {
    get(target, key) {
      if (key === DRAFTABLE) return target;
      const data = copies.get(target) || target;
      return getDraft(data[key]);
    },
    set(target, key, val) {
      const copy = shallowCopy(target);
      const newValue = getDraft(val);
      copy[key] = isDraftable(newValue) ? newValue[DRAFTABLE] : newValue;
      return true;
    },
  };

  const getDraft = (data) => {
    if (isDraftable(data)) {
      return data;
    }
    if (isPlainObject(data) || Array.isArray(data)) {
      if (drafts.has(data)) {
        return drafts.get(data);
      }
      const draft = new Proxy(data, objectTraps);
      drafts.set(data, draft);
      return draft;
    }
    return data;
  };

  const shallowCopy = (data) => {
    if (copies.has(data)) {
      return copies.get(data);
    }
    const copy = Array.isArray(data) ? data.slice() : { ...data };
    copies.set(data, copy);
    return copy;
  };

  const isChange = (data) => {
    if (drafts.has(data) || copies.has(data)) return true;
  };

  const finalize = (data) => {
    if (isPlainObject(data) || Array.isArray(data)) {
      if (!isChange(data)) {
        return data;
      }
      const copy = shallowCopy(data);
      Object.keys(copy).forEach((key) => {
        copy[key] = finalize(copy[key]);
      });
      return copy;
    }
    return data;
  };

  const draft = getDraft(baseState);
  fn(draft);
  return finalize(baseState);
}
