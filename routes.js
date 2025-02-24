// routes.js - Define as rotas da API
const express = require('express');
const db = require('./database');

const router = express.Router();

// Rota para salvar um novo código no banco
router.post('/salvar', (req, res) => {
    const { valor } = req.body;

    if (!valor) {
        return res.status(400).json({ error: 'O valor do código é obrigatório.' });
    }

    db.run('INSERT INTO codigos (valor) VALUES (?)', [valor], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, valor });
    });
});

// Rota para buscar todos os códigos salvos
router.get('/codigos', (req, res) => {
    db.all('SELECT * FROM codigos', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

module.exports = router;
// routes.js - Define as rotas da API
const express = require('express');
const db = require('./database');

const router = express.Router();

// Rota para salvar um novo código no banco
router.post('/salvar', (req, res) => {
    const { valor } = req.body;

    if (!valor) {
        return res.status(400).json({ error: 'O valor do código é obrigatório.' });
    }

    db.run('INSERT INTO codigos (valor) VALUES (?)', [valor], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, valor });
    });
});

// Rota para buscar todos os códigos salvos
router.get('/codigos', (req, res) => {
    db.all('SELECT * FROM codigos', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

module.exports = router;
