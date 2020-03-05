# Senior Frontend Interview
read senior-frontend-interview <br>
https://github.com/yygmind/blog<br>

<br>

<i id="catalog"></i>
## Catalog
1. &nbsp; [JavaScript执行上下文和执行栈](#01)
2. &nbsp; [JavaScript内存空间](#02)
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
执行上下文分为2个阶段(创建-执行):<br>
1.创建阶段<br>
(1)确定this的值;<br>
全局上下文中，this 的值指向全局对象;<br>
函数上下文中，this 的值取决于函数的调用方式。具体有：默认绑定、隐式绑定、显式绑定（硬绑定）、new绑定、箭头函数;<br>
<br>
(2)创建词法环境;<br>
记录存储变量和函数声明的实际位置 & 可以访问的外部环境引用<br>
分为全局环境与函数环境<br>
<br>
(3)创建变量环境;<br>
变量环境也是一个词法环境，因此它具有上面定义的词法环境的所有属性<br>
<br>
**变量提升**<br>
在创建阶段，函数声明存储在环境中，而变量在var的情况下会被设置为undefined(在let和const的情况下保持未初始化)。此时可以在声明之前访问var定义的变量(虽然访问结果是undefined)。但如果在声明之前访问let和const定义的变量就会提示引用错误<br>
<br>
2.执行阶段<br>
此阶段，完成对所有变量的分配，最后执行代码<br>
如果Javascript引擎在源代码中声明的实际位置找不到let变量的值, 那么将为其分配undefined<br>
调用函数时，进入执行上下文,会为其创建一个Arguments对象，并自动初始化局部变量arguments<br>

```javascript
function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;
}
foo(1);
```

在函数上下文中，用活动对象(activation object, AO)来表示变量对象。以上代码的AO是:<br>

```javascript
AO = {
  arguments: { 0: 1, length: 1 },
  a: 1,
  b: undefined,
  c: reference to function c() {},
  d: undefined
}
```

然后进入代码执行阶段, 变量值会被修改为应该有的值, AO被更变至如下:<br>

```javascript
AO = {
    arguments: { 0: 1, length: 1 },
    a: 1,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression "d"
}
```

<br><br><br><br>

<i id="02"></i>
##  JavaScript内存空间
### 内存空间
1.6种基本数据类型保存在栈内存中, 通过按值来访问(Undefined、Null、Boolean、Number、String、Symbol)<br>
2.引用类型保存在堆内存中, 在栈内存中存放的只是该对象的访问地址。当查询引用类型的变量时, 先从栈中读取内存地址, 然后再通过地址找到堆中的值<br>
但是! 闭包中的变量并不保存中栈内存中, 而是保存在堆内存中<br>
### 内存回收
1.内存申请<br>
V8引擎中所有的JS对象都是通过堆来进行内存分配的, 当声明变量并赋值时，V8引擎就会在堆内存中分配给这个变量, 当已申请的内存不足以存储这个变量时，V8引擎就会继续申请内存，直到堆的大小达到了V8引擎的内存上限为止。<br>
2.垃圾回收<br>
(1).引用计数(除IE外已淘汰): 看该对象是否有指向它的引用(存在问题: 若两个对象相互引用，尽管他们已不再使用，但是垃圾回收器不会进行回收，导致内存泄露)
(2).标记清除: 根据作用域, 那些从根部出发无法触及到的对象被标记为不再使用，稍后进行回收。

### 内存泄漏
对于持续运行的服务进程（daemon），必须及时释放不再用到的内存。否则，内存占用越来越高，轻则影响系统性能，重则导致进程崩溃<br>
WeakSet 和 WeakMap, 表示这是弱引用, 它们对于值的引用都是不计入垃圾回收机制的<br>
1.四种常见的JS内存泄漏<br>
(1).意外的全局变量('use strict'的重要性)<br>
```javascript
  function foo1(arg) {
    bar = "this is a hidden global variable";
  }
  function foo2(arg) {
    this.bar = "this is a hidden global variable";
  }
  foo2() // this === window
```
(2).被遗忘的计时器或回调函数<br>
定时器指向的数据或者node节点, 在数据或节点不被需要或已被销毁时, 也没办法被回收，除非终止定时器<br>
关于绑定node节点的event事件, 除ie6外, 使用了标记清除, 已经可以正确检测和处理循环引用了, 不再必须使用removeEventListener了<br>
(3).非DOM中的引用<br>
如果把DOM对象或者数组, 此时, 该DOM元素存在两个引用: 一个在DOM树中, 另一个在对象或者数组中, 那么将来需要把两个引用都清除<br>
(4).闭包<br>
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