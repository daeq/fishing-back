const Router = require('koa-router');
const auth = new Router();
const authCtrl = require('./auth.controller');
const accountClassificationCtrl = require('./accountClassification.controller');
const infoCtrl = require('./info.controller');
// 
auth.post('/register/local', authCtrl.localRegister);
auth.post('/login/local', authCtrl.localLogin);
auth.get('/exists/:key(email|username)/:value', authCtrl.exists);
auth.post('/logout', authCtrl.logout);
auth.get('/check', authCtrl.check);
auth.post('/accountClassification/add', accountClassificationCtrl.add);
auth.get('/accountClassification', accountClassificationCtrl.list);
auth.post('/changeAccountClassification', authCtrl.changeAccountClassification);

// 회원 권한 요청
auth.post('/accountClassification/request', authCtrl.request);
auth.post('/setIsAdmin', accountClassificationCtrl.setIsAdmin);

// 프로필 이미지 변경
auth.post('/thumbnailChange', authCtrl.thumbnailChange);
// 비밀번호 변경
auth.post('/passwordChange', authCtrl.passwordChange);

// 사업자 정보 변경 및 파트너 신청
auth.post('/setPartnerInfo', infoCtrl.setPartnerInfo);
// 파트너 신청 (사용 안함.)
auth.post('/requestPartner', infoCtrl.requestPartner);

// 로그인 정보로 사업자 정보 불러오기
auth.get('/getPartnerInfo', infoCtrl.getPartnerInfo);
// 사업자 정보 리스트 불러오기
auth.get('/getPartnerInfoList', infoCtrl.getPartnerInfoList);

// 회원 권한 변경 요청된 리스트 불러오기
auth.get('/getRequestedList', infoCtrl.getRequestedList);
// 회원 권한 변경
auth.post('/setClassification', infoCtrl.setClassification)

// 선박 정보 등록
auth.post('/setShipInfo', infoCtrl.setShipInfo);
// 선박 정보 리스트 
auth.get('/getShipInfoList', infoCtrl.getShipInfoList);

module.exports = auth;
