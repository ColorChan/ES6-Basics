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
##   Principle of JSONP / JSONP原理
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
**服务器接收到数据后**<br>
负载均衡
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
完全避免使用AlphaImageLoader的最好方法就是使用PNG8格式来代替，这种格式能在IE中很好地工作。如果你确实需要使用 AlphaImageLoader，请使用下划线_filter又使之对IE7以上版本的用户无效。<br>
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
<br>
<br>

























