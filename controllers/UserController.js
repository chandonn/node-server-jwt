const userService = require("../services/UserService")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function listUsers(req, res) {
  try {
    const users = await userService.listUsers()
    res.status(200).json({ data: users, status: "success" })
  } catch (error) {
    res.status(500).json({ error: "Internal error" })
  }
}

async function loginUser(req, res) {
  try {
    const user = req.body.user

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    res.status(200).json({ token, user })
  } catch (error) {
    res.status(500).json({ error: "Internal error" })
  }
}

async function createUser(req, res) {
  try {
    const user = req.body.user
    const hashed = await bcrypt.hash(user.password, 10)
    user.password = hashed
    const newUser = await userService.createUser(user)
    
    res.status(200).json({ data: newUser, status: "success" })
  } catch (error) {
    res.status(500).json({ error: "Internal error" })
  }
}

async function getUser(req, res) {
  try {
    const user = await userService.getUser(req.params.id)
    res.status(200).json({ data: user, status: "success" })
  } catch (error) {
    res.status(500).json({ error: "Internal error" })
  }
}

async function updateUser(req, res) {
  try {
    const user = req.body.user
    user.password = await bcrypt.hash(user.password, 10)

    const newUser = await userService.updateUser(req.params.id, user)
    res.status(200).json({ data: newUser, status: "success" })
  } catch (error) {
    res.status(500).json({ error: "Internal error" })
  }
}

async function deleteUser(req, res) {
  try {
    await userService.deleteUser(req.params.id)
    res.status(200).json({ data: {}, status: "success" })
  } catch (error) {
    res.status(500).json({ error: "Internal error" })
  }
}

module.exports = {
  listUsers,
  createUser,
  getUser,
  loginUser,
  updateUser,
  deleteUser,
}
