const express = require('express');

const app = express();

const PORT = 3001;

const allNotes = require('./db/db.json');

app.get('/api/notes', (req, res) => {
    res.json(allNotes);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});