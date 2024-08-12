import React, { useContext } from 'react'
import Notecontext from '../contexts/notrs/Notecontext'


const Noteitem = (props) => {
    const context=useContext(Notecontext)
    const {deletenote}=context

    const {note,update} = props
    return (
        <div className='col-md-3 mt-4 '>
            <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                       <div className="d-flex gap-3 justify-content-end" >
                       <i className="fa-solid fa-trash " style={{ cursor: 'pointer' }} onClick={()=>{deletenote(note._id)}} ></i>
                       <i className="fa-regular fa-pen-to-square " style={{ cursor: 'pointer' }} onClick={()=>{update(note)}} ></i>
                       </div>
                    </div>
            </div>
        </div>                  
    )
}

export default Noteitem
