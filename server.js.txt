const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static('public/uploads'));

const profissionalRoutes = require('./routes/profissionais');
const authRoutes = require('./routes/auth');

app.use('/api/profissionais', profissionalRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});