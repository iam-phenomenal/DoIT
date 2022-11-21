const router = require("express").Router()
const  {createTask, updateTask, delTask, getTask, getAllTasks} = 
    require("../app/https/requests/taskRequest")

//Create tasks
router.post("", createTask)

//Update tasks
router.put("/:taskid", updateTask)

//Fetch all user tasks
router.get("", getAllTasks)

//Fetch indie tasks
router.get("/:taskid", getTask)

//Delete tasks
router.delete("/:taskid", delTask)

module.exports = router