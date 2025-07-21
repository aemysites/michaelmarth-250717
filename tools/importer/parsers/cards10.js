/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Each direct child <a> is a card
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach(card => {
    // Image cell (always present)
    const imgWrapper = card.querySelector('.utility-aspect-3x2');
    let imgCell = null;
    if (imgWrapper) {
      // Reference the image element directly
      const img = imgWrapper.querySelector('img');
      if (img) {
        imgCell = img;
      }
    }

    // Text cell: use the content container as a whole (to preserve structure)
    const content = card.querySelector('.utility-padding-all-1rem');
    rows.push([imgCell, content]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
