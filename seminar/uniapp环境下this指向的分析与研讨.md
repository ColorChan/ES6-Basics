# uniapp环境下this指向的分析与研讨

### 1.时效性
<del>该文档及其相关截图编写于2021.07.10 - 07.17，在未来uniapp及小程序更新中可能会出现差异</del>

### 2.Keywords
uniapp
Vue
created: 将在实例创建完成后被立即调用。挂载阶段还没开始，$el不可用。
computed: 计算属性将被混入到Vue实例中, 挂在当前组件this下。
this: 指向当前Vue实例
$parent: 指向父实例。通俗讲就是父组件的this
微信小程序: 以下简称wx
支付宝小程序: 以下简称ali
字节小程序: 以下简称tt


### 引言
编译为tt版本为何控制台屡屡报错？
为何页面显示正常，功能却无法使用？
tt小程序究竟与wx/ali存在多少鸿沟？



### 3.TimeLine

(1). 发现问题
(2). 寻找原因
<!-- 捕捉线索，问题直接原因逐渐浮出水面 -->
(3). 分析问题
<!-- 顺藤摸瓜，分析表层下的潜在问题，如何用最快的方式优先解决问题 -->
(4). 时下应用
<!-- 深度反思， -->
(5). 延展讨论
(6). 感谢倾听


### 4.Text

#### 4.1 发现问题
起步tt适配时，现有代码在通过uni编译为wx/ali均为正常，但通过tt时，tt控制台报类型错误，页面加载失败
![this-img1.png](https://github.com/ColorChan/Basic/blob/master/seminar/source/this-img1.png)

#### 4.2 寻找原因

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


#### 4.3 分析问题

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

这样，我们分析原因，推测应该是因为tt的自定义组件跟wx自定义组件的生命周期执行机制有区别，。

我们从生命周期入手，在uni代码中加入以下两个周期
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
我们发现，于H5版Vue不同的是，tt在beforeCreate中是有this的，。
beforeCreate中this.$parent是undefined，在created中，两者皆存在。
所以根据tt存在的两个特异性：
- computed运行早于或等于beforeCreate，希望滞后
- created中可以使用$parent


#### 4.4 时下应用
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

uniapp虽然使用Vue语法，但最后落地效果仍会受各端mp较大影响，为保证多端兼容，建议开发中父子组件传值多使用更通俗的props等通用方法，尽量避开Vue技巧。
``` text
  <component :props={obj}></component>
```

以上就是如何在tt中使用$parent的方式，。
<!-- 那么为什么会出现这种情况呢，我们如何对uni以及tt的生命周期知根知底呢，。 -->

#### 4.5 延展讨论


![this-img6.png](https://github.com/ColorChan/Basic/blob/master/seminar/source/this-img6.png)



