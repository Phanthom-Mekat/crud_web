const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mekat',
    database: 'crud_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
});

app.get('/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/items', (req, res) => {
    const { name, description } = req.body;
    db.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    db.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Item updated' });
    });
});

app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM items WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Item deleted' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
