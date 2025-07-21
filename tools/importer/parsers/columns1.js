/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .grid-layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children (columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Build the cells for the main content row
  // Use the existing elements without cloning
  const firstCol = columns[0];
  const secondCol = columns[1];

  // First column: likely an <img>
  // Second column: heading, subheading, button group (all should be included)

  // First cell
  let firstCell = firstCol;
  // Second cell: gather all children in an array
  const secondCellContent = [];
  Array.from(secondCol.childNodes).forEach((node) => {
    // Only push elements or meaningful text nodes
    if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
      secondCellContent.push(node);
    }
  });

  // Compose the table: header row must be a single cell
  const cells = [
    ['Columns (columns1)'],
    [firstCell, secondCellContent],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new block table
  element.replaceWith(table);
}
