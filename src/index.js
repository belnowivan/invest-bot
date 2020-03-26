// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// import _ from 'lodash';
const Koa = require('koa');
const logger = require('koa-logger');
const router = new (require('koa-router'))();
// const koaBody = require('koa-body');
const json = require('koa-json')


const list = (ctx) => {
  ctx.response.body = [1, 2]
}

const tickets = (ctx) => {
  ctx.response.body = 'Work!'
}

const auth = (ctx) => {
  console.log('Why')
  ctx.body = { api_token: 'somevalidtokenvalue', expires_at: new Date('2021') }
}

// app.use(koaBody({
  // jsonLimit: '1kb'
// }));
export default () => {
  const app = new Koa();
  app.use(logger());
  // app.use(koaBody());
  app.use(json())

  router.get('/', list)
    .get('/api/site/v1/support', tickets)
    .post('/api/site/v1/auth', auth)

  app.use(router.routes());

  return app;
};