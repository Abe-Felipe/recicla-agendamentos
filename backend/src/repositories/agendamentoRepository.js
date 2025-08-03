const db = require('../config/database');

const agendamentoRepository = {
  create: async (agendamentoData) => {
    const { nome_completo, endereco, tipo_material, data_coleta, telefone, email } = agendamentoData;
    const query = {
      text: `INSERT INTO agendamentos (nome_completo, endereco, tipo_material, data_coleta, telefone, email, status)
            VALUES ($1, $2, $3, $4, $5, $6, 'Pendente') RETURNING *`,
      values: [nome_completo, endereco, tipo_material, data_coleta, telefone, email],
    };
    const result = await db.query(query.text, query.values);
    return result.rows[0];
  },

  findAll: async (filters = {}) => {
    let queryText = 'SELECT * FROM agendamentos WHERE 1=1';
    const values = [];

    if (filters.status) {
      values.push(filters.status);
      queryText += ` AND status = $${values.length}`;
    }

    if (filters.data_coleta) {
      values.push(filters.data_coleta);
      queryText += ` AND data_coleta = $${values.length}`;
    }

    queryText += ' ORDER BY data_coleta ASC';

    const result = await db.query(queryText, values);
    return result.rows;
  },

  findById: async (id) => {
    const result = await db.query('SELECT * FROM agendamentos WHERE id = $1', [id]);
    return result.rows[0];
  },

  updateStatus: async (id, status, justificativa) => {
    const query = {
      text: 'UPDATE agendamentos SET status = $1, justificativa = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      values: [status, justificativa, id],
    };
    const result = await db.query(query.text, query.values);
    return result.rows[0];
  },

  updateProtocolo: async (id, protocolo) => {
    const query = 'UPDATE agendamentos SET protocolo = $1 WHERE id = $2 RETURNING *';
    const values = [protocolo, id];
    const result = await db.query(query, values);
    return result.rows[0];
  },
};

module.exports = agendamentoRepository;
