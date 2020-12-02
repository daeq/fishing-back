const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjectId = mongoose.Schema.Types.ObjectId;

//
let AccountInformation = new Schema({
  username: String,
  name: String,
  phone: String,
  email: {
    address: String,
    domainOne: String,
    domainTwo: String
  },
  firstName: String,
  lastName: String,
  gender: String,
  dateOfBirth: String,
  checked: Boolean,
  createDate: {
    type: Date,
    default: new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000
    )
  },
  modifiedDate: {
    type: Date,
    default: new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000
    )
  }
}, { versionKey: false });

if (mongoose.models.AccountInformation) {
  module.exports = mongoose.model('AccountInformation');
} else {
  module.exports = mongoose.model('AccountInformation', AccountInformation);
}
