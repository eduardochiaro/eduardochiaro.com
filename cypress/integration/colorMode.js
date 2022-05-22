describe('Dark/Light Mode', () => {
  before(() => {
    // Start from the index page
    cy.visit('/');
  });
  it('change to dark mode', () => {
    cy.get('[data-cy="change-mode"]').should('be.visible').click();
    cy.get('[data-cy="change-mode-container"]').should('be.visible');
    cy.get('[data-cy="change-mode-dark"]').should('be.visible').click();
    cy.get('html').should('have.css', 'color-scheme', 'dark');
  });


})