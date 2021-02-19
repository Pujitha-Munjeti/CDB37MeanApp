//create mini express app
const exp=require("express");
const userApiObj=exp.Router();

//import bcry
const bcryptjs=require("bcryptjs");

const jwt=require("jsonwebtoken")
const verifyToken=require("./middlewares/verifyToken")

//import cloudinary
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer=require("multer")



//configure cloudinary
cloudinary.config({
    cloud_name: 'diqtn7ozg',
    api_key: '512249956943975',
    api_secret: 'k2WkjpyCn8toi2WNROdsbNoA3U8'
});


//configure cloudinary storage

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'cdb37',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    },
});

//congigure multer
var upload = multer({ storage: storage });























const asyncHandler=require("express-async-handler")

//extract body of req obj
userApiObj.use(exp.json());

//post req handler for user register
userApiObj.post("/register", upload.single('photo'), asyncHandler(async(req,res,next)=>{
    //get user collection object
    let userCollectionObject = req.app.get("userCollectionObject");
    
    
    let userObj =  JSON.parse(req.body.userObj)
    //let userObj = req.body;
    console.log("user object is",userObj);
    //check for user in db
    let user = await userCollectionObject.findOne({username:userObj.username});

    //if username alreaddy taken
    if(user!==null){
        res.send({message:"user existed"});
    }
    else{
        //hash the password
        let hashedpwd = await bcryptjs.hash(userObj.password,6);

        //replace plain txt pswdd with hashed pswd
        userObj.password = hashedpwd;

         //add userImagelink
         userObj.userImgLink = req.file.path;

        //create user
        let success = await userCollectionObject.insertOne(userObj);
        res.send({message:"user created"});
    }
   // console.log("user obj is",req.body);
}))



//user login
userApiObj.post("/",asyncHandler(async(req,res,next)=>{
    //get user collectionObject
    let userCollectionObject = req.app.get("userCollectionObject");

    let userCredObj = req.body;
    //verify  username
    let user = await userCollectionObject.findOne({username:userCredObj.username})

    if(user == null){
        res.send({message:"Invalid username"})
    }
    else{
        //verify password
        let status = await bcryptjs.compare(userCredObj.password,user.password);

        //if pswd matched
        if(status == true){
            //create a token
            let token = await jwt.sign({username:user.username},"abcd",{expiresIn:10});

            //send token
            res.send({message:"success",signedToken:token,username:user.username});
        }
        else{
            res.send({message:"Invalid password"});
        }
    }
}))



//get user
userApiObj.get("/getuser/:username",verifyToken,asyncHandler(async (req,res,next)=>{
    //get user collectionobject
    let userCollectionObject = req.app.get("userCollectionObject")
   let userObj=await userCollectionObject.findOne({username:req.params.username})
   res.send({message:"success",user:userObj})
}))


//update user
userApiObj.put("/upadteuser/:username",asyncHandler(async(req,res,next)=>{
    //get user 
    let userCollectionObject = req.app.get("userCollectionObject")
    let userObj=await userCollectionObject.UpdateOne({username:req.params.username},{$set:{
        email:userObj.email,
        password:userObj.password,
        username:userObj.username,
        address:userObj.address,
        city:userObj.city,
        state:userObj.state,
        pincode:userObj.pincode
    }})
   res.send({message:userObj})
}))
//export
module.exports = userApiObj;