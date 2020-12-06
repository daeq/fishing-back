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
    startDate: String,
    // 종료일
    endDate: String,
    // 비고
    message:String,
    // 대소공통 여부
    isTotalPrice:Boolean,
    // 연산자
    operator:String,
    // 성인 상품가
    priceAdult:Number,
    // 유아 상품가
    priceChild:Number,
    // 영아 상품가
    priceInfant:Number,
}, { versionKey: false });


if (mongoose.models.PriceJogun) {
  module.exports = mongoose.model('PriceJogun');
} else {
  module.exports = mongoose.model('PriceJogun', priceJogunSchema);
}
