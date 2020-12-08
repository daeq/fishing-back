const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjectId = mongoose.Types.ObjectId;

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
    // 미팅장소 명칭
    meetingPlaceName: String, 
    // 미팅장소 주소
    meetingPlaceAddress1: String, 
    // 미팅장소 우편번호
    zip: String, 
    // 미팅장소 lat
    meetingPlaceLat: String, 
    // 미팅장소 lng
    meetingPlaceLng: String,
    // 출항시간(시)
    departureTimeH: String,
    // 출항시간(분)
    departureTimeM: String,
    // 입항시간(시)
    arrivalTimeH: String,
    // 입항시간(분)
    arrivalTimeM: String,
}, { versionKey: false });


if (mongoose.models.ProductType) {
  module.exports = mongoose.model('ProductType');
} else {
  module.exports = mongoose.model('ProductType', productTypeSchema);
}
