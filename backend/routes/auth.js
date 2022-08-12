const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//Create user using method:POST "/api/auth/createuser" no login required
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
      res.json({status:200, msg:'record added successfully',data:user})   
    }catch(error){
        console.log(error.message);
        res.status(500).send("Some Error Ocurred")
    }
})



module.exports = router