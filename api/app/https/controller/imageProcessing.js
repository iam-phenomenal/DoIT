const multer = require("multer")

const Storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./uploads")
    },
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + "-" + Date.now())
    }
})

const uploadImg = multer({storage: Storage}).single("profileImage")

module.exports = uploadImg