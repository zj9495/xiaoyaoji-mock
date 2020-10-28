const axios = require("axios")

const getDoc = async (url) => {
  const res = await axios.get(url)
  console.log('res: ', res.data.docs[0].children);

  return res.data.docs[0].children.map(item => (JSON.parse(item.content)))
  return res.data.docs[0].children.reduce((pre, cur) =>  pre.children.concat(cur.children)).map(item => (JSON.parse(item.content)))
}

module.exports = {
  getDoc
}