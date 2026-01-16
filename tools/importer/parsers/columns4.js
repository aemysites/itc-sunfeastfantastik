/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block
  const headerRow = ['Columns (columns4)'];

  // --- LEFT COLUMN ---
  // Find the left section containing logos and all text content
  const leftSection = element.querySelector('.footer-brand__left');
  const leftCol = document.createElement('div');
  if (leftSection) {
    // ITC logo (anchor with image)
    const itcLogoLink = leftSection.querySelector('a.footer-brand__logo');
    if (itcLogoLink) leftCol.appendChild(itcLogoLink);
    // FSSAI logo (div with image)
    const fssaiLogoDiv = leftSection.querySelector('.footer-brand__secondary--logo');
    if (fssaiLogoDiv) leftCol.appendChild(fssaiLogoDiv);
    // Extract all text content from descendants (including visually hidden branding text)
    leftSection.querySelectorAll('*').forEach((descendant) => {
      if (
        descendant.childNodes.length === 1 &&
        descendant.childNodes[0].nodeType === Node.TEXT_NODE &&
        descendant.textContent.trim()
      ) {
        const span = document.createElement('span');
        span.textContent = descendant.textContent.trim();
        leftCol.appendChild(span);
      }
    });
  }

  // --- RIGHT COLUMN ---
  // Find the right section containing nav links
  const rightSection = element.querySelector('.footer-brand__right');
  const rightCol = document.createElement('div');
  if (rightSection) {
    // Get the Terms of Use and Privacy Policy links
    const links = rightSection.querySelectorAll('a.footer-list__item--link');
    links.forEach(link => {
      // Put each link in its own div for vertical stacking
      const div = document.createElement('div');
      div.appendChild(link);
      rightCol.appendChild(div);
    });
  }

  // Build the columns row
  const columnsRow = [leftCol, rightCol];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
