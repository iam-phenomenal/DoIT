const router = require("express").Router()

router.get("/:id", (req, res)=>{
    const userID = req.params.id
    res.status(200).json({
        message: "Please confirm your email to proceed"
    })
})

module.exports = router