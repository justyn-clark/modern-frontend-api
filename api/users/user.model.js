const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  hash: { type: String, required: true },
  admin: { type: Boolean, default: false },
  role: { type: String, default: '' },
  username: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, default: '' },
  picture: { type: String, default: '' },
  website: { type: String, default: '' },
  gender: { type: String, default: '' },
  location: { type: String, default: '' },
  type: { type: String, default: '' },
  createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
