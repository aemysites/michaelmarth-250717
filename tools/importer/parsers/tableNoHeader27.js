/* global WebImporter */
export default function parse(element, { document }) {
  // Header row (block name exactly as in example)
  const headerRow = ['Table (no header)'];
  const cells = [headerRow];

  // Each direct child of element with class 'divider' is a table row
  const dividers = element.querySelectorAll(':scope > .divider');

  dividers.forEach(divider => {
    // Each divider contains a grid with two children: question and answer
    const grid = divider.querySelector('.w-layout-grid');
    if (grid) {
      const children = Array.from(grid.children);
      // If there are exactly 2 children, keep their original elements
      if (children.length === 2) {
        cells.push([[children[0], children[1]]]);
      } else if (children.length > 0) {
        // If there is an unexpected structure, put all children in the cell
        cells.push([children]);
      } else {
        // If grid has no children, treat grid as the content
        cells.push([grid]);
      }
    } else {
      // If divider doesn't have grid, put divider itself
      cells.push([divider]);
    }
  });

  // Edge case: If no .divider rows found, try processing element directly
  if (cells.length === 1) {
    // Only header exists, so try to extract direct grids
    const grids = element.querySelectorAll(':scope > .w-layout-grid');
    grids.forEach(grid => {
      const children = Array.from(grid.children);
      if (children.length === 2) {
        cells.push([[children[0], children[1]]]);
      } else if (children.length > 0) {
        cells.push([children]);
      } else {
        cells.push([grid]);
      }
    });
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
