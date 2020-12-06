const Router = require('koa-router');
const products = new Router();
const productsCtrl = require('./products.controller');

// 상품종류 등록
products.post('/setProductType', productsCtrl.setProductType);
// 상폼종류 리스트 검색
products.get('/getProductTypeList', productsCtrl.getProductTypeList);
// 상품종류 등록
products.post('/setProduct', productsCtrl.setProduct);
// 상폼종류 리스트 검색
products.get('/getProductList', productsCtrl.getProductList);

module.exports = products;
