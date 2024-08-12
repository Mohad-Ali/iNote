import React, { useState } from 'react'
import Notecontext from './Notecontext'

const Notestate = (props) => {

    const host = "http://localhost:5000"
    const initialnote =[]
    const [notes, setnotes] = useState(initialnote)

    //get notes
    const getnotes = async() => {
        //fetching api
        const response = await fetch(`${host}/api/note/fetchallnote`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token":  localStorage.getItem("token")
            },
        });
        const json = await response.json();
        setnotes(json)
    }

    //Add notes
    const Addnotes = async(title, description, tag) => {
        //fetching api
        const response = await fetch(`${host}/api/note/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token":  localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        setnotes(notes.concat(note))

    }

    // delete

    const deletenote =async (id) => {
        //fetch api    
        const response = await fetch(`${host}/api/note/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "token":  localStorage.getItem("token")
            },
        });
        const json = await response.json();
        console.log(json)

        const newnote = notes.filter(note => { return note._id !== id })
        setnotes(newnote)
    }

    //edit note

    const editnote =async (id, title, description, tag) => {
        //fetching api
        const response =await fetch(`${host}/api/note/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "token":  localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        console.log(json)

        let newnotes=JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < newnotes.length; index++) {
            const element = newnotes[index];
            if (element._id === id) {
                newnotes[index].title = title;
                newnotes[index].description = description;
                newnotes[index].tag = tag;
                break;
            }
        }
        setnotes(newnotes)
    }


    return (
        <Notecontext.Provider value={{ notes, setnotes, Addnotes, deletenote, editnote,getnotes }}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default Notestate
