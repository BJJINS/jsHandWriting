//下一个需要处理的fiber
let nextUnitOfWork = null;
let wipRoot = null;
//我们提交给 DOM 的最后一个纤程树
let currentRoot = null;
//记录与新的fiber节点不同的oldFiber节点，这些节点需要删除
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
    .filter(isEvent) //所有旧事件
    .filter(
      //旧事件中，新的fiber中没有的事件或者事件在新fiber被更新的事件
      (key) => !Reflect.has(nextProps, key) || isNew(preProps, nextProps)(key)
    )
    .forEach((name) => {
      //去掉这些事件
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, preProps[name]);
    });

  Reflect.ownKeys(preProps)
    .filter(isProperty) //过滤事件属性和children
    .filter(isGone(preProps, nextProps)) //不在nextProps的属性
    .forEach((name) => {
      //将这些属性置为空
      dom[name] = "";
    });

  Reflect.ownKeys(nextProps)
    .filter(isProperty) //过滤事件属性和children
    .filter(isNew(preProps, nextProps)) //添加新的属性
    .forEach((name) => {
      dom[name] = nextProps[name];
    });

  //添加和更新事件
  Reflect.ownKeys(nextProps)
    .filter(isEvent)
    .filter(isNew(preProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
};
const commitDeletion = (fiber, domParent) => {
  // 被删除的dom可能是函数组件，函数组件的fiber没有dom节点，所以要向上查找
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
  //函数组件没有dom
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;
  //初始化时，tag为PLACEMENT 的fiber没有dom
  if (fiber.effectTag === "PLACEMENT" && fiber.dom !== null) {
    domParent.appendChild(fiber.dom);
  }
  if (fiber.effectTag === "DELETION") {
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
//render是处理fiber节点，commit才是渲染视图
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
  /**
   * 找到与当前fiber对应的老的fiber节点的child(child中是createElement生成的节点，对应实际的dom)
   * elements 就是wipFiber 的child。 elements = wipFiber.props.children
   */
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;

  let preSibling = null;
  /**
   * 当elements不为空和有老的fiber节点时会循环
   */
  while (index < elements.length || oldFiber) {
    const element = elements[index];
    let newFiber = null;
    //判断新节点和老节点是否是同一类型dom节点的依据是type(div,h1...)
    const sameType = oldFiber && element && element.type === oldFiber.type;
    /**
     * 如果是相同节点，则更新props,依旧使用原来的dom节点
     */
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props, //更新props
        dom: oldFiber.dom, //使用旧节点
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE", //打上更新的tag
      };
    }
    /**
     * 当前的element节点与之前的fiber节点不同
     * 创建一个新的fiber,替换原来的fiber
     */
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT", //替换的tag
      };
    }
    /**
     * 新旧节点不同，删除旧的fiber节点
     */
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    //只有第一个newFiber才是wipFiber的child,剩下的newFiber与child的关系是sibling
    if (index === 0) {
      wipFiber.child = newFiber;
    } else {
      preSibling.sibling = newFiber;
    }
    preSibling = newFiber;
    index++;
  }
};

let wipFiber = null;
let hookIndex = null;

const updateFunctionComponent = (fiber) => {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
};
const useState = (initial) => {
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];

  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action(hook.state);
  });
  const setState = (action) => {
    hook.queue.push(action);
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };
    nextUnitOfWork = wipRoot;
    deletions = [];
  };

  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
};
//更新非函数组件
const updateHostComponent = (fiber) => {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  reconcileChildren(fiber, fiber.props.children);
};
/**
 * 执行每个fiber工作单元
 * @param {*} fiber
 * @returns
 */
const performUnitOfWork = (fiber) => {
  const isFunctionComponent = fiber.type instanceof Function;
  //是否是函数组件
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  //每次都找当前fiber的child，当前fiber没有child，就找sibling,
  //没有sibling,就找父fiber的sibling,一直找到undefined,
  //当nextUnitOfWork 是undefined,就会停止workLoop
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
 * 在浏览器每帧有空余时间时，执行任务
 * @param {*} deadLine 记录了浏览器当前帧的剩余时间
 */
const workLoop = (deadLine) => {
  let showYield = false;
  while (nextUnitOfWork && !showYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    showYield = deadLine.timeRemaining() < 1;
  }
  if (!nextUnitOfWork && wipRoot) {
    //所有fiber处理完毕，并且有wipRoot,开始从fiber root渲染视图
    commitRoot();
  }
  requestIdleCallback(workLoop);
};
/**
 * 在浏览器当前帧的渲染已经结束，有空余时间时执行,react并没有使用这个api
 * https://juejin.cn/post/6844904081463443463
 */
requestIdleCallback(workLoop);

const Didact = {
  createElement,
  render,
  useState,
};

export default Didact;
