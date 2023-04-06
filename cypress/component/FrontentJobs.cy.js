import Jobs from '../../src/components/frontend/Jobs';

describe('Jobs', () => {
  beforeEach(() => {
    cy.mount(<Jobs />);
  });

  it('renders the correct number of work logos', () => {
    cy.get('#work-list')
      .find('svg')
      .should('have.length', 6);
  });

  it('renders the job groups on larger screens', () => {
    cy.viewport(1200, 800);
    cy.get('.grid-cols-6').should('exist');
    cy.get('.col-span-4').should('exist');
  });
});
