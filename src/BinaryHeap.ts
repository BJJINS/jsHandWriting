// 二叉堆
// https://labuladong.online/algo/data-structure/binary-heap-priority-queue/
// 其主要应用有两个，首先是一种排序方法「堆排序」，第二是一种很有用的数据结构「优先级队列」。

// 优先级队列 Priority Queue
// 最大堆实现。

class MaxPQ {
  pq: number[] = [0]; // 0的位置上空着

  /**
   * 当前 Priority Queue 中的元素个数
   */
  size = () => {
    return this.pq.length - 1; // 0的位置上空着
  };

  /**
   * 返回当前队列中最大元素
   */
  max = () => {
    return this.pq[1];
  };

  /**
   * 交换数组的两个元素
   */
  swap = (i: number, j: number) => {
    const temp = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = temp;
  };

  /**
   * pq[i] 是否比 pq[j] 小？
   * @returns number
   */
  less = (i: number, j: number) => {
    return this.pq[i] < this.pq[j];
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
   * 上浮第 x 个元素，以维护最大堆性质
   */
  swim = (x: number) => {
    const { less, parent, swap } = this;
    while (x > 1 && less(parent(x), x)) {
      swap(x, parent(x));
      x = parent(x);
    }
  };

  /**
   * 下沉第 x 个元素，以维护最大堆性质
   */
  sink = (x: number) => {
    const { size: _size, left, right, less, swap } = this;
    const size = _size();
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
  insert = (e: number) => {
    this.pq.push(e);
    this.swim(this.size());
  };

  /**
   * 删除并返回当前队列中最大元素
   */
  delMax = () => {
    const max = this.pq[1]; // 1 的位置上是最大
    this.swap(1, this.size());
    this.pq.pop();
    this.sink(1);
    return max;
  };
}

export default MaxPQ;
