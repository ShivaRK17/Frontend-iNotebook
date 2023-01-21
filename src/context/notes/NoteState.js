import { useState } from "react";
import NoteContext from "./NoteContext";
const baseUrl = process.env.REACT_APP_BASE_URL

const NoteState= (props)=>{
    // const host = "http://localhost:5000"
    const host = baseUrl;
    const notesInitial = []
      const [notes, setnotes] = useState(notesInitial)

    //Get all notes
    const getNotes = async ()=>{
        const resp = await fetch(`${host}/api/notes/getnotes`,{
            method:'GET',
            headers:{
                "Content-type": "application/json; charset=UTF-8",
                "auth-token":localStorage.getItem("token")
            }
        })
        const json = await resp.json()
        // console.log(json);
        setnotes(json)
    }

      //Add a note
      const addNote = async (title,description,tag)=>{
        const resp = await fetch(`${host}/api/notes/addnote`,{
            method:'POST',
            headers:{
                "Content-type": "application/json; charset=UTF-8",
                "auth-token":localStorage.getItem("token")
            },
            body: JSON.stringify({title,description,tag})
        })
        const note = await resp.json()
        // console.log(note);
        setnotes(notes.concat(note))
        // notes.push(note);
        // setnotes(notes)
      }

      //Delete a Note
      const deleteNote = async (id)=>{
        const resp = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:'DELETE',
            headers:{
                "Content-type": "application/json; charset=UTF-8",
               "auth-token":localStorage.getItem("token")
            }
        })
        // eslint-disable-next-line
        const json = resp.json();
        // console.log(json);
        // console.log("Delete note with id",id);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setnotes(newNotes);
        
      }

      //Edit a Note
      const editNote = async (id,title,description,tag)=>{
        const resp = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method:'PUT',
            headers:{
                "Content-type": "application/json; charset=UTF-8",  
                "auth-token":localStorage.getItem("token")
            },
            body: JSON.stringify({title,description,tag})
        })
        // eslint-disable-next-line
        const json = await resp.json()
        // console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes))

        for (let i = 0; i < newNotes.length; i++) {
            const element = newNotes[i];
            if(element._id===id){
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        setnotes(newNotes)
      }


 return(
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
    </NoteContext.Provider>
 )
}

export default NoteState;