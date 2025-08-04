import React from 'react';
import GitHub from '@/components/frontend/GitHub';
import { GitHubItem } from '@/actions/github';
import { mount } from 'cypress/react'

// Mock data for testing
const mockGitHubData: GitHubItem[] = [
  {
    id: '1',
    name: 'test-repo-1',
    description: 'This is a test repository for component testing',
    url: 'https://github.com/user/test-repo-1',
    openGraphImageUrl: 'https://github.com/user/test-repo-1/og-image.png',
    isArchived: false,
    topics: ['react', 'cypress'],
    pushedAt: '2024-06-01T12:00:00Z',
    language: 'JavaScript',
    languages: [
      { name: 'JavaScript', color: '#f1e05a' },
      { name: 'CSS', color: '#563d7c' },
    ],
  },
  {
    id: '2',
    name: 'another-repo',
    description: 'Another test repository with a longer description to test text wrapping and layout',
    url: 'https://github.com/user/another-repo',
    openGraphImageUrl: 'https://github.com/user/another-repo/og-image.png',
    isArchived: false,
    topics: ['testing', 'layout'],
    pushedAt: '2024-05-20T08:30:00Z',
    language: 'TypeScript',
    languages: [
      { name: 'TypeScript', color: '#3178c6' },
      { name: 'HTML', color: '#e34c26' },
    ],
  },
  {
    id: '3',
    name: 'third-repo',
    description: 'A third repository for testing masonry layout',
    url: 'https://github.com/user/third-repo',
    openGraphImageUrl: 'https://github.com/user/third-repo/og-image.png',
    isArchived: true,
    topics: ['masonry', 'ui'],
    pushedAt: '2024-04-15T15:45:00Z',
    language: 'Python',
    languages: [
      { name: 'Python', color: '#3572A5' },
      { name: 'Django', color: '#092E20' },
    ],
  },
];

const emptyGitHubData: GitHubItem[] = [];

describe('GitHub Component', () => {
  beforeEach(() => {
    // Mock any external dependencies if needed
    cy.viewport(1024, 768);
  });

  it('renders GitHub repositories correctly', () => {
    mount(<GitHub responseArray={mockGitHubData} />);

    // Check that all repositories are rendered
    cy.get('[data-cy="repo-card"]').should('have.length', mockGitHubData.length);

    // Check first repository details
    cy.contains('test-repo-1').should('be.visible');
    cy.contains('This is a test repository for component testing').should('be.visible');

    // Check second repository details
    cy.contains('another-repo').should('be.visible');
    cy.contains('Another test repository with a longer description').should('be.visible');

    // Check third repository details
    cy.contains('third-repo').should('be.visible');
    cy.contains('A third repository for testing masonry layout').should('be.visible');
  });

  it('displays GitHub links correctly', () => {
    mount(<GitHub responseArray={mockGitHubData} />);

    // Check that GitHub links are present and have correct attributes
    cy.get('a[href*="github.com"]').should('have.length', mockGitHubData.length);
    
    // Check specific link attributes
    cy.get('a[href="https://github.com/user/test-repo-1"]')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noreferrer');

    // Check that GitHub icon is present in links
    cy.get('a[href*="github.com"]').each(($link) => {
      cy.wrap($link).find('svg').should('exist');
      cy.wrap($link).contains('View on GitHub');
    });
  });

  it('handles empty repository array', () => {
    mount(<GitHub responseArray={emptyGitHubData} />);

    // Should not crash and should render masonry container
    cy.get('.masonry-grid').should('exist');
    cy.get('[data-cy="repo-card"]').should('not.exist');
  });

  it('applies correct styling and classes', () => {
    mount(<GitHub responseArray={mockGitHubData} />);

    // Check masonry container classes
    cy.get('.masonry-grid')
      .should('have.class', 'mt-5')
      .and('have.class', 'flex')
      .and('have.class', 'w-auto')
      .and('have.class', 'gap-4');

    // Check card structure
    cy.get('[data-cy="repo-card"]').first().within(() => {
      cy.get('h3')
        .should('have.class', 'font-header')
        .and('have.class', 'text-xl')
        .and('have.class', 'tracking-wide');

      cy.get('p')
        .should('have.class', 'mt-2')
        .and('have.class', 'font-sans')
        .and('have.class', 'text-sm');

      cy.get('a')
        .should('have.class', 'download-button')
        .and('have.class', 'mt-6')
        .and('have.class', 'flex')
        .and('have.class', 'items-center')
        .and('have.class', 'gap-4');
    });
  });

  it('handles missing repository URLs gracefully', () => {
    const repoWithoutUrl: GitHubItem[] = [
      {
        id: '4',
        name: 'repo-no-url',
        description: 'Repository without URL',
        url: '',
        openGraphImageUrl: 'https://github.com/user/repo-no-url/og-image.png',
        isArchived: false,
        topics: ['no-url'],
        pushedAt: '2024-03-10T10:00:00Z',
        language: 'Go',
        languages: [{ name: 'Go', color: '#00ADD8' }],
      },
    ];

    mount(<GitHub responseArray={repoWithoutUrl} />);

    // Should fallback to '#' for href
    cy.get('a[href="#"]').should('exist');
    cy.contains('View on GitHub').should('be.visible');
  });

  it('is responsive on different screen sizes', () => {
    mount(<GitHub responseArray={mockGitHubData} />);

    // Test mobile viewport
    cy.viewport(375, 667);
    cy.get('.masonry-grid').should('be.visible');

    // Test tablet viewport
    cy.viewport(768, 1024);
    cy.get('.masonry-grid').should('be.visible');

    // Test desktop viewport
    cy.viewport(1440, 900);
    cy.get('.masonry-grid').should('be.visible');
  });
});