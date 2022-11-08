const User = require("../../../models/User")
require("dotenv").config()

//Create User
const registerUser = async (req, res)=>{
    const password= req.body.password
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: password,
        phone: req.body.phone,
        profileIMG: req.body.profileIMG
    })

    try{
        const savedUser = await user.save()
        return res.status(201).json({
            message: "User succesfully registered",
            requests: [{
                type: "POST",
                description: "Login user",
                url: `http://localhost:${process.env.PORT}\login`
            }, {
                type: "GET",
                description: "Logout user",
                url: `http://localhost:${process.env.PORT}\logout`
            }]
        })
    }catch(err){
        return res.status(500).json({
            error: err.message
        })
    }
}

//Login User
const loginUser = async (req, res)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user) return res.status(401).json({message: "Invalid Username"})
        if(req.body.password != user.password){
            return res.status(401).json({message: "Invalid password"})
        }
        return res.status(200).json({message: "User succesfully registered",
        requests: {
            type: "GET",
            description: "Logout user",
            url: `http://localhost:${process.env.PORT}\logout`
        }})
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

//Continue with Google
const googleSignIn = (req, res) =>{
    return res.status(200).json({
        message: "Sign in google succesful"
    })
}

//Logout
const logout = (req, res)=>{
    try{
        return res.status(200).json({message: "User logged out"})
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

module.exports = {registerUser, loginUser, googleSignIn, logout}