// common operation methods

export function numToChinese (num) {
  if (typeof num !== 'number') {
    console.log('阿拉伯数字转义中文数字错误，expect Number, but got: ', num)
    return ''
  }
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  let unit = ['', '十', '百', '千', '万']
  let getWan = (temp) => {
    let strArr = temp.toString().split('').reverse();
    let newNum = ''
    for (var i = 0; i < strArr.length; i++) {
      newNum = (i == 0 && strArr[i] == 0 ? '' : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? '' : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum
    }
    return newNum
  }
  num = parseInt(num)
  let overWan = Math.floor(num / 10000)
  let noWan = num % 10000
  if (noWan.toString().length < 4) { noWan = '0' + noWan }
  return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
}

// dom class operations
export function addClass(el, className) {
  if (hasClass(el, className)) {
      return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
