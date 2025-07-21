/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get ALL direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Block header: single cell, and will be set to span all columns
  const headerRow = [document.createElement('span')];
  headerRow[0].textContent = 'Columns (columns3)';

  // Compose cells for the block table
  const cells = [headerRow, columns];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix the header row to span all columns (colspan)
  const ths = table.querySelectorAll('tr:first-child th');
  if (ths.length === 1 && columns.length > 1) {
    ths[0].setAttribute('colspan', columns.length);
  }

  // Replace the original element
  element.replaceWith(table);
}
