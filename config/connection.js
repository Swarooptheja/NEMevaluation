

let mongoose=require("mongoose")
require('dotenv').config()
let mainconnection=mongoose.connect(process.env.connect)

module.exports={
    mainconnection
}