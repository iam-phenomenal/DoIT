const router = require("express").Router()
const {registerUser, loginUser, googleSignIn, logout} = 
    require("../app/https/requests/authRequest")

router.post("/login", loginUser)

router.post("/register", upload, registerUser)

router.post("/google", googleSignIn)

router.get("/logout", logout)

module.exports = router