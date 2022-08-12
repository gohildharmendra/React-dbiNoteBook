const express = require('express')
const router = express.Router();

router.get('/',(req,res)=>{
    obj ={
        name:"Gohil",
        Email:"db@gmail.com"
    }
    res.json(obj)
})

module.exports = router