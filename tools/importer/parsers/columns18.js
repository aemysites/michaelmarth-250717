/* global WebImporter */
export default function parse(element, { document }) {
  // Gather all direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // The example expects 2 columns per row, so chunk columns into groups of 2
  function chunk(arr, n) {
    const out = [];
    for (let i = 0; i < arr.length; i += n) {
      out.push(arr.slice(i, i + n));
    }
    return out;
  }

  const grouped = chunk(columns, 2);

  // For each column in each group, gather the .icon and <p> (stack them in a fragment)
  const rows = grouped.map(group => {
    return group.map(col => {
      const frag = document.createDocumentFragment();
      const iconDiv = col.querySelector('.icon');
      if (iconDiv) frag.appendChild(iconDiv);
      const p = col.querySelector('p');
      if (p) frag.appendChild(p);
      // If frag has only 1 node, return it directly, else return the fragment
      return frag.childNodes.length === 1 ? frag.firstChild : frag;
    });
  });

  // Compose table: header row is always a single column, then each row as per the design
  const cells = [
    ['Columns (columns18)'],
    ...rows
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
