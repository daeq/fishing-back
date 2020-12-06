const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjectId = mongoose.Types.ObjectId;

let infoOfPartnerSchema = new Schema({
    //  유저 아이디
    userId : ObjectId,
    // 사업자 번호
    code: String,
    // 업체명
    name: String,
    // 대표자 이름
    nameOfCed: String,
    // 대표번호
    contact: String,
    // 대표 모바일 번호
    cellPhone:String,
    // 사업자 등록증 path
    businessRegistration : String
}, { versionKey: false });



if (mongoose.models.InfoOfPartner) {
  module.exports = mongoose.model('InfoOfPartner');
} else {
  module.exports = mongoose.model('InfoOfPartner', infoOfPartnerSchema);
}
