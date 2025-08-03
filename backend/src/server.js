require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const agendamentoRoutes = require('./routes/agendamentoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API de Agendamento de Coleta está funcionando.' });
});

app.use('/api/agendamentos', agendamentoRoutes);
app.use('/api/auth', authRoutes);

// Só roda o listen se o arquivo for executado diretamente
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
