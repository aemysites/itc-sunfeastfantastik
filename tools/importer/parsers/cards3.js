/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards3) block: 2 columns, multiple rows, first row is block name
  const headerRow = ['Cards (cards3)'];
  const rows = [headerRow];

  // Find all card containers (should support multiple cards)
  const cardElements = element.querySelectorAll('.tvc-card');

  cardElements.forEach(card => {
    // --- Image/Icon (mandatory, first cell) ---
    const img = card.querySelector('img');
    const playBtn = card.querySelector('.tvc-card__playbtn');
    let imageCell = '';
    if (img) {
      // If play button exists, wrap image and button together in a div
      if (playBtn) {
        const imgDiv = document.createElement('div');
        imgDiv.appendChild(img.cloneNode(true));
        imgDiv.appendChild(playBtn.cloneNode(true));
        imageCell = imgDiv;
      } else {
        imageCell = img;
      }
    }

    // --- Text Content (mandatory, second cell) ---
    let textCellContent = [];
    const textContainer = card.querySelector('.tvc-card__text');
    if (textContainer && textContainer.textContent.trim()) {
      const div = document.createElement('div');
      div.innerHTML = textContainer.innerHTML;
      textCellContent.push(div);
    }
    // If title and description are empty, use alt text from image
    if (textCellContent.length === 0 && img && img.alt) {
      const strong = document.createElement('strong');
      strong.textContent = img.alt;
      textCellContent.push(strong);
    }
    // Ensure cell is not empty
    if (textCellContent.length === 0) textCellContent = [''];
    rows.push([imageCell, textCellContent]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
