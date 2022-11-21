const {check} = require("express-validator")
const User = require("../../../models/User")
const Task = require("../../../models/Task")


function registrationValidator(){
    const inputValidation = [
        check("username").isString().custom(async value=>{
            const user = await User.findOne({username: value})
            if(user) throw new Error("User already exists")
            return true
        }),
        check("email").isEmail().custom(async value=>{
            const user = await User.findOne({email: value})
            if(user) throw new Error("User already exists")
            return true
        }),
        check("password").isLength({min:8})
            .withMessage("Enter a strong password"),
        check("confirmPassword").custom((value, {req})=>{
            if(value != req.body.password){
                throw new Error("Password confirmation doesn't match")
            }
            return true
        }),
        check("phone").isMobilePhone()
            .withMessage("Enter a valid phone number")
    ]
    return inputValidation
}


function loginValidator(){
    const inputValidation = [
        check("username").isString().withMessage("Empty user field"),
        check("password").notEmpty().withMessage("Empty password field")
    ]

    return inputValidation
}

function taskValidator(){
    const inputValidation = [
        check("name").isString.isEmpty().withMessage("Name field can't be empty"),
        check("description").isString().isLength({max: 1042})
    ]
    return inputValidation
}
module.exports = {registrationValidator, loginValidator, taskValidator}