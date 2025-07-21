/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container inside the section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Identify content blocks for the two columns
  // The grid has two main immediate children: left (text), right (image)
  // However, in this HTML, gridChildren: [text+list, list, img] (list is for the right but visually appears in left)
  let leftContent = null;
  let rightContent = null;

  // The text block (headings, paragraph), always the first grid child
  leftContent = gridChildren[0];
  // The contact list (ul), second child
  const contactList = gridChildren.find(child => child.tagName === 'UL');
  // The image, third child
  rightContent = gridChildren.find(child => child.tagName === 'IMG');

  // Compose the left column: text block + contact list (if exists)
  const leftCol = document.createElement('div');
  if (leftContent) {
    leftCol.appendChild(leftContent);
  }
  if (contactList) {
    leftCol.appendChild(contactList);
  }

  // Compose the right column: image (if exists)
  const rightCol = rightContent || '';

  // Construct the table block
  const headerRow = ['Columns (columns17)'];
  const cells = [headerRow, [leftCol, rightCol]];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
