const mongoose = require('mongoose');
const config = require('../config.json');
const User = require('./users/user.model');
const Item = require('./items/item.model');

mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
  User,
  Item,
};
