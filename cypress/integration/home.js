import { not } from "cheerio/lib/api/traversing";

describe('Navigation', () => {
  beforeEach(() => {
    // Start from the index page
    cy.visit('http://localhost:3000/');
  });
  it('check bio', () => {
    cy.get('#bio').should('be.visible');
    cy.get('h1').should('contain', 'Eduardo');
    cy.get('h2').should('contain', 'Software Developer');
  });
  it('check work', () => {
    cy.get('#work').should('be.visible');
    cy.get('#work h3').should('contain', 'worked');
    cy.get('#work-list').find('svg').its('length').should('be.gte', 1);
  });
  it('check skills', () => {
    cy.get('#skills').should('be.visible');
    cy.get('#skills h3').should('contain', 'good');
    cy.get('#skills-list').find('svg').its('length').should('be.gte', 1);
  });
  it('check articles', () => {
    cy.get('#articles').should('be.visible');
    cy.get('#articles h3').should('contain', 'articles');
    cy.get('#articles-list').find('h4').each(x=> {
      expect(x).to.be.visible;
      expect(x).not.to.be.empty;
    });
  });
  it('check github', () => {
    cy.get('#github').should('be.visible');
    cy.get('#github h3').should('contain', 'coded');
    cy.get('#github-list').find('h4').each(x=> {
      expect(x).to.be.visible;
      expect(x).not.to.be.empty;
    });
  });


})