/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the direct children of the grid - these are the columns
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Create the table manually to ensure proper colspan for header
  const table = document.createElement('table');

  // Header row with one th, spanning all columns
  const headerTr = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns (columns9)';
  th.setAttribute('colspan', columns.length);
  headerTr.appendChild(th);
  table.appendChild(headerTr);

  // Content row with each column's element as a td
  const contentTr = document.createElement('tr');
  columns.forEach(col => {
    const td = document.createElement('td');
    td.appendChild(col);
    contentTr.appendChild(td);
  });
  table.appendChild(contentTr);

  element.replaceWith(table);
}
