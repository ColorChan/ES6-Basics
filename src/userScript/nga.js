// ==UserScript==
// @name         Game
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://bbs.nga.cn/*
// @match        *://nga.178.com/*
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

const ngaHandler = () => {
  const hiddenList = [
    ...document.querySelectorAll('a.small_colored_text_btn'),
    ...document.querySelectorAll('span.tac img'),
    ...document.querySelectorAll('td.null'),
    ...document.querySelectorAll('tr.topicrow a.replies img'),
    document.querySelector('#footer'),
    document.querySelector('#mainmenu'),
    document.querySelector('#custombg'),
    document.querySelector('#alertc0'),
    document.querySelector('#sub_forums'),
    document.querySelector('.collapse_btn'),
  ]
  makeHidden(hiddenList)

  const nav_root = document.querySelectorAll('.nav_root')
  const nav_link = document.querySelectorAll('.nav_link')
  const posterInfoLine = document.querySelectorAll('.posterInfoLine')
  const c2 = document.querySelectorAll('.c2')
  const contentBlock = document.querySelectorAll('.contentBlock')
  const block_txt_c0 = document.querySelectorAll('.block_txt_c0')
  const block_txt =document.querySelectorAll('b.block_txt')
  const quote = document.querySelectorAll('div.quote')
  const pagebtop =  document.querySelectorAll('.stdbtn td a')
  const comment_c_0 = document.querySelectorAll('.comment_c_0 tr td')
  const cLine = [
    ...document.querySelectorAll('td.c1'),
    ...document.querySelectorAll('td.c3'),
    ...document.querySelectorAll('td.c4')
  ]
  const color = [
    ...document.querySelectorAll('.red'),
    ...document.querySelectorAll('.teal'),
    ...document.querySelectorAll('.blue'),
    ...document.querySelectorAll('.orangered'),
    ...document.querySelectorAll('.orange'),
    ...document.querySelectorAll('.purple'),
    ...document.querySelectorAll('.darkred'),
    ...document.querySelectorAll('.royalblue'),
  ]

  const changeColorList = [
    document.body,
    ...nav_root,
    ...nav_link,
    ...posterInfoLine,
    ...c2,
    ...contentBlock,
    ...block_txt_c0,
    ...block_txt,
    ...quote,
    ...pagebtop,
    ...comment_c_0,
    ...cLine,
    ...color
  ]
  changeBackgroundFrontColor(changeColorList)

  const block_txt_c2 = document.querySelectorAll('.block_txt_c2')
  for (const item of block_txt_c2) {
    Object.assign(item.style, { background: 'rgba(57,57,57,.1)' })
  }

  const emoji = [...document.querySelectorAll('img.smile_a2'), ...document.querySelectorAll('img.smile_ac')]
  for (const item of emoji) {
    Object.assign(item.style, { width: '30px' })
  }

  const graynobr = document.querySelectorAll('span.gray.nobr')
  for (const item of graynobr) {
    if (item.innerHTML.includes('望') || item.innerHTML.includes('级别') || item.innerHTML.includes('徽章')) {
      
    }
  }

  const replies = document.querySelectorAll('td.c1 a.replies')
  for (const item of replies) {
    Object.assign(item.style, { 'font-size': '1.2em', color: '#333', 'font-family': 'Arial' })
  }

  const allA = document.querySelectorAll('a')
  for (const a of allA) {
    if (a.href.includes('game.stargame.com')) {
      makeHidden(a)
    }
  }

}

(function() {
  'use strict';

  const host = window.location.host
  console.log('current host: ', host)
  if (['bbs.nga.cn', 'nga.178.com'].includes(host)) {
    ngaHandler()
  }
  
})();