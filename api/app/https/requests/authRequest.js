const User = require("../../../models/User")
const signToken = require("../others/tokenizer").signToken
const sendMail = require("../controller/emailConfirmation")
const {hashPassword, verifyPassword} = require("../others/hasher")
require("dotenv").config()
const fs = require("fs")
const path = require("path")

//Register User
const registerUser = async (req, res)=>{
    //get user password
    const hashedPass = await hashPassword((req.body.password).toString())
    //get user info
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
        phone: req.body.phone,
        profileIMG: {
            data: fs.readFileSync(path.join(__dirname + "/uploads/" + 
            req.file.filename)),
            contentType: "image/png"
        }
    })
    
    //if no error
    try{
        //save fetched info
        const savedUser = await user.save()
        //send confirmation mail
        const accessToken = signToken(user)
        //send mail
        const mail_result = sendMail(savedUser.email, accessToken)
        //output result
        if(!mail_result) return res.status(401).json({
            error: "Email confirmation failed",
            request: {
                type: "GET",
                description: "Send new confirmation email",
                url: `http://localhost:${process.env.PORT}/activate/${savedUser.id}`
            }
        })
        return res.status(201).json({
            output: "Confirmation email sent.",
            //add request options
            requests: [{
                type: "POST",
                description: "Login user",
                url: `http://localhost:${process.env.PORT}/login`
            }, {
                type: "GET",
                description: "Logout user",
                url: `http://localhost:${process.env.PORT}/logout`
            }]
        })
    //else 
    }catch(err){
        //output error
        return res.status(500).json({
            error: err.message
        })
    }
}
//Email confirmation:

//Login User
const loginUser = async (req, res)=>{
    //no error occured
    try{
        //search user's model by username
        const user = await User.findOne({username: req.body.username})
        //if user found 
        if(!user) return res.status(401).json({message: "Invalid Username"})
        //password verification failed
        if(req.body.password != user.password){
            //output error
            return res.status(401).json({message: "Invalid password"})
        }
        //split user info
        const {password, ...others} = user._doc
        //assign accessToken
        const accessToken = signToken(user)
        //output results
        return res.status(200).json(
            {
                //add user info and access token
                output: {others, accessToken},
                //add results
                requests: {
                    type: "GET",
                    description: "Logout user",
                    url: `http://localhost:${process.env.PORT}\logout`
                }
            }
        )
    //error occured
    }catch(err){
        //output error
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