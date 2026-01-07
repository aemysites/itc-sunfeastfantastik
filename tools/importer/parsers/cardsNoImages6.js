/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cardsNoImages6) block parsing
  // Header row as per spec
  const headerRow = ['Cards (cardsNoImages6)'];

  // Find the heading
  const headingEl = element.querySelector('.scrollableCardWrapper__title');
  let heading = '';
  if (headingEl) {
    heading = headingEl.textContent.trim();
  }

  // Find the cards container (the row of cards)
  const cardsRow = element.querySelector('.scrollableCardsWrapper__imageCards--cardRow');
  if (!cardsRow) return;

  // Get all card elements
  const cardEls = Array.from(cardsRow.querySelectorAll('.scrollableCardsWrapper__imageCards--card'));

  // Each card's content is a <p> inside the card
  const rows = cardEls.map(card => {
    const cardContent = card.querySelector('p');
    if (!cardContent) return null;
    return [cardContent.textContent.trim()];
  }).filter(Boolean);

  // Compose the table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Insert heading before the table, if present
  if (heading) {
    const headingElem = document.createElement('h2');
    headingElem.textContent = heading;
    element.parentNode.insertBefore(headingElem, element);
  }

  // Replace original element
  element.replaceWith(table);
}
