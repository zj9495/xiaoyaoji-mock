const filter = (url = '', whiteList = [], blackList = []) => {
  let res = true
  whiteList.forEach(item => {
    if (url === item || item.test(url)) {
      res = true
    } else {
      res = false
    }
  })
  blackList.forEach(item => {
    if (url === item || item.test(url)) {
      res = false
    }
  })
  return res
}

module.exports = {
  filter
}