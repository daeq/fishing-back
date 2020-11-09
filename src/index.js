require('dotenv').config(); // .env 파일에서 환경변수 불러오기
const Koa = require('koa');
const Router = require('koa-router');

const serve = require('koa-static');
const path = require('path');

const fallback = require('koa-connect-history-api-fallback');

const app = new Koa();
const router = new Router();
const api = require('./api');

 const mongoose = require('mongoose');
const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser');
const { jwtMiddleware } = require('lib/token');
 
mongoose.Promise = global.Promise; // Node 의 네이티브 Promise 사용
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGO_URI1,  
{useNewUrlParser: true, useUnifiedTopology: true})
.then(response => {
    console.log('mongodb 접속 성공적~');
  })
  .catch(e => {
    console.error(e);
  });
const port = process.env.PORT || 4000; // PORT 값이 설정되어있지 않다면 4000 을 사용합니다.

app.use(koaBody({ multipart: true }));
app.use(bodyParser()); // 바디파서 적용, 라우터 적용코드보다 상단에 있어야합니다.
app.use(jwtMiddleware);

router.use('/api', api.routes()); // api 라우트를 /api 경로 하위 라우트로 설정
app.use(router.routes()).use(router.allowedMethods());

app.use(fallback());
app.use(serve(path.resolve(__dirname, '../../fishing-front/build/')));

app.use(async (ctx, next) => {
  try {
    await next() // next is now a function
  } catch (err) {
    ctx.body = { message: err.message }
    ctx.status = err.status || 500
  }
});

app.listen(port, () => {
  console.log(port + '포트에 서버 작동중!');
});
