/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const rows = [['Cards (cards2)']];

  // Find the grid containing the cards
  let grid = element.querySelector('.grid-layout');
  if (!grid) {
    // fallback: use the element itself if class missing
    grid = element;
  }

  // Find all direct children of the grid
  const directChildren = Array.from(grid.children);

  // Helper to build a card row
  function makeCardRow(img, textElements) {
    // First cell: image element or empty string
    // Second cell: reference to a div containing referenced elements
    const textCell = document.createElement('div');
    textElements.forEach(el => {
      if (el) textCell.appendChild(el);
    });
    return [img || '', textCell];
  }

  // --- FIRST CARD: Large feature card on the left ---
  // It's always the first direct child and an <a>
  const featureCard = directChildren.find(el => el.matches('a.utility-link-content-block'));
  if (featureCard) {
    const img = featureCard.querySelector('div[class*="utility-aspect"] img');
    const tag = featureCard.querySelector('.tag-group');
    const heading = featureCard.querySelector('h2, h3, h4, h5, h6');
    const desc = featureCard.querySelector('p');
    rows.push(makeCardRow(img, [tag, heading, desc]));
  }

  // --- SECOND GROUP: two cards with images ---
  // Next direct child with class 'flex-horizontal' and contains img
  const gridWithImages = directChildren.find(el => el.classList.contains('flex-horizontal') && el.querySelector('img'));
  if (gridWithImages) {
    const cardsWithImages = gridWithImages.querySelectorAll('a.utility-link-content-block');
    cardsWithImages.forEach(card => {
      const img = card.querySelector('div[class*="utility-aspect"] img');
      const tag = card.querySelector('.tag-group');
      const heading = card.querySelector('h2, h3, h4, h5, h6');
      const desc = card.querySelector('p');
      rows.push(makeCardRow(img, [tag, heading, desc]));
    });
  }

  // --- THIRD GROUP: text-only cards (no image) ---
  // The next direct child with class 'flex-horizontal' and NO img
  const gridTextOnly = directChildren.find(el => el.classList.contains('flex-horizontal') && !el.querySelector('img'));
  if (gridTextOnly) {
    // Each card is an <a.utility-link-content-block>
    const textCards = Array.from(gridTextOnly.children).filter(el => el.matches('a.utility-link-content-block'));
    textCards.forEach(card => {
      const heading = card.querySelector('h2, h3, h4, h5, h6');
      const desc = card.querySelector('p');
      rows.push(makeCardRow('', [heading, desc]));
    });
  }

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
