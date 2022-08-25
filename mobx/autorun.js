import Reaction from "./reaction.js";
const autorun = (handler) => {
  Reaction.start(handler); // 全局赋值函数
  handler(); // 第一次自动执行，触发 get
  Reaction.end(handler); // 执行完清空全局变量
};


export default  autorun