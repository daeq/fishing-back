const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjectId = mongoose.Types.ObjectId;

let productSchema = new Schema({
    // 유저 id
    userId:ObjectId,
    // 선박 id
    shipId: ObjectId,
    // 상품종류 id
    productTypeId:ObjectId,
    // 출발요일
    // day:String,
    // 출발일
    date: Date,
    // 출항시간
    // departureTime: String,
    // 입항시간
    // arrivalTime: String,
    // 상품정보
    // productInformation: String,
    
    // 대소공통 여부
    priceCommonIsUse:Boolean,
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
}, { versionKey: false });


if (mongoose.models.Product) {
  module.exports = mongoose.model('Product');
} else {
  module.exports = mongoose.model('Product', productSchema);
}
