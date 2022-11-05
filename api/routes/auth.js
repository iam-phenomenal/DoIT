const router = require("express").Router()

router.post("/login", (req, res)=>{
    res.status(201).json({
        message: "Login Successful"
    })
})

router.post("/register", (req, res)=>{
    res.status(201).json({
        message: "Registration sucessful"
    })
})

router.get("/logout", (req, res)=>{
    res.status(200).json({
        message: "User logged out"
    })
})

module.exports = router