// ==UserScript==
// @name         Jira美化
// @version      0.0.1
// @author       
// @description  
// @match        *://jira.d.shunguang.com/secure/Dashboard.jspa
// @icon         
// @grant        GM_xmlhttpRequest
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_setValue
// @grant        GM_getValue
// @license      GPL-3.0 License
// @run-at       document-end 
// @namespace    https://greasyfork.org/scripts/412212
// ==/UserScript==


/**
 * 
 * 消息类型及数据格式
 * text类型:
 * {
 *  "msgtype": "text",
     "text": {
         "content": "我就是我, @150XXXXXXXX 是不一样的烟火"
     },
     "at": {
         "atMobiles": [
             "150XXXXXXXX"
         ], 
         "isAtAll": false
     }
    }

    link类型
    {
      "msgtype": "link", 
      "link": {
          "text": "这个即将发布的新版本，创始人xx称它为红树林。而在此之前，每当面临重大升级，产品经理们都会取一个应景的代号，这一次，为什么是红树林", 
          "title": "时代的火车向前开", 
          "picUrl": "", 
          "messageUrl": "https://www.dingtalk.com/s"
      }
    }
    
    markdown类型
    {
     "msgtype": "markdown",
     "markdown": {
         "title":"杭州天气",
         "text": "#### 杭州天气 @150XXXXXXXX \n> 9度，西北风1级，空气良89，相对温度73%\n> ![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png)\n> ###### 10点20分发布 [天气](https://www.dingtalk.com) \n"
     },
      "at": {
          "atMobiles": [
              "150XXXXXXXX"
          ],
          "isAtAll": false
      }
    }
 * 
 */

(function() {
  'use strict'

  // 推送方法
  const sendMessage = (data) => {
    if (!data || !data.msgtype) { return }
    const params = {
      method: 'POST',
      url: 'https://oapi.dingtalk.com/robot/send?access_token=0cf96279b12d1d1c6f4e8a4f898174376c8d81d1d10c560fef3346c88dc0d8f0',
      headers: { 'Content-Type': 'application/json;charset=utf-8;' },
      timeout: 10000,
      data: JSON.stringify(data),
      onload: (res) => {
        if (res.readyState === 4) {
          if (JSON.parse(res.response).errmsg === 'ok') {
            // notice： 推送成功
          }
        }
      }
    }
    GM_xmlhttpRequest(params)
  }

  const functionMap = {
    ToMe: {
      method: null,
      loaded: false
    },
    // JiraBranchName: {
    //   method: null,
    //   loaded: false
    // }
  }
  // 查找分配给我的
  const blocks = Array.from(document.querySelectorAll('h3.dashboard-item-title'))
  const toMeBlock = blocks.find((block) => {
    return block.innerText === '分配给我的'
  })
  
  functionMap.ToMe.method = () => {
    if (toMeBlock) {
      const parentNode = toMeBlock.parentNode.parentNode
      const issuerowList = parentNode.querySelectorAll('.issuerow')
      if (issuerowList && issuerowList.length) {

         // 美化
         const parentIssues = parentNode.querySelectorAll('.parentIssue')
         for (const parent of parentIssues) {
           parent.innerHTML += ` ${parent.title}`
           parent.title = ''
         }
         
         toMeBlock.innerText += ` - ${parentNode.querySelector('.results-count a').innerText}`

         parentNode.parentNode.style['z-index'] = 1
         parentNode.parentNode.nextSibling.style.top = Number.parseInt(parentNode.parentNode.nextSibling.style.top) + 30 + 'px'
         parentNode.querySelector('.gadget-inline').style.height = Number.parseInt(parentNode.querySelector('.gadget-inline').style.height) + 30 + 'px'
         

        // 推送
        const issueList = []
        const issueMap = {}

        for (const issue of issuerowList) {
          issueList.push(issue.dataset.issuekey)
          issueMap[issue.dataset.issuekey] = { name: issue.querySelector('td.summary').innerText }
        }
        const storgeIssueList = []
        for (const storgeIssue of GM_getValue('issueList')) {
          storgeIssueList.push(storgeIssue.key)
          !issueMap[storgeIssue.key] && (issueMap[storgeIssue.key] = { name: storgeIssue.name })
        }
        if (storgeIssueList) {
          const sendList = { add: [], reduce: [] }
          for (const key of issueList) {
            if (!storgeIssueList.includes(key)) {
              // 有新增推送
              sendList.add.push(key)
            }
          }
          for (const key of storgeIssueList) {
            if (!issueList.includes(key)) {
              // 有减少推送
              sendList.reduce.push(key)
            }
          }

          let messageContent = ''
          if (sendList.add.length) {
            messageContent += '### New Issue ###\n'
            for (const key of sendList.add) {
              messageContent += `${key} ${issueMap[key].name}：http://jira.d.shunguang.com/browse/${key}\n`
            }
          }
          if (sendList.reduce.length) {
            if (messageContent.length) {
              messageContent += '  \n'
            }
            messageContent += '### Issue Complete ###\n'
            for (const key of sendList.reduce) {
              messageContent += `${key} ${issueMap[key].name}：http://jira.d.shunguang.com/browse/${key}\n`
            }
          }
          if (messageContent) {
            const params = {
              msgtype: 'markdown',
              markdown: {
                title: `JIRA Notice`,
                text: `## JIRA Notice ## \n ${messageContent}`
              }
            }
            sendMessage(params)
          }
        }
        // 推送完更新storgeIssueList
        GM_setValue('issueList', issueList.map((isskey) => { return { key: isskey, name: issueMap[isskey].name || '' } }))
        console.log('update storge: issueList', GM_getValue('issueList'))
        console.log('current storgeList:', GM_listValues())
        

        // 生成分支名
        for (const issue of issuerowList) {
          const td = document.createElement('td')
          td.className = 'branch-name'
          td.innerText = '获取Branch Name'
          td.setAttribute('style', 'border: 1px solid #eeeeee;border-radius: 4px;white-space: nowrap;')
          td.onclick = () => {
            const summary = issue.querySelector('td.summary')
            if (summary.innerHTML.includes('issue-link parentIssue')) {
              td.innerText = `${summary.querySelector('a.parentIssue').dataset.issueKey}-wangyawei`
            } else {
              td.innerText = `${issue.dataset.issuekey}-wangyawei`
            }
          }
          const issue_actions = issue.querySelector('td.issue_actions')
          issue.insertBefore(td, issue_actions)
        }

        // 完成
        functionMap.ToMe.loaded = true
        console.log('ToMe loaded')
      }
    }
  }
  
  const funNameList = Object.keys(functionMap)
  let count = {}
  for (const name of funNameList) {
    count[name] = 0
    const timer = window.setInterval(() => {
      if (functionMap[name].loaded) {
        // 运行成功过
        clearInterval(timer)
      } else {
        if (count[name] < 10) {
          functionMap[name].method()
        } else {
          console.log('run error: try count > 10', name)
        }
      }
    }, 2000)
  }

  // 增加刷新器
  window.setInterval(() => {
    window.location.reload()
  }, 150000)
  
})();