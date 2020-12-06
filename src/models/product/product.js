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
    day:String,
    // 출발일
    date: String,
    // 출항시간
    departureTime: String,
    // 입항시간
    productInformation: String,
    // 성인 상품가
    priceAdult:Number,
    // 유아 상품가
    childAdult:Number,
    // 영아 상품가
    infantAdult:Number,
}, { versionKey: false });


if (mongoose.models.Product) {
  module.exports = mongoose.model('Product');
} else {
  module.exports = mongoose.model('Product', productSchema);
}
