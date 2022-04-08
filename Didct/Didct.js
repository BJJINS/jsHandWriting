//下一个需要处理的fiber
let nextUnitOfWork = null;
let wipRoot = null;
//当前的页面在使用的fiber根节点
let currentRoot = null;
let deletions = null;
const isGone = (pre, next) => (key) => !Reflect.has(next, key);
const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isEvent = (key) => key.startsWith("on");
const isProperty = (key) => key !== "children" && !isEvent(key);
/**
 * 创建虚拟文本节点
 * @param {*} text 文本内容
 * @returns
 */
const createTextElement = (text) => {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
};

/**
 * 创建虚拟element对象
 * @param {*} type 元素的标签名(h1)，如果是函数组件，则是函数名
 * @param {*} props 标签属性(id)，如果是函数组件，则传递给函数的props
 * @param {*} children 子节点
 * @return {*}
 */
const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "object" ? child : createTextElement(child);
      }),
    },
  };
};
const createDom = (fiber) => {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode(fiber.props.nodeValue)
      : document.createElement(fiber.type);

  updateDom(dom, {}, fiber.props);

  return dom;
};
const updateDom = (dom, preProps, nextProps) => {
  Reflect.ownKeys(preProps)
    .filter(isEvent)
    .filter(
      (key) => !Reflect.has(nextProps, key) || isNew(preProps, nextProps)(key)
    )
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, preProps[name]);
    });

  Reflect.ownKeys(preProps)
    .filter(isProperty)
    .filter(isGone(preProps, nextProps))
    .forEach((name) => {
      dom[name] = "";
    });

  Reflect.ownKeys(nextProps)
    .filter(isProperty)
    .filter(isNew(preProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name];
    });

  Reflect.ownKeys(nextProps)
    .filter(isEvent)
    .filter(isNew(preProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
};
const commitDeletion = (fiber, domParent) => {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
};
const commitWork = (fiber) => {
  if (!fiber) {
    return;
  }
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;
  if (fiber.effectTag === "PLACEMENT" && fiber.dom !== null) {
    domParent.appendChild(fiber.dom);
  }
  if (fiber.effectTag === "DELETION" && fiber.dom !== null) {
    commitDeletion(fiber, domParent);
  }
  if (fiber.effectTag === "UPDATE" && fiber.dom !== null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
};
const commitRoot = () => {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
};
const render = (element, container) => {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot, //alternate:null
  };
  deletions = [];
  //将wipRoot赋值给nextUnitOfWork，可以开始处理fiberRoot
  nextUnitOfWork = wipRoot;
};
const reconcileChildren = (wipFiber, elements) => {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;

  let preSibling = null;
  while (index < elements.length || oldFiber !== null) {
    const element = elements[index];
    let newFiber = null;
    const sameType = oldFiber && element && element.type === oldFiber.type;
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }

    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }

    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    if (index === 0) {
      wipFiber.child = newFiber;
    } else {
      preSibling.sibling = newFiber;
    }
    preSibling = newFiber;
    index++;
  }
};
const updateFunctionComponent = (fiber) => {
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
};
const updateHostComponent = (fiber) => {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  reconcileChildren(fiber, fiber.props.children);
};
const performUnitOfWork = (fiber) => {
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
};
 /**
  * 
  * @param {*} deadLine 记录了浏览器当前帧的剩余时间
  */
const workLoop = (deadLine) => {
  let showYield = false;
  while (nextUnitOfWork && !showYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    showYield = deadLine.timeRemaining() < 1;
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
};
/**
 * 在浏览器当前帧的渲染已经结束，有空余时间时执行,react并没有使用这个api
 * https://juejin.cn/post/6844904081463443463
 * 
 */
requestIdleCallback(workLoop);

const Didact = {
  createElement,
  render,
};

export default Didact;
