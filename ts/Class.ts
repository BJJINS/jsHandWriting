class C {
  /**
   * public private protected 编译成es6都是 this.xxx = xxx;
   */
  public d = 34;
  private name = "string";
  protected age = 12;
  static a = 23; //只能通过类名访问，是C是的属性,ts文件中会编译成this.xxx=xxx;
  // #d = 23; //只能在类内部访问
  getA(){
    return 
  }
}

/**
 * ==================只读属性=====================
 */
class Test {
  readonly name: string; //只读属性只可以在constructor中初始化
  readonly numberOfLegs: number = 8;
  constructor(name: string) {
    this.name = name;
  }
}
const t = new Test("bj");
t.name = "a";
