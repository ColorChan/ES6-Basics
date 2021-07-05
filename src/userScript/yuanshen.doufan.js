// ==UserScript==
// @name         yuanshen.doufan
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://yuanshen.doufan.tv/*
// @icon         https://www.google.com/s2/favicons?domain=nga.cn
// @grant        none
// ==/UserScript==

const changeBackgroundFrontColor = (dom) => {
  let arr = []
  if (dom && dom.length) {
    arr = [...dom]
  } else {
    arr = dom ? [dom] : []
  }
  const newStyle = { background: 'white', color: '#333', border: 'none' }
  for (const item of arr) {
    if (item) {
      Object.assign(item.style, newStyle)
    }
  }
}

const makeHidden = (dom) => {
  let arr = []
  if (dom && dom.length) {
    arr = [...dom]
  } else {
    arr = dom ? [dom] : []
  }
  for (const item of arr) {
    if (item) {
      if (item.style) {
        item && (item.style.display = 'none')
      } else {
        const timer = window.setTimeout(() => {
          makeHidden(item)
          window.clearTimeout(timer)
        }, 2000)
      }
    }
  }
}

const mapHandler = () => {
  // 增加css
  const style = document.createElement('style')
  style.innerText = '.fixed-right-box { transform: scale(.75, .75) !important; left: 70px !important; bottom: 70px !important; }'
  document.head.appendChild(style)

  const hiddenList = [
    document.querySelector('.search-point'),
    document.querySelector('.fixed-right-bottom'),
  ]
  makeHidden(hiddenList)

  const selector = document.querySelector('.fixed-box')
  Object.assign(selector.style, {
    transition: 'all 1s ease 0.1s',
    transform: 'scale(.8, .8)',
    top: '-80px',
    left: '-70px'
  })
  
  const div = document.createElement('div')
  div.className = 'custom-hide'
  div.innerText = '<<< hide <<<'
  div.setAttribute('style', 'height: 100%;width: 60px;background: white;float: right;color: #333;font-size: 16px;line-height: 1.5em;cursor: pointer;')
  let showFlag = false  
  div.onclick = () => {
    if (showFlag) {
      selector.style.transform = 'scale(.8, .8)'
      div.style.transform = 'translateX(0)'
      div.innerText = '<<< hide <<<'
    } else {
      selector.style.transform = 'scale(.8, .8) translateX(-100%)'
      div.style.transform = 'translateX(200%)'
      div.innerText = '>>> show >>>'
    }
    showFlag = !showFlag
  }
  const appName = selector.querySelector('.app-name')
  appName.appendChild(div)
}

(function() {
  'use strict';

  const host = window.location.host
  console.log('current host: ', host)
  if (['yuanshen.doufan.tv'].includes(host)) {
    mapHandler()
  }
  
})();