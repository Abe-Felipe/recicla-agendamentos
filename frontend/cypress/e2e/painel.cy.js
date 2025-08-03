describe('Painel Administrativo - Testes E2E', () => {
  const email = 'admin@recicla.com';
  const senha = 'senha4321secreta';

  beforeEach(() => {
    cy.visit('/login.html');
    cy.get('#email').type(email);
    cy.get('#password').type(senha);
    cy.get('#login-button').click();
    cy.url().should('include', '/painel.html');
  });

  it('Deve exibir a listagem de agendamentos', () => {
    cy.get('table tbody tr').should('exist');
  });

  it('Deve permitir filtrar por status "Concluído"', () => {
    cy.get('#filtro-status').select('Concluído');
    cy.get('#filtros-form').submit();
    cy.wait(500);
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).contains('Concluído');
    });
  });

it('Deve filtrar usando a data de um agendamento existente', () => {
  cy.get('table tbody tr').first().find('td').eq(2).invoke('text').then((dataTexto) => {
    const [dia, mes, ano] = dataTexto.trim().split('/');
    const dataFormatada = `${ano}-${mes}-${dia}`;

    cy.get('#filtro-data').clear().type(dataFormatada);
    cy.get('#filtros-form').submit();
    cy.wait(500);
    cy.get('table tbody tr').should('exist');
  });
});


it('Deve salvar justificativa ao atualizar para Cancelado', () => {
  cy.get('table tbody tr').first().within(() => {
    cy.get('.btn-gerenciar').click();
  });

  cy.get('#status-select').should('be.visible').select('Cancelado');
  cy.get('#justificativa-textarea').clear().type('Justificativa temporária');
  cy.get('#salvar-status-btn').click();

  cy.get('#modal-container').should('not.have.class', 'show');
});

it('Deve atualizar status para "Cancelado" com justificativa', () => {
  cy.get('.btn-gerenciar').first().click();
  cy.get('#status-select').select('Cancelado');
  cy.get('#justificativa-textarea').type('Material não encontrado.');
  cy.get('#salvar-status-btn').click();

  cy.get('#modal-container').should('not.have.class', 'show');
});

it('Deve impedir salvar "Concluído" sem justificativa', () => {
  cy.get('.btn-gerenciar').first().click();
  cy.get('#status-select').select('Concluído');
  cy.get('#justificativa-textarea').clear();
  cy.get('#salvar-status-btn').click();

  cy.get('#modal-container').should('have.class', 'show');
});

  it('Deve manter filtros e estado após operação de status', () => {
    cy.get('#filtro-status').select('Pendente');
    cy.get('#filtros-form').submit();
    cy.wait(500);
    cy.get('.btn-gerenciar').first().click();
    cy.get('#status-select').select('Agendado');
    cy.get('#salvar-status-btn').click();
    cy.wait(500);
    cy.get('#filtro-status').should('have.value', 'Pendente');
  });
});
