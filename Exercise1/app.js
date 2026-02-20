const express = require('express');
const app = express();

app.use(express.json());

let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
    { id: 2, title: '1984', author: 'George Orwell', year: 1949 },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 }
];

app.get('/api/books', (req, res) => {

    let filteredBooks = books;
    const { author, year } = req.query;

    if (author) {
        filteredBooks = filteredBooks.filter(book =>
            book.author.toLowerCase().includes(author.toLowerCase())
        );
    }

    if (year) {
        filteredBooks = filteredBooks.filter(book =>
            book.year === parseInt(year)
        );
    }

    res.json(filteredBooks);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});