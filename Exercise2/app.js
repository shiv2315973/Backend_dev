const express = require('express');
const app = express();

app.use(express.json());

let books = [
    { id: 1, title: '1984', author: 'George Orwell', year: 1949 }
];

let nextId = 2;

/* ============================= */
/* YEAR VALIDATION MIDDLEWARE    */
/* ============================= */

function validateYear(req, res, next) {
    const { year } = req.body;

    if (year === undefined) {
        return res.status(400).json({
            error: 'Year is required'
        });
    }

    const numericYear = Number(year);
    const currentYear = new Date().getFullYear();

    if (isNaN(numericYear)) {
        return res.status(400).json({
            error: 'Year must be a valid number'
        });
    }

    if (numericYear < 1000 || numericYear > currentYear) {
        return res.status(400).json({
            error: `Year must be between 1000 and ${currentYear}`
        });
    }

    next();
}

/* ============================= */
/* CREATE BOOK                   */
/* ============================= */

app.post('/api/books', validateYear, (req, res) => {
    const { title, author, year } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            error: 'Title and author are required'
        });
    }

    const newBook = {
        id: nextId++,
        title,
        author,
        year: Number(year)
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

/* ============================= */
/* UPDATE BOOK (PUT)             */
/* ============================= */

app.put('/api/books/:id', validateYear, (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    const { title, author, year } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            error: 'Title and author are required'
        });
    }

    books[bookIndex] = {
        id,
        title,
        author,
        year: Number(year)
    };

    res.json(books[bookIndex]);
});

/* GET ALL BOOKS */
app.get('/api/books', (req, res) => {
    res.json(books);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});