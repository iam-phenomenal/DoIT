const Task = require("../../../models/Task")
const {validationResult} = require("express-validator")

//Create Task
const createTask = async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }
    const userid = req.params.userid
    const newTask = new Task({
        name: req.body.name,
        description: req.body.description,
        userID: userid,
        status: req.body.status,
        deadline: req.body.deadline        
    })
    try{
        const savedTask = await newTask.save()
        const taskID = savedTask._id
        return res.status(201).json({
            message: "Task created",
            output: savedTask._doc,
            requests: [{
                    type: "GET",
                    description: "Get task info",
                    url:  `http://localhost:${process.env.PORT}/tasks/${userid}/${taskID}`
                },{
                    type: "PUT || POST || PATCH",
                    description: "Update task info",
                    url:  `http://localhost:${process.env.PORT}/tasks/${userid}/${taskID}`
                },{
                    type: "DELETE",
                    description: "Delete task",
                    url:  `http://localhost:${process.env.PORT}/tasks/${userid}/${taskID}`
                },{
                    type: "GET",
                    description: "Get all user's task",
                    url:  `http://localhost:${process.env.PORT}/tasks/${userid}`
                }

            ]
        })

    }catch(err){
        return res.status(500).json({error: err.message})
    }
}
//Update Task
const updateTask = async(req, res)=>{
    const taskID = req.params.taskid
    try{
        const updatedTask = await Task.findByIdAndUpdate(taskID, {
            $set: req.body
        }, {new: true})
        return res.status(200).json({
            message: "Task upadted",
            output: updatedTask._doc,
            requests: [
                {
                    type: "GET",
                    description: "Fetch all user's task",
                    url: `http://localhost:${process.env.PORT}/tasks/${userid}/${taskID}`
                },{
                    type: "DELETE",
                    description: "Delete task",
                    url:  `http://localhost:${process.env.PORT}/tasks/${userid}/${taskID}`
                }
            ]
        })
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

//Delete Task
const delTask = async(req, res)=>{
    const taskID = req.params.taskid
    try{
        await Task.findByIdAndDelete(taskID)
        return res.status(200).json({
            message: "Task deleted",
            requests:[
                {
                    type: "GET",
                    description: "Fetch all user's task",
                    url: `http://localhost:${process.env.PORT}/tasks/${userid}/${taskID}`
                },{
                    type: "POST",
                    description: "Create a new task",
                    url:  `http://localhost:${process.env.PORT}/tasks/${userid}/`
                }
            ]
        })
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

//Fetch All
const getAllTasks = async(req, res)=>{
    const userID = req.params.userid
    try{
        const tasks = await Task.findById(userID).select("_id name status deadline")
        const count = tasks.length
        return res.status(200).json({
            count: count,
            Tasks: tasks.map(task =>{
                return {
                    _id: task._id,
                    name: task.name,
                    status: task.status,
                    deadline: task.deadline,
                    url: `http://localhost:${process.env.PORT}/tasks/${userID}/${task._id}`
                }
            })
        })
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

//Fetch Indie
const getTask = async(req, res)=>{
    const taskID = req.params.taskid
    const userID = req.params.userid
    let message, statusCode
    try{
        const task = await Task.findById(taskID)
        if(task){
            message = task
            statusCode = 200
        }else{
            message = "Invalid ID input"
            statusCode = 404
        }
        return res.status(statusCode).json({
            output: message,
            request: {
                type: "GET",
                description: "Fetch all user's tasks",
                url: `http://localhost:${process.env.PORT}/tasks/${userID}`
            }
        })
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

module.exports = {createTask, updateTask, delTask, getTask, getAllTasks}