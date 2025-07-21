/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (these are the columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the primary content (the image)
  const cells = columnDivs.map((colDiv) => {
    const img = colDiv.querySelector('img');
    if (img) return img;
    return colDiv;
  });

  // Header row: must have as many columns as the content row, per the example
  const headerRow = ['Columns (columns28)'];
  while (headerRow.length < cells.length) {
    headerRow.push('');
  }

  const tableRows = [headerRow, cells];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
