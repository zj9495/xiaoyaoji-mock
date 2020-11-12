const axios = require("axios")

const parseDoc = (docs, result = []) => {
  docs.forEach(item => {
    if (item.content) {
      result.push(JSON.parse(item.content))
    }
    if (item.children && item.children.length) {
      parseDoc(item.children, result)
    }
  })
  return result
}

const getDoc = async (url) => {
  const res = await axios.get(url)
  const doc = []

  // const result = res.data.docs[0].children.map(item => (JSON.parse(item.content)))
  const result = parseDoc(res.data.docs)
  // console.log('result: ', result);
  return result
  return res.data.docs[0].children.reduce((pre, cur) =>  pre.children.concat(cur.children)).map(item => (JSON.parse(item.content)))
}

module.exports = {
  getDoc
}