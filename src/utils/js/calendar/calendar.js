// calendar operation methods

// 日期格式化
export const formatDate = (timestamp) => {
  const time = new Date(timestamp)
  const y = time.getFullYear()
  const m = time.getMonth() + 1
  const d = time.getDate()
  return `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`
}


// 获取当月第一天
export function getFirstDay (year, month) {
  let currentMonth = month - 1
  return new Date(year, currentMonth, 1).getDay()
}
// 获取最后一天的星期
export function getLastDay (year, month) {
  let currentMonth = month - 1
  return new Date(year, currentMonth, getLastDate(year, month)).getDay()
}
// 获取当月最后一天
export function getLastDate (year, month) {
  let currentMonth = month - 1
  let nextMonth = currentMonth + 1
  if (nextMonth > 11) {
    nextMonth = 0
    year++
  }
  let lastDate = new Date(new Date(year, nextMonth, 1).getTime() - 1000 * 60 * 60 * 24).getDate()
  return lastDate
}
// 获取当月 日期数据
export function getDateArray (yearMonth) {
  let year = parseInt(yearMonth.split('-')[0])
  let month = parseInt(yearMonth.split('-')[1])
  let dateArray = []
  let firstDay = getFirstDay(year, month, 1)
  let lastDate = getLastDate(year, month)
  let lastDateDay = getLastDay(year, month)
  let prevLastDate = getLastDate(year, month - 1)
  // 缓存每一行数据
  let newArr = []
  // 获取第一行数据
  for (let i = 1; i <= 7; i++) {
    if (i <= firstDay) {
      newArr.push({
        date: new Date(year, month - 1, i - firstDay).getTime(),
        value: prevLastDate - (firstDay - i),
        enable: false,
        oper: {}
      })
    } else {
      newArr.push({
        date: new Date(year, month - 1, i - firstDay).getTime(),
        value: i - firstDay,
        enable: true,
        oper: {}
      })
    }
  }
  dateArray.push(newArr)
  newArr = []
  let count = 0
  for (let i = (7 - firstDay + 1); i <= lastDate; i++) {
    if (count < 7) {
      newArr.push({
        date: new Date(year, month - 1, i).getTime(),
        value: i,
        enable: true,
        oper: {}
      })
    } else {
      dateArray.push(newArr)
      newArr = []
      newArr.push({
        date: new Date(year, month - 1, i).getTime(),
        value: i,
        enable: true,
        oper: {}
      })
      count = 0
    }
    if (i === lastDate && count === 6) {
      dateArray.push(newArr)
    }
    count++
  }
  // 获取最后一行
  newArr = []
  if (lastDateDay < 6) {
    for (let i = 0; i <= 6; i++) {
      if (i <= lastDateDay) {
        newArr.push({
          date: new Date(year, month - 1, lastDate - (lastDateDay - i)).getTime(),
          value: lastDate - (lastDateDay - i),
          enable: true,
          oper: {}
        })
      } else {
        newArr.push({
          date: new Date(year, month - 1, lastDate - (lastDateDay - i)).getTime(),
          value: i - lastDateDay,
          enable: false,
          oper: {}
        })
      }
    }
    dateArray.push(newArr)
  }
  return dateArray
}