const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Rota para salvar um código
app.post('/salvar', (req, res) => {
    const { valor } = req.body;
    if (!valor) {
        return res.status(400).json({ error: 'Código é obrigatório' });
    }

    db.run('INSERT INTO codigos (valor) VALUES (?)', [valor], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, valor });
    });
});

// Rota para buscar os códigos salvos
app.get('/codigos', (req, res) => {
    db.all('SELECT * FROM codigos', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
