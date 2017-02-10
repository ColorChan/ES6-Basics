# ES6---Basics
Basics of EcmaScript 6

##  Data Structure and Algorithm / 数据结构与算法
**算法**<br>
<br>
1.Bubble Sort<br>
冒泡排序（Bubble Sort）它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。<br>
<br>
2.Selection Sort<br>
选择排序(Selection Sort)是表现最稳定的排序算法之一，无论什么数据进去都是 O(n²) 的时间复杂度。所以用到它的时候，数据规模越小越好。唯一的好处就是不占用额外的内存空间。<br>
<br>
3.Insertion Sort<br>
插入排序(Insertion Sort)将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列，从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面）。<br>
<br>
4.Shell Sort<br>
希尔排序(Shell Sort)也称递减增量排序算法，是插入排序的一种更高效的改进版本。但希尔排序是非稳定排序算法。基本思想是：先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录“基本有序”时，再对全体记录进行依次直接插入排序。<br>
<br>
5.<br>
归并排序<br>
<br>
6.Quick Sort<br>
快速排序(Quick Sort)（1）在数据集之中，找一个基准点。（2）建立两个数组，分别存储左边和右边的数组。（3）利用递归进行下次比较<br>
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
##   Principle of JSONP
是利用<script>标签没有跨域限制的“漏洞”（历史遗迹啊）来达到与第三方通讯的目的。当需要通讯时，本站脚本创建一个<script>元素，地址指向第三方的API网址，形如： <br>
<script src="http://www.example.net/api?param1=1&param2=2"></script> <br>
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
在三次握手过程中，Server发送SYN-ACK之后，收到Client的ACK之前的TCP连接称为半连接，此时Server处于SYN_RCVD状态，当收到ACK后，Server转入ESTABLISHED状态。<br>
SYN攻击就是Client在短时间内伪造大量不存在的IP地址，并向Server不断地发送SYN包，Server回复确认包，并等待Client的确认，由于源地址是不存在的。因此，Server需要不断重发直至超时，这些伪造的SYN包将长时间占用未连接队列，导致正常的SYN请求因为队列满而被丢弃，从而引起网络堵塞甚至系统瘫痪。<br>
<br>
<br>

























