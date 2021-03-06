const Joi = require('joi');
const Account = require('models/account/account');
const ProductType = require('models/product/productType');
const Product = require('models/product/product');
const PriceJogun = require('models/product/priceJogun');
const ChangeFormModules = require('lib/changeFormModules');

Joi.objectId = require('joi-objectid')(Joi)
const {
  Types: { ObjectId }
} = require('mongoose');

exports.setProductType = async ctx => {
  // const user = {profile:{username:'daeq'}};
  const { user } = ctx.request;  
  if (!user) {
    console.log('유저 없으');
    ctx.status = 403; // Forbidden
    return;
  }
  const schema = Joi.object().keys({
    _id:Joi.objectId(),
    shipId:Joi.string().required(),
    title:Joi.string().required(),
    typeOfFish:Joi.string().required(),
    totalSeats:Joi.number().required(),
    productInformation:Joi.string().required(),
    refund:Joi.string().required(),
    requirements:Joi.string().required(),
    // 미팅장소 명칭
    meetingPlaceName: Joi.string().required(),
    // 미팅장소 주소
    meetingPlaceAddress1: Joi.string().required(),
    // 미팅장소 우편번호
    zip: Joi.string().required(),
    // 미팅장소 lat
    meetingPlaceLat: Joi.string().required(),
    // 미팅장소 lng
    meetingPlaceLng: Joi.string().required(),    
    // 출항시간(시)
    departureTimeH: Joi.string().required(),
    // 출항시간(분)
    departureTimeM: Joi.string().required(),
    // 입항시간(시)
    arrivalTimeH: Joi.string().required(),
    // 입항시간(분)
    arrivalTimeM: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    console.log(result.error);
    ctx.status = 400;
    return;
  }
  let account;
  let productType;
  let response = {
    result:1,
    message:'성공'
  };
  let filter ;
  if(ctx.request.body._id){
    filter={
          _id:ObjectId(ctx.request.body._id)
    }
  }else{
    filter={ 'title':'new 상품종목' }
  }
  try {
    account = await Account.findOne({'profile.username':user.profile.username});
    productType = await ProductType.findOneAndUpdate(
      {'$and':[{'userId':account._id}&&filter]},
      {
        userId:account._id,
        title:ctx.request.body.title,
        shipId:ctx.request.body.shipId,
        typeOfFish:ctx.request.body.typeOfFish,
        totalSeats:ctx.request.body.totalSeats,
        productInformation:ctx.request.body.productInformation,
        refund:ctx.request.body.refund,
        requirements:ctx.request.body.requirements,
        meetingPlaceName:ctx.request.body.meetingPlaceName,
        meetingPlaceAddress1:ctx.request.body.meetingPlaceAddress1,
        zip:ctx.request.body.zip,
        meetingPlaceLat:ctx.request.body.meetingPlaceLat,
        meetingPlaceLng:ctx.request.body.meetingPlaceLng,
        departureTimeH:ctx.request.body.departureTimeH,
        departureTimeM:ctx.request.body.departureTimeM,
        arrivalTimeH:ctx.request.body.arrivalTimeH,
        arrivalTimeM:ctx.request.body.arrivalTimeM
      },
      {
        upsert:true,
        new: true
      }
    )
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    response = {
      result:2,
      message:'실패'
    };
  }
  ctx.body = response;
}

exports.getProductTypeList = async ctx =>{
  // const user = {profile:{username:'daeq'}};
  const { user } = ctx.request;  
  if (!user) {
    console.log('유저 없으');
    ctx.status = 403; // Forbidden
    return;
  }
  let productType
 try {
    account = await Account.findOne({'profile.username':user.profile.username});
    const accountClassification = await AccountClassification.findOne({
      _id: account.profile.accountClassificationId
    });
    if(accountClassification&&accountClassification.name==='관리자'){
      console.log('관리자 접속');
      filter={
      }
    }else{
      console.log('유저 접속');
      filter={ 'userId': account._id}
    }
    productType = await ProductType.find(filter)
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    response = {
      result:2,
      message:'실패'
    };    
  }
  ctx.body=productType;
}

exports.setProduct = async ctx => {
  // const user = {profile:{username:'daeq'}};
  const { user } = ctx.request;  
  if (!user) {
    console.log('유저 없으');
    ctx.status = 403; // Forbidden
    return;
  }
  const schema = Joi.object().keys({
    _id:Joi.objectId(),
    shipId: Joi.string().required(),
    productTypeId:Joi.string().required(),
    day:Joi.string().required(),
    date: Joi.string().required(),
    departureTime: Joi.string().required(),
    productInformation: Joi.string().required(),
    priceAdult:Joi.number().required(),
    priceChild:Joi.number().required(),
    priceInfant:Joi.number().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    console.log(result.error);
    ctx.status = 400;
    return;
  }
  let account;
  let product;
  let response = {
    result:1,
    message:'성공'
  };
  let filter ;
  if(ctx.request.body._id){
    filter={
          _id:ObjectId(ctx.request.body._id)
    }
  }else{
    filter={ 'day':'new 상품종목' }
  }
  try {
    account = await Account.findOne({'profile.username':user.profile.username});
    product = await Product.findOneAndUpdate(
      {'$and':[{'userId':account._id}&&filter]},
      {
        userId:account._id,
        shipId:ctx.request.body.shipId,
        productTypeId:ctx.request.body.productTypeId,
        day:ctx.request.body.day,
        date:ctx.request.body.date,
        departureTime:ctx.request.body.departureTime,
        productInformation:ctx.request.body.productInformation,
        priceAdult:ctx.request.body.priceAdult,
        priceChild:ctx.request.body.priceChild,
        priceInfant:ctx.request.body.priceInfant        
      },
      {
        upsert:true,
        new: true
      }
    )
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    response = {
      result:2,
      message:'실패'
    };
  }
  ctx.body = response;
}

exports.getProductList = async ctx =>{
  // const user = {profile:{username:'daeq'}};
  const { user } = ctx.request;  
  if (!user) {
    console.log('유저 없으');
    ctx.status = 403; // Forbidden
    return;
  }
  let productType
 try {
    account = await Account.findOne({'profile.username':user.profile.username});
    const accountClassification = await AccountClassification.findOne({
      _id: account.profile.accountClassificationId
    });
    if(accountClassification&&accountClassification.name==='관리자'){
      console.log('관리자 접속');
      filter={
      }
    }else{
      console.log('유저 접속');
      filter={ 'userId': account._id}
    }
    product = await Product.find(filter)
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    response = {
      result:2,
      message:'실패'
    };    
  }
  ctx.body=productType;
}

exports.setPriceJogun = async ctx =>{
  // const user = {profile:{username:'daeq'}};
  const { user } = ctx.request;  
  if (!user) {
    console.log('유저 없으');
    ctx.status = 403; // Forbidden
    return;
  }
  const schema = Joi.object().keys({
    _id:Joi.objectId(),
    userId:Joi.objectId(),
    shipId: Joi.string().required(),
    productTypeId:Joi.string().required(),
    week:Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    message: Joi.string().required(),
    priceCommonIsUse: Joi.boolean().required(),
    operator: Joi.string().required(),
    priceAdult:Joi.number().required(),
    priceChild:Joi.number().required(),
    priceInfant:Joi.number().required(),
    priceAdultIsUse: Joi.boolean().required(),
    priceChildIsUse: Joi.boolean().required(),
    priceInfantIsUse: Joi.boolean().required(),
    priceAdultMessage: Joi.string().allow('').optional(),
    priceChildMessage: Joi.string().allow('').optional(),
    priceInfantMessage: Joi.string().allow('').optional()
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    console.log(result.error);
    ctx.status = 400;
    return;
  }
  let account;
  let priceJogun;
  let response = {
    result:1,
    message:'성공'
  };
  let filter ;
  try {
    account = await Account.findOne({'profile.username':user.profile.username});
    if(ctx.request.body._id){
      filter=[
        {'userId':account._id}
          &&{ productTypeId:ObjectId(ctx.request.body.productTypeId) }
          &&{ _id:ObjectId(ctx.request.body._id)}
      ]
    }else{
      filter=[
          {'userId':account._id}
          &&{ productTypeId:ObjectId(ctx.request.body.productTypeId) }
          &&{operator:'new'}
        ]
    }
    priceJogun = await PriceJogun.findOneAndUpdate(
      {'$and':filter },
      {
        userId:account._id,
        shipId: ctx.request.body.shipId,
        productTypeId: ctx.request.body.productTypeId,
        week: ctx.request.body.week,
        startDate: new Date(
          new Date(ctx.request.body.startDate).getTime() -
            new Date(ctx.request.body.startDate).getTimezoneOffset() * 60000
        ),
        endDate: new Date(
          new Date(ctx.request.body.endDate).getTime() -
            new Date(ctx.request.body.endDate).getTimezoneOffset() * 60000
        ),
        message: ctx.request.body.message,
        priceCommonIsUse: ctx.request.body.priceCommonIsUse,
        operator: ctx.request.body.operator,
        priceAdult: ctx.request.body.priceAdult,
        priceChild: ctx.request.body.priceChild,
        priceInfant: ctx.request.body.priceInfant,
        priceAdultIsUse: ctx.request.body.priceAdultIsUse,
        priceChildIsUse: ctx.request.body.priceChildIsUse,
        priceInfantIsUse: ctx.request.body.priceInfantIsUse,
        priceAdultMessage: ctx.request.body.priceAdultMessage?ctx.request.body.priceAdultMessage:'',
        priceChildMessage: ctx.request.body.priceChildMessage?ctx.request.body.priceChildMessage:'',
        priceInfantMessage: ctx.request.body.priceInfantMessage?ctx.request.body.priceInfantMessage:''
      },
      {
        upsert:true,
        new: true
      }
    )
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    response = {
      result:2,
      message:'실패'
    };
  }
  ctx.body = response;

}

exports.getPriceJogun = async ctx =>{  
  // const user = {profile:{username:'daeq'}};
  const { user } = ctx.request;  
  if (!user) {
    console.log('유저 없으');
    ctx.status = 403; // Forbidden
    return;
  }
  const schema = Joi.object().keys({
    _id:Joi.objectId(),
    productTypeId: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    console.log(result.error);
    ctx.status = 400;
    return;
  }
  let priceJogun;
 try {
    account = await Account.findOne({'profile.username':user.profile.username});
    const accountClassification = await AccountClassification.findOne({
      _id: account.profile.accountClassificationId
    });
    if(accountClassification&&accountClassification.name==='관리자'){
      console.log('관리자 접속');
      filter={
        
      }
    }else{
      console.log('유저 접속');
      filter={ 'userId': account._id}
    }
    priceJogun = await PriceJogun.find({productTypeId:ObjectId(ctx.request.body.productTypeId)})
  } catch (error) {
    console.log(error);
    ctx.status = 400;
  }
  ctx.body=priceJogun;
}

exports.setPriceSet = async (ctx) =>{
  // const user = {profile:{username:'hklee'}};
  const { user } = ctx.request;
  if (!user) {
    console.log('유저 없으');
    ctx.status = 403; // Forbidden
    return;
  }
  const { productTypeId } = ctx.request.body;
  let date;
  try {
    // 최소 날짜 확인
   date = await PriceJogun.aggregate([{
      $match :{
        productTypeId:ObjectId(productTypeId)
      }
    },{
        $group:
        {
          _id: "$_id",
          startDate: { $min: "$startDate" },
          endDate: { $max: '$endDate' }
        }
  }])

  let {startDate,endDate} = date[0];  
  // let from = typeof date[0].startDate == "string"&& date[0].startDate.split("-")
  // let to = typeof date[0].endDate === "string"&& date[0].endDate.split('-')
  // let endDate = new Date(to[0], to[1]-1, to[2]);

  // 업데이트 날짜를 기준으로 최소날짜 확인
  const today = ChangeFormModules.today();
  startDate = startDate.getTime() < today.getTime() ? today : startDate;

  // 업데이트할 날짜 수 연산
  const diff = Math.ceil((endDate - startDate) / (24 * 60 * 60 * 1000));
  let priceJoguns=await PriceJogun.find({$and:[
    { "startDate" : 
            { "$gte" : startDate}
    },{ "endDate" : 
            {  "$lte" : endDate}
      }
  ]})
  let num=0;
  while (num<=diff) {
    let targetDate = new Date(startDate);
    targetDate.setDate(targetDate.getDate() + num);
    const result = priceJoguns.filter(priceJogun=>{
      return priceJogun.startDate<=targetDate&&priceJogun.endDate>=targetDate
    }).reduce((a, current) => {
      return {userId:current.userId,
        shipId: ObjectId(current.shipId),
        productTypeId:ObjectId(current.productTypeId),
        date: targetDate,
        priceCommonIsUse:current.priceCommonIsUse,
        priceAdult:ChangeFormModules.calculateByOperator(a.priceAdult, current.priceAdult, current.operator),
        priceChild:ChangeFormModules.calculateByOperator(a.priceChild, current.priceChild, current.operator),
        priceInfant:ChangeFormModules.calculateByOperator(a.priceInfant, current.priceInfant, current.operator),
        priceAdultIsUse:  current.priceAdultIsUse,
        priceChildIsUse:  current.priceChildIsUse,
        priceInfantIsUse: current.priceInfantIsUse,}
    },{});
    await Product.findOneAndUpdate({date:targetDate},result,{upsert:true,new:true})
    num++;
  }
  if(num>diff){
    ctx.body='연산 종료'
  }
} catch (error) {
  console.log(error);
}
  
}

exports.getPriceList = async (ctx) =>{
  // const user = {profile:{username:'hklee'}};
  const { user } = ctx.request;
  if (!user) {
    console.log('유저 없으');
    ctx.status = 403; // Forbidden
    return;
  }
  const { productTypeId } = ctx.request.body;
  try {
    ctx.body = await Product.find({productTypeId:ObjectId(productTypeId)})    
  } catch (error) {
    console.log(error);
    ctx.status=403;
  }
}