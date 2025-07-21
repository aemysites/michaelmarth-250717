/* global WebImporter */
export default function parse(element, { document }) {
  // Get the direct descendant divs (each representing a column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each div, if it only contains a single image, just put the image, else put the entire content
  const columns = columnDivs.map(div => {
    // Collect all children except style/script
    const childNodes = Array.from(div.childNodes).filter(node => node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim()));
    // If only one child and it's an image
    if (childNodes.length === 1 && childNodes[0].tagName && childNodes[0].tagName.toLowerCase() === 'img') {
      return childNodes[0];
    } else {
      // Otherwise, put the full content (to not lose semantic content)
      return Array.from(div.childNodes);
    }
  });

  // The header row must be a one-element array, regardless of column count
  const headerRow = ['Columns (columns37)'];

  // Build the block table with header row (1 cell), then the columns (as cells)
  const rows = [
    headerRow,
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
