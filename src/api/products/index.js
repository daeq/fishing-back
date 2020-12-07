const Router = require('koa-router');
const products = new Router();
const productsCtrl = require('./products.controller');

// 상품종류 등록
products.post('/setProductType', productsCtrl.setProductType);
// 상폼종류 리스트 검색
products.get('/getProductTypeList', productsCtrl.getProductTypeList);
// 상품 등록
products.post('/setProduct', productsCtrl.setProduct);
// 상폼 리스트 검색
products.get('/getProductList', productsCtrl.getProductList);
// 가격 조건 등록
products.post('/setPriceJogun', productsCtrl.setPriceJogun);
// 가격 조건 리스트
products.post('/getPriceJogun', productsCtrl.getPriceJogun);
// 가격 셋
products.post('/setPriceSet', productsCtrl.setPriceSet);
// 가격 리스트 조회
products.post('/getPriceList', productsCtrl.getPriceList);

module.exports = products;
