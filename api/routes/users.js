const router = require("express").Router()
const {updateUser, delUser, getUsers, getUser} = 
    require("../app/https/requests/userRequest")

const {tokenAuthentication, adminVerification} = require("../app/https/others/tokenizer")

//Get all users
router.get("", adminVerification, getUsers)

//Get indie user
router.get("/:id", tokenAuthentication, getUser)

//Update user
router.put("/:id", tokenAuthentication, updateUser)

//Delete user
router.delete("/:id", tokenAuthentication, delUser)

module.exports = router