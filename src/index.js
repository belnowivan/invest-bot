// @ts-check

// import _ from 'lodash';
import { getBonds, getStock } from './tinkoffAPI';

const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const views = require('koa-views');
const path = require('path');

const router = new Router();

const stockController = async (ctx) => {
  const stocks = await getStock();
  await ctx.render('stock', { stocks: stocks.instruments.slice(0, 10) });
};

const bondsController = async (ctx) => {
  const bonds = await getBonds();
  await ctx.render('bonds', { bonds: bonds.instruments.slice(0, 10) });
};

const layout = async (ctx) => {
  await ctx.render('index');
};

export default () => {
  const app = new Koa();
  app.use(logger());
  app.use(views(path.join(__dirname, '/views'), { extension: 'pug' }));

  router
    .get('/', layout)
    .get('/stock', stockController)
    .get('/bonds', bondsController);

  app.use(router.routes());

  return app;
};
