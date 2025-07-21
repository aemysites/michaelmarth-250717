/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required by the example
  const headerRow = ['Cards (cards8)'];
  const cells = [headerRow];

  // Each direct child div is a card
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    // Find the image
    const img = cardDiv.querySelector('img');
    // For the text cell: since source HTML has no explicit text (headings or description),
    // use the img.alt as the strong heading, and no description (to match block structure)
    let textCell = '';
    if (img && img.alt && img.alt.trim()) {
      const heading = document.createElement('strong');
      heading.textContent = img.alt;
      textCell = heading;
    }
    // Add the row for this card
    cells.push([img, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
