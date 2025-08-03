describe('Painel Administrativo - Fluxos Principais', () => {
  const adminEmail = 'admin@recicla.com';
  const adminSenha = 'senha4321secreta';

  beforeEach(() => {
    cy.visit('http://localhost:8080/login.html');
  });

  it('Deve permitir login com credenciais válidas e redirecionar para painel', () => {
    cy.get('#email').type(adminEmail);
    cy.get('#password').type(adminSenha);
    cy.get('#login-button').click();

    cy.url().should('include', '/painel.html');
    cy.contains('Painel de Agendamentos');
  });

  it('Deve exibir erro com login inválido', () => {
    cy.get('#email').type('invalido@email.com');
    cy.get('#password').type('senhaerrada');
    cy.get('#login-button').click();

    cy.get('#login-message')
      .should('be.visible')
  });

  it('Deve aplicar filtro por status Agendado', () => {
    cy.get('#email').type(adminEmail);
    cy.get('#password').type(adminSenha);
    cy.get('#login-button').click();

    cy.url().should('include', '/painel.html');

    cy.get('#filtro-status').select('Agendado');
    cy.get('#filtros-form').submit();

    // Aguarda o carregamento da nova lista
    cy.wait(1000);
    cy.get('#agendamentos-content').should('exist');
  });

  it('Deve aplicar filtro por data de coleta', () => {
    cy.get('#email').type(adminEmail);
    cy.get('#password').type(adminSenha);
    cy.get('#login-button').click();

    cy.url().should('include', '/painel.html');

    const dataHoje = new Date().toISOString().split('T')[0];
    cy.get('#filtro-data').type(dataHoje);
    cy.get('#filtros-form').submit();

    cy.wait(1000);
    cy.get('#agendamentos-content').should('exist');
  });
});
