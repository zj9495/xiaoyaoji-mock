const primitives = require("./primitives")
const { getPrimitive } = primitives

const getStructure = (data, obj = {}) => {
  data.forEach(item => {
    let { type, name, children = [] } = item
    let res
    if (children.length) {
      res = getStructure(children)
    } else {
      res = getPrimitive(name, type.replace(/array\[|\]/g, ''))
    }
    if (type.startsWith("array")) {
      res = [res]
      name = name + '|1-10'
    }
    obj[name] = res
  })
  return obj
}

module.exports = {
  getStructure
}