const request = require('supertest');
const app = require('../../src/server');
const db = require('../../src/config/database');

let token;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@recicla.com', password: 'senha4321secreta' });
  token = res.body.token;
});

describe('Erros da API de Agendamentos', () => {
  it('Deve falhar login com credenciais inválidas', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@recicla.com', password: 'senhaErrada' });
    expect(res.statusCode).toBe(401);
  });

  it('Deve bloquear acesso à listagem sem token', async () => {
    const res = await request(app)
      .get('/api/agendamentos');
    expect(res.statusCode).toBe(401);
  });

  it('Deve impedir criação de agendamento com data inválida', async () => {
    const hoje = new Date();
    const hojeFormatado = hoje.toISOString().split('T')[0];

    const res = await request(app)
      .post('/api/agendamentos')
      .send({
        nome_completo: 'Teste Erro',
        endereco: 'Rua Teste',
        tipo_material: ['Vidro'],
        data_coleta: hojeFormatado,
        telefone: '(11) 12345-6789',
        email: 'teste@erro.com'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/data sugerida/i);
  });

  it('Deve falhar ao atualizar status para Concluído sem justificativa', async () => {
    const novo = await request(app)
      .post('/api/agendamentos')
      .send({
        nome_completo: 'Erro Status',
        endereco: 'Rua Exemplo',
        tipo_material: ['Metal'],
        data_coleta: '2025-08-15',
        telefone: '(11) 11111-1111',
        email: 'erro@status.com'
      });

    const res = await request(app)
      .patch(`/api/agendamentos/${novo.body.id}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'Concluído' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/justificativa/i);
  });
});
