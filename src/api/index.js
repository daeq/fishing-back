const Router = require('koa-router');

const api = new Router();
const auth = require('./auth');
const users = require('./users');
const products = require('./products');

api.use('/auth', auth.routes());
api.use('/users', users.routes());
api.use('/products', products.routes());

module.exports = api;
