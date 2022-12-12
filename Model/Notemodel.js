


let mongoose=require("mongoose")


let Note=mongoose.model("notes",mongoose.Schema({
    title:String,
    Status:Boolean,
    pending:String,
    UserID:String
}))

module.exports={
    Note
}