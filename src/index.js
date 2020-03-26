// @ts-check

// import _ from 'lodash';
const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');

// const koaBody = require('koa-body');
// const json = require('koa-json');


const router = new Router();
const hi = (ctx) => {
  ctx.response.body = 'Hi';
};


export default () => {
  const app = new Koa();
  app.use(logger());
  // app.use(koaBody());
  // app.use(json());

  router.get('/', hi);

  app.use(router.routes());

  return app;
};
