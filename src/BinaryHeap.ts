// 二叉堆
// https://labuladong.online/algo/data-structure/binary-heap-priority-queue/
// 其主要应用有两个，首先是一种排序方法「堆排序」，第二是一种很有用的数据结构「优先级队列」。

// 优先级队列 Priority Queue
// 最大堆实现。

class PriorityQueue<T> {
  comparator: (i: number, j: number) => number; // 比较两个索引位置上的优先级 >0 表示优先级更高。默认优先级高的排前面
  protected pq: [null, ...T[]] = [null]; // 0的位置上空着
  constructor(comparator = (a, b) => a - b) {
    this.comparator = (i, j) => comparator(this.pq[i], this.pq[j]);
  }

  /**
   * pq[i] 的优先级 是否比 pq[j] 小？
   */
  less = (i: number, j: number) => {
    return this.comparator(i, j) < 0;
  };

  /**
   * 父节点的索引
   */
  parent = (index: number): number => {
    return Math.floor(index / 2);
  };

  /**
   * 左孩子的索引
   */
  left = (index: number): number => {
    return index * 2;
  };

  /**
   * 右孩子的索引
   */
  right = (index: number): number => {
    return this.left(index) + 1;
  };

  /**
   * 当前 Priority Queue 中的元素个数
   */
  get size() {
    return this.pq.length - 1; // 0的位置上空着
  }

  /**
   * 交换数组的两个元素
   */
  swap = (i: number, j: number) => {
    const temp = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = temp;
  };

  /**
   * 上浮第 x 个元素
   */
  swim = (x: number) => {
    const { less, parent, swap } = this;
    while (x > 1 && less(parent(x), x)) {
      swap(x, parent(x));
      x = parent(x);
    }
  };

  /**
   * 下沉第 x 个元素
   */
  sink = (x: number) => {
    const { size, left, right, less, swap } = this;
    // 如果沉到堆底，就沉不下去了
    while (left(x) <= size) {
      let max = left(x);
      // 如果右边节点存在，比一下大小
      if (right(x) <= size && less(max, right(x))) {
        max = right(x);
      }
      // 结点 x 比俩孩子都大，就不必下沉了
      if (less(max, x)) break;
      // 否则，不符合最大堆的结构，下沉 x 结点
      swap(max, x);
      x = max;
    }
  };

  /**
   * 插入元素 e
   */
  insert = (e: T) => {
    this.pq.push(e);
    this.swim(this.size);
  };

  /**
   * 删除节点
   * @param index 删除位置索引
   */
  remove(index: number) {
    // 将要移除的节点和最后一个子节点交换
    const _index = index + 1;
    this.swap(this.size, _index);
    // 移除节点并保存值
    const value = this.pq.pop();
    // 使子节点按照优先级排序
    this.sink(_index);
    return value;
  }

  get heap() {
    const [_, ...array] = this.pq;
    return array;
  }
}

class MaxPriorityQueue<T> extends PriorityQueue<T> {
  constructor() {
    super();
  }

  /**
   * 返回当前队列中最大元素
   */
  max = () => {
    return this.pq[1];
  };
}

class MinPriorityQueue<T> extends PriorityQueue<T> {
  constructor(comparator = (a, b) => b - a) {
    super(comparator);
  }
  /**
   * 返回当前队列中最小元素
   */
  min = () => {
    return this.pq[1];
  };
}

export default PriorityQueue;
export { MaxPriorityQueue, MinPriorityQueue };
