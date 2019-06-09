/*
 * @lc app=leetcode.cn id=60 lang=javascript
 *
 * [60] 第k个排列
 */
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function(n, k) {
    
};

const factorial = (n, total = 1) => {
  if (n === 1) { return total }
  return factorial(n - 1, n * total)
}

