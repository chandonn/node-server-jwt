const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { listUsers } = require("../services/UserService")

function validateFields(req, res, next) {
  const user = req.body.user

  if (!user || !user.email || !user.password) res.status(400).json({ error: "Email and password required" })

  next()
}

async function validateCredentials(req, res, next) {
  const users = await listUsers()
  const found = users.find(u => req.body.user.email === u.email)

  if (!found) res.status(400).json({ error: "User not found" })

  const isPassCorrect = await bcrypt.compare(req.body.user.password, found.password)

  if (!isPassCorrect) res.status(400).json({ error: "Password incorrect" })

  next()
}

function verifyUserToken(req, res, next) {
  if (!req.headers.authorization) res.status(401).json({ error: "Unauthorized request" })
  
  const token = req.headers.authorization.split(" ")[1]
  if (!token) res.status(401).json({ error: "Access denied. No token provided" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: "Invalid token" })
  }
}

module.exports = {
  validateFields,
  validateCredentials,
  verifyUserToken,
}
