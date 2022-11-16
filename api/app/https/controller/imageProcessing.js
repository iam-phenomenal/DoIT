const multer = require("multer")


const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})

const upload = multer({storage: Storage}).single("profileImage")

const imageUpload = async(req, res, next){
    upload(req, res, (err)=>{
        if(err) return res.stat
    })
}

module.exports = upload