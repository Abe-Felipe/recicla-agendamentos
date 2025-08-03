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

describe('Agendamentos API', () => {
  it('Deve criar um agendamento', async () => {
    const res = await request(app)
      .post('/api/agendamentos')
      .send({
        nome_completo: 'Teste Usuário',
        endereco: 'Rua Teste, 123',
        tipo_material: ['Papel'],
        data_coleta: '2025-08-10',
        telefone: '(11) 99999-9999',
        email: 'teste@teste.com'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('Deve listar agendamentos com token', async () => {
    const res = await request(app)
      .get('/api/agendamentos')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Deve atualizar status do agendamento', async () => {
    const res = await request(app)
      .patch('/api/agendamentos/1/status')
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'Concluído', justificativa: 'Coleta realizada.' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Concluído');
  });
});

afterAll(async () => {
  await db.pool.end();
});
