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
    for (let i = 0; i < strArr.length; i++) {
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

export function deleteClass(el, className) {
  if (!hasClass(el, className)) {
      return
  }
  el.className = el.className.replace(className, '')
}

/**
 * get first scrolling outer node
 * @param dom
 */
export function getScrollingBox(dom) {
  const parent = dom.parentNode;
  if (parent === document.body) return parent;
  if (getComputedStyle(dom.parentNode).getPropertyValue("overflow") !== "visible") return parent;
  return getScrollingBox(parent);
}

// 获取input/textarea输入框光标的位置
export default function getCursorPosition(iptDom) {
  let position = 0;
  
  if (iptDom.selectionStart) { // 非IE
      position = iptDom.selectionStart;
  } else { // IE
      try {
          let range = document.selection.createRange();
          range.moveStart('character', -iptDom.value.length);
          position = range.text.length;
      } catch (e) {
          position = 0;
      }
  }
  return position;
}

// 获取div输入框光标的位置
export function getCursortPosition (element) {
  let caretOffset = 0
  let doc = element.ownerDocument || element.document
  let win = doc.defaultView || doc.parentWindow
  let sel = ''
  //谷歌、火狐
  if (typeof win.getSelection !== undefined) {
    sel = win.getSelection()
    if (sel.rangeCount > 0) {
      //选中的区域
      let range = win.getSelection().getRangeAt(0)
      let preCaretRange = range.cloneRange() //克隆一个选中区域
      preCaretRange.selectNodeContents(element) //设置选中区域的节点内容为当前节点
      preCaretRange.setEnd(range.endContainer, range.endOffset)  //重置选中区域的结束位置
      caretOffset = preCaretRange.toString().length
    }
  } else if ((sel = doc.selection) && sel.type !== 'Control') {
    //IE
    let textRange = sel.createRange()
    let preCaretTextRange = doc.body.createTextRange()
    preCaretTextRange.moveToElementText(element)
    preCaretTextRange.setEndPoint('EndToEnd', textRange)
    caretOffset = preCaretTextRange.text.length
  }
  return caretOffset
}