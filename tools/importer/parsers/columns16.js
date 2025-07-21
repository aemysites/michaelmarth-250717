/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single-cell array
  const headerRow = ['Columns (columns16)'];

  // Extract main top grid (headline and intro grid)
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  let col1 = document.createElement('div');
  let col2 = document.createElement('div');
  if (mainGrid) {
    if (mainGrid.children[0]) col1 = mainGrid.children[0];
    if (mainGrid.children[1]) col2 = mainGrid.children[1];
  }

  // Extract bottom grid (images)
  const bottomGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  let imgCell1 = document.createElement('div');
  let imgCell2 = document.createElement('div');
  if (bottomGrid) {
    if (bottomGrid.children[0]) imgCell1 = bottomGrid.children[0];
    if (bottomGrid.children[1]) imgCell2 = bottomGrid.children[1];
  }

  // Build cells array (header is a single cell, content rows each have two cells)
  const cells = [
    headerRow,
    [col1, col2],
    [imgCell1, imgCell2]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
