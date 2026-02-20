const http = require('http');
const url = require('url');

let todos = [];
let nextId = 1;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    res.setHeader('Content-Type', 'application/json');

    // GET all todos
    if (pathname === '/api/todos' && method === 'GET') {
        res.end(JSON.stringify(todos));
    }

    // GET single todo
    else if (pathname.match(/^\/api\/todos\/\d+$/) && method === 'GET') {
        const id = parseInt(pathname.split('/')[3]);
        const todo = todos.find(t => t.id === id);
        if (todo) {
            res.end(JSON.stringify(todo));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Todo not found' }));
        }
    }

    // POST new todo
    else if (pathname === '/api/todos' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const newTodo = JSON.parse(body);
            newTodo.id = nextId++;
            todos.push(newTodo);
            res.statusCode = 201;
            res.end(JSON.stringify(newTodo));
        });
    }

    // PUT update todo
    else if (pathname.match(/^\/api\/todos\/\d+$/) && method === 'PUT') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const id = parseInt(pathname.split('/')[3]);
            const index = todos.findIndex(t => t.id === id);

            if (index !== -1) {
                const updatedData = JSON.parse(body);
                todos[index] = { ...todos[index], ...updatedData };
                res.end(JSON.stringify(todos[index]));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Todo not found' }));
            }
        });
    }

    // DELETE todo
    else if (pathname.match(/^\/api\/todos\/\d+$/) && method === 'DELETE') {
        const id = parseInt(pathname.split('/')[3]);
        const index = todos.findIndex(t => t.id === id);

        if (index !== -1) {
            const deleted = todos.splice(index, 1);
            res.end(JSON.stringify(deleted[0]));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Todo not found' }));
        }
    }

    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

server.listen(3000, () => {
    console.log('TODO API running on http://localhost:3000');
});