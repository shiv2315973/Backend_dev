const express = require('express');
const app = express();

app.use(express.json());

/* Sample Data */
let books = [
    { id: 1, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', year: 1997 },
    { id: 2, title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', year: 1998 },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
    { id: 4, title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937 }
];

/* ============================= */
/* SEARCH BOOKS BY TITLE        */
/* ============================= */

app.get('/api/books/search', (req, res) => {

    const { title } = req.query;

    if (!title) {
        return res.status(400).json({
            error: 'Query parameter "title" is required'
        });
    }

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(title.toLowerCase())
    );

    res.json({
        totalResults: filteredBooks.length,
        data: filteredBooks
    });
});

/* GET ALL BOOKS */
app.get('/api/books', (req, res) => {
    res.json(books);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Search API running on http://localhost:${PORT}`);
});