// Report Found Item Logic
function selectCondition(el) {
  const chips = document.querySelectorAll('.condition-chip');
  chips.forEach(c => {
    c.className = 'condition-chip py-2.5 px-3 rounded-lg text-center font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-all';
  });
  el.className = 'condition-chip py-2.5 px-3 rounded-lg text-center font-label-md text-label-md bg-secondary-fixed text-on-secondary-fixed font-bold shadow-sm transition-all';
}

function updateCustodyView(mode) {
  const labels = document.querySelectorAll('#custody-options label');
  labels.forEach(l => {
    l.className = 'relative flex items-start gap-4 p-4 rounded-xl cursor-pointer bg-surface-container-low hover:bg-surface-container transition-all';
  });
  if (window.event && window.event.currentTarget) {
    window.event.currentTarget.closest('label').className = 'relative flex items-start gap-4 p-4 rounded-xl cursor-pointer bg-surface-container-high transition-all';
  }
}

function triggerSubmitFeedback() {
  const btn = document.querySelector('button[type="submit"]');
  if (!btn) return;
  const originalText = btn.innerHTML;
  btn.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">refresh</span> Processing Verification...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<span class="material-symbols-outlined text-[20px]">check_circle</span> Listing Active! Redirecting...';
    btn.classList.remove('bg-primary');
    btn.classList.add('bg-tertiary-container', 'text-on-tertiary-container');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1200);
  }, 900);
}
