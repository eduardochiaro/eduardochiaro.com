describe('Navigation', () => {
  beforeEach(() => {
    // Start from the index page
    cy.visit('/');
  });

  it('check navigation menu', () => {
    cy.get('header').should('be.visible');
    cy.get('main ul[cy-data="menu"] li').should(($lis) => {
      expect($lis, '5 items').to.have.length(5);
    });
  });

  it('should navigate to the home page and check content', () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('main').should('be.visible');
  });

  it('should navigate to the resume page', () => {
    cy.get('a[href*="resume"]').click();
    cy.url().should('include', '/resume');
    cy.get('h2').should('contain', 'eduardo chiaro');
  });

  it('should navigate to the books page', () => {
    cy.get('a[href*="books"]').click();
    cy.url().should('include', '/books');
    cy.get('h1').should('contain', 'Books');
  });

  it('should navigate to the bookmarks page', () => {
    cy.get('a[href*="bookmarks"]').click();
    cy.url().should('include', '/bookmarks');
    cy.get('h1').should('contain', 'Bookmarks');
  });

  it('should navigate to the projects page', () => {
    cy.get('a[href*="projects"]').click();
    cy.url().should('include', '/projects');
    cy.get('h1').should('contain', 'Projects');
    cy.get('h2').should('contain', 'Lab');
  });
});
