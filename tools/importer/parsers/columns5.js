/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table, matching example exactly
  const headerRow = ['Columns (columns5)'];

  // Get all immediate child divs that represent columns
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, use the column div (which contains the content, e.g., image wrappers)
  const columns = columnDivs.map((colDiv) => colDiv);

  // Handle edge case: if no columns found, do not replace
  if (columns.length === 0) return;

  // Build the table: header and one row for columns
  const cells = [
    headerRow,
    columns,
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
