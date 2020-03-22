# Vue Explore
Vue Explore For Interview<br>

## 计算属性 与 方法methods
1.可以通过在表达式中调用methods, computed来达到同样的效果<br>
但是computed基于它们的响应式依赖(data | other computed)进行缓存的。只在相关响应式依赖(data | other computed)发生改变时它们才会重新求值。<br>
这就意味着只要 响应式依赖(data | other computed) 还没有发生改变，多次访问 computed 会立即返回之前的计算结果，而不必再次执行函数。<br>
这也同样意味着下面的计算属性将不再更新，因为 Date.now() 不是响应式依赖：<br><br>

``` javascript
new Vue({
  computed: {
    now: function () {
      return Date.now()
    }
  }
})
```
<br><br>

## 计算属性computed 的 setter
计算属性默认只有 getter, setter需要必须提供<br><br>

``` javascript
new Vue({
  updated () {},
  computed: {
    fullName: {
      get () {
        return this.firstName + ' ' + this.lastName
      },
      /**
        * function set
        * @param [newValue: any]
        * @return newValue: any
       */
      set (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  }
})

```
<br>
当执行fullName = 'xxx'时，启动setter, 相应的函数被执行, firstName, lastName被修改 - 并触发updated<br>
若template中存在fullName的引用，也会调用getter，执行顺序：getter -> setter (-> setter return) -> getter -> updated<br>
若template中不存在fullName的引用, 不调用getter:<br>
1.setter中修改了template中引用的响应式依赖，执行顺序：setter (-> setter return) -> updated<br>
2.setter中未修改template中引用的响应式依赖，执行顺序：setter (-> setter return)<br>
<br>

<br><br>

## v-for
v-for可以遍历对象<br>
语法: v-for="(value[, key, index]) of object"

<br><br>

## 数组更新
以下array api被vue劫持, 调用时将会触发视图更新: <br>
push(), pop(), shift(), unshift(), splice(), sort(), reverse()<br>

<br><br>

## 替换数组
Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。<br>
push(), pop(), shift(), unshift(), splice(), sort(), reverse()<br>

<br>

## 事件修饰符
.stop<br>
.prevent<br>
.capture<br>
.self<br>
.once<br>
.passive(提升移动端的性能)<br>

<br>

## 按键修饰符
.enter<br>
.[key]<br>
key为任意kebab-case有效按键名, 为keyCode值亦可<br>

<br>

## 系统修饰键
.ctrl<br>
.alt<br>
.shift<br>
.meta<br>

<br>

## .exact 修饰符
没有任何系统修饰符被按下的时候才触发:<br>
@click.exact="onClick"<br>
有且只有 Ctrl 被按下的时候才触发:<br>
@click.ctrl.exact="onCtrlClick"<br>

<br>

** 修饰符可以串联, 但注意顺序 **<br>

<br><br>

## v-model
使用输入法 (如中文、日文、韩文等) 的语言，v-model不会在输入法组合文字过程中得到更新, 但@input会。<br>

<br><br>

## props单向数据流
1.直接改变array/object类型的prop, 会改变this.array/this.object的指针，不会改变原array/object，即不会影响父组件，不会影响其他引用此array/object的位置, 此时控制台会爆出vue-warn警告。<br>
例：<br>

``` javascript
props: ['object']
this.object = { /* ... */ }
```
此时父组件object不变，子组件中this.object指针改变为新值, 控制台会警告。<br>
2.改变array/object类型的prop中某一项/多项属性，会改变原array/object，会影响父组件及其他引用此array/object的位置, 控制台不会vue-warn警告。<br>
例：<br>

``` javascript
props: ['object']
this.object.xxx = 1
```
此时父组件object变化，子组件中this.object指针不变, 控制台不会警告。<br>

<br><br>

## Attribute
Attribute: 向一个子组件传入信息, 但是该子组件并没有相应prop定义, 这些attribute会被添加到这个组件的根元素上。<br>
父组件的attribute会被子组件内部继承(覆盖子组件的顶级attribute), 除了class和style, 这俩会子父合并。可使用inheritAttrs: false关闭继承，该设置不会影响class和style。<br>
<br><br>

## async components
``` javascript
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

# Vue Router

## HTML5 History 模式

你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html;<br>
利用 history.pushState API 完成URL改变而无须重新加载页面;<br>
``` javascript
history.pushState({ /* state */ }, title: string, URL: string)
history.replaceState({ /* state */ }, title: string, URL: string)

```
1. pushState()不会触发hashchange event，即使新的URL与旧的URL仅哈希不同;<br>
2. pushState会在浏览器中创建一条新的历史纪录, replaceState为替换将当前地址为指定URL。所以pushState可以执行history.back()或history.forward()并触发 window.onpopstate事件;<br>
3. state对象： 可以存存放一些数据表示当前状态。当浏览器执行back/forward触发onpopstate event, 可通过event.state获取。state中的属性值不能为引用类型对象;<br>

<br><br>




