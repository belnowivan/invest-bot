import OpenAPI from '@tinkoff/invest-openapi-js-sdk';

const apiURL = 'https://api-invest.tinkoff.ru/openapi';
const socketURL = 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws';
// токен для сандбокса
const secretToken = 't.2-VqiMxw-PJs-WhMo5h6VeXawY3g2QYhFnZl8RCFAgaIkuamsY7M_nkyiK0XGIOvMHoDqiw1IVPSJRYoOSjy8A';
const api = new OpenAPI({ apiURL, secretToken, socketURL });

const run = async () => {
  const { figi } = await api.searchOne({ ticker: 'AAPL' });
  const { commission, orderId } = await api.limitOrder({
    operation: 'Buy',
    figi,
    lots: 1,
    price: 100,
  }); // Покупаем AAPL
  console.log(commission); // Комиссия за сделку
  await api.cancelOrder({ orderId }); // Отменяем заявку
};

export default run;
