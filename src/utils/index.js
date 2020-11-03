const primitives = require("./primitives")
const {getFormat} = primitives

const getStructure = (data, obj = {}) => {
  data.forEach(item => {
    let { type, name, children = [] } = item
    let res
    if (children.length) {
      res = getStructure(children)
      if (type.startsWith("array")) {
        res = [res]
        name = name + '|1-20'
      }
    } else {
      const format = getFormat(name, type)
      res = primitives[type + "_" + format] || primitives[type] || primitives["_default"]
    }
    obj[name] = res
  })
  return obj
}

module.exports = {
  getStructure
}