const express=require("express")
const router =express.Router()
const noteModel =require("../models/Note")
const fetchuser =require("../middleware/fetchuser")
const { body,validationResult } = require("express-validator")

//frtchall
router.get("/fetchallnote",fetchuser,async(req,res)=>{
    try {
        const notes = await noteModel.find({userid:req.user.id})
        res.json(notes)
        
    } catch (error) {
        console.error(error.message)
        res.status(400).send("internal server error")
      }
})


//addnote
router.post("/addnote",fetchuser,[
    body("title","enter a valid title").isLength({min:3}),
    body("description","enter atlest 5 character").isLength({min:5}),
],async(req,res)=>{
    
    try {

        const {title,description,tag} = req.body

        const errors=validationResult(req)
        if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()})
        }
    

        const addnote = new noteModel({
            title,
            description,
            tag,
            userid:req.user.id
        })  

        let savedresult = await addnote.save()
        res.send(savedresult)
        
    } catch (error) {
    console.error(error.message)
    res.status(400).send("internal server error")
  }
})

//update

router.put("/updatenote/:id",fetchuser,async(req,res)=>{

    const{title,description,tag}=req.body

    let newNote ={}

    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    let note = await noteModel.findById(req.params.id)
    if(!note){return res.status(404).send("not found")}    

    if(note.userid.toString() !== req.user.id){
        return res.status(404).send("not found")
    }

    note= await noteModel.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
    res.json({note})

})

//delete

router.delete("/deletenote/:id",fetchuser,async(req,res)=>{

    let note = await noteModel.findById(req.params.id)
    if(!note){return res.status(404).send("not found")}

    if(note.userid.toString() !== req.user.id ){
        return res.status(404).send("not found")
    }
    note = await noteModel.findByIdAndDelete(req.params.id)
    res.json({"success":"deletation",note:note})
})

module.exports = router