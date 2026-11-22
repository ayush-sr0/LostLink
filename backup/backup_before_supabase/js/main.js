// Lost Link - Global UI Utilities
document.addEventListener('DOMContentLoaded', () => {
  // Graceful fallback for remote Stitch image assets if offline or expired
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    img.addEventListener('error', function() {
      if (!this.getAttribute('data-fallback-applied')) {
        this.setAttribute('data-fallback-applied', 'true');
        this.src = 'assets/images/placeholder.svg';
      }
    });
  });

  // Mobile navigation drawer toggle (if present)
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
});
