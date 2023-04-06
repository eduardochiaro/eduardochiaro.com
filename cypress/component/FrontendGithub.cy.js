import GitHub from '../../src/components/frontend/GitHub';

describe('GitHub component', () => {
  it('renders correctly', () => {
    const repoData = [
      {
        name: 'repo1',
        description: 'description1',
        url: 'https://github.com/user1/repo1',
        openGraphImageUrl: 'https://picsum.photos/300/200',
        pushedAt: '2022-01-01',
        languages: [
          { name: 'JavaScript', color: '#f1e05a' },
          { name: 'HTML', color: '#e34c26' },
        ],
        topics: ['topic1', 'topic2'],
        isArchived: false,
      },
      {
        name: 'repo2',
        description: 'description2',
        url: 'https://github.com/user2/repo2',
        openGraphImageUrl: 'https://picsum.photos/300/200',
        pushedAt: '2022-01-02',
        languages: [
          { name: 'Python', color: '#3572A5' },
          { name: 'Dockerfile', color: '#384d54' },
        ],
        topics: ['topic3', 'topic4'],
        isArchived: false,
      },
    ];

    cy.intercept('/api/portfolio/github', { results: repoData });

    cy.mount(<GitHub />);

    cy.get('#github-component').should('exist');

    cy.get('#github-list').within(() => {
      cy.get('.box-card').should('have.length', 2);

      repoData.forEach((repo, index) => {
        cy.get('.box-card').eq(index).within(() => {
          cy.get('a')
            .should('have.attr', 'href', repo.url)
            .should('contain.text', repo.name);

          cy.get('p').eq(0).should('have.text', repo.description);

          cy.get('.bg-accent-300').should('have.length', repo.topics.length)

          repo.topics.forEach((topic, index) => {
            cy.get('.bg-accent-300').eq(index)
                .should('contain.text', topic)
                .should('contain.html', '<svg');
          });

          repo.languages.forEach((language, index) => {
            cy.get('.w-full > .inline-block')
              .eq(index)
              .should('contain.text', language.name);
          });
        });
      });
    });
  });
});
