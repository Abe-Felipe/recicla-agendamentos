const express = require('express');
const router = express.Router();

const agendamentoController = require('../controllers/agendamentoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', agendamentoController.createAgendamento);

router.get('/', authMiddleware, agendamentoController.getAllAgendamentos);

router.get('/:id', authMiddleware, agendamentoController.getAgendamentoById);

router.patch('/:id/status', authMiddleware, agendamentoController.updateAgendamentoStatus);

module.exports = router;