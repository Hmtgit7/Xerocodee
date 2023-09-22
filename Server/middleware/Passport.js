//middleware working 
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model("User")
const dotenv = require('dotenv')

module.exports=(req,res,next)=>{
   const {authorization} = req.headers
   if(!authorization){
    // console.log()
      return res.status(401).json({error:"you must be logged in"})
   }
   const token=authorization.replace("Bearer","")
   //console.log(token)
   jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
       if(err){
         //console.log(error)
         return   res.status(401).json({ error:"you must be logged in " })
       }
       const{_id}=payload
       User.findById(_id).then(userdata=>{
           req.user=userdata
           next()
       })
       
   })
}