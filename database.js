// database.js - Configuração do banco de dados SQLite
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criar a tabela para armazenar os códigos
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS codigos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            valor TEXT NOT NULL
        )
    `);
});

module.exports = db;
