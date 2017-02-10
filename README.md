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