const config = require("../../mock.config")

const getConfig = () => {
  const { host, projects = [] } = config
  if (!host) {
    throw new Error("expected 'host' in config.js not present")
  }
  if (!projects instanceof Array) {
    throw new Error("expected 'projects' in config.js should be an Array")
  }

  const res = projects.map(({ id, baseUrl = "/", rewriteResponse = {}, whiteList = [], blackList = [] }) => ({
    baseUrl,
    url: `${host}/project/${id}/export/cn.xiaoyaoji.export.mjson/do`,
    rewriteResponse,
    whiteList,
    blackList
  }))

  return res
}

module.exports = {
  getConfig
}