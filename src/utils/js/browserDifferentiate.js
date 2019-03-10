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