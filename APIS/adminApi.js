//create mini express app
const exp=require("express");
const adminApiObj=exp.Router();
const asyncHandler=require("express-async-handler")

//get req handler
adminApiObj.get("/getadmins",asyncHandler(async(req,res,next)=>{
    
    //get admin collection object
    let adminCollectionObject=req.app.get("adminCollectionObject")

    let admins=await adminCollectionObject.find().toArray();
    res.send({message:admins})
}))

//export
module.exports=adminApiObj;