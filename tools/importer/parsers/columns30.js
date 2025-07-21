/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns grid
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  
  // Get images for each column
  const columnDivs = Array.from(grid.children);
  const images = columnDivs.map(colDiv => {
    const aspect = colDiv.querySelector('.utility-aspect-2x3');
    if (!aspect) return null;
    const img = aspect.querySelector('img');
    return img || null;
  }).filter(Boolean);
  
  // Build the table: header row is single cell, then row with each image in a separate column
  const headerRow = ['Columns (columns30)'];
  const contentRow = images;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
