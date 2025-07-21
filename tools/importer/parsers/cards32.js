/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block spec
  const headerRow = ['Cards (cards32)'];
  const rows = [];
  // Find all direct card links
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach((card) => {
    // Find the card image (always present, per block guidelines)
    const img = card.querySelector('img');
    // Find the text content area (the inner grid's second div, direct child of the grid)
    // The structure is: <a><div class="w-layout-grid ..."><img><div>...text...</div></div></a>
    const grid = card.querySelector(':scope > div');
    let textContent = null;
    if (grid) {
      // Find the div after the image
      // The grid children are: [img, div]
      const children = Array.from(grid.children);
      textContent = children.find((child) => child !== img);
      // Fallback if not found (should not happen)
      if (!textContent) textContent = grid;
    } else {
      // Fallback: if no grid div, use entire card
      textContent = card;
    }
    rows.push([img, textContent]);
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
