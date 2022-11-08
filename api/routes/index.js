const router = require("express").Router()

router.get("", (req, res)=>{
    res.status(200).json({
        message: "Welcome to DoIt landing page"
    })
})

module.exports = router