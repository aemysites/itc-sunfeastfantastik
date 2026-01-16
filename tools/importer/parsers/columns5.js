/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block
  const headerRow = ['Columns (columns5)'];

  // --- LEFT COLUMN: ITC Logo + Enduring Value ---
  const leftSection = element.querySelector('.footer-brand__left');
  let leftContent = [];
  if (leftSection) {
    // ITC Logo
    const itcLogo = leftSection.querySelector('img');
    if (itcLogo) leftContent.push(itcLogo);
    // Extract any text nodes (such as 'Enduring Value')
    leftSection.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const textDiv = document.createElement('div');
        textDiv.textContent = node.textContent.trim();
        leftContent.push(textDiv);
      }
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'IMG') {
        leftContent.push(node.cloneNode(true));
      }
    });
  }

  // --- CENTER COLUMN: FSSAI Logo ---
  let centerContent = [];
  if (leftSection) {
    const fssaiLogo = leftSection.querySelector('.footer-brand__secondary--logo img');
    if (fssaiLogo) centerContent.push(fssaiLogo);
  }

  // --- RIGHT COLUMN: Terms of Use & Privacy Policy ---
  const rightSection = element.querySelector('.footer-brand__right');
  let rightContent = [];
  if (rightSection) {
    const links = rightSection.querySelectorAll('a');
    links.forEach(link => {
      rightContent.push(link);
    });
  }

  // Table row: three columns
  const contentRow = [leftContent, centerContent, rightContent];

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
