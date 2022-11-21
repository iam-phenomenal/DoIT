const User = require("../../../models/User")
const {validationResult} = require("express-validator")
const {signToken} = require("../others/tokenizer")
const {hashPassword, verifyPassword} = require("../others/hasher")
require("dotenv").config()


//Register User
const registerUser = async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }
    //get user password
    const hashedPass = await hashPassword((req.body.password))
    //get user info
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
        phone: req.body.phone
    })
    
    try{
        //save fetched info
        const savedUser = await user.save()
        const {password, ...others} = savedUser._doc
        //send confirmation mail
        const accessToken = signToken(user)
        
        return res.status(201).json({
            // output: "Confirmation email sent.",
            output: {others, accessToken},
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

//Login User
const loginUser = async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }
    //no error occured
    try{
        //search user's model by username
        const user = await User.findOne({username: req.body.username})
        //if user found 
        if(!user) return res.status(401).json({message: "Invalid Username"})
        //password verification failed
        const verifiedPass = verifyPassword(req.body.password, user.password)
        if(!verifiedPass){
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
        req.logout
        return res.status(200).json({message: "User logged out"})
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

module.exports = {registerUser, loginUser, googleSignIn, logout}


/*
What's left
--------------
Input validation with express-validator
Email confirmation
google sign In
sign out procedure

*/