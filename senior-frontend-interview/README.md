# Senior Frontend Interview
read senior-frontend-interview <br>

<br><br>

<i id="catalog"></i>
## Catalog
1. &nbsp; [JavaScript执行上下文和执行栈](#01)
2. &nbsp; [Data structure & Algorithm](#structure)
3. &nbsp; [Underlying JavaScript](#underlying)
4. &nbsp; [Ajax](#ajax)
5. &nbsp; [Flex](#flex)
6. &nbsp; [What happens when you navigate to a URL](#input-url)
7. &nbsp; [HTTP](#http)
8. &nbsp; [Async](#async)
9. &nbsp; [Others Of Web Structure](#others)
10. &nbsp; &nbsp;[Code Review](#code-review)
           <br>&nbsp;&nbsp;11.1&nbsp;&nbsp;[01: Modal](#review01)
           <br>&nbsp;&nbsp;11.2&nbsp;&nbsp;[01: Better-Scroll](#review02)
11. &nbsp;[Sublime MarkdownEditing Key Bingding](#MarkdownEditing)

<br><br><br><br>

<i id="01"></i>
##    JavaScript执行上下文和执行栈

### 3种上下文环境类型
1.全局上下文: 浏览器中的全局对象就是 window 对象，this 指向这个全局对象;<br>
2.函数上下文: 只有在函数被调用的时候才会被创建，每次调用函数都会创建一个新的执行上下文;<br>
3.Eval上下文: eval 函数中的代码;

### 执行栈(调用栈)  
(遵守LIFO后进先出)<br>
执行栈流程:<br>
1.首次运行JS代码, 创建全局上下文并将其Push到当前的执行栈中;<br>
2.每当发生函数调用时, 会为该函数创建一个新的函数上下文并Push到当前执行栈的栈顶;<br>
3.当栈顶函数运行完成后, 该函数上下文将会从执行栈中Pop出;<br>
<br>
流程图示<br>
![执行栈流程](https://github.com/ColorChan/Basic/blob/master/senior-frontend-interview/source/68747470733a2f2f7573657221.webp?raw=true)
<br>
执行上下文分为2个阶段(创建-执行)<br>
1.创建阶段<br>
(1)确定this的值;<br>
&nbsp;&nbsp;全局上下文中，this 的值指向全局对象;<br>
&nbsp;&nbsp;函数上下文中，this 的值取决于函数的调用方式。具体有：默认绑定、隐式绑定、显式绑定（硬绑定）、new绑定、箭头函数;<br>
(2)创建词法环境;<br>
&nbsp;&nbsp;<br>
(3)创建变量环境;<br>
&nbsp;&nbsp;<br>
2.执行阶段<br>



<br><br><br><br>

<i id="xx"></i>
##    h1

### h2
1.h3<br>

imgage<br>
![image](https://github.com/ColorChan/Basic/blob/master/img/xxx.png?raw=true)
<br>




编辑器使用Nodejs <br>
```javascript
var readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.on('line', function(line){
 var tokens = line.split(' ')
 console.log(parseInt(tokens[2]));
})
```