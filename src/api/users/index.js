const Router = require('koa-router');
const users = new Router();

const usersCtrl = require('./users.controller');

users.get('/:username', usersCtrl.getProfile);
users.get('/:username/thumbnail', usersCtrl.getThumbnail);
users.post('/list', usersCtrl.getList)
users.post('/info', usersCtrl.getInfo)
users.post('/setClassification', usersCtrl.setClassification);

users.post('/setInformation', usersCtrl.setInformation);
users.post('/getInformation', usersCtrl.getInformation);

module.exports = users;
