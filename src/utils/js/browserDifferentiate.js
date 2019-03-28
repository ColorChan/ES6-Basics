// export example: {browser: 'safari', version: '11.1', platform: 'mac'}

let navigator = window.navigator

function browser() {
    if (/Firefox/.test(navigator.userAgent)) {
        return 'Firefox'
    }
    if (/QQBrowser/.test(navigator.userAgent)) {
        return 'QQBrowser'
    }

    if (/Apple/.test(navigator.vendor)) {
        return 'Safari'
    }
    if (/Google/.test(navigator.vendor)) {
        return 'Chrome'
    }
}

function version() {
    let reg = ''
    let browserLength = ''
    let versitionPosition =  ''
    if (browser() === 'Safari') {
        reg = RegExp('Version', 'g')
        browserLength = 'Version'.length
        versitionPosition =  navigator.userAgent.search(reg) + browserLength
    } else {
        reg = RegExp(`${browser()}`, 'g')
        browserLength = browser().length
        versitionPosition =  navigator.userAgent.search(reg) + browserLength
    }
    
    let versition = ''
    for(let index in navigator.userAgent) {
        if (index > versitionPosition) {
            versition += navigator.userAgent[index]
            if ((navigator.userAgent[index] === ' ' ||navigator.userAgent[index] === '.') && index > versitionPosition + 4) {
                return versition.slice(0, -1)
            }
           
        }
    }
}

function platform() {
    if (/Win/.test(navigator.platform)) {
        return 'Windows'
    }
    if (/Mac/.test(navigator.platform)) {
        return 'Mac'
    }
}

export default function() {
    return {browser: browser(), version: version(), platform: platform()}
}

// 判断浏览器； 是否是手机端访问
export const browser = {
  versions: (function () {
    const u = navigator.userAgent
    // const app = navigator.appVersion
    // console.log('app=====', app)
    return {
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile*/), // 是否为移动终端 || !!u.match(/AppleWebKit/)
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQ HD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') === -1 // 是否web应用程序，没有头部与底部
    }
  }())
}