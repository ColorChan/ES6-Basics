/**
 * Created by Administrator on 2017/10/27
 */

//  compute content length, chinese = 2, english = 1

export function computeWordsLength(content, slice) {
    let count = 0;
    if (slice > 0) {
        let newStr = ''
        for (let index in content) {
            if ((content.charCodeAt(index) >= 0) && (content.charCodeAt(index) <= 255)) {
                count ++
            } else {
                count += 2
            }
            if (count <= slice) {
                newStr += content[index]
            }
        }
        return newStr

    } else {
        for (let index in content) {
            if ((content.charCodeAt(index) >= 0) && (content.charCodeAt(index) <= 255)) {
                count ++
            } else {
                count += 2
            }
        }
        return count
    }
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