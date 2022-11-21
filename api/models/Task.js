const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    description: {type: String},
    userID: {type: mongoose.Types.ObjectId, required: true},
    status: {type: Boolean, default: false},
    deadline: {type: Date, required: true}
}, {timestamps: true})

module.exports = mongoose.model("Task", TaskSchema)