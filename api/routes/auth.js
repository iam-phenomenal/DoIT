const router = require("express").Router()
const {registerUser, loginUser, googleSignIn, logout} = 
    require("../app/https/requests/authRequest")
// const imageProcessing = require("../app/https/controller/imageProcessing")
const registrationValidator = require("../app/https/others/validator").registrationValidator
const loginValidator = require("../app/https/others/validator").loginValidator

router.post("/login", loginValidator(), loginUser)

router.post("/register", registrationValidator(), registerUser)

router.post("/google", googleSignIn)

router.get("/logout", logout)

module.exports = router