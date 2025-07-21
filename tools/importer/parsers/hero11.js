/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children of the grid (should be divs containing 1 img each)
  const children = Array.from(element.querySelectorAll(':scope > div'));
  // Collect all img elements, referencing existing elements
  const images = children.map(div => div.querySelector('img')).filter(Boolean);

  // No headings, subheadings, or CTA present in this HTML source
  // Structure: 1 column, 3 rows
  const tableCells = [
    ['Hero (hero11)'],
    [images.length === 1 ? images[0] : images],
    [''], // Text/CTA row is intentionally left empty
  ];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}