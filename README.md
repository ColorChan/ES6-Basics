# ES6---Basics
Basics of EcmaScript 6

##  Data Structure and Algorithm / 数据结构与算法
**数据结构**<br>
<br>
1.栈(Stack)<br>
只能在栈顶添加或删除，快，后入先出(LIFO)<br>
``` bash
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
``` bash
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
<br>
<br>
<br>
<br>
<br>
<br>
**算法**<br>
<br>
1.Insertion Sort<br>
插入排序(Insertion Sort)将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列，从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面）。<br>
``` bash
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
``` bash
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
3.<br>
归并排序<br>
<br>
4.Quick Sort<br>
快速排序(Quick Sort)（1）在数据集之中，找一个基准点。（2）建立两个数组，分别存储左边和右边的数组。（3）利用递归进行下次比较<br>
<br>
7.Binary Search<br>
二分查找<br>
``` bash
    let binarySearch = (arr, item, start, end) => {
      var end = end || arr.length - 1
      var start = 1
      var m = Math.floor((start + end) / 2)
      if(item == arr[m]){
        console.log('在数组的第' + (m + 1) + '位')
      }else if(item < arr[m]){
        return binarySearch(arr, item, start, m - 1)
      }else{
        return binarySearch(arr, item, m + 1, end)
      }
      return false
    }
```
<br>
<br>
##   Difference between  Cookie,sessionStorage,localStorage / Cookie,sessionStorage,localStorage的区别
共同点：都是保存在浏览器端，且同源的。<br>
区别：<br>
1.cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。<br>
2.存储大小限制也不同，cookie数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如会话标识。sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。<br>
3.数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。<br>
4.作用域不同，sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localStorage 在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的。<br>
5.Web Storage 支持事件通知机制，可以将数据更新的通知发送给监听者。<br>
6.Web Storage 的 api 接口使用更方便。<br>
<br>
<br>
##   Principle of JSONP / JSONP原理
是利用<code>&lt;script&gt;</code>标签没有跨域限制的“漏洞”来达到与第三方通讯的目的。当需要通讯时，本站脚本创建一个<code>&lt;script&gt;</code>元素，地址指向第三方的API网址，形如： <br>
<code>&lt;script&nbsp;src="http://www.example.net/api?param1=1&param2=2"</code><code>&gt;&lt;/script&gt;</code>
并提供一个回调函数来接收数据（函数名可约定，或通过地址参数传递）。 <br>
第三方产生的响应为json数据的包装（故称之为jsonp，即json padding），形如： <br>
callback({"name":"hax","gender":"Male"}) <br>
这样浏览器会调用callback函数，并传递解析后json对象作为参数。本站脚本可在callback函数里处理所传入的数据。 <br>
<br>
<br>
##   CSS Box Mode / CSS盒子模式
!DOCTYPE声明的都是标准的文档类型，无论使用哪种模式完整定义DOCTYPE，都会触发标准模式，而如果DOCTYPE缺失则在ie6，ie7，ie8下将会触发怪异模式。<br>
当设置为box-sizing:content-box时，将采用标准模式解析计算，也是默认模式；width属性只包含content。<br>
当设置为box-sizing:border-box时，将采用怪异模式解析计算；width属性包含padding和border，且margin: 0 auto在怪异模式无法居中。<br>
<br>
<br>
##   Difference between Get and Post / Get与Post的区别
**原理**<br>
<br>
Http定义了与服务器交互的不同方法，最基本的方法有4种，分别是GET，POST，PUT，DELETE。<br>
URL全称是资源描述符，我们可以这样认为：一个URL地址，它用于描述一个网络上的资源，而HTTP中的GET，POST，PUT，DELETE就对应着对这个资源的查，改，增，删4个操作。<br>
故GET一般用于获取/查询资源信息，而POST一般用于更新资源信息。<br>
<br>
1.GET用于信息获取，而且应该是安全的和幂等的。<br>
(1).所谓安全的意味着该操作用于获取信息而非修改信息，它仅仅是获取资源信息，不会修改，增加数据，不会影响资源的状态。<br>
注意：这里安全的含义仅仅是指是非修改信息。<br>
(2).幂等的意味着对同一URL的多个请求应该返回同样的结果。<br>
<br>
2.POST表示可能修改变服务器上的资源的请求。<br>
<br>
<br>
**实际**<br>
<br>
1.GET请求的数据会附在URL之后（就是把数据放置在HTTP协议头中），以?分割URL和传输数据，参数之间以&相连。如果数据是英文字母/数字，原样发送，如果是空格，转换为+，如果是中文/其他字符，则直接把字符串用BASE64加密。<br>
POST把提交的数据则放置在是HTTP包的包体中。<br>
2."GET方式提交的数据最多只能是1kb，理论上POST没有限制，可传较大量的数据。<br>
3.在ASP中，服务端获取GET请求参数用Request.QueryString，获取POST请求参数用Request.Form。在JSP中，用request.getParameter(\"XXXX\")来获取。在PHP中，可以用$_GET和$_POST分别获取GET和POST中的数据。<br>
4.POST的安全性要比GET的安全性高。<br>
<br>
<br>
##   Javascript Strict Mode / Javascript 严格模式
**进入严格模式:**<br>
"use strict";<br>
(老版本的浏览器会把它当作一行普通字符串，忽略)<br>
<br>
**目的：**<br>
消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;<br>
消除代码运行的一些不安全之处，保证代码运行的安全；<br>
提高编译器效率，增加运行速度；<br>
为未来新版本的Javascript做好铺垫。<br>
<br>
"严格模式"包括IE 10在内的主流浏览器，都已经支持它。<br>
同样的代码，在"严格模式"中，可能会有不一样的运行结果；一些在"正常模式"下可以运行的语句，在"严格模式"下将不能运行。<br>
<br>
<br>
##   What happens when you navigate to a URL / 输入URL 到页面加载完的过程
**从触屏到 CPU**<br>
当手指在这个传感器上触摸时，有些电子会传递到手上，从而导致该区域的电压变化，触摸屏控制器芯片根据这个变化就能计算出所触摸的位置，然后通过总线接口将信号传到 CPU 的引脚上。<br>
CPU实现加法、位移等计算，寄存器加载存储数据。数据处理完传入系统内核，再由系统GUI传到浏览器。<br>
传入浏览器后，浏览器可能会做一些预处理。<br>
<br>
**HTTP 请求**<br>
1.输入URL后回车，浏览器会对URL进行检查。把URL分割成几个部分：协议、网络地址、资源路径。其中网络地址指示该连接网络上哪一台计算机，可以是域名或者IP地址，可以包括端口号；协议是从该计算机获取资源的方式，常见的是HTTP、FTP，不同协议有不同的通讯内容格式；资源路径指示从服务器上获取哪一项资源。另外还会对这个 URL 进行安全检查，然后直接调用浏览器内核中的对应方法。<br>
2.如果地址不是一个IP地址，通过DNS（域名系统）将该地址解析成IP地址(如果没有找到，就一层层向上找，最高可达根节点，找到或者全部找不到为止)。IP地址对应着网络上一台计算机，DNS服务器本身也有IP，你的网络设置包含DNS服务器的IP。<br>
3.如果地址不包含端口号，根据协议的默认端口号确定一个。<br>
4.发起网络连接。<br>
5.根据http协议要求，组织一个请求的数据包，里面包含大量请求信息。<br>
6.服务器响应请求，将数据返回给浏览器(数据资源中存在外链URL或图片地址，每一个都将发起1-6过程再次获取)。如果资源路径指示的资源不存在，服务器就会返回著名的404错误。<br>
7.开始根据资源的类型，将资源组织成屏幕上显示的图像，这个过程叫渲染，网页渲染是浏览器最复杂、最核心的功能。<br>
8.将渲染好的页面图像显示出来，并开始响应用户的操作。<br>
<br>
**TCP连接三握四挥**<br>
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
附注<br>
1.为什么建立连接是三次握手，而关闭连接却是四次挥手呢?<br>
这是因为服务端在LISTEN(侦听状态)状态下，收到建立连接请求的SYN报文后，把ACK和SYN放在一个报文里发送给客户端。<br>
而关闭连接时，当收到对方的FIN报文时，仅仅表示对方不再发送数据了但是还能接收数据，己方也未必全部数据都发送给对方了，可以发送一些数据给对方后，再发送FIN报文给对方来表示同意现在关闭连接，因此，己方ACK和FIN一般都会分开发送。<br>
2.SYN(建立联机)攻击<br>
在二次和三次握手中间，Server发送SYN-ACK之后，收到Client的ACK之前的TCP连接称为半连接，此时Server处于SYN_RCVD状态，当收到ACK后，Server转入ESTABLISHED状态。<br>
SYN攻击就是Client在短时间内伪造大量不存在的IP地址，并向Server不断地发送SYN包，Server回复确认包，并等待Client的确认，由于源地址是不存在的。因此，Server需要不断重发直至超时，这些伪造的SYN包将长时间占用未连接队列，导致正常的SYN请求因为队列满而被丢弃，从而引起网络堵塞甚至系统瘫痪。<br>
<br>
**服务器接收到数据后**<br>
负载均衡
<br>
<br>
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
501 Not Implemented  服务器不支持实现请求所需要的功能。<br>
<br>
<br>
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
<br>
<br>
##   React Virtual DOM / React虚拟DOM
Virtual DOM是一个模拟DOM树的JavaScript对象。React使用Virtual DOM来渲染UI，当组件状态state有更改的时候，React在这个虚拟DOM上实现了一个diff算法，会通过diff寻找到要变更的DOM节点，再把这个修改更新到浏览器实际的DOM节点上(自动调用组件的Render方法)，实际上不是真的渲染整个DOM树。
<br>
<br>
##   SEO
**语义化**<br>
1.标签语义化对搜索引擎友好，良好的结构和语义容易被搜索引擎抓取。<br>
2.善用标题h1-6，特别是h1和h2，可提升排名。同时设置rel=“nofollow”指定 Google 搜索引擎不要跟踪链接(尽管浏览器不会以任何方式使用rel与rev属性，不过搜索引擎可以利用该属性获得更多有关链接的信息)。<br>
3.HTML5中使用Microdata对页面上已经存在的数据提供附加的语义。<br>
<br>
**衡量站点关键词优化**<br>
站点内容关键词的选择、描述、分布、替代。<br>
<br>
**链接**<br>
1.优化文件目录结构和URL。URL应该有语义性，简短易懂。<br>
2.推广<br>
3.锚文本 ：把关键词做一个链接，指向别的网页，这种形式的链接就叫作锚文本。搜索引擎可以根据指向某一个网页的链接的锚文本描述来判断该网页的内容属性。<br>
<br>
**良好的导航和sitemap**<br>
良好的导航，通过sitemap可以帮助网站主了解网站结构，也方便搜索引擎收录整个站点。<br>
<br>
<br>
##  Underlying Javascript / Javascript 底层
**Closure闭包**<br>
在内层的函数捕获了定义在外层函数中的变量，并把内层函数传递到外层函数的作用域之外执行，则外层函数的context不能销毁，就形成了闭包。<br>
把内层函数传递到外层函数的作用域之外有很多方法，最常见的是使用return。<br>
其它的方法还有把内层函数赋值给全局对象的属性，或者设置为某个控件的事件处理程序，甚至使用setTimeout和setInterval都可以。<br>
<br>
**原型、原型链**<br>
原型对象.constructor == 构造函数<br>
构造函数.prototype == 原型对象<br>
<br>
**面向对象**<br>
<br>
**Class**<br>
<br>
**继承**<br>
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
**Arguments对象**<br>
函数内使用，返回函数的实际参数。<br>
arguments.length 返回实参个数（Array）<br>
if(arguments.callee.length == arguments.length ){ ...do something(形参与实参数量相等) }<br>
<br>
**Call,Apply**<br>
作用: 扩充函数作用域，并且对象和方法不需要有任何耦合关系。<br>
<br>
<br>
##   Ajax(Asynchronous JavaScript and XML)
**Ajax原理**<br>
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
1  Open	           Open() 方法已调用，但是 send() 方法未调用。请求还没有被发送。
2  Sent	           Send() 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。
3  Receiving       所有响应头部都已经接收到。响应体开始接收但未完成。
4  Loaded	       HTTP 响应已经完全接收。
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
``` bash
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
<br>
<br>
##  DOM 事件流
**1.冒泡事件流**<br>
当事件在某一DOM元素被触发时，事件将跟随着该节点继承自的各个父节点冒泡穿过整个的DOM节点层次，如果不停止事件的传播，事件将一直通过DOM冒泡直至到达文档根。<br>
在冒泡过程中的任何时候都可以终止事件的冒泡，在遵从W3C标准的浏览器里可以通过调用事件对象上的stopPropagation()方法，在Internet Explorer里可以通过设置事件对象的cancelBubble属性为true。<br>
element.addEventListener(event, function, useCapture)，useCapture为false(默认值)或置空时，事件句柄在冒泡阶段执行。<br>
<br>
2.捕获事件流<br>
事件的处理将从DOM层次的根开始，而不是从触发事件的目标元素开始，事件被从目标元素的所有祖先元素依次往下传递。<br>
element.addEventListener(event, function, useCapture)，useCapture为true时，为捕获型事件。<br>
<br>
3.事件委托<br>
利用冒泡的原理，把事件加到父级上，触发执行效果。使用事件委托技术能让你避免对特定的每个节点添加事件监听器。事件监听器会分析从子元素冒泡上来的事件，找到是哪个子元素的事件。<br>
<br>
<br>


Web APP特点：MVC，后端的Model层很简单，随着产品业务的拓展前端View却变得越来越复杂，这个时候如果还在用纯jQuery去写DOM操作将会变得很不直观，代码也会变的很臃肿进而变的越来越难以维护<br>

React DOM diff 算法 : DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，极大提高网页的性能表现。<br>
react.js 是 React 的核心库，react-dom.js 是提供与 DOM 相关的功能，Browser.js 的作用是将 JSX 语法转为 JavaScript 语法，这一步很消耗时间，实际上线的时候，应该将它放到服务器完成。<br>
JSX 的语法，它允许 HTML 与 JavaScript 的混写<br>
