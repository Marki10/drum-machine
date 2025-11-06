describe('Drum Machine - Happy & Unhappy Paths', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="pad-kick"]', { timeout: 8000 }).should('exist');
  });

  it('Happy path: records and plays back a sequence', () => {
    cy.get('[data-testid="record-btn"]').click();

    cy.wait(300);
    cy.get('[data-testid="pad-kick"]').click();
    cy.wait(400);
    cy.get('[data-testid="pad-snare"]').click();
    cy.wait(500);
    cy.get('[data-testid="pad-hihat"]').click();

    cy.get('[data-testid="stop-btn"]').click();
    cy.get('[data-testid="play-btn"]').click();

    cy.get('[data-testid="progress-bar"]').should('be.visible');

    cy.wait(1500);
    cy.get('[data-testid="progress-fill"]').invoke('width').should('be.greaterThan', 0);
  });

  it('Unhappy path: clicking play does nothing without a recording', () => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.get('[data-testid="pad-kick"]').should('exist');

    cy.get('[data-testid="play-btn"]').click();
    cy.get('[data-testid="progress-fill"]').should('have.css', 'width', '0px');
  });
});
