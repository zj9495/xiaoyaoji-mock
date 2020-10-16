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

module.exports = {
  '_default': "@string",
  'string': '@string',
  'string_': '@string',
  'string_desc': '@string(15, 60)',
  'string_email': '@email',
  'string_date-time': '@datetime',
  'number': '@integer(60, 100)',
  'number_float': '@float(60, 100, 3, 5)',
  'integer': '@integer(60, 100)',
  'boolean': '@boolean',
  getFormat
}
