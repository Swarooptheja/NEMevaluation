

let express=require("express")
const { mainconnection } = require("./config/connection")
let jwt=require("jsonwebtoken")
var cors = require('cors')
let bcrypt=require("bcrypt")
const { User } = require("./Model/Usermodel")
const { Userrouter } = require("./Router/noterouter")
const { auth } = require("./Authetification")
// const { authentification } = require("./Authetification")
let app=express()
app.use(express.json())

app.use(cors())


app.post("/signin",async(req,res)=>{
   let {name,email,password}=req.body
   try{
    bcrypt.hash(password, 10, async function(err, hash) {
        let user=new User({email,password:hash,name})
        await user.save()
        res.send("sign in successful")
    });

   }
   catch(err){
    console.log(err)
   }
})

app.post("/login",async(req,res)=>{
    let {email,password}=req.body
    try{
        let data=await User.find({email})
        if(data.length>0){
            let hash=data[0].password
            bcrypt.compare(password, hash, function(err, result) {
                if(result){
                    var token = jwt.sign({ UserID:data[0]._id }, 'secrete',{expiresIn:"1h"});
                    console.log(token)
                    res.send({"msg":"loginsuceess",token:token})
                }
                else {
                    res.send("please login again")
                }
            });

        }
        else{
            res.send("please check your credentials once")
        }
    }
    catch(err){
        console.log(err)
    }
})


app.use(auth)

app.use("/todos",Userrouter)




app.listen(7200,async()=>{
    await mainconnection
    console.log("connect successfull")
})