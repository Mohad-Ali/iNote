import React, { useContext, useState } from 'react'
import Notecontext from '../contexts/notrs/Notecontext'


const Addnote = () => {
   const context= useContext(Notecontext)
   const {Addnotes}= context

   const [note, setnote] = useState({title:"",description:"",tag:""})

    const handleClick=(e)=>{
        e.preventDefault()
        Addnotes(note.title,note.description,note.tag)
        setnote({title:"",description:"",tag:""})
       
    }

    const handleChance=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})  
    }

  return (
    <div className="container mt-3">
        <h1>Add notes</h1>
        <form>
          <div className="col-5 mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" onChange={handleChance} value={note.title}  minLength={5} required name='title'  />
          </div>
          <div className="col-5 mb-3">
            <label htmlFor="description" className="form-label">description</label>
            <input type="text" className="form-control"  onChange={handleChance} id="description" value={note.description}  minLength={5} required name='description' />
          </div>
          <div className="col-5 mb-3">
                <label htmlFor="tag" className="form-label">tag</label>
                <input type="text" className="form-control" onChange={handleChance} minLength={5} value={note.tag} required id="tag" name='tag' />
          </div>
          <button disabled={note.title.length < 5 || note.description.length<5 } onClick={handleClick} type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
  )
}

export default Addnote
