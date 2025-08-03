const agendamentoService = require('../services/agendamentoService');

const agendamentoController = {
  createAgendamento: async (req, res) => {
    try {
      const novoAgendamento = await agendamentoService.create(req.body);
      res.status(201).json(novoAgendamento);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllAgendamentos: async (req, res) => {
    try {
      const agendamentos = await agendamentoService.findAll(req.query);
      res.status(200).json(agendamentos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar agendamentos' });
    }
  },

  getAgendamentoById: async (req, res) => {
    try {
      const agendamento = await agendamentoService.findById(req.params.id);
      res.status(200).json(agendamento);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  updateAgendamentoStatus: async (req, res) => {
    try {
      const { status, justificativa } = req.body;
      const agendamentoAtualizado = await agendamentoService.updateStatus(req.params.id, status, justificativa);
      res.status(200).json(agendamentoAtualizado);
    } catch (error) {
      res.status(error.message.includes('não encontrado') ? 404 : 400).json({ message: error.message });
    }
  },
};

module.exports = agendamentoController;