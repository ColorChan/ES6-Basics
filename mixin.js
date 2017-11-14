/**
 * Created by Administrator on 2017/10/27
 */
//            compute text length (ch-zn+2，en-us+1); return number
export function computeWordsLength(content) {
    let count = 0;
    for (let index in content) {
        if ((content.charCodeAt(index) >= 0) && (content.charCodeAt(index) <= 255)) {
            count ++
        } else {
            count += 2
        }
    }
    return count
}

// slice text by length (ch-zn+2，en-us+1); return text; 第二个参数number表示截取并返回字符串前几位; 第三个参数boolean，表示是否后加省略号
export function sliceWords(content, slice, ellipsis) {
    let count = 0;
    let newStr = ''
    for (let index in content) {
        if(computeWordsLength(newStr) < slice) {
            newStr += content[index]
        }
    }
    if ((newStr !== content) && ellipsis) {
        newStr += '...'
    }
    return newStr
}

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