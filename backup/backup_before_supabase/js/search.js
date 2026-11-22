// Search Items Page Logic
document.addEventListener('DOMContentLoaded', () => {
  // Clear omni-search input
  const searchInput = document.getElementById('itemSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
    });
  }

  // Filter Pill toggles
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => {
        p.classList.remove('bg-secondary-fixed', 'text-on-secondary-fixed', 'shadow-sm');
        p.classList.add('bg-surface-container', 'text-on-surface-variant');
      });
      pill.classList.remove('bg-surface-container', 'text-on-surface-variant');
      pill.classList.add('bg-secondary-fixed', 'text-on-secondary-fixed', 'shadow-sm');
    });
  });

  // Reset filters button
  const resetBtn = document.getElementById('resetFilters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      document.querySelectorAll('aside input[type="checkbox"]').forEach(cb => cb.checked = false);
      if (searchInput) searchInput.value = '';
    });
  }

  // Keyboard shortcut ⌘K / Ctrl+K focus
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    }
  });
});
