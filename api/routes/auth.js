const router = require("express").Router()
const {registerUser, loginUser, googleSignIn, logout} = 
    require("../app/https/requests/authRequest")
const imageProcessing = require("../app/https/controller/imageProcessing")

router.post("/login", loginUser)

router.post("/register", imageProcessing, registerUser)

router.post("/google", googleSignIn)

router.get("/logout", logout)

module.exports = router