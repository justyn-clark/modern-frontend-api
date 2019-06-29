const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: false },
  species: { type: String, required: false },
  description: { type: String, required: false },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Items', schema);
