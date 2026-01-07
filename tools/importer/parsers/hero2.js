/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero2)'];

  // Extract the background image from <img> inside <picture>
  let bgImg = '';
  const picture = element.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) bgImg = img;
  }

  // Extract all text content from the source HTML, including deeply nested children
  // Only include actual text nodes, not fabricated content
  let textContent = '';
  // Get all text from the element, including deeply nested children
  textContent = Array.from(element.querySelectorAll('*'))
    .map(el => el.childNodes)
    .flat()
    .filter(node => node.nodeType === Node.TEXT_NODE)
    .map(node => node.textContent.trim())
    .filter(Boolean)
    .join(' ');

  // Create a div for the text row
  const textDiv = document.createElement('div');
  if (textContent) {
    const p = document.createElement('p');
    p.textContent = textContent;
    textDiv.appendChild(p);
  }

  // Compose the table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''], // background image row
    [textDiv.childNodes.length ? textDiv : ''], // text content row
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
