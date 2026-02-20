const express = require('express');
const app = express();

app.use(express.json());

/* In-memory database */
let authors = [
    { id: 1, name: 'George Orwell', country: 'United Kingdom', birthYear: 1903 },
    { id: 2, name: 'Harper Lee', country: 'United States', birthYear: 1926 }
];

let nextId = 3;

/* ============================= */
/* CREATE AUTHOR (POST)          */
/* ============================= */
app.post('/api/authors', (req, res) => {
    const { name, country, birthYear } = req.body;

    if (!name || !country || !birthYear) {
        return res.status(400).json({
            error: 'Name, country, and birthYear are required'
        });
    }

    const newAuthor = {
        id: nextId++,
        name,
        country,
        birthYear: Number(birthYear)
    };

    authors.push(newAuthor);

    res.status(201).json(newAuthor);
});

/* ============================= */
/* GET ALL AUTHORS               */
/* ============================= */
app.get('/api/authors', (req, res) => {
    res.json(authors);
});

/* ============================= */
/* GET SINGLE AUTHOR             */
/* ============================= */
app.get('/api/authors/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const author = authors.find(a => a.id === id);

    if (!author) {
        return res.status(404).json({ error: 'Author not found' });
    }

    res.json(author);
});

/* ============================= */
/* UPDATE AUTHOR (PUT)           */
/* ============================= */
app.put('/api/authors/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = authors.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Author not found' });
    }

    const { name, country, birthYear } = req.body;

    if (!name || !country || !birthYear) {
        return res.status(400).json({
            error: 'Name, country, and birthYear are required'
        });
    }

    authors[index] = {
        id,
        name,
        country,
        birthYear: Number(birthYear)
    };

    res.json(authors[index]);
});

/* ============================= */
/* DELETE AUTHOR                 */
/* ============================= */
app.delete('/api/authors/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = authors.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Author not found' });
    }

    const deletedAuthor = authors.splice(index, 1)[0];

    res.json({
        message: 'Author deleted successfully',
        author: deletedAuthor
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Authors API running on http://localhost:${PORT}`);
});