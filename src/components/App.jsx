import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import Note from './Note'
import CreateNote from './CreateNote'

function App() {

    const url = 'http://localhost:4000';
    const [notes, setNotes] = useState([]);

    async function addNote(note) {
        
        // add new note to array 
        
        const response = await fetch(url + '/add', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(note)
        });    
        
        const data = await response.json();
        setNotes(prevNotes => [...prevNotes, data]);
        console.log(data); 
    }

    async function deleteNote(id) {
      
      const response = await fetch(url + `/delete/${id}`, {
          method: 'DELETE', 
      })

        setNotes(prevNotes => prevNotes.filter((note) => {
          return note._id !== id
        }))
    }

    useEffect(() => {
        // fetch stored notes from db on render 
        fetch(url + '/notes')
          .then((res) => res.json())
          .then((notes) => setNotes(notes));
        }, []);


  return (
    <div>
    <Header />
    <CreateNote 
    onAdd={addNote}
    />
    <div className = "note-container">
    {notes.map((noteItem, index) => 
    <Note 
    id={noteItem._id}
    key={index} 
    title={noteItem.title} 
    content={noteItem.content}
    onDelete={deleteNote}
    />
    )}
    </div>
    <Footer />
    </div>
  );
}

export default App;