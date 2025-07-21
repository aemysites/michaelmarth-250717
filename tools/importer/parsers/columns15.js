/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid (columns)
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // The left column (content div) and right column (image)
  let leftContent = null;
  let rightContent = null;

  // Find the div that contains the main text content (look for heading)
  for (const child of gridChildren) {
    if (!leftContent && child.querySelector && child.querySelector('h1, .h1-heading, h2, .subheading, p')) {
      // Reference all child elements here to preserve headings, paragraphs, and buttons
      leftContent = Array.from(child.childNodes).filter(
        n => (n.nodeType === 1 && n.textContent.trim()) || (n.nodeType === 3 && n.textContent.trim())
      );
    } else if (!rightContent && child.tagName === 'IMG') {
      rightContent = child;
    }
  }

  // Fallback empty divs if not found
  if (!leftContent) leftContent = [document.createElement('div')];
  if (!rightContent) rightContent = document.createElement('div');

  // Compose the table
  const headerRow = ['Columns (columns15)'];
  const contentRow = [leftContent, rightContent];
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
