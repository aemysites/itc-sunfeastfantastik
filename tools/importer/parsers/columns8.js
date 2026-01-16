/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Columns block
  const headerRow = ['Columns (columns8)'];

  // Find the left column: logo section
  const leftSection = element.querySelector('.footer-brand__left');
  let leftContent = '';
  if (leftSection) {
    // Get the logo image (with alt text)
    const logoLink = leftSection.querySelector('a');
    if (logoLink && logoLink.firstElementChild) {
      leftContent = logoLink.cloneNode(true);
    }
  }

  // Find the right column: links section
  const rightSection = element.querySelector('.footer-brand__right');
  let rightContent = '';
  if (rightSection) {
    // Find the Terms/Privacy links
    const links = Array.from(rightSection.querySelectorAll('a'));
    if (links.length) {
      // Place each link on its own line (div), preserve original text
      const container = document.createElement('div');
      links.forEach(link => {
        const line = document.createElement('div');
        line.appendChild(link.cloneNode(true));
        container.appendChild(line);
      });
      rightContent = container;
    }
  }

  // Build the table rows
  const rows = [
    headerRow,
    [leftContent, rightContent]
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
