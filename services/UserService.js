const userModel = require("../models/Users")

async function listUsers() {
  return await userModel.find()
}

async function createUser(user) {
  return await userModel.create(user)
}

async function getUser(id) {
  return await userModel.findById(id)
}

async function updateUser(id, user) {
  return await userModel.findByIdAndUpdate(id, user)
}

async function deleteUser(id) {
  return await userModel.findByIdAndDelete(id)
}

module.exports = {
  listUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
}