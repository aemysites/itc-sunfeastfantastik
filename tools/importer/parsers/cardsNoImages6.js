/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract the section heading ('Pookie Messages')
  const headingEl = element.querySelector('.scrollableCardWrapper__title');
  let heading;
  if (headingEl) {
    heading = document.createElement('h2');
    heading.textContent = headingEl.textContent.trim();
  }

  // 2. Cards (cardsNoImages6) block header row
  const headerRow = ['Cards (cardsNoImages6)'];

  // 3. Find the card container
  const cardRow = element.querySelector('.scrollableCardsWrapper__imageCards--cardRow');
  if (!cardRow) return;

  // 4. Find all card elements inside the card row in DOM order
  const cardEls = Array.from(cardRow.querySelectorAll('.scrollableCardsWrapper__imageCards--card'));

  // 5. Build rows: each card's text content is in a <p> inside the card
  const rows = cardEls.map(card => {
    const p = card.querySelector('p');
    return p ? [p] : [];
  }).filter(row => row.length);

  // 6. Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // 7. Replace the original element with heading + table
  if (heading) {
    element.replaceWith(heading, table);
  } else {
    element.replaceWith(table);
  }
}
