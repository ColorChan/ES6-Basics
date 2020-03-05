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



