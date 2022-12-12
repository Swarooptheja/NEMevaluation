
let express=require("express")
const { Note } = require("../Model/Notemodel")
const { User } = require("../Model/Usermodel")

let Userrouter=express.Router()

Userrouter.get("/",async(req,res)=>{
   try{
    let data=await Note.find({})
    res.send(data)
   }
   catch(err){
    console.log(err)
   }
})

Userrouter.post("/post",async(req,res)=>{
    let payload=req.body
    try{
        let data=await Note.insertMany([payload])
        res.send({"msg":"post the data into the note successfully"})
    }
    catch(err){
        console.log(err)
        res.send({"msg":"something went wrong "})
    }
})
Userrouter.patch("/patch/:noteid",async(req,res)=>{
    let payload=req.body
    let noteid=req.params.noteid
    let UserID=req.body.UserID
    let note=await Note.findOne({_id:noteid})
    console.log(note)
    if(UserID==note.UserID){
        await Note.findByIdAndUpdate({_id:noteid},payload)
        res.send({"msg":"note updated successfully"})
    }
    else{
        res.send("Not authorised")
    }
})

Userrouter.delete("/delete/:noteid",async(req,res)=>{
    let noteid=req.params.noteid
    let UserID=req.body.UserID
    let note=await Note.findOne({_id:noteid})
    if(UserID==note.UserID){
        await Note.findByIdAndDelete({_id:noteid})
        res.send({"msg":"note deleted successfully"})
    }
    else{
        res.send("Not authorised")
    }
})

module.exports={
    Userrouter
}