import React, { useEffect, useRef,useState } from 'react'
import Noteitem from './Noteitem';
import {Addnote} from './Addnote';
import NoteContext from '../context/notes/NoteContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    let navigate = useNavigate()
    const context = useContext(NoteContext)
    const { notes, getNotes,editNote } = context;
    useEffect(() => {
        if(localStorage.getItem("token")){
            getNotes()
        }
        else{
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])
    
    const ref = useRef(null)
    const refClose = useRef(null)
    const [Note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
    
    const updateNote = (currNote) => {
        ref.current.click()
        setNote({id:currNote._id,etitle:currNote.title,edescription:currNote.description,etag:currNote.tag})
    }
    const handleClick = (e)=>{
        // console.log(Note);
        editNote(Note.id,Note.etitle,Note.edescription,Note.etag)
        refClose.current.click();
        props.showAlert("Updated Successfully","success")
    }
    const onChange = (e)=>{
        setNote({...Note,[e.target.name]:e.target.value})
    }
    
    return (
        <div>
            <Addnote showAlert = {props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input minLength={5} required onChange={onChange} type="text" className="form-control" name='etitle' value={Note.etitle} id="etitle" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input minLength={5} required onChange={onChange} type="text" className="form-control" value={Note.edescription} name='edescription' id="edescription" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input onChange={onChange} type="text" className="form-control" value={Note.etag} name='etag' id="etag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length===0 && 'No Notes to display'} 
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} showAlert = {props.showAlert} updateNote={updateNote} note={note} />
                })}
            </div>
        </div>
    )
}

export default Notes
