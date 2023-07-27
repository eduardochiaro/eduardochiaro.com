// test code for cypress to uintest the frontend share component /src/components/frontend/Share.tsx
import Share from '../../src/components/frontend/Share'

describe('Share Component', () => {
  beforeEach(() => {
    cy.mount(<Share />);
  });

  it('renders social media icons', () => {
    cy.get('#share').within(() => {
      cy.get('[title="GitHub"]').should('have.attr', 'href', 'https://github.com/eduardochiaro');
      cy.get('[title="LinkedIn"]').should('have.attr', 'href', 'https://linkedin.com/in/eduardochiaro');
      cy.get('[title="Threads"]').should('have.attr', 'href', 'https://threads.net/eduardochiaro');
    });
  });
});