const express = require('express');
const app = express();
const PORT = 3001;
let allNotes = require('./db/db.json');
const fs = require('fs');
const path = require('path');
let notesID = 1;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(allNotes);
});

app.post('/api/notes', (req, res) => {
    
    let newNote = req.body;
    newNote["id"] = notesID;
    notesID++;

    allNotes.push(newNote);

    WriteNotes(allNotes);

    res.json(allNotes);
})

app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
       
    for (i = 0; i < allNotes.length; i++) {
        if (id == allNotes[i].id) {
            allNotes.splice(i, 1);
            WriteNotes(allNotes);
        }        
    }
        
    res.json(allNotes);
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

function WriteNotes (data) {
    fs.writeFile("./db/db.json", JSON.stringify(data), err => {
        if (err) {
            console.log(err);
        }

        console.log("Write Successful");
    });
}