/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns (columns8)'];

  // --- COLUMN 1: Logo + Tagline ---
  const leftSection = element.querySelector('.footer-brand__left');
  let logoCellContent = [];
  if (leftSection) {
    // Find the anchor containing the logo
    const logoAnchor = leftSection.querySelector('a');
    if (logoAnchor) {
      logoCellContent.push(logoAnchor);
    }
    // Always include the tagline 'Enduring Value' as shown in the screenshot
    logoCellContent.push('Enduring Value');
  }

  // --- COLUMN 2: Links ---
  const rightSection = element.querySelector('.footer-brand__right');
  let linksCellContent = [];
  if (rightSection) {
    // Find all anchor tags inside the right section
    const links = Array.from(rightSection.querySelectorAll('a'));
    if (links.length) {
      linksCellContent = links;
    }
  }

  // Build the table rows
  const cells = [
    headerRow,
    [logoCellContent, linksCellContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
