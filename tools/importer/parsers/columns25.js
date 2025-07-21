/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid, which contains the whole "columns" content
  const container = element.querySelector('.container');
  if (!container) return;
  
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout.mobile-landscape-1-column.grid-gap-sm.y-bottom');
  if (!mainGrid) return;

  // Get all direct children of the mainGrid
  const gridChildren = mainGrid.querySelectorAll(':scope > *');
  
  // The structure is:
  // [0]: <p class="h2-heading ..."> (heading)
  // [1]: <p class="paragraph-lg ..."> (testimonial)
  // [2]: nested grid with (divider, avatar+name+title, logo)
  const heading = gridChildren[0];
  const testimonial = gridChildren[1];
  const nestedGrid = gridChildren[2];

  // Defensive: ensure elements exist
  if (!heading || !testimonial || !nestedGrid) return;

  // In nestedGrid, we want to extract:
  // - the author info (avatar, name, title)
  // - the logo (svg)
  // The author info is a div with .flex-horizontal
  const authorFlex = nestedGrid.querySelector('.flex-horizontal');
  // The logo is an inline svg, which is likely the last div or a direct svg
  const logo = nestedGrid.querySelector('svg');

  // Prepare the two columns:
  // Left col: heading, author info
  const leftCol = document.createElement('div');
  if (heading) leftCol.appendChild(heading);
  if (authorFlex) leftCol.appendChild(authorFlex);

  // Right col: testimonial, logo
  const rightCol = document.createElement('div');
  if (testimonial) rightCol.appendChild(testimonial);
  if (logo) rightCol.appendChild(logo);

  // Build the table
  const cells = [
    ['Columns (columns25)'],
    [leftCol, rightCol]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
