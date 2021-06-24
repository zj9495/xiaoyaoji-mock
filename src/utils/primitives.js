const primitives = {
  '_default': "@string",
  'string': '@string',
  'string_': '@string',
  'string_desc': '@string(15, 60)',
  'string_email': '@email',
  'string_date-time': '@datetime',
  'number': '@integer(1, 100)',
  'number_float': '@float(1, 100, 3, 5)',
  'integer': '@integer(1, 100)',
  'boolean': '@boolean',
}
const getFormat = (name) => {
  name = name.toLowerCase()
  if (name.endsWith("time")) {
    return "date-time"
  }
  if (name.endsWith("desc")) {
    return "desc"
  }
  return ""
}

const getPrimitive = (name, type) => {
  const format = getFormat(name, type)
  return primitives[type + "_" + format] || primitives[type] || primitives["_default"]
}

module.exports = {
  ...primitives,
  getFormat,
  getPrimitive
}
