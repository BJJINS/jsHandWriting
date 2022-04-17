##hash 和 history 模式的区别
>hash模式
>>1.hash变化会触发页面跳转，即浏览器的前进后退(在事件中改变hash,浏览器的前进后退按钮可以点击，如果直接点击，则没用，但是history对象有记录，history模式在这一点和hash模式一样)  
>>2.hash可以改变浏览器的url,但是不会触发浏览器的刷新，不会刷新页面，所有的页面跳转都是在客户端进行的
>,并不会发请求，hash只能修改#之后的部分，只能跳转到与当前url同文档的url  
>>3.hash改变触发window.onhashchange,事件  
>>4.hash改变路由和服务端没有关系  


> history模式 是h5提供的新api，允许前端改变路由而不发起请求
>>1.可以通过pushSate和replaceState实现无刷新跳转  
>>2.通过 history.state ，添加任意类型的数据到记录中。  
>>3.新的url可以是任意同源的url，也可以是相同的url    
>>4.onpupState 是不会由pushState和replaceState触发

>history模式的问题  
>>1.在当前页面刷新时，nginx没配置会404  
>>2.如何监听路由变化
