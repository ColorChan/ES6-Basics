// string operation methods

// 正则去除emoji表情
export function formatEmoji (str) {
  return str.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/g, '')
}

// 清理字符串中的代码
export function deleteCodeInString (val) {
  // 清理字符串的换行符
  let a = val.replace(/\n/gi, '')
  // 清理html标签
  let b = a.replace(/\<.*?\>/gi, '')
  // 清理html转义字符
  let c = b.replace(/&nbsp;/gi, '').replace(/\&lt;/gi, '').replace(/\&gt;/gi, '')
  // 清理xml-vml
  let d = c.replace(/.\\:.*;}/gi, '')
  let e = d.replace(/<!.*?->/gi, '')
  // 清理无意义字符: ↵
  let f = e.replace(/↵+/gi, '')
  return f
}

//  compute text length (ch-zn+2，en-us+1); return number
export function computeWordsLength(content) {
  let count = 0;
  for (let index in content) {
      if ((content.charCodeAt(index) >= 0) && (content.charCodeAt(index) <= 255)) {
          count++
      } else {
          count += 2
      }
  }
  return count
}

// slice text by length (ch-zn+2，en-us+1); return text; 第二个参数number表示截取并返回字符串前几位; 第三个参数boolean，表示是否后加省略号
export function sliceWords(content, slice, ellipsis) {
  let newStr = ''
  for (let index in content) {
      if (computeWordsLength(newStr) < slice) {
          newStr += content[index]
      }
  }
  if ((newStr !== content) && ellipsis) {
      newStr += '...'
  }
  return newStr
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}
