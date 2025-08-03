const crypto = require('crypto');
const agendamentoRepository = require('../repositories/agendamentoRepository');

function validaDataColeta(dataColetaString) {
  const [ano, mes, dia] = dataColetaString.split('-').map(Number);
  
  const dataColeta = new Date(ano, mes - 1, dia);

  let diasUteisContados = 0;
  let dataMinima = new Date();
  dataMinima.setHours(0, 0, 0, 0);

  while (diasUteisContados < 2) {
    dataMinima.setDate(dataMinima.getDate() + 1);
    const diaDaSemana = dataMinima.getDay();
    if (diaDaSemana !== 0 && diaDaSemana !== 6) {
      diasUteisContados++;
    }
  }

  return dataColeta >= dataMinima;
}

function gerarProtocolo(id) {
  const numero = String(id).padStart(4, '0');
  const ano = new Date().getFullYear();
  return `RC-${numero}-${ano}`;
}


const agendamentoService = {
  create: async (agendamentoData) => {
    const dataEhValida = validaDataColeta(agendamentoData.data_coleta);

    if (!dataEhValida) {
      throw new Error('A data sugerida deve ser pelo menos 2 dias úteis após a data atual');
    }

      const resultado = await agendamentoRepository.create(agendamentoData);
      const protocolo = gerarProtocolo(resultado.id);
      await agendamentoRepository.updateProtocolo(resultado.id, protocolo);
      resultado.protocolo = protocolo;

    return resultado;
  },

  findAll: async (filters) => {
    return await agendamentoRepository.findAll(filters);
  },

  findById: async (id) => {
    const agendamento = await agendamentoRepository.findById(id);
    if (!agendamento) {
      throw new Error('Agendamento não encontrado');
    }
    return agendamento;
  },

  updateStatus: async (id, status, justificativa) => {
    if ((status === 'Concluído' || status === 'Cancelado') && !justificativa) {
      throw new Error('Justificativa é obrigatória para status Concluído ou Cancelado');
    }
    const updatedAgendamento = await agendamentoRepository.updateStatus(id, status, justificativa);
    if (!updatedAgendamento) {
      throw new Error('Agendamento não encontrado para atualização');
    }
    return updatedAgendamento;
  },
};

module.exports = agendamentoService;