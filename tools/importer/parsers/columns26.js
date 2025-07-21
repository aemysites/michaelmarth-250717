/* global WebImporter */
export default function parse(element, { document }) {
  // The block name header as required (must match exactly)
  const headerRow = ['Columns (columns26)'];
  // Attempt to robustly find the main grid container (which contains the two columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get the direct children (should be two: content and image column)
  const columns = Array.from(grid.children);
  // Defensive: if not two columns, just exit
  if (columns.length < 2) return;
  const col1 = columns[0]; // left: content
  const col2 = columns[1]; // right: image

  // For best resilience and semantic preservation, reference the entire column elements as-is in the cell array
  // No text content is missed as these are the direct columns containing all visible content

  const tableRows = [
    headerRow,
    [col1, col2]
  ];

  // Create the structured table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original section with the new block table
  element.replaceWith(table);
}
