/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Hero (hero23)'];

  // Find the image (background/main visual)
  // The image is direct child of the outer grid-layout (element)
  const img = element.querySelector('img');

  // Find the main content column - look for grid container and then section
  let contentDiv = null;
  const grids = element.querySelectorAll(':scope > .w-layout-grid');
  for (const grid of grids) {
    // Look for a child div with a heading (as our content block)
    const childSection = grid.querySelector('.section');
    if (childSection && childSection.querySelector('h1,h2,h3,h4,h5,h6')) {
      contentDiv = childSection;
      break;
    }
  }

  // Compose content elements from contentDiv
  const contentElements = [];
  if (contentDiv) {
    // Heading (any level)
    const heading = contentDiv.querySelector('h1,h2,h3,h4,h5,h6');
    if (heading) contentElements.push(heading);

    // Subheading or description
    // Accept either .rich-text or .w-richtext or paragraph
    let subDesc = contentDiv.querySelector('.rich-text, .w-richtext, p');
    if (subDesc) contentElements.push(subDesc);

    // CTA buttons group
    const btnGroup = contentDiv.querySelector('.button-group');
    if (btnGroup) contentElements.push(btnGroup);
  }

  // Build table rows
  const cells = [
    headerRow,
    [img || ''],
    [contentElements.length ? contentElements : '']
  ];

  // Create and replace
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
