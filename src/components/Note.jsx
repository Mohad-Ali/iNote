import React, { useContext, useEffect, useRef, useState } from 'react'
import Notecontext from '../contexts/notrs/Notecontext'
import Noteitem from './Noteitem'
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom'

const Note = () => {
    const context = useContext(Notecontext)
    const { notes, getnotes,editnote } = context
    let navigate = useNavigate()

    useEffect(() => {
        
        if(localStorage.getItem("token")){
            getnotes()
        }else{
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])
    
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""})

    const update = (currentnote) => {
        ref.current.click()
        setnote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
    }


    const handleClick=(e)=>{
        console.log("updating..",note)
        editnote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
    
    }

    const handleChance=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})  
    }

    return (
        <>
            <Addnote />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form>
                                <div className="col mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" onChange={handleChance} value={note.etitle} minLength={5} required name='etitle' />
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="description" className="form-label">description</label>
                                    <input type="text" className="form-control" onChange={handleChance} id="edescription" value={note.edescription} minLength={5} required name='edescription' />
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="tag" className="form-label">tag</label>
                                    <input type="text" className="form-control" onChange={handleChance} id="etag" value={note.etag} minLength={5} required name='etag' />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length<5 } type="button" className="btn btn-primary" onClick={handleClick} >Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <h2>your notes</h2>
                {(notes.length > 0) ?
                    notes.map(note => {
                        return <Noteitem key={note._id} update={update} note={note} />
                    }) : <p className='mt-5 text-center'>note is empty</p>
                }
            </div>
        </>
    )
}

export default Note
