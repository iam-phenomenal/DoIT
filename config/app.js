const { urlencoded } = require("express")
const express = require("express")
const db = require("./database")
const app = express()
const morgan = require("morgan")

//Include routes
const indexRoute = require("../api/routes/index")
const authRoute = require("../api/routes/auth")
const userRoute = require("../api/routes/users")

//Catch database error
db.on("error", (error)=>{
    console.error(error)
})
//Initializing database
db.once("open", ()=>{
    console.log("Databas connection successful")
})

//Initializing body parsers
app.use(express.json())
app.use(urlencoded({extended: false}))

//Initializing logger
app.use(morgan("dev"))

//Init CORS
app.use((req, res, next)=>{
      req.header("Access-Control-Allow-Origin", "*")
      req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
      if(req.method == "OPTIONS"){
        req.header("Access-Contol-Allow-Methods", "PUT, PATCH, POST, DELETE, GET")
        return (res.status(200).json({}))
      }
      next()
})

//Use Routes
app.use("/", indexRoute)
app.use("/auth", authRoute)
app.use("/user", userRoute)

//Handling Errors
//404
app.use((req, res, next)=>{
    const error = new Error("Page not found")
    error.status = 404
    next(error)
})
//Others
app.use((error, req, res, next)=>{
    res.status(error.status || 500).json({
        error: error.message
    })
})

module.exports = app