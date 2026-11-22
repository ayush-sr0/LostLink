// Interactive Tab Filter for Recently Reported Items (Home Page)
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-pill');
  const cards = document.querySelectorAll('.item-card');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Update button states
      tabButtons.forEach(btn => {
        btn.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');
        btn.classList.add('text-on-surface-variant');
      });
      button.classList.add('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');
      button.classList.remove('text-on-surface-variant');

      // Filter cards
      cards.forEach(card => {
        const cardStatus = card.getAttribute('data-status');
        if (filter === 'all' || cardStatus === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
