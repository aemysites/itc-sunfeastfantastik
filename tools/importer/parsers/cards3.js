/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards3) block header
  const headerRow = ['Cards (cards3)'];
  const rows = [headerRow];

  // Find all card elements
  const cardEls = element.querySelectorAll('.tvc-card');

  cardEls.forEach(card => {
    // Image (mandatory)
    const thumb = card.querySelector('.tvc-card__thumbnail img');
    const imageEl = thumb || document.createElement('span');

    // Text content: only visible text (title, description, or fallback to alt text)
    // Represent play button as a <button> with aria-label if present
    const textParts = [];
    // Title (h5)
    const titleEl = card.querySelector('.tvc-card__title');
    if (titleEl && titleEl.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = titleEl.textContent.trim();
      textParts.push(strong);
    }
    // Description (h6)
    const descEl = card.querySelector('.tvc-card__description');
    if (descEl && descEl.textContent.trim()) {
      const desc = document.createElement('div');
      desc.textContent = descEl.textContent.trim();
      textParts.push(desc);
    }
    // Fallback: alt text if no title/description
    if (textParts.length === 0 && thumb && thumb.alt) {
      const alt = document.createElement('strong');
      alt.textContent = thumb.alt;
      textParts.push(alt);
    }
    // Play button (if present), represent as a button with aria-label and play icon
    const playBtn = card.querySelector('.tvc-card__playbtn');
    if (playBtn && playBtn.getAttribute('aria-label')) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', playBtn.getAttribute('aria-label'));
      btn.textContent = '▶';
      textParts.push(btn);
    }
    // Compose cell
    let textCell = '';
    if (textParts.length === 1) {
      textCell = textParts[0];
    } else if (textParts.length > 1) {
      textCell = document.createElement('div');
      textParts.forEach(part => textCell.appendChild(part));
    }
    rows.push([
      imageEl,
      textCell
    ]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
