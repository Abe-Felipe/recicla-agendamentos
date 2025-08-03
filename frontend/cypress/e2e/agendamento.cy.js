describe('Agendamento de Coleta de Recicláveis', () => {
  const API_URL = '/api/agendamentos';
  const BASE_URL = 'http://localhost:8080/index.html';
  const MOCK_PROTOCOLO = 'RC-2025080312345';
  const FUTURE_DAYS = 5;

  beforeEach(() => {
    cy.intercept('POST', API_URL, {
      statusCode: 200,
      body: { protocolo: MOCK_PROTOCOLO }
    }).as('createAgendamento');
    
    cy.visit(BASE_URL);
  });

  it('Deve realizar um agendamento completo com sucesso', () => {
    cy.get('#nome_completo').should('be.visible').type('Felipe Abe');
    cy.get('#endereco').type('Av Calistrato Muller Salles, 293');
    cy.get('#telefone').type('48996655727');
    cy.get('#email').type('felipe@example.com');

    cy.get('[data-value="Papel"]').should('be.visible').click();
    cy.get('[data-value="Papel"]').should('have.class', 'selected');

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + FUTURE_DAYS);
    const dateString = futureDate.toISOString().split('T')[0];
    cy.get('#data_coleta').type(dateString);

    cy.get('#submit-button').click();

    cy.wait('@createAgendamento');

    cy.get('#resumo-modal').should('have.class', 'show');
    cy.get('#resumo-modal').should('be.visible');
    
    cy.get('#resumo-protocolo').should('contain', 'RC-');
    cy.get('#resumo-data').should('not.be.empty');
    cy.get('#resumo-horario').should('contain', '08:00 às 18:00');
    cy.get('#resumo-endereco').should('contain', 'Av Calistrato Muller Salles, 293');
    cy.get('#resumo-materiais').should('contain', 'Papel');

    cy.get('#voltar-btn').click();
    
    cy.get('#resumo-modal').should('have.class', 'hidden');
    cy.url().should('include', 'index.html');
  });

  it('Deve permitir seleção de múltiplos materiais', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + FUTURE_DAYS);
    const dateString = futureDate.toISOString().split('T')[0];

    cy.get('#nome_completo').type('João Silva');
    cy.get('#endereco').type('Rua das Flores, 123');
    cy.get('#telefone').type('11987654321');
    cy.get('#data_coleta').type(dateString);

    cy.get('[data-value="Papel"]').click();
    cy.get('[data-value="Plástico"]').click();
    cy.get('[data-value="Vidro"]').click();

    cy.get('[data-value="Papel"]').should('have.class', 'selected');
    cy.get('[data-value="Plástico"]').should('have.class', 'selected');
    cy.get('[data-value="Vidro"]').should('have.class', 'selected');

    cy.get('#submit-button').click();
    cy.wait('@createAgendamento');

    cy.get('#resumo-modal').should('be.visible');
    cy.get('#resumo-materiais').should('contain', 'Papel, Plástico, Vidro');
  });

  it('Deve permitir desmarcar material selecionado', () => {
    cy.get('[data-value="Papel"]').click();
    cy.get('[data-value="Papel"]').should('have.class', 'selected');

    cy.get('[data-value="Papel"]').click();
    cy.get('[data-value="Papel"]').should('not.have.class', 'selected');
  });

  it('Deve validar campos obrigatórios', () => {
    cy.get('#submit-button').click();

    cy.get('#resumo-modal').should('not.have.class', 'show');
    
    cy.get('#nome_completo').should('have.attr', 'required');
    cy.get('#endereco').should('have.attr', 'required');
    cy.get('#telefone').should('have.attr', 'required');
    cy.get('#data_coleta').should('have.attr', 'required');
    
    cy.get('#nome_completo').should(($input) => {
      expect($input[0].validity.valid).to.be.false;
    });
    
    cy.get('#endereco').should(($input) => {
      expect($input[0].validity.valid).to.be.false;
    });
    
    cy.get('#materiais-error').should('exist');
  });

  it('Deve validar formato do telefone', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + FUTURE_DAYS);
    const dateString = futureDate.toISOString().split('T')[0];

    cy.get('#nome_completo').type('Maria Santos');
    cy.get('#endereco').type('Av Brasil, 456');
    cy.get('#telefone').type('123456789');
    cy.get('#data_coleta').type(dateString);
    cy.get('[data-value="Metal"]').click();

    cy.get('#submit-button').click();

    cy.get('#resumo-modal').should('not.have.class', 'show');
  });

  it('Deve validar nome com caracteres especiais', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + FUTURE_DAYS);
    const dateString = futureDate.toISOString().split('T')[0];

    cy.get('#nome_completo').type('João123!@#');
    cy.get('#endereco').type('Rua Teste, 123');
    cy.get('#telefone').type('11999887766');
    cy.get('#data_coleta').type(dateString);
    cy.get('[data-value="Papel"]').click();

    cy.get('#submit-button').click();

    cy.get('#resumo-modal').should('not.have.class', 'show');
  });

  it('Deve validar data mínima (2 dias úteis)', () => {
    const today = new Date().toISOString().split('T')[0];

    cy.get('#nome_completo').type('Ana Costa');
    cy.get('#endereco').type('Rua São João, 789');
    cy.get('#telefone').type('21912345678');
    cy.get('#data_coleta').type(today);
    cy.get('[data-value="Eletrônicos"]').click();

    cy.get('#submit-button').click();

    cy.get('#resumo-modal').should('not.have.class', 'show');
  });

  it('Deve funcionar sem email (campo opcional)', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + FUTURE_DAYS);
    const dateString = futureDate.toISOString().split('T')[0];

    cy.get('#nome_completo').type('Ana Costa');
    cy.get('#endereco').type('Rua São João, 789');
    cy.get('#telefone').type('21912345678');
    // Email deixado em branco intencionalmente
    cy.get('#data_coleta').type(dateString);
    cy.get('[data-value="Eletrônicos"]').click();

    cy.get('#submit-button').click();
    cy.wait('@createAgendamento');

    cy.get('#resumo-modal').should('be.visible');
    cy.get('#resumo-protocolo').should('contain', 'RC-');
  });

  it('Deve limitar ano da data para o ano atual', () => {
    const currentYear = new Date().getFullYear();
    cy.get('#data_coleta').should('have.attr', 'max', `${currentYear}-12-31`);
  });
});