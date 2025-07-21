/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare rows: first row is the block name, following rows are accordion items
  const rows = [['Accordion']];

  // Get all direct accordion items
  const accordionItems = element.querySelectorAll(':scope > .accordion');
  accordionItems.forEach((acc) => {
    // Title: typically in .w-dropdown-toggle .paragraph-lg
    let titleEl = acc.querySelector('.w-dropdown-toggle .paragraph-lg');
    if (!titleEl) {
      // fallback: get the .w-dropdown-toggle and its text content
      const toggle = acc.querySelector('.w-dropdown-toggle');
      if (toggle) {
        // Get all child nodes except the icon, join their text
        let foundText = '';
        toggle.childNodes.forEach((node) => {
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.classList.contains('dropdown-icon')
          ) {
            // skip icon
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            foundText += node.textContent;
          } else if (node.nodeType === Node.TEXT_NODE) {
            foundText += node.textContent;
          }
        });
        titleEl = document.createElement('span');
        titleEl.textContent = foundText.trim();
      } else {
        // fallback: use empty span
        titleEl = document.createElement('span');
      }
    }
    // Content: typically in .accordion-content .w-richtext or .accordion-content
    let contentEl = acc.querySelector('.accordion-content');
    let contentCell;
    if (contentEl) {
      const richtext = contentEl.querySelector('.w-richtext');
      if (richtext) {
        contentCell = richtext;
      } else {
        // Are there direct children elements with text? Use all children except empty
        let children = Array.from(contentEl.children).filter(el => el.textContent.trim().length > 0);
        if (children.length === 1) {
          contentCell = children[0];
        } else if (children.length > 1) {
          contentCell = children;
        } else {
          contentCell = contentEl;
        }
      }
    } else {
      // fallback: empty div
      contentCell = document.createElement('div');
    }
    rows.push([titleEl, contentCell]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
