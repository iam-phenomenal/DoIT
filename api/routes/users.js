const router = require("express").Router()
const {updateUser, delUser, getUsers, getUser} = 
    require("../app/https/requests/userRequest")

//Get all users
router.get("", getUsers)

//Get indie user
router.get("/:id", getUser)

//Update user
router.put("/:id", updateUser)

//Delete user
router.delete("/:id", delUser)

module.exports = router