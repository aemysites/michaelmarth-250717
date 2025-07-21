/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function: extract first <img> in the card
  function getImg(card) {
    return card.querySelector('img');
  }

  // Helper function: extract heading and description from card
  function getTextContent(card) {
    // We want to keep heading levels and <p> tags as in original
    const heading = card.querySelector('h1,h2,h3,h4,h5,h6');
    const desc = card.querySelector('p');
    // Compose content: heading (if any), then p (if any)
    const fragments = [];
    if (heading) fragments.push(heading);
    if (desc) fragments.push(desc);
    return fragments.length === 1 ? fragments[0] : fragments;
  }

  // Gather all direct child divs that have an <img> inside; each is a card
  const cardDivs = Array.from(element.querySelectorAll(':scope > div')).filter(div => div.querySelector('img'));

  // Build table: header row, then one row per card, with [img, text] per row
  const cells = [['Cards (cards12)']];
  cardDivs.forEach(card => {
    const img = getImg(card);
    const text = getTextContent(card);
    cells.push([img, text]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
