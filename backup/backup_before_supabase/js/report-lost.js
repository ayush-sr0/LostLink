// Report Lost Item Logic
document.addEventListener('DOMContentLoaded', () => {
  (function initColorPills() {
    const container = document.getElementById('color-pill-container');
    if (!container) return;
    const buttons = container.querySelectorAll('.color-pill');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => {
          b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
          b.classList.add('bg-surface-container-low', 'text-on-surface');
        });
        btn.classList.remove('bg-surface-container-low', 'text-on-surface');
        btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
      });
    });
  })();
});
