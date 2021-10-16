const express = require('express');
const app = express();
const PORT = 3001;
let allNotes = require('./db/db.json');
const fs = require('fs');
const path = require('path');
let notesID = 0;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
// sets path of /notes to path in public folder
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});
// sets api path to allNotes which is set to the db.json file
app.get('/api/notes', (req, res) => {
    res.json(allNotes);
});
// adding a new note adds to the local api allNotes and creates and pushes an Id
app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    newNote["id"] = notesID;
    notesID++;

    allNotes.push(newNote);

    WriteNotes(allNotes);
    // reloads the notes after addition
    res.json(allNotes);
})
// matches the id of the note to be deleted, then removes that entry from the array
app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    // matches the id to the index of the array to delete the entry at that index
    for (i = 0; i < allNotes.length; i++) {
        if (id == allNotes[i].id) {
            allNotes.splice(i, 1);
            WriteNotes(allNotes);
        }        
    }
    // reloads the notes after deletion
    res.json(allNotes);
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
// function to write the array back to the json file after addition to or 
// deletion from the array. Made this a function to reduce redundancy
function WriteNotes (data) {
    fs.writeFile("./db/db.json", JSON.stringify(data), err => {
        if (err) {
            console.log(err);
        }

        console.log("Write Successful");
    });
}