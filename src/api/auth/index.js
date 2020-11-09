const Router = require('koa-router');
const auth = new Router();
const authCtrl = require('./auth.controller');
const accountClassificationCtrl = require('./accountClassification.controller');

auth.post('/register/local', authCtrl.localRegister);
auth.post('/login/local', authCtrl.localLogin);
auth.get('/exists/:key(email|username)/:value', authCtrl.exists);
auth.post('/logout', authCtrl.logout);
auth.get('/check', authCtrl.check);
auth.post('/accountClassification/add', accountClassificationCtrl.add);
auth.get('/accountClassification', accountClassificationCtrl.list);
auth.post('/changeAccountClassification', authCtrl.changeAccountClassification);
auth.post('/setIsAdmin', accountClassificationCtrl.setIsAdmin);
module.exports = auth;
