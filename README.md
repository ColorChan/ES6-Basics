# Basic knowledge
Basic knowledge in EcmaScript 6 <br>

<br><br>

<i id="catalog"></i>
## Catalog
1. &nbsp; [NetEase 2017 Summer Campus](#NetEase2017)
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
           <br>&nbsp;&nbsp;11.3&nbsp;&nbsp;[01: How to optimize nest v-for/v-if](#review03)
11. &nbsp;[Sublime MarkdownEditing Key Bingding](#MarkdownEditing)

<br><br><br><br>

<i id="NetEase2017"></i>
##    NetEase 2017 Summer Campus recruitmen

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

1. 如果一个数字序列逆置之后跟原序列是一样的就称这样的数字序列为回文序列。例如:{1, 2, 1}, {15, 78, 78, 15} , {112} 是回文序列,{1, 2, 2}, {15, 78, `7, 51} ,{112, 2, 11} 不是回文序列。<br>
现在给出一个数字序列，允许使用一种转换操作：<br>
  选择任意两个相邻的数，然后从序列移除这两个数，并用这两个数字的和插入到这两个数之前的位置(只插入一个和)。<br>
  现在对于所给序列要求出最少需要多少次操作可以将其变成回文序列。<br>

```javascript
function test(arr){    
  var len = arr.length ;    
  var start=0 ;
  end = len - 1;    
  while(start > end && arr[start] == arr[end]){        
    start ++ ;        
    end -- ;    
  }    
  var rest = arr.splice(start, end -start +1) ;
    // 去除两端已经符合回文条件的元素     
    start = 0 ;    
    end = rest.length -1;      
    var count = 0 ; // 计数
    while (rest.length >=2 && start < end) {
     if(rest[start] < rest[end]){
         // 首部数字较小则合并首部            
         var tmp = rest.shift() + rest.shift() ;            
         rest.unshift(tmp) ;            
         count ++ ;        
       }else if(rest[start] > rest[end]){
         // 尾部数字较小则合并尾部
         var tmp = rest.pop() + rest.pop() ;            
         rest.push(tmp)            
         count ++ ;        
       } else{
         // 符合条件的跳过
         start ++ ;            
         end -- ;        
       }    
     }     
      return count;
   }
```

2. 小易去附近的商店买苹果，奸诈的商贩使用了捆绑交易，只提供6个每袋和8个每袋的包装(包装不可拆分)。 可是小易现在只想购买恰好n个苹果，小易想购买尽量少的袋数方便携带。如果不能购买恰好n个苹果，小易将不会购买。<br>
输入描述:<br>
输入一个整数n，表示小易想购买n(1 ≤ n ≤ 100)个苹果<br>

```java
public static int count(int n){
    if(n%2!=0||n==10||n<6) return -1;//一定是偶数（6，8都是）,最小是6，10以上偶数都可以；
    if(n%8==0) return n/8;//如果拿八个拿完最好
    return 1+n/8;//对于10以上的偶数，只要对8取余数不为0，就要从前面的1或者2个8中拿出2个，把余数补为6（本来余数就是6，就不用拿）。所以+1；
  }
```

3. A,B,C三个人是好朋友,每个人手里都有一些糖果,我们不知道他们每个人手上具体有多少个糖果,但是我们知道以下的信息：<br>
A - B, B - C, A + B, B + C. 这四个数值.每个字母代表每个人所拥有的糖果数.<br>
现在需要通过这四个数值计算出每个人手里有多少个糖果,即A,B,C。这里保证最多只有一组整数A,B,C满足所有题设条件。  
输入描述:<br>
输入为一行，一共4个整数，分别为A - B，B - C，A + B，B + C，用空格隔开。<br>
范围均在-30到30之间(闭区间)。<br>

``` bash
A-B=Y1;
B-C=Y2;
A+B=Y3;
B+C=Y4;

用消元法求解：
A=(Y1+Y3)/2;
B=(Y3-Y1)/2=(Y2+Y4)/2;
C=(Y4-Y2)/2;
```

4. 小易来到了一条石板路前，每块石板上从1挨着编号为：1、2、3.......<br>
这条石板路要根据特殊的规则才能前进：对于小易当前所在的编号为K的 石板，小易单次只能往前跳K的一个约数(不含1和K)步，即跳到K+X(X为K的一个非1和本身的约数)的位置。 小易当前处在编号为N的石板，他想跳到编号恰好为M的石板去，小易想知道最少需要跳跃几次可以到达。<br>

``` java
public static int leastJumpTime(int n, int m) {
  if (m == n) {
    return 0;
  }
        int steps = m - n + 1;// 算上了起点和终点
        int[] dp = new int[steps];// 规划的量：到达 每个位置需要的最小步数
        dp[0] = 0; // 起点
        for (int i = 1; i < steps; i++) {
            dp[i] = Integer.MAX_VALUE; // 初始化 表示后续位置都不能到达
          }
          for (int i = 0; i < steps; i++) {
            // 0对应n石板 ；steps - 1 = m-n对应m石板
            if (dp[i] == Integer.MAX_VALUE) { // 该位置不能像前走
              dp[i] = 0;
              continue;
            }
            ArrayList<Integer> list = getAppNums(i + n); // i+n才是石板号
            for (int j = 0; j < list.size(); j++) {
              int x = list.get(j);
              if (i + n + x <= m) {
                dp[i + x] = Math.min(dp[i + x], dp[i] + 1);
              }
            }
          }
          if (dp[steps - 1] == 0) {
            return -1;
          } else {
            return dp[steps - 1];
          }
        }

    // 求因数 时间复杂度较低
    public static ArrayList<Integer> getAppNums(int n) {
      ArrayList<Integer> list = new ArrayList<Integer>();
      for (int i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
          list.add(i);
          if (n / i != i) {
            list.add(n / i);
          }
        }
      }
      return list;
    }
```
   
5. 一个只包含'A'、'B'和'C'的字符串，如果存在某一段长度为3的连续子串中恰好'A'、'B'和'C'各有一个，那么这个字符串就是纯净的，否则这个字符串就是暗黑的。例如：<br>
BAACAACCBAAA 连续子串"CBA"中包含了'A','B','C'各一个，所以是纯净的字符串<br>
AABBCCAABB 不存在一个长度为3的连续子串包含'A','B','C',所以是暗黑的字符串<br>
你的任务就是计算出长度为n的字符串(只包含'A'、'B'和'C')，有多少个是暗黑的字符串。

``` java
public class Main {
   public static void main(String args[]){
       Scanner sc = new Scanner(System.in);
       int input = sc.nextInt();
       long[] num = new long[input+1];
       num[1] = 3;
       num[2] = 9;
       for(int i=3; i<=input; i++){
           num[i] = 2*num[i-1] + num[i-2];
       }
       System.out.print(num[input]);
   }
}
```
   
6. 小易是一个数论爱好者，并且对于一个数的奇数约数十分感兴趣。一天小易遇到这样一个问题： <br>
定义函数f(x)为x最大的奇数约数，x为正整数。 例如:f(44) = 11。 <br>
现在给出一个N，需要求出 f(1) + f(2) + f(3).......f(N) <br>
例如： N = 7 <br>
f(1) + f(2) + f(3) + f(4) + f(5) + f(6) + f(7) = 1 + 1 + 3 + 1 + 5 + 3 + 7 = 21 <br>
小易计算这个问题遇到了困难，需要你来设计一个算法帮助他。
   
``` java
import java.util.Scanner;

public class Main{
  public static void main(String[] args) {
    Scanner s=new Scanner(System.in);
    long num=s.nextInt();
    long sum=0;
    for(long i=num;i>0;i=i/2){
      long temp=(i+1)/2;
      sum+=temp*temp;
    }
    System.out.println(sum);
  }
}
```
 
总体思路：<br>
因为奇数的最大奇数约数就是自己啊，对于偶数我们只能一直除2直到得到一个奇数即为最大奇数约数 <br>
比如1 2 3 4 5 6 7 8 9 10 <br>
即n=10 ，此时奇数有1 3 5 7 9 我们把这几个奇数相加然后n/2 <br>
得到第二轮序列序列 1 2 3 4 5 分别对应上次的2 4 6 8 10 五个偶数，这是我们再加1 3 5 <br>
依次类推 <br>
<br>
细节问题：<br>
当n为偶数，就有n/2个奇数，根据等差数列求和公式 即(（首项+末项）*项数)/2,我们知道n/2个奇数和为((1+n-1)*n/2)/2, <br>
即为(n/2) * (n/2),此时n为偶数，因此 (n/2) * (n/2) = ((n+1)/2)  *  ((n+1)/2) <br>
当n为奇数，有(n+1)/2个奇数，此时奇数和为((n+1)/2)  *  ((n+1)/2) <br>
因此两种情况可以用一个等式来总结 <br>

<br>

[backToCatalog](#catalog)
<br><br><br>


<i id="structure"></i>
##  Data Structure and Algorithm / 数据结构与算法

###  数据结构

1.栈(Stack)<br>
只能在栈顶添加或删除，快，后入先出(LIFO)<br>
``` javascript
class Stack{
  constructor () {
    this.dataStore = []
    this.top = 0
  }
  push (el) {
    this.dataStore[this.top++] = el
  }
  peek () {
    return this.dataStore[this.top - 1]
  }
  pop () {
    return this.dataStore[--this.top]
  }
  clear () {
    this.dataStore = []
    this.top = 0
  }
  length () {
    return this.top
  }
}
var stack = new Stack()
```
stack.push(el):向栈顶推入一个元素<br>
stack.peek():返回当前栈顶元素<br>
stack.pop():删除并返回当前栈顶元素<br>
stack.clear():清空栈内元素<br>
stack.length():返回栈内元素个数<br>
<br>
2.队列(Queue)<br>
只能在队首删除，队尾添加，先入先出(FIFO)<br>
``` javascript
class Queue {
  constructor () {
    this.dataStore = []
  }
  enqueue (el) {
    this.dataStore.push(el)
  }
  dequeue () {
    return this.dataStore.shift()
  }
  readfront () {
    return this.dataStore[0]
  }
  readback () {
    return this.dataStore[this.dataStore.length - 1]
  }
  toString () {
    let str = ''
    for (let i of this.dataStore) {
      str += i + '\n'
    }
    return str
  }
  empty () {
    if (this.dataStore.length === 0) {
      return true
    }
    return false
  }
}
var queue = new Queue()
```
queue.enqueue(el):向队尾添加一个元素<br>
queue.dequeue():删除队首元素<br>
queue.readfront():读取队首元素<br>
queue.readback():读取队尾元素<br>
queue.toString():读取队列所有元素<br>
queue.empty():判断队列是否为空<br>

<br><br>

### 算法
1. Insertion Sort<br>
插入排序(Insertion Sort)将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列，从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面）。<br>
``` javascript
let insertionSort = (arr) => {
  var preIndex, current
  for (let i in arr) {
    preIndex = i - 1
    current = arr[i]
    while(preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex + 1] = current
  }
  console.log('3.InsertionSort ' + arr)
}
```
<br>
2.Shell Sort<br>
希尔排序(Shell Sort)也称递减增量排序算法，是插入排序的一种更高效的改进版本。但希尔排序是非稳定排序算法。基本思想是：先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录“基本有序”时，再对全体记录进行依次直接插入排序。<br>

``` javascript
let shellSort = (arr) => {
  let temp = null
  let gap = 1
  while (gap < arr.length / 3) {
    gap = gap * 3 + 1
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < arr.length; i++) {
      temp = arr[i]
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
    }
  }
  console.log('4.ShellSort  ' + arr)
}
```
<br>
3.Quick Sort<br>
快速排序(Quick Sort)（1）在数据集之中，找一个基准点。（2）建立两个数组，分别存储左边和右边的数组。（3）利用递归进行下次比较<br>

``` javascript
let quickSort = (arr) => {
  let lesser = []
  let greater = []
  let pivot = arr[0]
  for (let i in arr) {
    if (arr[i] < pivot) {
      lesser.push(arr[i])
    } else {
      greater.push(arr[i])
    }
  }
  return quickSort(lesser).concat(pivot, quickSort(greater))
}
```
<br>
7.Binary Search<br>
二分查找<br>

``` bash
let binarySearch = (arr, data) => {
  var upperBound = arr.length - 1
  var lowerBound = 0
  let mid = null
  while (lowerBound <= upperBound) {

  }
}
```

<br><br><br>

<i id="underlying"></i>
##  Underlying Javascript / Javascript 底层
###  Closure闭包
在内层的函数捕获了定义在外层函数中的变量，并把内层函数传递到外层函数的作用域之外执行，则外层函数的context不能销毁，就形成了闭包。<br>
把内层函数传递到外层函数的作用域之外有很多方法，最常见的是使用return。<br>
其它的方法还有把内层函数赋值给全局对象的属性，或者设置为某个控件的事件处理程序，甚至使用setTimeout和setInterval都可以。<br>
<br>
###  原型、原型链
原型对象.constructor == 构造函数<br>
构造函数.prototype == 原型对象<br>
<br>
###  继承
3.混合继承 - 组合使用构造函数模式和原型模式<br>
创建自定义类型最常见的方式就是组合使用构造函数模式与原型模式。构造函数模式用于定义实例属性，原型模式用于定义方法和共享的属性。<br>
这样每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度的节省了内存。<br>
另外，这种混成模式还支持向构造函数传递参数；可谓是集两种模式之长。<br>

``` bash

  function Person(name, age){
    this.name = name;
    this.age = age;
    this.friends = ["乾隆","康熙"];
  }
  Person.prototype = {
    constructor:Person,
    sayName:function(){
      alert(this.name);
    }
  }
  var person1 = new Person("wei",29);
  var person2 = new Person("bu",25);
  person1.friends.push("嬴政");
  console.log(person1.friends); //["乾隆", "康熙", "嬴政"]
  console.log(person2.friends); //["乾隆", "康熙"]
  console.log(person1.friends === person2.friends); //false
  console.log(person1.sayName === person2.sayName); //true    
  
```

在这个例子中，实例属性都是在构造函数中定义的，而由所有实例共享的属性constructor和方法sayName()则是在原型中定义的。所以修改了person1.friends并不会改变person2.friends，因为他们分别引用了不同的数组。<br>  
这种构造函数与原型模式混成的模式，是目前在ECMAScript中使用最广泛、认同度最高的一种创建自定义类型的方法。<br>
<br>
####  Arguments对象
函数内使用，返回函数的实际参数。<br>
arguments.length 返回实参个数（Array）<br>
if(arguments.callee.length == arguments.length ){ ...do something(形参与实参数量相等) }<br>
<br>
####  Call,Apply
作用: 扩充函数作用域，并且对象和方法不需要有任何耦合关系。

<br><br><br>

<i id="ajax"></i>
##   Ajax(Asynchronous JavaScript and XML)
####  Ajax原理
Ajax的工作原理相当于在用户和服务器之间加了一个中间层(ajax引擎),使用户操作与服务器响应异步化。<br>
并不是所有的用户请求都提交给服务器,像—些数据验证(比如判断用户是否输入了数据)和数据处理(比如判断用户输入数据是否是数字)等都交给Ajax引擎自己来做, 只有确定需要从服务器读取新数据时再由Ajax引擎代为向服务器提交请求。<br>
<br>
**Ajax优缺点**<br>
1.优点<br>
无刷新更新数据,异步与服务器通信,前端和后端负载平衡,广泛支持,界面与应用分离
<br>
2.缺点<br>
Back和加入收藏书签功能失效,AJAX的安全问题<br>
<br>
**XMLhttpRequest**<br>
为了使用JavaScript向服务器发出 HTTP 请求，需要一个提供此功能的类的实例。<br>
<br>
1.属性<br>
onreadystatechange<br>
一个JavaScript函数对象，当readyState属性改变时会调用它。回调函数会在user interface线程中调用。<br>
<br>
readyState<br>
HTTP 请求的状态，每次这个属性的值增加的时候，都会触发 onreadystatechange。<br>
``` bash
0  Uninitialized   初始化状态。XMLHttpRequest 对象已创建或已被 abort() 方法重置。
1  Open            Open() 方法已调用，但是 send() 方法未调用。请求还没有被发送。
2  Sent            Send() 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。
3  Receiving       所有响应头部都已经接收到。响应体开始接收但未完成。
4  Loaded          HTTP 响应已经完全接收。
```
responseText<br>
目前为止为服务器接收到的响应体。<br>
如果readyState<3，这个属性就是一个空字符串。当readyState=3，这个属性返回目前已经接收的响应部分。如果readyState=4，这个属性保存了完整的响应体。<br>
<br>
responseXML<br>
对请求的响应，解析为 XML 并作为 Document 对象返回。<br>
<br>
status<br>
由服务器返回的HTTP状态代码，当 readyState<3的时候读取这一属性会导致一个异常。<br>
<br>
2.方法<br>
abort()  取消当前响应，关闭连接并且结束任何未决的网络活动。<br>
这个方法把 XMLHttpRequest 对象重置为 readyState 为 0 的状态，并且取消所有未决的网络活动。<br>
<br>
getResponseHeader()  返回指定的 HTTP 响应头部的值。<br>
其参数是要返回的 HTTP 响应头部的名称。如果没有接收到这个头部或者readyState<3则为空字符串。如果接收到多个有指定名称的头部，这个头部的值被连接起来并返回。<br>
<br>
open()初始化一个请求。<br>
参数<br>
method    请求所使用的HTTP方法。<br>
url       该请求所要访问的URL<br>
async     可选布尔值，默认true，意味着是否执行异步操作，如果值为false,则send()方法直到接受到了服务器的返回数据才会返回。如果为值为true，一个对开发者透明的通知会发送到相关的事件监听者。<br>
user      用户名,可选,默认空String<br>
password  密码,可选,默认空String<br>
<br>
send()  发送 HTTP 请求<br>
<br>
setRequestHeader()  向一个打开但未发送的请求设置或添加一个 HTTP 请求(设置请求头)<br>
参数<br>
header 将要被赋值的请求头名称<br>
value  给指定的请求头赋的值<br>
<br>
**Ajax原生js实现**<br>
``` javascript
var ajax = {};
ajax.httpRequest = function () {
  //判断是否支持XMLHttpRequest对象
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest()
  }
  //兼容IE浏览器
  var versions = [
  "MSXML2.XmlHttp.6.0",
  "MSXML2.XmlHttp.5.0",
  "MSXML2.XmlHttp.4.0",
  "MSXML2.XmlHttp.3.0",
  "MSXML2.XmlHttp.2.0",
  "Microsoft.XmlHttp"
  ];
  //定义局部变量xhr,储存IE浏览器的ActiveXObject对象
  var xhr;
  for (var i = 0; i < versions.length; i++) {
    try {
      xhr = new ActiveXObject(versions[i])
      break
    } catch (e) {
    }
  }
  return xhr
}
ajax.send = function (url, callback, method, data, async) {
  //默认异步
  if (async === undefined) {
    async = true
  }
  var httpRequest = ajax.httpRequest()
  //初始化HTTP请求
  httpRequest.open(method, url, async)
  //onreadystatechange函数对象
  httpRequest.onreadystatechange = function () {
    //readyState 的值等于4，从服务器拿到了数据
    if (httpRequest.readyState == 4) {
      //回调服务器响应数据
      callback(httpRequest.responseText)
    }
  }
  if (method == 'POST') {
    //给指定的HTTP请求头赋值
    httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  }
  //发送HTTP请求
  httpRequest.send(data)
};
//实现GET请求
ajax.get = function (url, data, callback, async) {
  var query = []
  for (var key in data) {
    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
  }
  ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
}
//实现POST请求
ajax.post = function (url, data, callback, async) {
  var query = []
  for (var key in data) {
    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
  }
  ajax.send(url, callback, 'POST', query.join('&'), async)
}
```

<br><br><br>

<i id="flex"></i>
##  Flex布局(Flexible Box)
**1.容器**<br>
任何一个容器都可以指定为Flex布局 display: flex | inline-flex;<br>
设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。<br>
<br>
以下6个属性设置在容器上<br>
<br>
flex-flow: &lt;flex-direction&gt; || &lt;flex-wrap>;是flex-direction属性和flex-wrap属性的简写形式,默认值为row nowrap<br>
flex-direction: row(default) | row-reverse | column | column-reverse;决定主轴的方向（即项目的排列方向）<br>
flex-wrap: nowrap（default） | wrap | wrap-reverse;决定换行规则<br>
<br>
justify-content: flex-start | flex-end | center | space-between | space-around;定义了项目在主轴上的对齐方式。<br>
flex-start（default）：左对齐<br>
flex-end：右对齐<br>
center： 居中<br>
space-between：两端对齐，项目之间的间隔都相等<br>
space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍<br>
align-items: stretch | flex-start | flex-end | center | baseline;定义项目在交叉轴上的对齐规则。<br>
stretch（default）：如果项目未设置高度或设为auto，将占满整个容器的高度。<br>
flex-start：交叉轴的起点对齐。<br>
flex-end：交叉轴的终点对齐。<br>
center：交叉轴的中点对齐。<br>
baseline: 项目的第一行文字的基线对齐。<br>
align-content: stretch | flex-start | flex-end | center | space-between | space-around;<br>
stretch（default）：轴线占满整个交叉轴。<br>
flex-start：与交叉轴的起点对齐。<br>
flex-end：与交叉轴的终点对齐。<br>
center：与交叉轴的中点对齐。<br>
space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。<br>
space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。<br>
<br>
**2.项目**<br>
以下6个属性设置在项目上<br>
<br>
flex: none | [ &lt;flex-grow&gt; &lt;flex-shrink&gt; || &lt;flex-basis&gt; ];是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。<br>
flex-grow: &lt;number&gt; /* default 0 */;定义项目的放大比例，默认不放大。如果所有项目的flex-grow属性都为1，则它们将等分剩余空间,如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。<br>
flex-shrink: &lt;number&gt; /* default 1 */定义了项目的缩小比例，默认空间不足，该项目将缩小。<br>
<br>
order: &lt;integer&gt; /* default 0 */;定义项目的排列顺序。数值越小，排列越靠前。<br>
flex-basis: &lt;length&gt; | auto; /* default auto */设置或检索弹性盒伸缩基准值。<br>
align-self: auto（default） | flex-start | flex-end | center | baseline | stretch;允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。

<br>

[backToCatalog](#catalog)

<br><br><br>
<i id="input-url"></i>
##   What happens when you navigate to a URL / 输入URL 到页面加载完的过程
###  从触屏到 CPU
当手指在这个传感器上触摸时，有些电子会传递到手上，从而导致该区域的电压变化，触摸屏控制器芯片根据这个变化就能计算出所触摸的位置，然后通过总线接口将信号传到 CPU 的引脚上。<br>
CPU实现加法、位移等计算，寄存器加载存储数据。数据处理完传入系统内核，再由系统GUI传到浏览器。<br>
传入浏览器后，浏览器可能会做一些预处理。<br>
<br>
###  HTTP 请求
1.输入URL后回车，浏览器会对URL进行检查。把URL分割成几个部分：协议、网络地址、资源路径。其中网络地址指示该连接网络上哪一台计算机，可以是域名或者IP地址，可以包括端口号；协议是从该计算机获取资源的方式，常见的是HTTP、FTP，不同协议有不同的通讯内容格式；资源路径指示从服务器上获取哪一项资源。另外还会对这个 URL 进行安全检查，然后直接调用浏览器内核中的对应方法。<br>
2.如果地址不是一个IP地址，通过DNS（域名系统）将该地址解析成IP地址(如果没有找到，就一层层向上找，最高可达根节点，找到或者全部找不到为止)。IP地址对应着网络上一台计算机，DNS服务器本身也有IP，你的网络设置包含DNS服务器的IP。<br>
3.如果地址不包含端口号，根据协议的默认端口号确定一个。<br>
4.发起网络连接。<br>
5.根据http协议要求，组织一个请求的数据包，里面包含大量请求信息。<br>
6.服务器响应请求，将数据返回给浏览器(数据资源中存在外链URL或图片地址，每一个都将发起1-6过程再次获取)。如果资源路径指示的资源不存在，服务器就会返回著名的404错误。<br>
7.开始根据资源的类型，将资源组织成屏幕上显示的图像，这个过程叫渲染，网页渲染是浏览器最复杂、最核心的功能。<br>
8.将渲染好的页面图像显示出来，并开始响应用户的操作。<br>
<br>
###  TCP连接三握四挥*
三次握手是指建立一个TCP连接时，需要客户端和服务端总共发送3个包以确认连接的建立。防止server端一直等待，浪费资源。<br>
1.一次握手：Client将标志位SYN(建立联机)置为1，随机产生一个值seq=J，并将该数据包发送给Server，Client进入SYN_SENT状态，等待Server确认。<br>
2.二次握手：Server收到数据包后由标志位SYN=1知道Client请求建立连接，并将数据包(Server将标志位SYN和ACK(确认)都置为1，ack (number )=J+1，随机产生一个值seq=K)发送给Client以确认连接请求，Server进入SYN_RCVD状态。<br>
3.三次握手：Client收到确认后，检查ack是否为J+1，ACK是否为1，如果正确则将数据包(将标志位ACK置为1，ack=K+1)发送给Server，Server检查ack是否为K+1，ACK是否为1，如果正确则连接建立成功，Client和Server进入Established(已建立)状态，完成三次握手，随后Client与Server之间可以开始传输数据了。<br>
<br>
四次挥手是指断开一个TCP连接时，需要客户端和服务端总共发送4个包以确认连接的断开。<br>
1.一次挥手：Client发送一个FIN(结束)，用来关闭Client到Server的数据传送，Client进入FIN_WAIT_1状态。<br>
2.二次挥手：Server收到FIN后，发送一个ACK(确认)给Client（确认序号为收到序号+1），Server进入CLOSE_WAIT状态。<br>
3.三次挥手：Server发送一个FIN，用来关闭Server到Client的数据传送，Server进入LAST_ACK状态。<br>
4.四次挥手：Client收到FIN后，Client进入TIME_WAIT状态，接着发送一个ACK给Server(确认序号为收到序号+1)，Server进入CLOSED状态，完成四次挥手。<br>
<br>
**附注**<br>
1.为什么建立连接是三次握手，而关闭连接却是四次挥手呢?<br>
这是因为服务端在LISTEN(侦听状态)状态下，收到建立连接请求的SYN报文后，把ACK和SYN放在一个报文里发送给客户端。<br>
而关闭连接时，当收到对方的FIN报文时，仅仅表示对方不再发送数据了但是还能接收数据，己方也未必全部数据都发送给对方了，可以发送一些数据给对方后，再发送FIN报文给对方来表示同意现在关闭连接，因此，己方ACK和FIN一般都会分开发送。<br>
2.SYN(建立联机)攻击<br>
在二次和三次握手中间，Server发送SYN-ACK之后，收到Client的ACK之前的TCP连接称为半连接，此时Server处于SYN_RCVD状态，当收到ACK后，Server转入ESTABLISHED状态。<br>
SYN攻击就是Client在短时间内伪造大量不存在的IP地址，并向Server不断地发送SYN包，Server回复确认包，并等待Client的确认，由于源地址是不存在的。因此，Server需要不断重发直至超时，这些伪造的SYN包将长时间占用未连接队列，导致正常的SYN请求因为队列满而被丢弃，从而引起网络堵塞甚至系统瘫痪。<br>
<br>
###  服务器接收到数据后*
负载均衡

<br><br><br>

<i id="http"></i>
##   HTTP Cache / HTTP 缓存
浏览器是如何知道使用缓存的，浏览器将最后修改时间发送请求给web服务器，web服务器收到请求后跟服务器上的文档最后修改的时间对比，如果web服务器上最新文档修改时间小于或者等于浏览器发送过来的，则发送304给浏览器，使用缓存版本。<br>
缓存的好处:<br>
1. 减少了冗余的数据传输<br>
2. 减少了服务器的负担， 大大提高了网站的性能<br>
3. 加快了客户端加载网页的速度<br>
<br>
<br>
##   HTTP Status Code / HTTP状态码
1XX  表示消息<br>
2XX  表示成功<br>
3XX  表示重定向<br>
4XX  表示请求错误<br>
5XX  表示服务器端错误<br>
<br>
100 Continue  初始的请求已经接受，客户应当继续发送请求的其余部分<br>
200 OK  一切正常，对GET和POST请求的应答文档跟在后面<br>
300 Multiple Choices  客户请求的文档可以在多个位置找到，这些位置已经在返回的文档内列出。如果服务器要提出优先选择，则应该在Location应答头指明。<br>
301 Moved Permanently  重定向，客户请求的文档在其他地方，新的URL在Location头中给出，浏览器应该自动地访问新的URL<br>
304 Not Modified  客户端有缓冲的文档并发出了一个条件性的请求（一般是提供If-Modified-Since头表示客户只想比指定日期更新的文档）。服务器告诉客户，原来缓冲的文档还可以继续使用。<br>
400 Bad Request  请求出现语法错误。<br>
404 Not Found  无法找到指定位置的资源<br>
500 Internal Server Error  服务器遇到了意料不到的情况，不能完成客户的请求<br>
501 Not Implemented  服务器不支持实现请求所需要的功能。

<br>
[backToCatalog](#catalog)
<br><br><br>


<i id="async"></i>
##  ES8 Async
1. 背景<br>
    在qdum-fed-quick-start中有一处通过AJAX获取素材数据，并实时响应到vue data中，然后对对响应到data中筛选部分数据进行处理。<br>    
    [gitlab地址](http://gitlab.qdum.com/wangyw/qdum-fed-quick-start/blob/master/src/common/components/new/material/all-material.vue)<br> 

    在一开始时，采用的方法如下(关键代码)：<br> 
    
   ``` javascript
     import request from 'superagent'
     export default {
       data () {
         return {
           dataStore: [],
           lastItem: {},
           currentPage: 1
         }
       },
       created () {
         this.updateData(this.currentPage)
       },
       methods: {
         updateData (page) {
           request('get', `http://rap.qdum.com/mockjsdata/17/api/material/v1/material?pageNumber=${page}`).then((res) => {
             this.dataStore.push(...res.body.data.materialList)
             this.$nextTick(() => {
               this.lastItem = this.$refs.list[this.$refs.list.length - 1]
             })
           })
         }
       }
     }
   ```
   
   这里就出现一个问题，this.lastItem总是undefined <br>
   
   
   
   改进后: <br> 
   
   ``` javascript
     import request from 'superagent'
     export default {
       data () {
         return {
           dataStore: [],
           lastItem: {},
           currentPage: 1
         }
       },
       created () {
         this.updateData(this.currentPage)
       },
       methods: {
         updateData (page) {
           request('get', `http://rap.qdum.com/mockjsdata/17/api/material/v1/material?pageNumber=${page}`).then((res) => {
             this.dataStore.push(...res.body.data.materialList)
           })
         },
       },
       watch: {
         dataStore () {
           this.$nextTick(() => {
             this.lastItem = this.$refs.list[this.$refs.list.length - 1]
           })
         }
       }
     }
   ```   
   
   用async重写:<br>
   
   ``` javascript
    import request from 'superagent'
    export default {
      data () {
        return {
          dataStore: [],
          lastItem: {},
          currentPage: 1
        }
      },
      created () {
        this.updateData(this.currentPage)
      },
      methods: {
        async updateData (page) {
          .then((res) => {
            let res = await request('get', `http://rap.qdum.com/mockjsdata/17/api/material/v1/material?pageNumber=${page}`)
            this.dataStore.push(...res.body.data.materialList)
            this.$nextTick(() => {
              this.lastItem = this.$refs.list[this.$refs.list.length - 1]
            })
          })
        }
      }
    }
   ```
      
   
   
2. 什么是Async函数<br>
   async函数是在ES2017加入的，它是目前为止 JS 最佳的异步解决方案。<br>
   简单地说，它可以起到与promise和generator相同的作用。<br>
3. 解决了什么问题<br>
  并没有什么新能力，只是使得异步操作变得更加方便。<br>
  [demo](https://github.com/ColorChan/Basic/blob/master/test.html)<br>
4. 与原先的解决方法有什么区别<br>
   3.1 &nbsp; callback<br>
   。。。<br>
   3.2 &nbsp; promise<br>
   传统callback hell问题已经被es6的promise解决了<br>
   但是promise也带来了一定的问题 <br>
   (1).立即执行、无法取消<br>
   (2).无法追踪pending<br>
   (3).语义化差<br>
   3.2 &nbsp; generator<br>
   (1).generator 返回Iterator .next()<br>
   (2).generator 语义化尚可<br>
   (3).需要执行器
5. 核心原理<br>
   async函数返回Promise。当函数执行时，遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。<br>
   async原理是包装generator和一个自动执行函数。<br>
   缺点:await异步操作错误处理<br>
6. 对业务影响<br>
   基于promise，看起来像同步，且不会阻塞主线程。<br>
   可读可维护性。<br>

<br>

[backToCatalog](#catalog)

<br><br><br>

<i id="others"></i>
##  Difference between  Cookie,sessionStorage,localStorage / Cookie,sessionStorage,localStorage的区别
共同点：都是保存在浏览器端，且同源的。<br>
区别：<br>
1. cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。<br>
2. 存储大小限制也不同，cookie数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如会话标识。sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。<br>
3. 数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。<br>
4. 作用域不同，sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localStorage 在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的。<br>
5. Web Storage 支持事件通知机制，可以将数据更新的通知发送给监听者。<br>
6. Web Storage 的 api 接口使用更方便。<br>

<br><br>

##  Principle of JSONP / JSONP原理
是利用<code>&lt;script&gt;</code>标签没有跨域限制的“漏洞”来达到与第三方通讯的目的。当需要通讯时，本站脚本创建一个<code>&lt;script&gt;</code>元素，地址指向第三方的API网址，形如： <br>
<code>&lt;script&nbsp;src="http://www.example.net/api?param1=1&param2=2"</code><code>&gt;&lt;/script&gt;</code>
并提供一个回调函数来接收数据（函数名可约定，或通过地址参数传递）。 <br>
第三方产生的响应为json数据的包装（故称之为jsonp，即json padding），形如： <br>
callback({"name":"hax","gender":"Male"}) <br>
这样浏览器会调用callback函数，并传递解析后json对象作为参数。本站脚本可在callback函数里处理所传入的数据。 <br>

<br><br>

##  CSS Box Mode / CSS盒子模式
!DOCTYPE声明的都是标准的文档类型，无论使用哪种模式完整定义DOCTYPE，都会触发标准模式，而如果DOCTYPE缺失则在ie6，ie7，ie8下将会触发怪异模式。<br>
当设置为box-sizing:content-box时，将采用标准模式解析计算，也是默认模式；width属性只包含content。<br>
当设置为box-sizing:border-box时，将采用怪异模式解析计算；width属性包含padding和border，且margin: 0 auto在怪异模式无法居中。<br>

<br><br>

##   Difference between Get and Post / Get与Post的区别
###  原理
Http定义了与服务器交互的不同方法，最基本的方法有4种，分别是GET，POST，PUT，DELETE。<br>
URL全称是资源描述符，我们可以这样认为：一个URL地址，它用于描述一个网络上的资源，而HTTP中的GET，POST，PUT，DELETE就对应着对这个资源的查，改，增，删4个操作。<br>
故GET一般用于获取/查询资源信息，而POST一般用于更新资源信息。<br>
<br>
1.GET用于信息获取，而且应该是安全的和幂等的。<br>
(1).所谓安全的意味着该操作用于获取信息而非修改信息，它仅仅是获取资源信息，不会修改，增加数据，不会影响资源的状态。<br>
注意：这里安全的含义仅仅是指是非修改信息。<br>
(2).幂等的意味着对同一URL的多个请求应该返回同样的结果。<br>
2.POST表示可能修改变服务器上的资源的请求<br>
<br>
### 实际
1.GET请求的数据会附在URL之后（就是把数据放置在HTTP协议头中），以?分割URL和传输数据，参数之间以&相连。如果数据是英文字母/数字，原样发送，如果是空格，转换为+，如果是中文/其他字符，则直接把字符串用BASE64加密。<br>
POST把提交的数据则放置在是HTTP包的包体中。<br>
2."GET方式提交的数据最多只能是1kb，理论上POST没有限制，可传较大量的数据。<br>
3.在ASP中，服务端获取GET请求参数用Request.QueryString，获取POST请求参数用Request.Form。在JSP中，用request.getParameter(\"XXXX\")来获取。在PHP中，可以用$_GET和$_POST分别获取GET和POST中的数据。<br>
4.POST的安全性要比GET的安全性高。<br>

<br><br>

##   Javascript Strict Mode / Javascript 严格模式
###  进入严格模式
"use strict";<br>
(老版本的浏览器会把它当作一行普通字符串，忽略)<br>
<br>
###  目的
消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;<br>
消除代码运行的一些不安全之处，保证代码运行的安全；<br>
提高编译器效率，增加运行速度；<br>
为未来新版本的Javascript做好铺垫。<br>
<br>
"严格模式"包括IE 10在内的主流浏览器，都已经支持它。<br>
同样的代码，在"严格模式"中，可能会有不一样的运行结果；一些在"正常模式"下可以运行的语句，在"严格模式"下将不能运行。<br>

<br><br>

##    Yahoo Rules / Yahoo性能优化
1、尽量减少HTTP请求个数<br>
合并图片（如css sprites，base64）、合并CSS、JS，但是要考虑合并后的文件体积。<br>
2、使用CDN<br>
3、为文件头指定Expires或Cache-Control，使内容具有缓存性。<br>
4、避免空的src和href<br>
5、使用gzip压缩内容<br>
Gzip压缩所有可能的文件类型以来减少文件体积<br>
6、把CSS放到顶部<br>
7、把JS放到底部<br>
8、避免使用CSS表达式<br>
9、将CSS和JS放到外部文件中<br>
权衡内置代码带来的HTTP请求减少与通过使用外部文件进行缓存带来的好处的折中点。<br>
10、减少DNS查找次数<br>
权衡减少DNS查找次数和保持较高程度并行下载两者之间的关系。<br>
11、精简CSS和JS<br>
12、避免跳转<br>
为了确保“后退”按钮可以正确地使用，使用标准的 3XXHTTP状态代码；同域中注意避免反斜杠 “/” 的跳转；<br>
13、剔除重复的JS和CSS<br>
重复调用脚本，除了增加额外的HTTP请求外，多次运算也会浪费时间。<br>
14、配置ETags<br>
Entity tags（ETags）（实体标签）是web服务器和浏览器用于判断浏览器缓存中的内容和服务器中的原始内容是否匹配的一种机制（“实体”就是所说的“内 容”，包括图片、脚本、样式表等），是比last-modified date更更加灵活的机制，单位时间内文件被修过多次，Etag可以综合Inode(文件的索引节点(inode)数)，MTime(修改时间)和Size来精准的进行判断，避开UNIX记录MTime只能精确到秒的问题。 服务器集群使用，可取后两个参数。使用ETags减少Web应用带宽和负载。<br>
15、使AJAX可缓存<br>
利用时间戳，更精巧的实现响应可缓存与服务器数据同步更新。<br>
16、尽早刷新输出缓冲<br>
尤其对于css，js文件的并行下载更有意义<br>
17、使用GET来完成AJAX请求<br>
当使用XMLHttpRequest时，浏览器中的POST方法是一个“两步走”的过程：首先发送文件头，然后才发送数据。在url小于2K时使用GET获取数据时更加有意义。<br>
18、延迟加载<br>
确定页面运行正常后，再加载脚本来实现如拖放和动画，或者是隐藏部分的内容以及折叠内容等。<br>
19、预加载<br>
关注下无条件加载，有条件加载和有预期的加载。<br>
20、减少DOM元素个数<br>
21、根据域名划分页面内容<br>
很显然， 是最大限度地实现平行下载<br>
22、尽量减少iframe的个数<br>
考虑即使内容为空，加载也需要时间，会阻止页面加载，没有语意，注意iframe相对于其他DOM元素高出1-2个数量级的开销，它会在典型方式下阻塞onload事件，IE和Firefox中主页面样式表会阻塞它的下载。<br>
23、避免404<br>
HTTP请求时间消耗是很大的，有些站点把404错误响应页面改为“你是不是要找***”，这虽然改进了用户体验但是同样也会浪费服务器资源（如数据库等）。最糟糕的情况是指向外部 JavaScript的链接出现问题并返回404代码。首先，这种加载会破坏并行加载；其次浏览器会把试图在返回的404响应内容中找到可能有用的部分当作JavaScript代码来执行。<br>
24、减少Cookie的大小<br>
去除不必要的coockie<br>
使coockie体积尽量小以减少对用户响应的影响<br>
注意在适应级别的域名上设置coockie以便使子域名不受影响<br>
设置合理的过期时间。较早地Expire时间和不要过早去清除coockie，都会改善用户的响应时间。<br>
25、使用无cookie的域<br>
确定对于静态内容的请求是无coockie的请求。创建一个子域名并用他来存放所有静态内容。<br>
26、减少DOM访问<br>
缓存已经访问过的有关元素<br>
线下更新完节点之后再将它们添加到文档树中<br>
避免使用JavaScript来修改页面布局<br>
27、开发智能事件处理程序<br>
有时候我们会感觉到页面反应迟钝，这是因为DOM树元素中附加了过多的事件句柄并且些事件句病被频繁地触发。这就是为什么说使用event delegation（事件代理）是一种好方法了。如果你在一个div中有10个按钮，你只需要在div上附加一次事件句柄就可以了，而不用去为每一个按 钮增加一个句柄。事件冒泡时你可以捕捉到事件并判断出是哪个事件发出的。<br>
你同样也不用为了操作DOM树而等待onload事件的发生。你需要做的就是等待树结构中你要访问的元素出现。你也不用等待所有图像都加载完毕。<br>
你可能会希望用DOMContentLoaded事件来代替 事件应用程序中的onAvailable方法。<br>
28、用<link>代替@import<br>
在IE中，页面底部@import和使用<link>作用是一样的，因此最好不要使用它。<br>
29、避免使用滤镜<br>
30、优化图像<br>
尝试把GIF格式转换成PNG格式。<br>
31、优化CSS Spirite<br>
32、不要在HTML中缩放图像<br>
33、favicon.ico要小而且可缓存<br>
favicon.ico是位于服务器根目录下的一个图片文件。它是必定存在的，因为即使你不关心它是否有用，浏览器也会对它发出请求，因此最好不要返回一 个404 Not Found的响应。由于是在同一台服务器上，它每被请求一次coockie就会被发送一次。这个图片文件还会影响下载顺序，例如在IE中当你在 onload中请求额外的文件时，favicon会在这些额外内容被加载前下载。<br>
因此，为了减少favicon.ico带来的弊端，要做到：<br>
文件尽量地小，最好小于1K<br>
在适当的时候（也就是你不要打算再换favicon.ico的时候，因为更换新文件时不能对它进行重命名）为它设置Expires文件头。你可以很安全地 把Expires文件头设置为未来的几个月。你可以通过核对当前favicon.ico的上次编辑时间来作出判断。<br>
Imagemagick可以帮你创建小巧的favicon。<br>
34、保持单个内容小于25K<br>
因为iPhone不能缓存大于25K的文件。注意这里指的是解压缩后的大小。由于单纯gizp压缩可能达不要求，因此精简文件就显得十分重要。<br>
35、打包组件成复合文本<br>
页面内容打包成复合文本就如同带有多附件的Email，它能够使你在一个HTTP请求中取得多个组件（切记：HTTP请求是很奢侈的）。当你使用这条规则时，首先要确定用户代理是否支持（iPhone就不支持）。<br>

<br><br>

##  DOM Event Flow
**1.Event Bubble**<br>
<br>
**2.Event capturing**<br>
Event processing will not start at the target element but the root of the DOM ，event will be deliverd from the parent element down to the target.<br>
Event type will be capturing when the useCapture is true in element.addEventListener(event, function, useCapture).<br>
<br>
**3.Event delegation**<br>
Using the event bubble, binding the event to it's parent node.<br>

<br><br>
##  NAN
not a number<br>
but typeof NAN is a Number<br>
NaN != NaN, but except Array.prototype.includes() in Ecma7

<br>
[backToCatalog](#catalog)
<br><br><br>



<i id="code-review"></i>
## Code Review
### Principle in code review
**Kind one：Only technology**<br>
1. Is what
2. Resolve what kind of problems
3. Compare with the same technology
4. Core principle
5. Future
6. Effect of working
<br>
**Kind two：Only thought**<br>
1. Background
2. Resolve what kind of problems
3. The root of problems, find the key point
4. Analyse the solution
5. How should
6. Future plan

<br>


<i id="review01"></i> 
### First
**模态窗(Modal)** <br>
Modals 一般用来做一项具体的任务，例如在某些表单中 <br>

1.从产品角度讲modal与弹窗、提示、浮层。 <br>
弹窗Alert<br>
![弹窗Alert](https://github.com/ColorChan/Basic/blob/master/img/alert.png?raw=true)
<br>
提示Toast<br>
![提示Toast](https://github.com/ColorChan/Basic/blob/master/img/toast.png?raw=true)
<br>
浮层(popover或popup)<br>
![popover](https://github.com/ColorChan/Basic/blob/master/img/popover.png?raw=true)
<br>
![popup](https://github.com/ColorChan/Basic/blob/master/img/popup.png?raw=true)
<br><br>
2.一个好的modal应该考虑到哪些情况<br>
2.1. 模态，阻止滚动<br>
2.2. 多个弹层同时出现时<br>
2.3. 是否可以自我管理<br>
2.4. 是否单例<br>
2.5. 模态框需要支持同步加载和异步加载两种方式<br>
2.6. 模态框组件可以自主地选择是否加入过渡动画<br>

更多情况<br>
保留状态<br>




<br>
<br>
<br>

[backToCatalog](#catalog)

<br><br>

<i id="review02"></i>
### Second
**NPM插件推荐 - BetterScroll** <br>
better-scroll 是一款重点解决移动端（支持部分PC 端）各种滚动场景的插件。<br>
包括但不限于滚动列表、选择器、轮播图、索引列表、开屏引导<br>
它的核心理念是借鉴的 iscroll，它的 API 设计与 iscroll 相似，在 iscroll 的基础上又扩展了一些 feature 以及做了一些性能优化(听说??)。<br>
better-scroll  基于原生 JS 实现的，无依赖。它编译后的gzip 后仅有 7kb，轻量lib。<br>
GitHub: https://github.com/ustbhuangyi/better-scroll
<br><br>
**常用配置**<br>
普通 --- Boolean<br>
scrollX, scrollY<br>
freeScroll<br>
click(tap)<br>
bounce<br>
momentum<br>
高级 --- Object<br>
wheel<br>
snap<br>
<br><br>
**Demo**<br>
1.slider<br>
```javascript
  let wrapper1 = document.querySelector('.slider-wrapper'  )

  let scroll1 = new BScroll(wrapper1, {
      scrollX: true,
      momentum: false,
      snap: {
          loop: true,
          threshold: 0.3,
          speed: 400
      }
  })
```
<br>

2.list<br>
```javascript
  let wrapper2 = document.querySelector('.goods-wrapper'  )
  let scroll2 = new BScroll(wrapper2)
```
<br><br>
**原码分析**<br>
关于冲量(惯性)<br>
```javascript
  BScroll.prototype._end = function (e) {
    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
      return
    }
    this.initiated = false

    if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {
      e.preventDefault()
    }

    this.trigger('touchEnd', {
      x: this.x,
      y: this.y
    })

    if (this.options.pullDownRefresh && this._checkPullDown()) {
      return
    }

    if (this.resetPosition(this.options.bounceTime, ease.bounce)) {
      return
    }
    this.isInTransition = false
    let newX = Math.round(this.x)
    let newY = Math.round(this.y)

    this.scrollTo(newX, newY)

    let deltaX = newX - this.absStartX
    let deltaY = newY - this.absStartY
    this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0
    this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0

    this.endTime = getNow()

    let duration = this.endTime - this.startTime
    let absDistX = Math.abs(newX - this.startX)
    let absDistY = Math.abs(newY - this.startY)

    let time = 0
    // start momentum animation if needed
    if (this.options.momentum && duration < this.options.momentumLimitTime && (absDistY > this.options.momentumLimitDistance || absDistX > this.options.momentumLimitDistance)) {
      let momentumX = this.hasHorizontalScroll ? momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options)
        : {destination: newX, duration: 0}
      let momentumY = this.hasVerticalScroll ? momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options)
        : {destination: newY, duration: 0}
      newX = momentumX.destination
      newY = momentumY.destination
      time = Math.max(momentumX.duration, momentumY.duration)
      this.isInTransition = 1
    } else {
      if (this.options.wheel) {
        newY = Math.round(newY / this.itemHeight) * this.itemHeight
        time = this.options.wheel.adjustTime || 400
      }
    }

//    ...

  }
```
<br><br>
关于边缘回弹<br>
1.减速部分<br>
```javascript
  BScroll.prototype._move = function (e) {

// ...

    // Slow down or stop if outside of the boundaries
    if (newX > 0 || newX < this.maxScrollX) {
      if (this.options.bounce) {
        newX = this.x + deltaX / 3
      } else {
        newX = newX > 0 ? 0 : this.maxScrollX
      }
    }
    if (newY > 0 || newY < this.maxScrollY) {
      if (this.options.bounce) {
        newY = this.y + deltaY / 3
      } else {
        newY = newY > 0 ? 0 : this.maxScrollY
      }
    }

// ...

  }
```
<br>

2.回弹部分<br>

```javascript
  BScroll.prototype.resetPosition = function (time = 0, easeing = ease.bounce) {
    let x = this.x
    if (!this.hasHorizontalScroll || x > 0) {
      x = 0
    } else if (x < this.maxScrollX) {
      x = this.maxScrollX
    }

    let y = this.y
    if (!this.hasVerticalScroll || y > 0) {
      y = 0
    } else if (y < this.maxScrollY) {
      y = this.maxScrollY
    }

    if (x === this.x && y === this.y) {
      return false
    }

    this.scrollTo(x, y, time, easeing)

    return true
  }
```

```javascript
  BScroll.prototype.scrollTo = function (x, y, time = 0, easing = ease.bounce) {
    this.isInTransition = this.options.useTransition && time > 0 && (x !== this.x || y !== this.y)

    if (!time || this.options.useTransition) {
      this._transitionTimingFunction(easing.style)
      this._transitionTime(time)
      this._translate(x, y)

      if (time && this.options.probeType === 3) {
        this._startProbe()
      }

      if (this.options.wheel) {
        if (y > 0) {
          this.selectedIndex = 0
        } else if (y < this.maxScrollY) {
          this.selectedIndex = this.items.length - 1
        } else {
          this.selectedIndex = Math.abs(y / this.itemHeight) | 0
        }
      }
    } else {
      this._animate(x, y, time, easing.fn)
    }
  }

// 在 Vue 中，保证列表渲染完成时，初始化 BScroll
mounted() {
   setTimeout(() => {
     this.scroll = new BScroll(this.$refs.wrapper, options)
   }, 20)
}
```
<br><br>
[backToCatalog](#catalog)

<br><br>

<i id="review03"></i>
### Third
**How to optimize nest v-for/v-if** <br>
**如何优化业务场景中出现的多层嵌套v-for/v-if** <br>
应对业务场景:<br>
1.需要手写table或使用div模拟table<br>

![image](https://github.com/ColorChan/Basic/blob/master/src/assets/material-table.png?raw=true)
<br>
后台数据返回格式为:<br>

```javascript
object: {
  第1大块双排: [[每一排数据, 2018年11月月中, 12100, 2000 ...]...],
  第2大块smb: [[每一排数据, 2018年11月月中, 12100, 2000 ...]...],
  ...
}
```
<br>
template 写法
<br>

```javascript
  <div v-for="(block,index1) of object" class="每一块">
    <div v-for="(row,index2) of block" class="每一排">
      <div v-for="(item,index3) of row" class="每一个">
        内容
      </div>
    </div>
  </div>
```

<br>
2.在上一级选择完毕之前, 下一级不知道要渲染成什么元素<br>

![image](https://github.com/ColorChan/Basic/blob/master/src/assets/material-list1.png?raw=true)

![image](https://github.com/ColorChan/Basic/blob/master/src/assets/material-list2.png?raw=true)
<br>
template 写法
<br>

```javascript
  <div class="第1个">
    <select v-model="choose" class="第1个选择器">
      名称
      年龄
      性别
      出生日期
      注册时间区间
    </select>
  </div>
  <div class="第2个">
    <input v-if="choose.type===名称" type="text"></input>
    <input v-if="choose.type===年龄" type="num"></input>
    <select v-if="choose.type===性别"></select>
    <calendar v-if="choose.type===出生日期"></calendar>
    <calendar v-if="choose.type===注册时间区间" v-model="注册时间区间第1个选择结果"></calendar>
    <calendar v-if="choose.type===注册时间区间" v-model="注册时间区间第2个选择结果"></calendar>
  </div>
  <div class="第3个">
    (...累死算了)
  </div>
```

<br>
解决方法:<br>
应对第1种场景:
<br>

```javascript
tableBodyFactory () {
    let bolckList = []
    for (let content in tableData.body) {
      let style = { height: '', color: '' }
      bolckList.push(
        <div class="block">
          <div style={style}>{content}</div>
          {tableRowFactory(content)}
        </div>
      )
    }
    return bolckList
  },
  tableRowFactory (content) {
    let list = content.map((item) => {
      return <ul>{tableItemFactory(item)}</ul>
    })
    return <div class="table-row-wrapper">{list}</div>
  },
  tableItemFactory (arr) {
    let list = arr.map((item) => {
      return <li>{item}</li>
    })
    return list
  }
```

<br>
应对第2种场景:<br>

```javascript
  let ele = null
  switch (choose.type) {
    case '名称': 
      ele = <input type="text"></input>
    break
    case '年龄': 
      ele = <input type="num"></input>
    break
    case '性别': 
      ele = <select type="性别"></select>
    break
    case '出生日期': 
      ele = <calendar></calendar>
    break
    case '注册时间区间': 
      ele = (
        <calendar>第一个</calendar>
        <calendar>第二个</calendar>
      )
    break
  }
  return ele

```
<br>
<br><br>
[backToCatalog](#catalog)



<br><br><br><br>
<br><br><br><br>


<i id="MarkdownEditing"></i>
##  MarkdownEditing Key Bingding(Windows/Linux)
CtrlWinV &nbsp;&nbsp; 创建或粘贴剪贴板的内容作为所选文本的内联链接。 <br>
CtrlWinR &nbsp;&nbsp; 创建或粘贴剪贴板的内容作为参考链接。 <br>
ShiftWinK &nbsp;&nbsp; 创建或粘贴剪贴板的内容作为所选文本的内联图像。 <br>
AltB AltI &nbsp;&nbsp; 这些必须是粗体和斜体。他们都有和没有选择。如果没有选择，它们将只是转换光标下的单词。如果这些键绑定已经是粗体/斜体，那么这些键绑定将取消/单位制选择。 <br>
Ctrl1...6 &nbsp;&nbsp; 这些将为标题添加相应数量的哈希标记。与上述标题工具一起工作在空白行和选定的文本。如果您选择整个现有的标题，当前的哈希标记将被删除，并替换为您请求的标题级别。 <br>
AltShift6 &nbsp;&nbsp; 插入脚注 <br>
ShiftTab &nbsp;&nbsp; 折叠/展开当前部分。 <br>
CtrlShiftTab &nbsp;&nbsp; 折叠一定级别标题下的所有部分。 <br>
CtrlAltShiftPageUp CtrlAltShiftPageDown &nbsp;&nbsp; 转到相同或更高级别的上一个/下一个标题 <br>
CtrlShiftPageUp CtrlShiftPageDown &nbsp;&nbsp; 转到上一个/下一个标题 <br>

<br><br><br>
[backToCatalog](#catalog)
