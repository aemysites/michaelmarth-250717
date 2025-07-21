/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.grid-layout');
  let col1 = null, col2 = null;
  if (grid) {
    // Get immediate child elements (columns)
    const cols = Array.from(grid.children).filter(el => el.nodeType === 1);
    col1 = cols[0] || null;
    col2 = cols[1] || null;
  }

  // Fallback: If the grid or columns aren't found, attempt to get meaningful children
  if (!col1 || !col2) {
    const candidates = Array.from(element.querySelectorAll(':scope > *')).filter(el => el.nodeType === 1);
    col1 = candidates[0] || null;
    col2 = candidates[1] || null;
  }

  // Only create the columns row if at least one column is found
  const columnsRow = [];
  if (col1) columnsRow.push(col1);
  if (col2) columnsRow.push(col2);

  // Create the table structure
  // --- Custom header row with colspan to match EXACTLY one cell across all columns ---
  const table = document.createElement('table');
  const trHeader = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns (columns34)';
  if (columnsRow.length > 1) {
    th.setAttribute('colspan', columnsRow.length);
  }
  trHeader.appendChild(th);
  table.appendChild(trHeader);

  // Content row
  const trContent = document.createElement('tr');
  columnsRow.forEach(cell => {
    const td = document.createElement('td');
    td.append(cell);
    trContent.appendChild(td);
  });
  table.appendChild(trContent);

  element.replaceWith(table);
}
