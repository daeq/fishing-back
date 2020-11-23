const Joi = require('joi');
const Account = require('models/account/account');
const AccountClassification = require('models/account/accountClassification');

// 회원 분류 관리 추가
exports.add = async ctx => {
  const { name, information } = ctx.request.body;
  let accountClassification;
  try {
    accountClassification = await AccountClassification.add({
      name,
      information
    });
  } catch (e) {
    ctx.throw(500, e);
  }
  ctx.body = accountClassification;
};
exports.list = async ctx => {
  ctx.body = await AccountClassification.find();
};

exports.changeUserClassification = async ctx => {
  const { userName, name } = ctx.request.body;
  const { user } = ctx.request;
  if (!user) {
    console.log('유저 없으');
    ctx.status = 403; // Forbidden
    return;
  }

  ctx.body = user.profile;
};
exports.setIsAdmin = async ctx => {
  const { user } = ctx.request;

  if (!user) {
    ctx.status = 403; // Forbidden
    return;
  } else {
    const one = await AccountClassification.findOne({
      _id: user.profile.accountClassificationId
    });

    ctx.body = one ? true : false;
  }
};
