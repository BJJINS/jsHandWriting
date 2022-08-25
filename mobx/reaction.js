let nowFn = null; // 全局变量
// 每个属性对应一个实例，每个实例有自己的 id 区分
let counter = 0;
class Reaction {
  constructor() {
    this.id = ++counter;
    this.store = {}; // 存储当前可观察对象对应的 nowFn {id: [nowFn, nowFn]}
  }
  // start 和 end 仅仅做了变量处理
  static start(handler) {
    nowFn = handler;
  }
  static end() {
    nowFn = null;
  }

  collect() {
    // 当前有需要绑定的函数  在 autorun 里，如果在 autorun 外使用不做关联
    if (nowFn) {
      this.store[this.id] = this.store[this.id] || [];
      this.store[this.id].push(nowFn);
    }
  }
  run() {
    // 依次执行
    this.store[this.id]?.forEach((handler) => {
      handler();
    });
  }
}

export default Reaction;
