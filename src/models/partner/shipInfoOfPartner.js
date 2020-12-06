const { string } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjectId = mongoose.Types.ObjectId;

let shipInfoOfPartnerSchema = new Schema({
    // 유저 아이디
    userId : ObjectId,
    // 선박대표사진(1장)
    imageLink: String,
    // 선박이름
    name: String,
    // 출발항구명
    portName: String,
    // 최대 손님수
    numOfMaxGuests:Number,
    // 출발항구주소
    portAddress: String,
    //우편번호
    zip:String,
    // 위치 (변경 필요)
    kakaoMap:String,
    // 사용 여부
    isUse : {type:Boolean, default:true}
}, { versionKey: false });


if (mongoose.models.ShipInfoOfPartner) {
  module.exports = mongoose.model('ShipInfoOfPartner');
} else {
  module.exports = mongoose.model('ShipInfoOfPartner', shipInfoOfPartnerSchema);
}
