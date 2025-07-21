/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name
  const headerRow = ['Hero (hero6)'];

  // 2. Second row: optional background image
  // Look for a .cover-image that is NOT utility-aspect-1x1 (these are used for main hero background)
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  for (const div of gridDivs) {
    const candidate = div.querySelector('img.cover-image:not(.utility-aspect-1x1)');
    if (candidate) {
      bgImg = candidate;
      break;
    }
  }
  const backgroundImgCell = bgImg ? [bgImg] : [''];

  // 3. Third row: Content - title, subtitle, CTA, possibly subimage
  // Find a container with .card-body, that's where all text/buttons/content lives
  let cardBody = null;
  for (const div of gridDivs) {
    const cb = div.querySelector('.card-body');
    if (cb) {
      cardBody = cb;
      break;
    }
  }

  let contentCell = [''];
  if (cardBody) {
    // There may be a 1:1 image ("concert crowd") and the textual content in the grid
    const subImg = cardBody.querySelector('img.cover-image.utility-aspect-1x1');
    const innerGrid = cardBody.querySelector('.w-layout-grid');
    // Compose the content cell in visual order: subImg, then innerGrid (text/buttons)
    if (subImg && innerGrid) {
      contentCell = [[subImg, innerGrid]];
    } else if (innerGrid) {
      contentCell = [innerGrid];
    } else if (subImg) {
      contentCell = [subImg];
    } else {
      contentCell = [cardBody];
    }
  }

  // 4. Compose and replace
  const cells = [
    headerRow,
    backgroundImgCell,
    contentCell
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
