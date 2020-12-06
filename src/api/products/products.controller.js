const Joi = require('joi');
const Account = require('models/account/account');
const ProductType = require('models/product/productType');
const Product = require('models/product/product');

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
        meetingPlaceLng:ctx.request.body.meetingPlaceLng
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
  const user = {profile:{username:'daeq'}};
  const schema = Joi.object().keys({
    _id:Joi.objectId(),
    shipId: string().required(),
    productTypeId:string().required(),
    day:string().required(),
    date: string().required(),
    departureTime: string().required(),
    productInformation: string().required(),
    priceAdult:number().required(),
    childAdult:number().required(),
    infantAdult:number().required(),
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
        childAdult:ctx.request.body.childAdult,
        infantAdult:ctx.request.body.infantAdult        
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
  const user = {profile:{username:'daeq'}};
  // const { user } = ctx.request;  
  // if (!user) {
  //   console.log('유저 없으');
  //   ctx.status = 403; // Forbidden
  //   return;
  // }
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