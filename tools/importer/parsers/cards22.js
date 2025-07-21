/* global WebImporter */
export default function parse(element, { document }) {
  // Set table header exactly as specified
  const headerRow = ['Cards (cards22)'];
  const rows = [headerRow];

  // Find all .w-tab-pane children (each tab content)
  const tabPanes = element.querySelectorAll(':scope > .w-tab-pane');
  tabPanes.forEach(tabPane => {
    // Find the grid for cards inside each tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> direct child (or descendant)
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach(card => {
      // Image: find .utility-aspect-3x2 > img, or just first img
      let image = null;
      const aspectDiv = card.querySelector('.utility-aspect-3x2');
      if (aspectDiv) {
        const img = aspectDiv.querySelector('img');
        if (img) image = img;
      }
      // If .utility-aspect-3x2 not present, look for img directly
      if (!image) {
        const img = card.querySelector('img');
        if (img) image = img;
      }
      // If no image, leave cell blank
      if (!image) image = document.createTextNode('');

      // Text: find heading (h3 or .h4-heading) and first .paragraph-sm
      let heading = card.querySelector('h3, .h4-heading');
      let desc = card.querySelector('.paragraph-sm');
      const textContent = [];
      if (heading) textContent.push(heading);
      if (desc && desc !== heading) textContent.push(desc);
      if (!heading && !desc) return; // skip empty
      rows.push([image, textContent]);
    });
  });

  // Only build table if there are cards
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
