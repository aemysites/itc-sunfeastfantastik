/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block
  const headerRow = ['Columns (columns5)'];

  // Find the main content wrapper
  const content = element.querySelector('.footer-brand__primary--content');
  if (!content) return;

  // Get left section: ITC logo and any text nodes (including 'Enduring Value')
  const leftSection = content.querySelector('.footer-brand__left');
  let leftCellContent = [];
  if (leftSection) {
    // ITC logo
    const itcLogo = leftSection.querySelector('img');
    if (itcLogo) leftCellContent.push(itcLogo);
    // Find any text nodes in left section (e.g., 'Enduring Value')
    leftSection.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const div = document.createElement('div');
        div.textContent = node.textContent.trim();
        leftCellContent.push(div);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'DIV') {
        // If text is in a <div> (not logo wrapper), add it
        if (!node.classList.contains('footer-brand__secondary--logo')) {
          leftCellContent.push(node.cloneNode(true));
        }
      }
    });
  }

  // Get center section: FSSAI logo only
  let centerCellContent = [];
  const fssaiLogoWrapper = leftSection ? leftSection.querySelector('.footer-brand__secondary--logo') : null;
  if (fssaiLogoWrapper) {
    const fssaiLogo = fssaiLogoWrapper.querySelector('img');
    if (fssaiLogo) centerCellContent.push(fssaiLogo);
  }

  // Get right section: Terms of Use and Privacy Policy links
  const rightSection = content.querySelector('.footer-brand__right');
  let rightCellContent = [];
  if (rightSection) {
    // Find all links in the right section
    const links = rightSection.querySelectorAll('a');
    links.forEach(link => {
      rightCellContent.push(link);
      rightCellContent.push(document.createElement('br'));
    });
    // Remove last <br>
    if (rightCellContent.length && rightCellContent[rightCellContent.length - 1].tagName === 'BR') {
      rightCellContent.pop();
    }
  }

  // Build the columns row
  const columnsRow = [leftCellContent, centerCellContent, rightCellContent];

  // Create the block table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
