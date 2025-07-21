/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Block header row
  const headerRow = ['Hero (hero38)'];

  // 2. Image row: background/decorative image (if present)
  let imageRow = [''];
  const bgImg = element.querySelector('img.cover-image');
  if (bgImg) {
    imageRow = [bgImg];
  }

  // 3. Content row: title (h1), subheading/paragraph, CTA (a.button)
  let contentRow = [''];
  // Find the main grid
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (mainGrid) {
    // Find all direct children (two main columns: image and content)
    const gridChildren = mainGrid.querySelectorAll(':scope > div');
    // The content is in the second child (with .container)
    let contentCol = null;
    for (const child of gridChildren) {
      if (child.classList.contains('container')) {
        contentCol = child;
        break;
      }
    }
    if (contentCol) {
      // Inside contentCol, the text is in a nested grid
      const textGrid = contentCol.querySelector('.w-layout-grid');
      if (textGrid) {
        // The heading is an h1, then a div with p and a
        const contentElements = [];
        const h1 = textGrid.querySelector('h1');
        if (h1) contentElements.push(h1);
        // The paragraph and button are inside a flex-vertical div
        const flexDiv = textGrid.querySelector('.flex-vertical');
        if (flexDiv) {
          // Paragraph
          const p = flexDiv.querySelector('p');
          if (p) contentElements.push(p);
          // CTA (link/button)
          const btn = flexDiv.querySelector('a.button');
          if (btn) contentElements.push(btn);
        }
        contentRow = [contentElements];
      } else {
        // Fallback: just use the contentCol
        contentRow = [contentCol];
      }
    }
  }

  // Compose the block
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
