const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let users = [];

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
