const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');
const Item = db.Item;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: onDelete,
};

async function getAll() {
  return await Item.find().select('-hash');
}

async function getById(id) {
  return await Item.findById(id).select('-hash');
}

async function create(userParam) {
  const item = new Item(userParam);
  await item.save();
}

async function update(id, userParam) {
  const user = await Item.findById(id);

  // validate
  if (!user) throw 'Item not found';
  if (
    user.username !== userParam.username &&
    (await Item.findOne({ username: userParam.username }))
  ) {
    throw `Itemname "${userParam.username}" is already taken`;
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

async function onDelete(id) {
  await Item.findByIdAndRemove(id);
}
