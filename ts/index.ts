//只读数组
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;


//函数的参数名不需要与接口定义的名字一样，但是对应的类型一定要一样
//substring 与 sub名称不一样，但是类型是一样的
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source, sub): boolean {
  let result = source.search(sub);
  return result > -1
};

//字符串索引签名注意：
interface NumberDictionary {
  name: string;//错误，`name`的类型与索引类型返回值的类型不匹配
  length: number//可以，length是number类型
  [index: string]: number
}

//===============类类型===============
interface ClockInterface {
  currentTime: Date;

  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  //这里的!强调了currentTime可以是空，因为ClockInterface定义的currentTime是非空
  //如果ClockInterface定义的currentTime是可以空?:Date ,则这里的意思是不为空
  currentTime!: Date;

  constructor(h: number, m: number) {
  }

  setTime(d: Date) {
    this.currentTime = d;
  }
}


//==========类静态部分与实例部分的区别=========
interface ClockConstructor {
  new(hour: number, minute: number): void;
}

/**
 * 这样不不会约束constructor的参数
 * 因为这样只会检测实例属性，而constructor属于静态属性
 */
class Clock1 implements ClockConstructor {
  constructor(h: number, m: number) {
  }
}


//===============混合类型==============

interface Counter {
  interval: number;

  (start: number): string;

  reset(): void;
}

//一个对象可以同时做为函数和对象使用，并带有额外的属性。
function getCounter(): Counter {
  let counter = <Counter>function (start) {
  };
  counter.interval = 123;
  counter.reset = function () {
  };
  return counter
}


/**
 * ===========================接口继承类========================
 */
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}

// 错误：“Image”类型缺少“state”属性。
class Image implements SelectableControl {
  select() { }
}












