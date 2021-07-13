# Uniapp-字节小程序环境下组件间传参问题的分析与研讨

### 1.时效性
~~该文档及其相关截图编写于2021.07.10 - 07.17，在未来uniapp及小程序更新中可能会出现差异~~

### 2.Keywords
uniapp<br>
Vue<br>
created: 将在实例创建完成后被立即调用。挂载阶段还没开始，$el不可用<br>
computed: 计算属性将被混入到Vue实例中, 挂在当前组件this下<br>
this: 指向当前Vue实例<br>
$parent: 指向父实例。通俗讲就是父组件的this<br>
provide/inject: 祖先组件向其所有子孙后代注入依赖，在其所有子孙实例中均可用<br>
微信小程序: 以下简称wx<br>
支付宝小程序: 以下简称ali<br>
字节小程序: 以下简称tt<br>


### 3.引言
uni-tt控制台报错<br>
页面显示正常，功能无法使用<br>
tt小程序与wx/ali差异<br>

### 4.TimeLine

(1). 发现问题<br>
(2). 寻找原因<br>
(3). 分析问题<br>
(4). 时下应用<br>
(5). 延展讨论<br>


### 5.Text

#### 5.1 发现问题
tt适配时，现有代码在通过uni编译为wx/ali均为正常，但通过tt时，tt控制台报类型错误，页面加载失败
![this-img1.png](https://github.com/ColorChan/Basic/blob/master/seminar/source/this-img1.png)

#### 5.2 寻找原因

我们找到位置，是这样一段父子组件通信代码，。
``` js
// /components/sg-product-attr-modal/components/attr-num/attr-num.vue
computed: {
  currentAttribute () {
    return this.$parent.currentAttribute
  }
}
```

初步发现直接原因是this返回了对象，this.$parent = undefined


#### 5.3 分析问题

我们先给currentAttribute加入断点，分析问题
``` js
// /components/sg-product-attr-modal/components/attr-num/attr-num.vue
computed: {
  currentAttribute () {
    debugger
    return this.$parent.currentAttribute
  }
}
```

![this-img2.png](https://github.com/ColorChan/Basic/blob/master/seminar/source/this-img2.png)

通过断点可以看出来，在computed运行的时候，本组件this加载成功，$parent: undefined

同时，我们对比wx/ali端的控制台，此时都是正常的
![this-img3.png](https://github.com/ColorChan/Basic/blob/master/seminar/source/this-img3.png)
![this-img4.png](https://github.com/ColorChan/Basic/blob/master/seminar/source/this-img4.png)

这样，我们分析原因，推测应该是因为tt的自定义组件跟wx自定义组件的生命周期执行机制有区别，没有及时设置组件关系。

我们从生命周期入手，在uni代码中加入以下两个周期(注意是vue生命周期，非tt原生生命周期)
```js
beforeCreate () {
  console.log('beforeCreate', this, this.$parent)
},
created () {
  console.log('created', this, this.$parent)
}
```
然后查看tt log，

![this-img5.png](https://github.com/ColorChan/Basic/blob/master/seminar/source/this-img5.png)

beforeCreate中this.$parent是undefined，在created中，两者皆存在。
所以根据tt存在的两个特异性：
- computed运行于beforeCreate，希望滞后
- created中可以使用$parent


#### 5.4 时下应用
我们初版解决方案的蓝图就出来了:
```js
data () {
  return {
    isCreated: false
  }
},
created () {
  this.isCreated = true
},
computed: {
  currentAttribute () {
    // #ifndef MP-TOUTIAO
    return this.$parent.currentAttribute
    // #ifdef MP-TOUTIAO
    return this.isCreated ? this.$parent.currentAttribute : null
  }
}
```

``` text
  <component :props={obj}></component>

  data: {
    obj: {
      // props集合
    }
  }
```

以上就是如何在tt中根据生命周期，正确使用$parent的方式，。
<!-- 那么为什么会出现这种情况呢，我们如何对uni以及tt的生命周期知根知底呢，。 -->

#### 5.5 延展讨论

从源码中可以看到，在initLifecycle中将options中的$parent这点wx与tt是相同的，

![this-img7.png](https://github.com/ColorChan/Basic/blob/master/seminar/source/this-img7.png)

但是转折点在于，在wx中，子组件进行initLifecycle时是可以正确设立父子关系的，
而tt进行initLifecycle时，父子关系并没有建立。

![this-img6.png](https://github.com/ColorChan/Basic/blob/master/seminar/source/this-img6.png)
![this-img8.png](https://github.com/ColorChan/Basic/blob/master/seminar/source/this-img8.png)

tt将父子关系设立放置在了tt原生的attached生命周期，vendor.js:2142:parseComponent<br>
![this-img10.png](https://github.com/ColorChan/Basic/blob/master/seminar/source/this-img10.png)

tt官方文档关于created和attached生命周期的解释：<br>
![this-img9.png](https://github.com/ColorChan/Basic/blob/master/seminar/source/this-img9.png)

uni经过这样一番操作使得在tt环境中，$parent与自定义的provide/inject需要在tt原生的attached生命周期后，才可以被正常使用

**uniapp虽然使用Vue语法，利用vue-runtime模仿了大部分功能，但最后落地效果仍会受各端mp较大影响，建议开发中父子组件传值多使用更通俗的props等通用方法，尽量避开Vue高级用法及技巧，注意各端特性，保证各平台运行的稳定性。**


### 6.总结

简单总结:
- uni-tt环境，父子组件传参尽量使用props
- 如需使用$parent与provide/inject的情景，在created的异步回调中使用即可


<br><br><br><br><br>

### 7.感谢

**分享结束，感谢聆听**
