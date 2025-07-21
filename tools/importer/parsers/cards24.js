/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as specified
  const headerRow = ['Cards (cards24)'];

  // Get all cards (direct children <a> of the grid)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block'));
  
  const rows = cardLinks.map(card => {
    // Card image (first cell): get the .utility-aspect-2x3 wrapper div (contains the <img>)
    const imageWrap = card.querySelector('.utility-aspect-2x3');

    // Card text (second cell): build a single container
    const textBlock = document.createElement('div');
    // Get tag/date block
    const tagDate = card.querySelector('.flex-horizontal');
    if (tagDate) textBlock.appendChild(tagDate);
    // Get card heading
    const heading = card.querySelector('h3');
    if (heading) textBlock.appendChild(heading);
    
    return [imageWrap, textBlock];
  });

  // Assemble the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
