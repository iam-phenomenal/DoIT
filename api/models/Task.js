const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    projectID: {type: mongoose.Types.ObjectId},
    status: {type: Boolean, default: false},
    deadline
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema)