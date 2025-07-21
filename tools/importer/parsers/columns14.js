/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout, which contains all column cells
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid - they are the columns
  const columns = Array.from(grid.children);

  // Only proceed if there is column content
  if (columns.length === 0) return;

  // Prepare the header row: must be a single cell (one-column) with the exact header text
  const headerRow = ['Columns (columns14)'];

  // Prepare the columns row: as many cells as columns detected
  const columnsRow = columns;

  // Build the table structure: header row (one cell), content row (as many cells as columns)
  const tableCells = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
