const express = require('express');
const router = express.Router();
const connection = require('../db');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.get('/profissionais', (req, res) => {
  const sql = 'SELECT id, nome, localizacao, genero, preco, imagem, destaque FROM profissionais ORDER BY destaque DESC';
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.get('/profissionais/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM profissionais WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
});

router.post('/profissionais', upload.single('imagem'), (req, res) => {
  const { nome, email, telefone, localizacao, genero, descricao, preco, destaque } = req.body;
  const imagem = req.file.filename;
  const sql = 'INSERT INTO profissionais (nome, email, telefone, localizacao, genero, descricao, preco, imagem, destaque) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(
    sql,
    [nome, email, telefone, localizacao, genero, descricao, preco, imagem, destaque === 'true'],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, mensagem: "Profissional cadastrado!" });
    }
  );
});

module.exports = router;