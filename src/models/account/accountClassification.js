const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountClassificationSchema = new Schema({
  name: String,
  information: String
}, { versionKey: false });

accountClassificationSchema.statics.add = function({ name, information }) {
  const accountClassification = new this({
    name,
    information
  });

  return accountClassification.save();
};
if (mongoose.models.accountClassification) {
  AccountClassification = mongoose.model('AccountClassification');
} else {
  AccountClassification = mongoose.model(
    'AccountClassification',
    accountClassificationSchema
  );
}

module.exports = AccountClassification;
