const Router = require('koa-router');

const api = new Router();
const auth = require('./auth');
const users = require('./users');

api.use('/auth', auth.routes());
api.use('/users', users.routes());

module.exports = api;
