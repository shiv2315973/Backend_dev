const express = require('express');
const app = express();

app.use(express.json());

/* Sample Data */
let books = [
    { id: 1, title: 'Book 1', author: 'Author A', year: 2001 },
    { id: 2, title: 'Book 2', author: 'Author B', year: 2002 },
    { id: 3, title: 'Book 3', author: 'Author C', year: 2003 },
    { id: 4, title: 'Book 4', author: 'Author D', year: 2004 },
    { id: 5, title: 'Book 5', author: 'Author E', year: 2005 },
    { id: 6, title: 'Book 6', author: 'Author F', year: 2006 },
    { id: 7, title: 'Book 7', author: 'Author G', year: 2007 },
    { id: 8, title: 'Book 8', author: 'Author H', year: 2008 }
];

/* ============================= */
/* GET ALL BOOKS WITH PAGINATION */
/* ============================= */

app.get('/api/books', (req, res) => {

    // Default values
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || books.length;

    if (page < 1 || limit < 1) {
        return res.status(400).json({
            error: 'Page and limit must be positive numbers'
        });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedBooks = books.slice(startIndex, endIndex);

    res.json({
        totalBooks: books.length,
        currentPage: page,
        totalPages: Math.ceil(books.length / limit),
        data: paginatedBooks
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Pagination API running on http://localhost:${PORT}`);
});