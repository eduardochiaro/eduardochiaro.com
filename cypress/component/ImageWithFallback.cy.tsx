import React from 'react';
import { mount } from 'cypress/react';
import ImageWithFallback from '@/components/ImageWithFallback';

describe('ImageWithFallback Component', () => {
  const validImageSrc = 'https://picsum.photos/200/300';
  const invalidImageSrc = 'https://picsum.photos/image.jpg';
  const fallbackImageSrc = '/images/placeholder.png'; // Local placeholder image
  const altText = 'Test image description';

  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  it('renders image with valid src successfully', () => {
    mount(
      <ImageWithFallback
        src={validImageSrc}
        fallbackSrc={fallbackImageSrc}
        alt={altText}
        width={200}
        height={300}
        data-cy="test-image"
      />
    );

    // Check that the image is rendered with correct attributes
    cy.get('[data-cy="test-image"]')
      .should('be.visible')
      .and('have.attr', 'alt', altText);

    // Verify the image loads successfully (no fallback triggered)
    cy.get('[data-cy="test-image"]')
      .should('have.attr', 'src')
      .and('include', 'picsum.photos');
  });

  it('falls back to fallback image when primary src fails', () => {
    mount(
      <ImageWithFallback
        src={invalidImageSrc}
        fallbackSrc={fallbackImageSrc}
        alt={altText}
        width={200}
        height={300}
        data-cy="test-image"
      />
    );

    // Wait for the error to occur and fallback to trigger
    cy.get('[data-cy="test-image"]')
      .should('be.visible')
      .and('have.attr', 'alt', altText);

    // The src should eventually change to the fallback
    // Note: This might take some time as the invalid image needs to fail first
    cy.get('[data-cy="test-image"]', { timeout: 10000 })
      .should('have.attr', 'src')
      .and('include', 'placeholder');
  });

  it('passes through all additional props correctly', () => {
    const className = 'custom-image-class';
    const title = 'Custom title';

    mount(
      <ImageWithFallback
        src={validImageSrc}
        fallbackSrc={fallbackImageSrc}
        alt={altText}
        width={200}
        height={300}
        className={className}
        title={title}
        priority={true}
        data-cy="test-image"
      />
    );

    // Check that additional props are passed through
    cy.get('[data-cy="test-image"]')
      .should('have.class', className)
      .and('have.attr', 'title', title);
  });

  it('maintains correct dimensions', () => {
    const width = 400;
    const height = 250;

    mount(
      <ImageWithFallback
        src={validImageSrc}
        fallbackSrc={fallbackImageSrc}
        alt={altText}
        width={width}
        height={height}
        data-cy="test-image"
      />
    );

    // Check dimensions (Next.js Image component handles this)
    cy.get('[data-cy="test-image"]')
      .should('be.visible')
      .invoke('width')
      .should('be.greaterThan', 0);

    cy.get('[data-cy="test-image"]')
      .invoke('height')
      .should('be.greaterThan', 0);
  });

  it('handles multiple error scenarios', () => {
    // Mount with both invalid src and invalid fallback
    const invalidFallback = '/fallback.jpg';

    mount(
      <ImageWithFallback
        src={invalidImageSrc}
        fallbackSrc={invalidFallback}
        alt={altText}
        width={200}
        height={300}
        data-cy="test-image"
      />
    );

    // Even with invalid fallback, component should not crash
    cy.get('[data-cy="test-image"]')
      .should('exist')
      .and('have.attr', 'alt', altText);
  });

  it('works with different image formats and sizes', () => {
    const testCases = [
      {
        src: 'https://picsum.photos/100/100',
        width: 100,
        height: 100,
        description: 'square image'
      },
      {
        src: 'https://picsum.photos/300/150',
        width: 300,
        height: 150,
        description: 'landscape image'
      },
      {
        src: 'https://picsum.photos/150/300',
        width: 150,
        height: 300,
        description: 'portrait image'
      }
    ];

    testCases.forEach((testCase, index) => {
      mount(
        <div key={index}>
          <ImageWithFallback
            src={testCase.src}
            fallbackSrc={fallbackImageSrc}
            alt={`${testCase.description} test`}
            width={testCase.width}
            height={testCase.height}
            data-cy={`test-image-${index}`}
          />
        </div>
      );

      cy.get(`[data-cy="test-image-${index}"]`)
        .should('be.visible')
        .and('have.attr', 'alt', `${testCase.description} test`);
    });
  });

  it('handles responsive image behavior', () => {
    mount(
      <ImageWithFallback
        src={validImageSrc}
        fallbackSrc={fallbackImageSrc}
        alt={altText}
        width={500}
        height={300}
        style={{ maxWidth: '100%', height: 'auto' }}
        data-cy="test-image"
      />
    );

    // Test on mobile
    cy.viewport(375, 667);
    cy.get('[data-cy="test-image"]').should('be.visible');

    // Test on tablet
    cy.viewport(768, 1024);
    cy.get('[data-cy="test-image"]').should('be.visible');

    // Test on desktop
    cy.viewport(1440, 900);
    cy.get('[data-cy="test-image"]').should('be.visible');
  });

  it('preserves accessibility attributes', () => {
    mount(
      <ImageWithFallback
        src={validImageSrc}
        fallbackSrc={fallbackImageSrc}
        alt={altText}
        width={200}
        height={300}
        role="img"
        aria-label="Custom aria label"
        data-cy="test-image"
      />
    );

    cy.get('[data-cy="test-image"]')
      .should('have.attr', 'alt', altText)
      .and('have.attr', 'role', 'img')
      .and('have.attr', 'aria-label', 'Custom aria label');
  });

  it('handles loading states appropriately', () => {
    mount(
      <ImageWithFallback
        src={validImageSrc}
        fallbackSrc={fallbackImageSrc}
        alt={altText}
        width={200}
        height={300}
        loading="lazy"
        data-cy="test-image"
      />
    );

    // Image should be present even during loading
    cy.get('[data-cy="test-image"]')
      .should('exist')
      .and('have.attr', 'alt', altText);
  });

  it('works within different container contexts', () => {
    mount(
      <div style={{ width: '300px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>Image Container Test</h3>
        <ImageWithFallback
          src={validImageSrc}
          fallbackSrc={fallbackImageSrc}
          alt={altText}
          width={200}
          height={150}
          data-cy="test-image"
        />
        <p>Caption below image</p>
      </div>
    );

    // Check that image renders correctly within container
    cy.get('[data-cy="test-image"]')
      .should('be.visible')
      .and('have.attr', 'alt', altText);

    // Check container context is preserved
    cy.contains('Image Container Test').should('be.visible');
    cy.contains('Caption below image').should('be.visible');
  });
});