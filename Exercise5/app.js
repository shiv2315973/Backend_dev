const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Set EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Gallery Route
app.get('/gallery', (req, res) => {

    const imagesPath = path.join(__dirname, 'public', 'images');

    // Read image filenames dynamically
    const images = fs.readdirSync(imagesPath);

    res.render('gallery', { images });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 