/* global WebImporter */
export default function parse(element, { document }) {
  // Header row per block name
  const headerRow = ['Hero (hero19)'];

  // --- IMAGE COLLAGE ROW (Row 2) ---
  // Get the grid of images
  let imageRow = '';
  const imageGrid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  if (imageGrid) {
    // To preserve semantic meaning and allow CSS to target collage, use a wrapper div, reference originals
    const collageDiv = document.createElement('div');
    collageDiv.setAttribute('data-hero-collage', '');
    // Only append <img> nodes (should be direct children in wrappers)
    imageGrid.querySelectorAll('img').forEach(img => collageDiv.appendChild(img));
    imageRow = collageDiv;
  }

  // --- TEXT/BUTTON ROW (Row 3) ---
  // Find the content container with heading, subheading, and CTAs
  let contentRow = '';
  const contentArea = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (contentArea) {
    // Reference the inner container that holds all text/buttons
    const textContainer = contentArea.querySelector('.container');
    if (textContainer) {
      contentRow = textContainer;
    } else {
      // fallback: use the entire contentArea
      contentRow = contentArea;
    }
  }

  // Compose the table for the block
  const cells = [
    headerRow,
    [imageRow],
    [contentRow],
  ];

  // Build table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
