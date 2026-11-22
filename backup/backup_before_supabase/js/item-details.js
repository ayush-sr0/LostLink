// Item Details & Claim Modals Logic
function toggleModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  if (modal.classList.contains('hidden')) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  } else {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function swapImage(thumbBtn, index) {
  const mainImg = document.getElementById('main-item-view');
  const thumbImg = thumbBtn.querySelector('img');
  if (mainImg && thumbImg) {
    mainImg.src = thumbImg.src;
  }
  
  const parent = thumbBtn.parentElement;
  if (parent) {
    Array.from(parent.children).forEach(btn => {
      btn.classList.add('opacity-70');
    });
    thumbBtn.classList.remove('opacity-70');
  }
}

function copyShareLink() {
  const label = document.getElementById('share-label');
  navigator.clipboard?.writeText(window.location.href);
  if (label) {
    const originalText = label.innerText;
    label.innerText = 'Link Copied!';
    setTimeout(() => {
      label.innerText = originalText;
    }, 2000);
  }
}

function handleClaimSubmit(event) {
  event.preventDefault();
  toggleModal('claim-challenge-modal');
  alert('Verification initiated. Your claim data has been sent to Officer Henderson at Desk 14. You will receive an SMS and dashboard notification once verified.');
}

function handleSendChat(event) {
  event.preventDefault();
  const input = event.target.querySelector('input');
  if (!input || !input.value.trim()) return;
  
  const messageContainer = event.target.previousElementSibling;
  const newBubble = document.createElement('div');
  newBubble.className = "flex flex-col max-w-[80%] ml-auto bg-primary text-on-primary p-3 rounded-2xl rounded-tr-sm shadow-sm";
  newBubble.innerHTML = `<span class="font-label-caps text-label-caps text-on-primary-container">You • Just now</span><p class="font-body-sm text-body-sm mt-1">${input.value}</p>`;
  messageContainer.appendChild(newBubble);
  input.value = '';
  messageContainer.scrollTop = messageContainer.scrollHeight;
}
