const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "db@iNoteBook"
//Route-1 Create user using method:POST "/api/auth/createuser" no login required
router.post('/createuser',[
    body('name','Enter min:3 char length').isLength({ min: 3 }),
    body('email','Enter valid Email').isEmail(),
    body('password','Enter min:6 char length').isLength({ min: 5 })
], async (req,res)=>{
    //if there are errors, return bad request400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //User data created code
    try{
    let user = await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({error:"Sorry this email already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      })
      const data ={
          user:{
              id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET); 
        res.json({status:200, msg:'Record Added Successfully',authToken})  
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})

//Route-2 Authenticate a User using method:POST "/api/auth/login" no login required
router.post('/login',[
    body('email','Enter valid Email').isEmail(),
    body('password','Password can not blank').exists()
], async (req,res)=>{
    //if there are errors, return bad request400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }
        const data ={
            user:{
                id:user.id
              }
          }
          const authToken = jwt.sign(data, JWT_SECRET); 
          res.json({authToken})  
     
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")   
    }
})

//Route-3 Get logged User details using method:POST "/api/auth/getuser" login required
router.post('/getuser',fetchuser, async (req,res)=>{
try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)    
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error")
}
})
module.exports = router