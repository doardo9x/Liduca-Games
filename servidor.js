const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'liduca',
  password: '' // Senha vazia conforme especificado
});

// Verifica conexão com o banco de dados
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.message);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota para listar restaurantes, com filtro opcional por ID da categoria
app.get('/jogos', (req, res) => {
  let sql = 'SELECT * FROM jogos INNER JOIN generos ON jogos.id_genero = generos.id_genero';
  const { id_genero } = req.query;

  if (id_genero) {
    sql += ' WHERE jogos.id_genero = ?';
    db.query(sql, [id_genero], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } else {
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  }
});

// Rota para listar categorias
app.get('/generos', (req, res) => {
  const sql = 'SELECT * FROM generos';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar generos: ' + err.message);
      res.status(500).send('Erro interno do servidor');
    } else {
      res.json(results);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

