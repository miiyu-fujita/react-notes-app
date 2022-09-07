import React, { useState } from 'react'

function CreateNote(props) {

    const [noteContent, setNoteContent] = useState({
        title: "",
        content: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setNoteContent(prevNote => {
            return {...prevNote, 
                [name]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        // pass note back to App
        props.onAdd(noteContent);

        // reset note content 
        setNoteContent({
            title: "",
            content: ""
        })
    }


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} value={noteContent.title} name="title" placeholder="Title"/>
            <input onChange={handleChange} value={noteContent.content} name="content" placeholder="Take a note... " rows="3" />
            <button type="submit">Add</button>
        </form>
    </div>
  )
}

export default CreateNote;