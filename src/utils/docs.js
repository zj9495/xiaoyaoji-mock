const axios = require("axios")

const getDoc = async (url) => {
  const res = await axios.get(url)

  return res.data.docs[0].children.reduce((pre, cur) =>  pre.children.concat(cur.children)).map(item => (JSON.parse(item.content)))
}

module.exports = {
  getDoc
}