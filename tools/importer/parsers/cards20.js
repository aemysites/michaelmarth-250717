/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as in the example
  const cells = [
    ['Cards (cards20)'],
  ];

  // Find the inner card(s) - there may be multiple for other examples, but here it's just one
  // Each card has .card-body that contains heading and image
  const cardBodys = element.querySelectorAll('.card-body');
  cardBodys.forEach((cardBody) => {
    // Image (mandatory)
    const img = cardBody.querySelector('img');
    // Title (optional, styled as heading)
    const heading = cardBody.querySelector('.h4-heading');
    // Description (optional, not present here)
    const textCellContents = [];
    if (heading) textCellContents.push(heading);
    // No description or CTA in example
    cells.push([
      img,
      textCellContents
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
