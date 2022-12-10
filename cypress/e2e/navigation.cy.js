describe('Navigation', () => {
  beforeEach(() => {
    // Start from the index page
    cy.visit('/');
  });
  it('check navigation', () => {
    cy.get('header nav').should('be.visible');
    cy.get('header nav ul li').should(($lis) => {
      expect($lis, '3 items').to.have.length(3);
    });
  });
  it('should navigate to the bookmark page', () => {
    cy.get('a[href*="bookmarks"]').click();
    cy.url().should('include', '/bookmark');
    cy.get('h1').should('contain', 'Bookmarks');
  });

  it('should navigate to the projects page', () => {
    cy.get('a[href*="projects"]').click();
    cy.url().should('include', '/projects');
    cy.get('h2').should('contain', 'Lab');
    cy.get('h1').should('contain', 'Projects');
  });
});
