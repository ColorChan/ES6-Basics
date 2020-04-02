# leetcode
## 60.第k个排列 permutation-sequence(middle)
给出集合 [1,2,3,…,n]，其所有元素共有 n! 种排列。
按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下:  
"123","132","213","231","312","321"  
给定 n 和 k，返回第 k 个排列。  

思路:  
[康托展开(百度百科)](https://baike.baidu.com/item/%E5%BA%B7%E6%89%98%E5%B1%95%E5%BC%80/7968428?fr=aladdin '百度百科')  
官方说法:  
> 康托展开是一个全排列到一个自然数的双射，常用于构建哈希表时的空间压缩。 康托展开的实质是计算当前排列在所有由小到大全排列中的顺序，因此是可逆的。

![公式](https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D280/sign=bffaac6e6081800a6ae58e06813433d6/dcc451da81cb39dbd85f32b7dc160924aa1830b7.jpg)  
其中, a<sub>i</sub>为整数,并且0 <= a<sub>i</sub> < i, 1 <= i <= n。  
X是该元素值在排列中的index。  
a<sub>i</sub>表示原数的第i位在当前未出现的元素中是排在第几个  

既然康托展开是一个双射，那么一定可以通过康托展开值求出原排列，即可以求出n的全排列中第x大排列。

理解:  
3个信息点的知2求1  
1.一个[1-n]的集合  
2.一个处于排列结果中的值  
3.该值所在的位置X(index)  

该题就是知1，3，求2  
``` javascript
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
const  getPermutation = function(n, k) {
  let str = ''
  let arr = []
  for (let i = 1; i <= n; i ++) {
    arr.push(i)
  }
  return division(k - 1, n - 1, arr, str)
}

const factorial = (n, total = 1) => {
  if (n === 1 || n === 0) { return total }
  return factorial(n - 1, n * total)
}
const division = (n1, n2, arr, str) => {
  if (n2 < 0) { return str }
  const factorN2 = factorial(n2)
  const lessCount = Math.floor(n1 / factorN2)
  const surplus = n1 % factorN2
  str += arr.splice(lessCount, 1)
  return division(surplus, n2 - 1, arr, str)
}
```
**getPermutation(): 入口函数**  
传入n将创造一个[1, 2, ... n]的数组，供division()取值使用。  
**factorial(): 求阶乘函数**  
传入number将获得其阶乘值。  
**division(除数, 被除数, 取值数组, 逐渐拼接每一位结果的字符串): 运算函数**  
1.结束条件  
根据康托展开公式, 每一项为:  
a<sub>n</sub> * (n - 1)!, a<sub>n-1</sub> * (n - 2)!, ..., a<sub>1</sub> * 0!  
所以 n2 = 0 时即为0!, 是最后一次运算, 返回已经完成的拼接结果。  
2.参数解析 
n1 / factorN2 得出lessCount与surplus:  
lessCount是该次除法的商， 是str未推算出的剩余(右边)位数中, 数字小于当前数字(n1)的个数。
surplus是该次除法的余数, 供本函数递归进行下一次计算。  
根据lessCount可以从连续数组arr中拿出值，该值既符合lessCount的要求。  
本次计算完成, 传入余数surplus进入递归, 直到满足'1.结束条件'为止。  
    
## 547.朋友圈 friend-circles(middle)
班上有 N 名学生。他们的友谊具有是传递性。如果已知 A 是 B 的朋友，B 是 C 的朋友，那么我们可以认为 A 也是 C 的朋友。所谓的朋友圈，是指所有朋友的集合。   
给定一个 N * N 的矩阵 M，表示班级中学生之间的朋友关系。如果M[i][j] = 1，表示已知第 i 个和 j 个学生互为朋友关系。  
输出所有学生中的已知的朋友圈总数。

思路:  
[并查集(百度百科)](https://baike.baidu.com/item/%E5%B9%B6%E6%9F%A5%E9%9B%86/9388442?fr=aladdin '百度百科')  
官方说法:  
>并查集，在一些有N个元素的集合应用问题中，我们通常是在开始时让每个元素构成一个单元素的集合，然后按一定顺序将属于同一组的元素所在的集合合并，其间要反复查找一个元素在哪个集合中。  
并查集是一种树型的数据结构，用于处理一些不相交集合（Disjoint Sets）的合并及查询问题。常常在使用中以森林来表示。  

该数据结构的主要操作有：  
1.初始化  
2.查找  
3.合并  

理解：  
1.初始化：遍历矩阵M，每人先把自己纳入朋友圈，以自己的index作为该朋友圈的根id。  
2.遍历关系网，相识则合并两个圈子(其中一个圈子的根id会变为另一个圈子的根id)。
3.步骤1，2完成后，根id没有变(还是初始化时的index)的朋友圈即为没有被吞并的朋友圈，其个数即为所求。  

``` javascript
/**
 * @param {number[][]} M
 * @return {number}
 */
let circles = []
var findCircleNum = function(M) {
  circles = []
  for (let index in M) {
     circles[index] = ~~index
  }
  for (let i in M) {
    for (let j in M[i]) {
      M[i][j] && union(i, j,)
    }
  }
  let count = 0
  for (let index in M) {
    (~~index === circles[index]) && count++
  }
  return count
};

const findFather = (id) => {
  while (id !== circles[id]) {
    id = circles[id]
  }
  return id
}

const union = (i, j) => {
  const fi = findFather(i)
  if (fi !== findFather(j)) {
    circles[fi] = ~~j
  }
}
```

**findCircleNum(): 入口函数**  
该函数依次运行理解中的三部曲  
**findFather(id): 寻找根id的函数**  
寻找指定id所在圈子的根id函数
如果该id不是其所在圈的根id(即被吞并过)，说明是其父id，就替换为父id，并迭代上个步骤，再寻找其父id是不是其所在圈的根id。  
**union(i, j): 合并圈子函数** 
如果i和j两个人认识，那么需要合并他俩的圈子，随意选其中一个圈子的根id作为最终圈子的根id。


## 15.三数之和 3sum(middle)
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？
请你找出所有满足条件且不重复的三元组。

例: 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
满足要求的三元组集合为：
[[-1, 0, 1], [-1, -1, 2]]

思路:
1. 从sort的index @size(1, length - 2) 之间依次选出一个index;
2. 设置双指针:
    j @size(0, index - 1) = 0; 
    k @size(index + 1, length - 1) = length - 1; 
3. 设置循环: 
  判断 sum = sort[index] + sort[j] + sort[k] 
    (1). sum > 0:  sort[k]过大 => k - 1; 
    (2). sum = 0:  符合要求, push入res[], j + 1, k - 1; 
    (3). sum < 0:  sort[j]过小 => j + 1; 
  如果碰上相邻相同值, 直接跳过此值(比如sort[j] === sort[j - 1] => j + 1);
4. 返回res[];

``` javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var threeSum = function(nums) {
	let res = []
	if (nums.length < 3) { return res }
	const sort = nums.sort((a, b) => a - b)
  if (sort[0] <= 0 && sort[sort.length] >= 0) {
    for (let i = 0; i < sort.length - 2; i += 1) {
      if (i > 0 && sort[i] === sort[i - 1]) { continue }

      for (let j = i + 1, k = sort.length - 1; j < k; ) {
        let sum = sort[i] + sort[j] + sort[k]
        if (sum === 0) {
          res.push([sort[i], sort[j], sort[k]])
          j += 1
          k -= 1

          while (j < k && sort[j] === sort[j - 1]) { j += 1 }
          while (j < k && sort[k] === sort[k + 1]) { k -= 1 }
        } else if (sum > 0) {
          k -= 1
        }	else {
          j += 1
        }
      }
    }
  }
	return res
}
```





## 49.字母异位词分组 group-anagrams(middle)
给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

示例:

输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
输出:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]

说明：1.所有输入均为小写字母; 2.不考虑答案输出的顺序;

思路:
1. 如果几个单词互为字母异位词, 则它们的字母按Unicode排序后结果一定是相同的；
2. 遍历strs, 将每个单词按Unicode排序后结果作为key，排序前的值作为value，放入sortedMap做记录；
3. 经过2的操作，所有的字母异位词就会被筛选出来，return Object.values(sortedMap)即可；

``` javascript
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  let sortedMap = Object.create(null)
  for (const index in strs) {
    const sortedItem = strs[index].split('').sort((a, b) => {
      return a.charCodeAt(0) - b.charCodeAt(0)
    })
    if (sortedMap[sortedItem]) {
      sortedMap[sortedItem].push(strs[index])
    } else {
      sortedMap[sortedItem] = [strs[index]]
    }
  }
  return Object.values(sortedMap)
};

```



