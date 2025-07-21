/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Hero (hero7)'];

  // Find the background image (should be the prominent cover image)
  let bgImg = null;
  const img = element.querySelector('img.cover-image');
  if (img) bgImg = img;

  // Second row: background image (optional)
  const bgRow = [bgImg ? bgImg : ''];

  // Third row: Title, Subheading and CTAs
  // All of the content is inside the .card
  const card = element.querySelector('.card');
  let contentArr = [];
  if (card) {
    // Heading (h1)
    const heading = card.querySelector('h1, .h1-heading');
    if (heading) contentArr.push(heading);
    // Subheading (p, .subheading)
    // Prefer <p> with class subheading, but fall back to any p if needed
    let subheading = card.querySelector('p.subheading') || card.querySelector('p');
    if (subheading) contentArr.push(subheading);
    // CTA buttons (all <a> in .button-group)
    const btnGroup = card.querySelector('.button-group');
    if (btnGroup) {
      const ctas = Array.from(btnGroup.querySelectorAll('a'));
      contentArr.push(...ctas);
    }
  }
  const contentRow = [contentArr];

  // Create block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgRow,
    contentRow,
  ], document);
  
  element.replaceWith(table);
}
