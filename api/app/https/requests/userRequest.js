const User = require("../../../models/User")
const Task = require("../../../models/Task")

//Update user
const updateUser = async (req, res) =>{
    const userId = req.params.id
    try{
        const updatedUser = await 
            User.findByIdAndUpdate(userId, {
                $set : req.body}, {new : true})
        return res.status(200).json({
            output: updatedUser,
            requests: [{
                type: "GET",
                description: "Fetch user info",
                url: `http://localhost:${process.env.PORT}/user/${userId}`
            },{
                type: "GET",
                description: "Fetch all users",
                url: `http://localhost:${process.env.PORT}/user/${userId}`
            },{

            }]
        })
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

//Delete user
const delUser = async (req, res)=>{
    const userID = req.params.userid
    try{
        await Task.findByIdAndDelete(userID)
        await User.findByIdAndDelete(userID)
        return res.status(200).json({
            message: "User deleted",
            requests: [{
                type: "POST",
                description: "Register new user",
                url: `http://localhost:${process.env.PORT}/register`
            },{
                type: "POST",
                description: "Login user",
                url: `http://localhost:${process.env.PORT}/login`
            }]
        })
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

//Get All user
const getUsers = async (req, res)=>{
    // const page = req.query.page
    try{
        const users = await User.find()
        return res.status(200).json(users)
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

//Get indie user
const getUser = async (req, res)=>{
    const userId = req.params.id
    try{
        const user = await User.findById(userId)
        if(!user) return res.status(404).json({error: "Invalid user id"})
        return res.status(200).json({
            output: user,
            requests: [{
                type: "PUT",
                description: "Update user",
                url: `http://localhost:${process.env.PORT}/user/${userId}`
            },{
                type: "DELETE",
                description: "Delete user",
                url: `http://localhost:${process.env.PORT}/user/${userId}`
            }]
        })
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

module.exports = {updateUser, delUser, getUsers, getUser}