// import parseTime, formatTime and set to filter

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['???', '???', '???', '???', '???', '???', '???'][value - 1]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '??????'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '?????????'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '?????????'
  } else if (diff < 3600 * 24 * 2) {
    return '1??????'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '???' +
      d.getDate() +
      '???' +
      d.getHours() +
      '???' +
      d.getMinutes() +
      '???'
    )
  }
}
export function getNowFormatDate() {
  var date = new Date()
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
}
/* ?????? ????????? */
export function nFormatter(num, digits) {
  const si = [{
    value: 1e18,
    symbol: 'E'
  },
  {
    value: 1e15,
    symbol: 'P'
  },
  {
    value: 1e12,
    symbol: 'T'
  },
  {
    value: 1e9,
    symbol: 'G'
  },
  {
    value: 1e6,
    symbol: 'M'
  },
  {
    value: 1e3,
    symbol: 'k'
  }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value + 0.1)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      )
    }
  }
  return num.toString()
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function toThousandslsFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
// ???????????????
export function checkPhone(rule, value, callback) {
  if (!value) {
    return callback(new Error('?????????????????????'))
  } else {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('???????????????????????????'))
    }
  }
}
export function checkPassword(rule, value, callback) {
  if (!value) {
    return callback(new Error('??????????????????'))
  } else if (value.length < 6) {
    callback(new Error('??????????????? 6 ???????????????????????????????????????????????????'))
  } else {
    callback()
  }
}
// ??????????????????
export function checkTel(value, callback) {
  var reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(value)
}
// ???????????????
export function checkiDNumber(value, callback) {
  var reg = /\d{17}[\d|x]|\d{15}/
  return reg.test(value)
}
// ???????????????
export function checkEmails(value, callback) {
  var reg = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
  return reg.test(value)
}
// ????????????
export function checkEmail(rule, value, callback) {
  if (!value) {
    return callback(new Error('??????????????????'))
  } else {
    var reg = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('????????????????????????'))
    }
  }
}
// ????????????
export function checkCode(value, callback) {
  var reg = /^[A-Za-z]+$/g
  return reg.test(value)
}
// qq??????
export function checkQq(value, callback) {
  var reg = /^[0-9]+$/g
  return reg.test(value)
}
// ????????????
export function formatBankNo(BankNo, callback) {
  var strBin = '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99'
  return strBin
}
export function getStrleng(str, max) {
  var myLen = 0
  for (var i = 0; i < str.length && myLen <= max * 2; i++) {
    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
      myLen++
    } else myLen += 2
  }
  return myLen
}
// ????????????????????????
export function updatedImg(file, obj, callback, func) {
  if (file.size < 10100000) {
    var fileName = file.name
    var suffix = fileName
      .substring(fileName.lastIndexOf('.') + 1)
      .toUpperCase()
    if (
      suffix === 'PDF' ||
      suffix === 'JPG' ||
      suffix === 'JPEG' ||
      suffix === 'PNG' ||
      suffix === 'GIF'
    ) {
      return true
    } else {
      var tipType = '?????????????????????,???????????????'
      callback(tipType)
      return false
    }
  } else {
    var tipSize = '??????????????????5M,???????????????'
    callback(tipSize)
    return false
  }
}
// ????????????????????????
export function updatedFile(file, obj, callback, func) {
  if (file.size < 10100000) {
    var fileName = file.name
    var suffix = fileName
      .substring(fileName.lastIndexOf('.') + 1)
      .toUpperCase()
    if (
      suffix === 'DOC' ||
      suffix === 'DOCX' ||
      suffix === 'XLS' ||
      suffix === 'XLSX' ||
      suffix === 'PDF' ||
      suffix === 'ZIP' ||
      suffix === 'RAR'
    ) {
      return true
    } else {
      var tipType = '?????????????????????,???????????????'
      callback(tipType)
      return false
    }
  } else {
    var tipSize = '??????????????????5M,???????????????'
    callback(tipSize)
    return false
  }
}
export function importFile(file, obj, callback, func) {
  if (file.size < 10100000) {
    var fileName = file.name
    var suffix = fileName
      .substring(fileName.lastIndexOf('.') + 1)
      .toUpperCase()
    if (
      suffix === 'XLS' ||
      suffix === 'XLSX'
    ) {
      return true
    } else {
      var tipType = '?????????????????????,???????????????'
      callback(tipType)
      return false
    }
  } else {
    var tipSize = '??????????????????10M,???????????????'
    callback(tipSize)
    return false
  }
}
export function minHeight(resfile) {
  return document.body.clientHeight - 180 + 'px'
}

/**
 * ??????????????? yyyy-mm-dd
 * **/
export function formatDate(date, fmt = 'yyyy-MM-dd') {
  if (!(date instanceof Array)) {
    date = new Date(date)
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
export function getBlob(response) {
  const blob = new Blob([response.data], {
    type: 'application/vnd.ms-excel'
  })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  var filename = decodeURI(response.headers.filename)
  // link.download = filename + '.xls'
  link.download = filename
  link.click()
}
// ?????? blob ?????????????????? src
export function imgHandle(obj) {
  return window.URL.createObjectURL(obj)
}
