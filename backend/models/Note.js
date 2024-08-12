const mongoose=require("mongoose")

const NotesSchema = mongoose.Schema({
        userid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        title:{
            type:String,
            require:true
        },
        description:{
            type:String,
            require:true
        },
        tag:{
            type:String,
            require:true
        },
        date:{
            type:Date,
            default:Date.now
        }
})

module.exports=mongoose.model("note",NotesSchema)