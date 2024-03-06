class LinkedNode<T> {
  val: T;
  next: LinkedNode<T> | null;
  constructor(val?: T, next?: LinkedNode<T>) {
    this.val = val || null;
    this.next = next || null;
  }
}

class LinkedList<T> {
  head = new LinkedNode<T>();
  size = 0;
  /**
   * 获取链表中下标为 index 的节点的值。如果下标无效，则返回 -1 。
   * @param index
   * @returns
   */
  get(index: number): T | -1 {
    if (index < 0 || index >= this.size) {
      return -1;
    }
    let i = 0;
    let node = this.head;
    while (i <= index && node) {
      node = node.next;
      i++;
    }
    return node.val;
  }

  /**
   * 将一个值为 val 的节点插入到链表中第一个元素之前。在插入完成后，新节点会成为链表的第一个节点。
   * @param val
   */
  addAtHead(val: T): void {
    this.addAtIndex(0, val);
  }

  /**
   * 将一个值为 val 的节点追加到链表中作为链表的最后一个元素。
   */
  addAtTail(val: T): void {
    this.addAtIndex(this.size, val);
  }

  /**
   * 将一个值为 val 的节点插入到链表中下标为 index 的节点之前。如果 index 等于链表的长度，那么该节点会被追加到 * 链表的末尾。如果 index 比长度更大，该节点将 不会插入 到链表中。
   * @param index 索引
   * @param val
   */
  addAtIndex(index: number, val: T): void {
    if (index > this.size) {
      return;
    }
    let i = 0;
    let node = this.head;
    while (i < index) {
      node = node.next;
      i++;
    }
    const newNode = new LinkedNode(val);
    newNode.next = node.next;
    node.next = newNode;
    this.size++;
  }

  /**
   * 如果下标有效，则删除链表中下标为 index 的节点。
   * @param index 下标
   */
  deleteAtIndex(index: number): void {
    if (index < 0 || index >= this.size) {
      return;
    }
    this.size--;
    let i = 0;
    let node = this.head;
    while (i < index) {
      node = node.next;
      i++;
    }
    node.next = node.next.next;
  }
}

export default LinkedList;
