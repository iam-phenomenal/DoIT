const jwt = require("jsonwebtoken")
require("dotenv").config()

const signToken = (user)=>{
    const accessToken = jwt.sign({
        id: user._id,
        admin: user.admin
    }, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})
    return accessToken
}

const tokenResult = (req, res, next)=>{
    const authHeader = req.headers.tokenResult
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
            if(err) return res.status(403).json("Invalid Token")
            req.user = user
            next()
        })
    }else{
        return res.status(403).json("Not authenticated")
    }
}

const tokenAuthentication = (req, res, next) =>{
    tokenResult(req, res, ()=>{
        if(req.user.id === req.params.id) next()
        else return res.status(403).json("Permission denied")
    })
}

const adminVerification = (req, res, next) => {
    tokenResult(req, res, ()=>{
        if(req.user.admin) return next()
        else return res.status(401).json("Permission denied")
    })
}

module.exports = {signToken, tokenAuthentication, adminVerification}

