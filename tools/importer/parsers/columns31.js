/* global WebImporter */
export default function parse(element, { document }) {
  // Get the columns container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Fetch direct children of the grid (should be columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Reference the existing elements for cells
  // First column: image
  const firstCol = columns[0];
  // Second column: content block
  const secondCol = columns[1];

  // Table header, exactly as required
  const headerRow = ['Columns (columns31)'];
  // Table row, two columns
  const contentRow = [firstCol, secondCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
