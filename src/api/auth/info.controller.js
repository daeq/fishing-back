const Joi = require('joi');
const Account = require('models/account/account');
const AccountClassification = require('models/account/accountClassification');
const InfoOfPartner = require('models/partner/infoOfPartner');
const ShipInfoOfPartner = require('models/partner/shipInfoOfPartner');
const crypto = require('crypto');
Joi.objectId = require('joi-objectid')(Joi)
const {
  Types: { ObjectId }
} = require('mongoose');

function hash(password) {
  return crypto
    .createHmac('sha256', process.env.SECRET_KEY)
    .update(password)
    .digest('hex');
}

// 사업자 정보 변경 및 파트너 신청
exports.setPartnerInfo = async ctx => {
  const user = {profile:{username:'daeq'}};
  // if (!user) {
  //   console.log('유저 없음');
  //   ctx.status = 403; // Forbidden
  //   return;
  // }
  const schema = Joi.object().keys({
    code:Joi.string().required(),
    name:Joi.string().required(),
    nameOfCed:Joi.string().required(),
    contact:Joi.string().required(),
    cellPhone:Joi.string().required(),
    businessRegistration:Joi.string().required()
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    return;
  }
  let account;
  let infoOfPartner;
 let response = {
   result:1,
   message:'성공'
 };
  try {
    account = await Account.findOne({'profile.username':user.profile.username});

    infoOfPartner= await InfoOfPartner.findOneAndUpdate({userId:account._id},{
      userId:account._id,
      code:ctx.request.body.code,
      name:ctx.request.body.name,
      nameOfCed:ctx.request.body.nameOfCed,
      contact:ctx.request.body.contact,
      cellPhone:ctx.request.body.cellPhone,
      businessRegistration:ctx.request.body.businessRegistration
    },{
      upsert:true,
      new: true
    })
    account = await Account.findOneAndUpdate(
      {'profile.username':user.profile.username},
      {accountClassificationRequest:'사업자 변경'},
      {
        upsert:true,
        new: true
      }
    );
    console.log(account);
  } catch (error) {
    console.log(error);
    response = {
      result:2,
      message:'실패'
    };
  }

  ctx.body =  response;

}
// 파트너 신청
exports.requestPartner = async ctx =>{
  ctx.body ='파트너 신청'
}
// 유저용 사업자 정보 부르기
exports.getPartnerInfo = async ctx =>{
  const { user } = ctx.request;
  if (!user) {
    console.log('유저 없으');
    ctx.status = 403; // Forbidden
    return;
  }
  
  let infoOfPartner;
  try {
    account = await Account.findOne({'profile.username':user.profile.username});
    infoOfPartner = await InfoOfPartner.findOne({
      userId : account._id
    })
  } catch (error) {
    console.log(error);
  }
  ctx.body=infoOfPartner
}

// 관리자용 사업자 정보 리스트 부르기
exports.getPartnerInfoList = async ctx =>{
  const { user } = ctx.request;
  if (!user) {
    console.log('유저 없으');
    ctx.status = 403; // Forbidden
    return;
  }
  
  
  let infoOfPartner;
  try {
    let test = await AccountClassification.findOne({name:'관리자'})
    console.log(test);
    infoOfPartner = await InfoOfPartner.find({
    })
  } catch (error) {
    console.log(error);
  }
  ctx.body=infoOfPartner
}

// 변경할 리스트 불러오기
exports.getRequestedList = async ctx =>{
  const { user } = ctx.request;
  if (!user) {
    console.log('유저 없으');
    ctx.status = 403; // Forbidden
    return;
  }
    
  let test;
  try {    
    // 관리자 계정 확인 절차 추가
    // let classify = await AccountClassification.findOne({name:'gkgk'});

    // 변경 중인 
    test = await Account.find({accountClassificationRequest:'사업자 변경'},{
      profile:1,
      accountClassificationRequest:1
    })
    console.log(test);
  } catch (error) {
    console.log(error);
  }
  ctx.body=test
}

exports.setClassification = async ctx =>{
  const { username, classificationName } = ctx.request.body;
  let account;
  let response = {
    result:1,
    message:'성공'
  };
  try {
    const classification =await AccountClassification.findOne({name:classificationName})
    account = await Account.findOneAndUpdate(
      {'profile.username':username},
      {'profile.accountClassificationId':classification._id},
      {
        upsert:true,
        new: true
      }
    );
  } catch (error) {
    console.log(error);  
    ctx.status = 400;
    response = {
      result:2,
      message:'실패'
    };
    return;  
  }
  ctx.body = response;
}
exports.setShipInfo = async ctx =>{
  const { user } = ctx.request;
  // const user = {profile:{username:'hktest'}};
  if (!user) {
    console.log('유저 없으');
    ctx.status = 403; // Forbidden
    return;
  }
  const schema = Joi.object().keys({
    _id:Joi.objectId(),
    imageLink:Joi.string().required(),
    name:Joi.string().required(),
    portName:Joi.string().required(),
    portAddress:Joi.string().required(),
    kakaoMap:Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    return;
  }
  let account;
  let shipInfo;
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
    filter={ 'name':'new 선박' }
  }
  try {
    account = await Account.findOne({'profile.username':user.profile.username});
    shipInfo = await ShipInfoOfPartner.findOneAndUpdate(
      {'$and':[{'userId':account._id}&&filter]},
      {
        userId:account._id,
        imageLink:ctx.request.body.imageLink,
        name:ctx.request.body.name,
        portName:ctx.request.body.portName,
        portAddress:ctx.request.body.portAddress,
        kakaoMap:ctx.request.body.kakaoMap
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
exports.getShipInfoList = async ctx =>{  
  const { user } = ctx.request;
  // const user = {profile:{username:'hktest'}};
  if (!user) {
    console.log('유저 없으');
    ctx.status = 403; // Forbidden
    return;
  }
  let shipInfoList;
  

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
    shipInfoList = await ShipInfoOfPartner.find(filter)
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    response = {
      result:2,
      message:'실패'
    };
    
  }
  ctx.body=shipInfoList
}