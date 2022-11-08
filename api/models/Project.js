const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    desc: {type: String, required: true},
    tasks: {type: Array},
    status: {type: Boolean, default: false},
    deadline: {type: Date, required: true}
}, {timestamps: true})

module.exports = mongoose.model("Product", ProductSchema)