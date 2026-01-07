/* global WebImporter */
export default function parse(element, { document }) {
  // Extract left column: only content from HTML
  const leftSection = element.querySelector('.footer-brand__left');
  const leftCol = document.createElement('div');
  if (leftSection) {
    // ITC logo (with link)
    const itcLogoLink = leftSection.querySelector('.footer-brand__logo');
    if (itcLogoLink) leftCol.appendChild(itcLogoLink);
    // FSSAI logo
    const fssaiLogo = leftSection.querySelector('.footer-brand__secondary--logo');
    if (fssaiLogo) leftCol.appendChild(fssaiLogo);
  }

  // Extract right column: only content from HTML
  const rightSection = element.querySelector('.footer-brand__right');
  const rightCol = document.createElement('div');
  if (rightSection) {
    const terms = rightSection.querySelector('a[href*="terms-of-use"]');
    const privacy = rightSection.querySelector('a[href*="privacy-policy"]');
    if (terms) {
      const div = document.createElement('div');
      div.appendChild(terms);
      rightCol.appendChild(div);
    }
    if (privacy) {
      const div = document.createElement('div');
      div.appendChild(privacy);
      rightCol.appendChild(div);
    }
  }

  // Table header row
  const headerRow = ['Columns (columns4)'];
  // Table content row
  const contentRow = [leftCol, rightCol];
  const rows = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
