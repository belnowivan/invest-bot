// @ts-check

// import _ from 'lodash';
import Koa from 'koa';
import logger from 'koa-logger';
import Router from 'koa-router';
import views from 'koa-views';
import path from 'path';

import { getBonds, getStock } from './tinkoffAPI';

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
  const router = new Router();

  app.use(logger());
  app.use(views(path.join(__dirname, '/views'), { extension: 'pug' }));

  router
    .get('/', layout)
    .get('/stock', stockController)
    .get('/bonds', bondsController);

  app.use(router.routes());

  return app;
};
