/* global WebImporter */
export default function parse(element, { document }) {
  // Find the primary layout grid
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // The first column is text content, the second column is images
  const textCol = grid.children[0];
  const imagesCol = grid.children[1];

  // Get images from the images grid
  const imagesGrid = imagesCol.querySelector('.w-layout-grid');
  const images = imagesGrid ? Array.from(imagesGrid.querySelectorAll('img')) : [];

  // Prepare text content for the right cell
  const textContent = [];
  const heading = textCol.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) textContent.push(heading);
  const subheading = textCol.querySelector('p');
  if (subheading) textContent.push(subheading);
  const buttonGroup = textCol.querySelector('.button-group');
  if (buttonGroup) textContent.push(buttonGroup);

  // Build the table rows
  const cells = [['Carousel']]; // header row as in the example
  images.forEach((img) => {
    // Each slide: left = image, right = full text content (shared for all, per example)
    cells.push([
      img,
      textContent.length === 1 ? textContent[0] : textContent
    ]);
  });

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
