const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// GET route → show contact form
app.get('/contact', (req, res) => {
    res.render('contact');
});

// POST route → handle form submission
app.post('/contact', (req, res) => {

    const { name, email, message } = req.body;

    res.render('success', {
        name,
        email,
        message
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});