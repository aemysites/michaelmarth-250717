/* global WebImporter */
export default function parse(element, { document }) {
  // Table header (must match exactly)
  const headerRow = ['Hero (hero13)'];

  // === Background Image Row ===
  // Find the first .ix-parallax-scale-out-hero img inside the header
  let bgImg = null;
  const parallaxDiv = element.querySelector('.ix-parallax-scale-out-hero');
  if (parallaxDiv) {
    bgImg = parallaxDiv.querySelector('img');
  }
  const imageRow = [bgImg ? bgImg : ''];

  // === Content Row (Title, Subheading, CTA) ===
  // Find the container with the heading
  let contentCellElements = [];
  const containers = element.querySelectorAll('.container');
  for (const container of containers) {
    // Look for all headings (h1-h6) in logical order
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(h => contentCellElements.push(h));
    // Find any button groups or other CTAs
    const buttonGroups = container.querySelectorAll('.button-group');
    buttonGroups.forEach(bg => {
      if (bg.children.length > 0) contentCellElements.push(bg);
    });
  }
  // If there are no headings/buttons, leave the cell blank (edge case handling)
  const contentRow = [contentCellElements.length ? contentCellElements : ''];

  // === Build the Block Table ===
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
