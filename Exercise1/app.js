const express = require('express');
const app = express();
const userRoutes = require('./routes/users');

const PORT = 3000;

app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});