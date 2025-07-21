/* global WebImporter */
export default function parse(element, { document }) {
  // Get tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  // Collect tab labels and their data-w-tab for reliable matching
  const tabLinks = tabMenu ? Array.from(tabMenu.children) : [];
  const tabLabels = tabLinks.map(link => {
    // Prefer the inner div text if present for label
    const div = link.querySelector('div');
    const label = div ? div.textContent.trim() : link.textContent.trim();
    const dataWTab = link.getAttribute('data-w-tab') || label;
    return {
      label,
      dataWTab
    };
  });

  // Collect tab content panes
  const tabPanes = tabContent ? Array.from(tabContent.children) : [];

  // Build the rows array
  // Header row must be a single column per the example
  const rows = [];
  rows.push(['Tabs']);

  // All subsequent rows have 2 columns: label and content
  tabLabels.forEach(tab => {
    // Find pane with matching data-w-tab
    let pane = tabPanes.find(p => (p.getAttribute('data-w-tab') || '').trim() === tab.dataWTab);
    // Fallback to same index if not found
    if (!pane) {
      const idx = tabLabels.indexOf(tab);
      pane = tabPanes[idx];
    }
    // The actual content is likely the first child div of the pane, fallback to pane
    let contentElem = null;
    if (pane) {
      // Only get immediate child div (not nested content unless only one direct div)
      contentElem = Array.from(pane.children).find(child => child.tagName === 'DIV') || pane;
    }
    rows.push([
      tab.label,
      contentElem || document.createTextNode('')
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
