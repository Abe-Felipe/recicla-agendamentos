const request = require('supertest');
const app = require('../../src/server');
const db = require('../../src/config/database');

function gerarDataUtil(dias = 3) {
  const hoje = new Date();
  let count = 0;
  while (count < dias) {
    hoje.setDate(hoje.getDate() + 1);
    const dia = hoje.getDay();
    if (dia !== 0 && dia !== 6) count++;
  }
  return hoje.toISOString().split('T')[0];
}

async function obterTokenValido() {
  const response = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@recicla.com', password: 'senha4321secreta' });
  return response.body.token;
}

describe('Testes de Regras de Negócio', () => {

  test('Deve rejeitar agendamento com data inferior a 2 dias úteis', async () => {
    const hoje = new Date().toISOString().split('T')[0];
    const resposta = await request(app)
      .post('/api/agendamentos')
      .send({
        nome_completo: "Teste Data Inválida",
        endereco: "Rua A, 123",
        tipo_material: ["Plástico"],
        data_coleta: hoje,
        telefone: "99999-9999",
        email: "teste@invalido.com"
      });

    expect(resposta.statusCode).toBe(400);
    expect(resposta.body.message).toMatch(/2 dias úteis/i);
  });

  test('Deve gerar protocolo no formato RC-0001-2025', async () => {
    const resposta = await request(app)
      .post('/api/agendamentos')
      .send({
        nome_completo: "Teste Protocolo",
        endereco: "Rua B, 456",
        tipo_material: ["Vidro"],
        data_coleta: gerarDataUtil(),
        telefone: "88888-8888",
        email: ""
      });

    expect(resposta.statusCode).toBe(201);
    expect(resposta.body.protocolo).toMatch(/^RC-\d{4}-\d{4}$/);
  });

  test('Deve rejeitar status "Cancelado" sem justificativa', async () => {
    const novo = await request(app)
      .post('/api/agendamentos')
      .send({
        nome_completo: "Teste Status",
        endereco: "Rua C, 789",
        tipo_material: ["Metal"],
        data_coleta: gerarDataUtil(),
        telefone: "77777-7777",
        email: ""
      });

    const token = await obterTokenValido();

    const resposta = await request(app)
      .patch(`/api/agendamentos/${novo.body.id}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: "Cancelado",
        justificativa: ""
      });

    expect(resposta.statusCode).toBe(400);
    expect(resposta.body.message).toMatch(/justificativa é obrigatória/i);
  });
});
