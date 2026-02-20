const express = require('express');
const router = express.Router();

const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    { id: 4, name: 'Alicia', email: 'alicia@example.com' }
];

router.get('/', (req, res) => {
    const { name } = req.query;

    if (name) {
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(name.toLowerCase())
        );
        return res.json(filteredUsers);
    }

    res.json(users);
});

module.exports = router;