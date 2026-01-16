/* global WebImporter */

export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero2)'];

  // Background image row
  let bgImg = null;
  const img = element.querySelector('picture img');
  if (img) bgImg = img;

  // Content row: Extract all text content from the source html, including from all child elements
  // Collect all text nodes in the hero section, skipping empty and meaningless nodes
  let textContent = '';
  const texts = [];
  // Use less specific selectors to capture more text content
  element.querySelectorAll('*').forEach(el => {
    const txt = el.textContent;
    if (txt && txt.trim() && txt.trim() !== '.') {
      texts.push(txt.trim());
    }
  });
  if (texts.length > 0) {
    // Remove duplicates and join
    textContent = Array.from(new Set(texts)).join('\n');
  }

  const rows = [
    headerRow,
    [bgImg],
    [textContent],
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
