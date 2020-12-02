const Router = require('koa-router');
const products = new Router();
const productsCtrl = require('./products.controller');

// 선박 정보 등록
products.post('/setProductType', productsCtrl.setProductType);
// 선박 정보 리스트 검색
products.get('/getProductTypeList', productsCtrl.getProductTypeList);
// 
module.exports = products;
