const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  type: { type: String, default: 'admin' },
  profile: {
    name: { type: String, default: '' },
    gender: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' },
    phone: {
      work: { type: String, default: '' },
      home: { type: String, default: '' },
      mobile: { type: String, default: '' },
    },
  },
  activity: {
    date_established: { type: Date, default: Date.now },
    last_logon: { type: Date, default: Date.now },
    last_updated: { type: Date },
  },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
