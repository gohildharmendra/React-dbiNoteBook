const express = require('express');
const Note = require('../models/Note')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//Route 1: Get the all Notes logged User using method:GET "/api/notes/getallnotes" login required
router.get('/getallnotes',fetchuser,async (req,res)=>{
    try {
        const notes = await Note.find({user:req.user.id})
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")        
    }    
})

//Route 1: Add new Note using method:POST "/api/notes/addnote" login required
router.post('/addnote',fetchuser,[
    body('title','Enter min:3 char length').isLength({ min: 3 }),
    body('description','Enter min:5 char length').isLength({ min: 5 })
],async (req,res)=>{
    try {
    const { title, description, tag } = req.body
    //if there are errors, return bad request400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
        title, description, user:req.user.id
    })
    const saveNote = await note.save()
    res.json({status:200, msg:'Note Added Successfully'})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})

//Route 2: Update Note using method:PUT "/api/notes/updatenote" login required
router.put('/updatenote/:id',fetchuser, async (req,res)=>{
    try {
        const { title, description, tag } = req.body
        const newNote = {};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(400).send({error:'Not Found'})};
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }

})

module.exports = router