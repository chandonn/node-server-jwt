require("dotenv").config()
const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const userRouter = require("./routes/UserRoutes")

const app = express()

app.use(express.json())

mongoose.set("strictQuery", false)

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  e => {
    if (e) {
      console.log("Connection error")
    } else {
      console.log("Database connected")
    }
  }
)

app.use("/api", userRouter)

app.listen("3001", () => {
  console.log("Server started at port 3001")
})
