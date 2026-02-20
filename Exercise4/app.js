const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Set EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

// Example route
app.get('/about', (req, res) => {
    res.send('About Page');
});

/*
   IMPORTANT:
   404 middleware must be LAST
*/
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Page Not Found',
        url: req.originalUrl
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});