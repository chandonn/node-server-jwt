const express = require("express")
const {
 listUsers,
 createUser,
 loginUser,
 updateUser,
 getUser,
 deleteUser,
} = require("../controllers/UserController")
const { validateFields, validateCredentials, verifyUserToken } = require("../middlewares")

const router = express.Router()

router.route("/users").get(verifyUserToken, listUsers).post(validateFields, createUser)
router.route("/users/login").post(validateFields, validateCredentials, loginUser)
router.route("/users/:id").get(verifyUserToken, getUser).put(verifyUserToken, updateUser).delete(verifyUserToken, deleteUser)

module.exports = router
