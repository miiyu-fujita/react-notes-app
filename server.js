const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const router = express.Router();

const mongoose = require('mongoose');
require('dotenv').config()
const Schema = mongoose.Schema;

app.use(cors());
app.use(bodyParser.json());


// --------- MODELS --------------

// create schema for notes ("template")
const NoteSchema = new Schema({
    title: String, 
    content: String
});

// create mongoose model, constructor for documents (ex: a note is a document in the db)
const Notes = mongoose.model('Notes', NoteSchema)



// --------- SETTING UP THE API ENDPOINTS --------

// add new note to db [CREATE]
app.post('/add', async (req, res) => {
    const data = req.body;
    const newNote = await Notes.create(data);
    res.json(newNote);
});

// get all notes [READ]
app.get('/notes', async (req, res) => {
    const notes = await Notes.find({})
    res.json(notes)
});

// delete a note [DELETE]
app.delete('/delete/:id', async (req, res) => {
    var deleteId = req.params.id;
    console.log(typeof deleteId);
    await Notes.findByIdAndRemove( mongoose.Types.ObjectId(deleteId) );
    res.send("a");
})


// ----------- CONNECT TO DATABASE -------------------------

mongoose 
    .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Database connected successfully!`))
    .catch((err) => console.log(err));



// bind and listen to connections on PORT -- creates server (?)
app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});