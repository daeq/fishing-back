const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjectId = mongoose.Types.ObjectId;

let priceJogunSchema = new Schema({
    // 유저 id
    userId:ObjectId,
    // 선박 id
    shipId: ObjectId,
    // 상품종류 id
    productTypeId:ObjectId,
    // 출발요일
    week:String,
    // 출발일
    startDate: Date,
    // 종료일
    endDate: Date,
    // 비고
    message:String,
    // 대소공통 여부
    priceCommonIsUse:Boolean,
    // 연산자
    operator:String,
    // 성인 상품가
    priceAdult:Number,
    // 유아 상품가
    priceChild:Number,
    // 영아 상품가
    priceInfant:Number,
     // 성인요금 사용유무
    priceAdultIsUse:  Boolean,
     // 아동요금 사용유무
    priceChildIsUse:  Boolean,
    // 유아요금 사용유무
    priceInfantIsUse: Boolean,
     // 성인요금 타이틀
    priceAdultMessage: String,
    // 아동요금 타이틀
    priceChildMessage: String,
      // 유아요금 타이틀
    priceInfantMessage: String,
}, { versionKey: false });


if (mongoose.models.PriceJogun) {
  module.exports = mongoose.model('PriceJogun');
} else {
  module.exports = mongoose.model('PriceJogun', priceJogunSchema);
}
