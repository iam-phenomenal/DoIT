const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String},
    phone: {type: Number, unique: true},
    profileIMG: {type: String},
    admin: {type: Boolean, default: false}
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema)