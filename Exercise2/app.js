const express = require('express');
const app = express();
const PORT = 3000;

/*
   Response Time Middleware
*/
app.use((req, res, next) => {

    const start = Date.now(); // capture start time

    // When response finishes
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} - ${duration}ms`);
    });

    next();
});

/* Test Routes */
app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/users', (req, res) => {
    setTimeout(() => {
        res.send('Users Page (delayed)');
    }, 500);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});