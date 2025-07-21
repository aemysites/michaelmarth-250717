/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get direct children of the grid (name, tags, heading, richtext)
  const colEls = Array.from(grid.children);
  if (colEls.length < 3) return;
  // Column 1: Taylor Brooks
  const author = colEls[0];
  // Column 2: tags & heading
  const tagList = colEls[1];
  const heading = colEls[2];
  const col2Frag = document.createDocumentFragment();
  if (tagList) col2Frag.appendChild(tagList);
  if (heading) col2Frag.appendChild(heading);
  // Column 3: rich text
  let richText = null;
  if (colEls.length > 3) {
    richText = colEls[3];
  } else {
    richText = grid.querySelector('.rich-text');
  }
  // Build output: header row should be a single column
  const headerRow = ['Columns (columns29)'];
  const contentRow = [author, col2Frag, richText];
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
