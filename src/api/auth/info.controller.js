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
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'ap-northeast-2',
  apiVersion: '2006-03-01' 
});

function hash(password) {
  return crypto
    .createHmac('sha256', process.env.SECRET_KEY)
    .update(password)
    .digest('hex');
}

// 사업자 정보 변경 및 파트너 신청
exports.setPartnerInfo = async ctx => {
  // 개발서버용 user 변수 이용.
  // const user = {profile:{username:'daeq'}};
  const { user } = ctx.request;
  if (!user) {
    console.log('유저 없으');
    ctx.status = 403; // Forbidden
    return;
  }
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
    test = await Account.aggregate([{ $match: { accountClassificationRequest:'사업자 변경' } },
    {
      $lookup: {
        from: 'infoofpartners',
        localField: '_id',
        foreignField: 'userId',
        as: 'info'
      }
    },{
      $project:{
        info:1,
      profile:1,
      accountClassificationRequest:1,
      accountClassificationAnswer:1

      }
    }]);
  } catch (error) {
    console.log(error);
  }
  ctx.body=test;
}

// 회원 권한 변경
exports.setClassification = async ctx =>{
  const { username, choice } = ctx.request.body;
  const schema = Joi.object().keys({
    username:Joi.string().required(),
    choice:Joi.number().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    return;
  }
  let account;
  let response = {
    result:1,
    message:'성공'
  };
  try {
    let classificationName;
    let request;
    let answer;
    if(choice===1){
      // 승인
      classificationName='파트너';
      request=''
      answer='파트너 승인'
    }else if(choice===2){
      // 보류
      classificationName='일반'
      request='사업자 변경'
      answer='파트너 승인 보류'
    }else if(choice===3){
      // 거절
      classificationName='일반'
      request='사업자 변경'
      answer='파트너 승인 거절'
    }
    
    const classification =await AccountClassification.findOne({name:classificationName})
    account = await Account.findOneAndUpdate(
      {'profile.username':username},
      {
        'profile.accountClassificationId':classification._id,
        'accountClassificationRequest':request,
        'accountClassificationAnswer':answer
      },
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
    numOfMaxGuests:Joi.number().required(),
    portAddress:Joi.string().required(),
    zip:Joi.string().required(),
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
    console.log('파트너 정보 수정');
    filter={
          _id:ObjectId(ctx.request.body._id)
    }
  }else{
    filter={ 'name':'new 선박' }
  }

  
  try {
    account = await Account.findOne({'profile.username':user.profile.username});
    const base64Data = new Buffer.from(ctx.request.body.imageLink.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const type = ctx.request.body.imageLink.split(';')[0].split('/')[1];
    const params = {
      Bucket: S3_BUCKET,
      Key: `${Date.now()}_${account._id}.${type}`, // type is not required
      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64', // required
      ContentType: `image/${type}` // required. Notice the back ticks
    }
    // The upload() is used instead of putObject() as we'd need the location url and assign that to our user profile/database
    // see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
    let location = '';
    let key = '';
    try {
      const { Location, Key } = await s3.upload(params).promise();
      location = Location;
      key = Key;
    } catch (error) {
      // console.log(error)
    }
    
    // Save the Location (url) to your database and Key if needs be.
    // As good developers, we should return the url and let other function do the saving to database etc
    console.log(location, key);
    shipInfo = await ShipInfoOfPartner.findOneAndUpdate(
      {'$and':[{'userId':account._id}&&filter]},
      {
        userId:account._id,
        imageLink:ctx.request.body.imageLink,
        name:ctx.request.body.name,
        portName:ctx.request.body.portName,
        numOfMaxGuests:ctx.request.body.numOfMaxGuests,
        zip:ctx.request.body.zip,
        portAddress:ctx.request.body.portAddress,
        kakaoMap:ctx.request.body.kakaoMap,
        isUse:true
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
    shipInfoList = await ShipInfoOfPartner.find({$and:[filter,{isUse:true}]},{isUse:0})
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
exports.deleteShipInfo = async ctx =>{
  const { user } = ctx.request;
  // const user = {profile:{username:'hktest'}};
  if (!user) {
    console.log('유저 없으');
    ctx.status = 403; // Forbidden
    return;
  }
let account;
  let shipInfo;
  let response = {
    result:1,
    message:'성공'
  };
  try {
    account = await Account.findOne({'profile.username':user.profile.username});
    shipInfo = await ShipInfoOfPartner.findOneAndUpdate(
      {'$and':[{'userId':account._id}&&{'_id':ObjectId(ctx.request.body._id)}]},
      {
        isUse:false
      },
      {
        upsert:true
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
