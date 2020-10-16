const fs = require('fs')
const _ = require('lodash')
const Koa = require('koa');
const Router = require('koa-router')
const Mock = require('mockjs')
const { getStructure } = require('./utils')
const { getConfig } = require('./utils/config')
const { getDoc } = require('./utils/docs')

const main = async () => {
  const app = new Koa();
  const mockRouter = new Router;

  const config = getConfig()
  for (let i = 0; i < config.length; i++) {
    const { baseUrl, url, rewriteResponse } = config[i]
    const docs = await getDoc(url)

    docs.forEach(item => {
      const { url, requestMethod, requestArgs, responseArgs } = item
      const apiUrl = baseUrl + url.replace(/{/g, ":").replace(/}/g, "")
      mockRouter[requestMethod.toLowerCase()](apiUrl, async ctx => {
        const structure = getStructure(responseArgs)
        ctx.body = {
          ...Mock.mock(structure),
          ...rewriteResponse
        }
      })
    })
  }

  app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  });

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  });

  app.use(mockRouter.routes()).use(mockRouter.allowedMethods())

  app.listen(3000);
}

module.exports = main