const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* In-memory data */
let posts = [
    { id: 1, title: 'First Post', content: 'This is my first blog post.' },
    { id: 2, title: 'Second Post', content: 'Learning Express is fun!' }
];

let nextId = 3;

/* LIST ALL POSTS */
app.get('/', (req, res) => {
    res.render('index', { posts });
});

/* VIEW SINGLE POST */
app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));

    if (!post) {
        return res.status(404).send('Post not found');
    }

    res.render('post', { post });
});

/* SHOW CREATE FORM */
app.get('/new', (req, res) => {
    res.render('new');
});

/* CREATE POST */
app.post('/posts', (req, res) => {
    const { title, content } = req.body;

    const newPost = {
        id: nextId++,
        title,
        content
    };

    posts.push(newPost);

    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Blog running on http://localhost:${PORT}`);
});