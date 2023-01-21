import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const Noteitem = (props) => {
    const context = useContext(NoteContext)
    const { note, updateNote} = props;
    const { deleteNote } = context;

    return (
        <div className='col-md-4'>
            <div className="card  mb-4 row-md-3 rounded-3 shadow-sm border-primary">
                <div className="card-header py-3 text-bg-primary border-primary">
                    <h4 className="my-0 fw-normal">{note.title}</h4>
                </div>
                <div className="card-body">
                    <p>{note.description}</p>
                    <i className='far fa-trash-alt mx-2' onClick={async () => {props.showAlert("Deleting...","warning");await deleteNote(note._id);props.showAlert("Deleted Successfully","success")}}></i>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem