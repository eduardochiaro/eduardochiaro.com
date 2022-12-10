describe('Homepage', () => {
  beforeEach(() => {
    // Start from the index page
    cy.visit('/');
  });
  it('check bio', () => {
    cy.get('#bio-component').should('be.visible');
    cy.get('#bio-component h1').should('contain', 'Eduardo');
    cy.get('#bio-component h2').should('contain', 'Software Developer');
  });
  it('check work', () => {
    cy.get('#work-component').should('be.visible');
    cy.get('#work-component h3').should('contain', 'worked');
    cy.get('#work-list').find('svg').its('length').should('be.gte', 1);
  });
  it('check skills', () => {
    cy.get('#skills-component').should('be.visible');
    cy.get('#skills-component h3').should('contain', 'good');
    cy.get('#skills-list').find('svg').its('length').should('be.gte', 1);
  });
  it('check articles', () => {
    cy.get('#latest-posts-component').should('be.visible');
    cy.get('#latest-posts-component h3').should('contain', 'articles');
    cy.get('#articles-list')
      .find('h4')
      .each((x) => {
        expect(x).to.be.visible;
        expect(x).not.to.be.empty;
      });
  });
  it('check github', () => {
    cy.get('#github-component').should('be.visible');
    cy.get('#github-component h3').should('contain', 'coded');
    cy.get('#github-list')
      .find('h4')
      .each((x) => {
        expect(x).to.be.visible;
        expect(x).not.to.be.empty;
      });
  });
});
