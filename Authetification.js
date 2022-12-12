

let jwt=require("jsonwebtoken")
let auth=(req,res,next)=>{
    let token=req.headers?.authorization?.split(" ")[1]
    if(token){
        let decoded=jwt.verify(token,"secrete")
        if(decoded){
            let UserID=decoded.UserID
            req.body.UserID=UserID
            next()
        }
        else{
            res.send("please login again")
        }
    }
    else{
        res.send("please login again")
    }
    
}
module.exports={
    auth
}