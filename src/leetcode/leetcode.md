# leetcode

<br><br><br><br>

<i id="catalog"></i>

## Page Catalog
1. &nbsp; [第k个排列 permutation-sequence](#permutation-sequence)
2. &nbsp; [朋友圈 friend-circles](#friend-circles)
3. &nbsp; [三数之和 3sum](#3sum)
4. &nbsp; [字母异位词分组 group-anagrams](#group-anagrams)
5. &nbsp; [无重复字符的最长子串 longest-substring-without-repeating-characters](#longest-substring-without-repeating-characters)
6. &nbsp; [最长回文子串 longest-palindromic-substring](#longest-palindromic-substring)
7. &nbsp; [递增的三元子序列 increasing-triplet-subsequence](#increasing-triplet-subsequence)
8. &nbsp; [奇偶链表 odd-even-linked-list](#odd-even-linked-list)

<br><br><br><br>


<i id="permutation-sequence"></i>

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

[backToCatalog](#catalog)


<i id="friend-circles"></i>

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

[backToCatalog](#catalog)


<i id="3sum"></i>

## 15.三数之和 3sum(middle)
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？
请你找出所有满足条件且不重复的三元组。

例: 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
满足要求的三元组集合为：
[[-1, 0, 1], [-1, -1, 2]]

思路:
1. 把nums排序后数组命名为sort，从sort的index @size(1, length - 2) 之间依次选出一个index;
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

[backToCatalog](#catalog)


<i id="group-anagrams"></i>

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

[backToCatalog](#catalog)


<i id="longest-substring-without-repeating-characters"></i>

## 3.无重复字符的最长子串 longest-substring-without-repeating-characters(middle)
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例:

输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

思路:
1. 把字符串s分割成数组strArr，然后设立滑动窗口ans = [i, j) = [0, i + 1]，并将strArr[i]其存储于hashSet;
2. 向右侧滑动索引j(即j++)，如果strArr[j]不在hashSet中, 把strArr[j]存入hashSet；
3. 重复2操作， 直到strArr[j]已经存在于hashSet中，此时hashSet的size即为当前i开始的最长无重复字符子串的长度，把size传入数组resMap做记载，然后清空hashSet；
4. 接3，清空hashSet后，模仿步骤1，设立滑动窗口ans = [i, j) = [i++, i + 1]，并将strArr[i]其存储于hashSet，继续开始步骤2;
5. 直到滑动窗口i，j都到达了数组strArr的尾部，即字符串搜索完毕。resMap为字符串s中所有最长无重复字符子串的长度的集合，返回max(resMap)即可；

``` javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  if (!s) { return 0 }
  let strArr = s.split('')
  let ans = [0, 1]
  let hashSet = new Set([strArr[0]])
  let resMap = []

  while (ans[0] < strArr.length && ans[1] < strArr.length) {
    if (hashSet.has(strArr[ans[1]])) {
      ans[0] ++
      ans[1] = ans[0] + 1
      resMap.push(hashSet.size)
      hashSet.clear()
      hashSet.add(strArr[ans[0]])
    } else {
      hashSet.add(strArr[ans[1]])
      ans[1] ++
    }
  }
  resMap.push(hashSet.size)
 
  return Math.max(...resMap)
};

```

[backToCatalog](#catalog)


<i id="longest-palindromic-substring"></i>

## 5.最长回文子串 longest-palindromic-substring(middle)
给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1：
输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。

思路:<br>
双指针中心扩散 + 动态规划（优化） 
1. longestLength: 目前已发现的最长的回文子串的长度；<br>
   longestStart: 目前已发现的最长的回文子串的开始index；<br>
   longestEnd: 目前已发现的最长的回文子串的结束index；<br>
   dp: 动态规划空间，二维数组，注意不能含有引用传递
2. 设立双指针，使其最近时为相邻关系，最远时距离为s.length<br>
    l: 左指针，@value[0, r]<br>
    r: 右指针，@value[1, s.length]<br>
   然后循环遍历，如果发现s[l] === s[r]，则进行判断：<br>
    (1) r - 1 <= l + 1 ： l，r相邻（<）或仅相隔1个元素（=）时，该条件成立；<br>
    (2) dp[l + 1][r - 1] ： l，r内部是个回文串时，该条件成立；<br>
   若两者至少有一个成立，则认为s[l, r]是一个回文串，在dp中将其标记为true。
3. 接2，如果当前s[l, r]的长度超过了目前已发现的最长的回文子串的长度(longestLength)，则替换掉原先的longestLength，longestStart，longestEnd； 
4. 最后返回s.substring(longestStart, longestEnd + 1)即可； 

``` javascript
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  if (!s || s.length < 2) { return s }
  let longestStart = 0
  let longestEnd = 0
  let longestLength = 1

  let dp = JSON.parse(JSON.stringify(new Array(s.length).fill(new Array(s.length).fill(false))))
  
  for (let r = 1; r < s.length; r++) {
    for (let l = 0; l < r; l++) {
      if ((s[l] === s[r]) && ((r - 1 <= l + 1) || dp[l + 1][r - 1])) {
        dp[l][r] = true
        if (r - l + 1 > longestLength) {
          longestLength = r - l + 1
          longestStart = l
          longestEnd = r
        }
      }
    }
  }
  return s.substring(longestStart, longestEnd + 1)
}
```

[backToCatalog](#catalog)




<i id="increasing-triplet-subsequence"></i>

## 334.递增的三元子序列 increasing-triplet-subsequence(middle)
给定一个未排序的数组，判断这个数组中是否存在长度为 3 的递增子序列。
数学表达式如下:

如果存在这样的 i, j, k,  且满足 0 ≤ i < j < k ≤ n-1，
使得 arr[i] < arr[j] < arr[k] ，返回 true ; 否则返回 false 。
说明: 要求算法的时间复杂度为 O(n)，空间复杂度为 O(1) 。

示例 1:
输入: [1,2,3,4,5]
输出: true

思路:<br>
双指针small，middle，只需要找出存在值big，使得 small < middle < big 即可。3个值不必是连续的，任意找到1处成立即可返回true。 
1. 设立双指针 
    small: 目前已发现最小值，初始值为最大整数； 
    middle: 目前已发现最中间值，初始值为最大整数； 
2. for (item of nums):<br>
   (1) item <= small => small = item;<br>
   (2) small < item < middle => middle = item : 尽可能在保持small < middle情况下减小middle，以便更好的匹配big;<br>
   (3) item > middle : 此处item即为big，即存在small < middle < big，返回true;<br>
3. nums遍历结束也未发现2-(3)中的情况，即不存在small < middle < big，返回false; 


``` javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function(nums) {
  if (nums.length < 3) { return false }
  let small = Number.MAX_SAFE_INTEGER
  let middle = Number.MAX_SAFE_INTEGER
  for (const item of nums) {
    if (item <= small) {
      small = item
    } else if (item > small && item <= middle) {
      middle = item
    } else if(item > middle) {
      return true
    }
  }
  return false
}
```

[backToCatalog](#catalog)


<i id="odd-even-linked-list"></i>

## 328.奇偶链表 odd-even-linked-list(middle)
给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。

请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数。

示例 1:

输入: 1->2->3->4->5->NULL
输出: 1->3->5->2->4->NULL

思路:<br>
题目理解：把链表第1,3,5...2n+1位(即index+1位)元素连起来作为奇数链表，然后把链表第2,4,6...2n位连载奇数链表后面。<br>
设立三指针<br>
  even(= head.next): 偶数位的头指针(即第二位元素位置的指针)，仅做记录位置用，不进行操作； <br>
  pointOdd(= head): 当前奇数元素指针，初始值为head(即头元素位置)，随着循环每次往下行动2步(即指向下一个奇数位)； <br>
  pointEven(= head.next): 当前偶数元素指针，初始值为head.next，随着循环每次往下行动2步(即指向下一个偶数位)； <br>


``` javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
  if (head === null) { return null }
  const even = head.next
  let pointOdd = head
  let pointEven = even
  while (pointOdd.next !== null && pointEven !== null && pointEven.next !== null) {
    pointOdd.next = pointOdd.next.next
    pointEven.next = pointEven.next.next
    pointOdd = pointOdd.next
    pointEven = pointEven.next
  }
  pointOdd.next = even
  return head
}
```

[backToCatalog](#catalog)
