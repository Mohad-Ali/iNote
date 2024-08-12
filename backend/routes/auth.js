const express=require("express")
const router =express.Router()
const userModel =require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {body , validationResult} = require('express-validator')
const fetchuser =require("../middleware/fetchuser")

const JWT_SECRECT ="ali$goodboy"

// create

router.post("/createuser",[
  body("name","Enter a valid anme").isLength({min:3}),
  body("email","enter a valid email").isEmail(),
  body("password","Enter a strong password min 5 character").isLength({min:5}),
] , async(req,res)=>{
  let success=false

  const errors=validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({success,errors:errors.array()})
  }
  
  let { name,email,password} = req.body
  try {
  
    let user = await userModel.findOne({email:req.body.email}) // removed success

    if(user){
      return res.status(400).json({error:"user already exits"})
    }else{

      let salt = await bcrypt.genSalt(10)
      let secPass = await bcrypt.hash(password,salt)

      user = await userModel.create({
        name,
        email,
        password:secPass,
      })
      
      const data ={
        user:{
          id:user.id
        }
      }
      let token = jwt.sign(data,JWT_SECRECT);
      success=true;
      res.json({success,token});
    }
    
  } catch (error) {
    console.error(error.message)
    res.status(400).send("internal server error")
  }
})

// login

router.post("/login",[
  body("email","Enter a valid email").isEmail(),
  body("password","password cannot be blank").exists()
] , async(req,res)=>{

  let success=false

  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  const {email,password}=req.body
  try {

    let user = await userModel.findOne({email})

    if(!user){
      success=false
      return res.status(400).json({error:"pls enter your crt credentials"})
    }
    const check = await bcrypt.compare(password,user.password)

    if(!check){
      success= false
      return res.status(400).json({success,error:"pls enter your crt credentials"})
    }

    const data ={
      user:{
        id:user.id
      }
    }
    let token = jwt.sign(data,JWT_SECRECT);
    success=true;
    res.json({success,token});
    
  } catch (error) {
    console.error(error.message)
    res.status(400).send("internal server error")
  } 

})

// getuser data

router.post("/getuser",fetchuser,async(req,res)=>{
  try {
    userId = req.user.id
    const user = await userModel.findById(userId).select("-password")
    res.send(user)

  }catch (error) {
    console.error(error.message)
    res.status(400).send("internal server  error")
  } 
})


module.exports=router