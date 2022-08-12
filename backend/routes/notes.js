const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    obj ={
        title:"Default Note",
        description:"default router set"
    }
    res.json(obj)
})

module.exports = router