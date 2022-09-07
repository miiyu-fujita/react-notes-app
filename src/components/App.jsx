import React, { useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Note from './Note'
import CreateNote from './CreateNote'

function App() {
    const [notes, setNotes] = useState([]);

    function addNote(note) {
        
        // add new note to array 
        setNotes(prevNotes => [...prevNotes, note]);
    }

    function deleteNote(id) {

        setNotes(prevNotes => prevNotes.filter((note, index) => {return (index !== id)}))
    }


  return (
    <div>
    <Header />
    <CreateNote 
    onAdd={addNote}
    />
    {notes.map((noteItem, index) => 
    <Note 
    id={index}
    key={index} 
    title={noteItem.title} 
    content={noteItem.content}
    onDelete={deleteNote}
    />
    )}
    <Footer />
    </div>
  );
}

export default App;