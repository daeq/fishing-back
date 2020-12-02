const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjectId = mongoose.Schema.Types.ObjectId;

let productTypeSchema = new Schema({
    // 유저 id
    userId:ObjectId,
    // 타이틀
    title:String,
    // 선박 id
    shipId: ObjectId,
    // 어종
    typeOfFish: String,
    // 총좌석수
    totalSeats: Number,
    // 상품설명
    productInformation: String,
    // 취소 및 환불
    refund:String,
    // 이용약관
    requirements:String,
}, { versionKey: false });


if (mongoose.models.ProductType) {
  module.exports = mongoose.model('ProductType');
} else {
  module.exports = mongoose.model('ProductType', productTypeSchema);
}
