const Account = require('models/account/account');
const AccountClassification = require('models/account/accountClassification');
const AccountInformation = require('models/account/accountInformation');
const {
  Types: { ObjectId }
} = require('mongoose');

exports.getProfile = async ctx => {
  const { username } = ctx.params;

  // 계정 찾기
  let account;
  try {
    account = await Account.findByUsername(username);
  } catch (e) {
    ctx.throw(500, e);
  }

  if (!account) {
    ctx.status = 404;
    return;
  }

  // 프로필과 생각 수 응답
  ctx.body = {
    profile: account.profile,
    thoughtCount: account.thoughtCount
  };
};

exports.getThumbnail = async ctx => {
  const { username } = ctx.params;

  // 계정 찾기
  let account;
  try {
    account = await Account.findByUsername(username);
  } catch (e) {
    ctx.throw(500, e);
  }

  if (!account) {
    ctx.status = 404;
    return;
  }

  // 썸네일 주소로 리다이렉트
  ctx.redirect(account.profile.thumbnail);
};

exports.getList = async ctx => {
  const { user } = ctx.request;
  if (!user) {
    console.log('유저 없음');
    ctx.status = 403; // Forbidden
    return;
  }
  list = await Account.aggregate()
    .lookup({
      from: 'accountclassifications',
      let: { accountClassificationId: '$profile.accountClassificationId' },
      pipeline: [
        {
          $match: {
            $expr: { $and: [{ $eq: ['$_id', '$$accountClassificationId'] }] }
          }
        }
      ],
      as: 'accountClassification'
    })
    .unwind('$accountClassification')
    .project({ password: 0 });

  ctx.body = list;
};
exports.getInfo = async ctx => {
  const { user } = ctx.request;
  const { id } = ctx.request.body;
  if (!user) {
    console.log('유저 없음');
    ctx.status = 403; // Forbidden
    return;
  }
  one = await Account.findById({ _id: id }, { password: 0, social: 0 }).then(
    async one => {
      if (one.profile.accountClassificationId) {
        const accountClassification = await AccountClassification.findOne({
          _id: one.profile.accountClassificationId
        });
        const re = {
          ...one._doc,
          accountClassification
        };
        return re;
      }
      return one;
    }
  );
  ctx.body = one;
};
exports.setClassification = async ctx => {
  const { user } = ctx.request;
  if (!user) {
    console.log('유저 없음');
    ctx.status = 403; // Forbidden
    return;
  }

  ctx.body = user.profile;
};

exports.setInformation = async ctx => {
  const { username } = ctx.request.user.profile;

  const {
    name,
    firstName,
    lastName,
    gender,
    dateOfBirth,
    phone,
    email,
    reservationItemUsername
  } = ctx.request.body;

  let result;
  if (
    reservationItemUsername === username ||
    username === 'hk21211' ||
    username === 'daeq'
  ) {
    try {
      resutl = await AccountInformation.findOneAndUpdate(
        { username: username },
        {
          username,
          name,
          firstName,
          lastName,
          gender,
          dateOfBirth,
          phone,
          email,
          checked: true,
          modifiedDate: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
        },
        { upsert: true, new: true }
      );
    } catch (e) {
      ctx.throw(500, e);
    }
  } else {
    console.log('유저 없음');
    ctx.status = 403; // Forbidden
  }

  ctx.body = resutl;
};
exports.getInformation = async ctx => {
  const { username } = ctx.request.body;

  const defaultValue = {
    name: '',
    phone: '',
    email: {
      address: '',
      domainOne: '',
      domainTwo: '직접입력'
    },
    firstName: '',
    lastName: '',
    requests: '',
    gender: 'Male',
    dateOfBirth: '',
    checked: false
  };

  let booker;

  try {
    booker = await AccountInformation.findOne({ username: username });
  } catch (e) {
    ctx.throw(500, e);
    return;
  }
  let result = booker ? booker : defaultValue;

  ctx.body = result;
};
