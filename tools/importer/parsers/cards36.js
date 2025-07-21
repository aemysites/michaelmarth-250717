/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract a card as [image, text] array
  function extractCard(card) {
    // Find the image (should be inside a div, but fallback to img)
    let img = card.querySelector('img');
    let imgEl = null;
    if (img) {
      // Prefer the parent aspect div if it contains nothing but the image
      let parentDiv = img.closest('div');
      if (parentDiv && parentDiv.childElementCount === 1 && parentDiv.querySelector('img') === img) {
        imgEl = parentDiv;
      } else {
        imgEl = img;
      }
    }
    // Text content: get heading, paragraph, and cta if present
    const textEls = [];
    // Heading (h2, h3, h4)
    let heading = card.querySelector('h2, h3, h4');
    if (heading) textEls.push(heading);
    // Paragraph (first)
    let para = card.querySelector('p');
    if (para) textEls.push(para);
    // CTA: .button, .cta or a.button/cta
    let cta = card.querySelector('.button, .cta, a.button, a.cta');
    if (cta) textEls.push(cta);
    // Combine all text elements in a wrapper div
    const cellDiv = document.createElement('div');
    textEls.forEach(e => cellDiv.appendChild(e));
    return [imgEl, cellDiv];
  }

  // Locate the cards
  let grid = element.querySelector(':scope > div > div');
  if (!grid) return;
  let cards = [];
  // The grid has direct children: either <a.card> or a nested grid of <a.card>
  for (let child of grid.children) {
    if (child.tagName === 'A') {
      cards.push(child);
    } else if (child.matches('div')) {
      // Nested grid, get all direct children that are <a>
      let innerCards = Array.from(child.children).filter(n => n.tagName === 'A');
      cards.push(...innerCards);
    }
  }
  if (cards.length === 0) return;
  // Build rows: header, then one row per card
  const rows = [['Cards (cards36)']];
  cards.forEach(card => {
    rows.push(extractCard(card));
  });
  // Create and replace table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
