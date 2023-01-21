import React, { useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import { useContext } from 'react';

export const Addnote = (props) => {
    const context = useContext(NoteContext)
    const { addNote } = context;
    const [btntext, setBtntext] = useState("Add Note")
    const [Note, setNote] = useState({title:"",description:"",tag:""})
    const handleClick = async (e)=>{
        setBtntext("Adding...")
        e.preventDefault();
        await addNote(Note.title,Note.description,Note.tag)
        props.showAlert("Added Successfully","success")
        setBtntext("Add Note")
        setNote({title: "", description: "", tag: ""})
    }
    const onChange = (e)=>{
        setNote({...Note,[e.target.name]:e.target.value})
    }


    return (
        <div>
            <div className="container my-3">

                <h1>Write a Note</h1>
                <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={Note.title} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={Note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={Note.tag} onChange={onChange} minLength={5} required />
                </div>
               
                <button disabled={Note.title.length<5 || Note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>{btntext}</button>
            </form>
            </div>
        </div>
    )
}
