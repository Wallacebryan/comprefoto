const express = require('express');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcryptjs');

router.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;
  const hash = await bcrypt.hash(senha, 10);
  const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  connection.query(sql, [nome, email, hash], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ sucesso: true });
  });
});

router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  connection.query(sql, [email], async (err, results) => {
    if (err || !results.length) return res.status(400).json({ erro: "Email ou senha inválidos" });

    const usuario = results[0];
    const valid = await bcrypt.compare(senha, usuario.senha);
    if (!valid) return res.status(400).json({ erro: "Email ou senha inválidos" });

    res.json({ logado: true, usuario });
  });
});

module.exports = router;