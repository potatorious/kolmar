const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.site-nav');

function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  navigation?.classList.remove('is-open');
}

menuButton?.addEventListener('click', () => {
  const shouldOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(shouldOpen));
  navigation?.classList.toggle('is-open', shouldOpen);
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => event.key === 'Escape' && closeMenu());


const motionCards = document.querySelectorAll('.motion-card');
const motionModal = document.querySelector('#motion-modal');
const motionPlayer = document.querySelector('#motion-player');
const motionCloseButtons = document.querySelectorAll('[data-motion-close]');

function closeMotionModal() {
  if (!motionModal || !motionPlayer) return;
  motionPlayer.pause();
  motionPlayer.removeAttribute('src');
  motionPlayer.removeAttribute('poster');
  motionPlayer.load();
  motionModal.hidden = true;
  motionModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('motion-open');
}

motionCards.forEach((card) => {
  card.addEventListener('click', () => {
    if (!motionModal || !motionPlayer) return;
    motionPlayer.src = card.dataset.video || '';
    motionPlayer.poster = card.dataset.poster || '';
    motionModal.hidden = false;
    motionModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('motion-open');
    motionPlayer.load();
    motionPlayer.play().catch(() => {});
  });
});

motionCloseButtons.forEach((button) => button.addEventListener('click', closeMotionModal));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && motionModal && !motionModal.hidden) closeMotionModal();
});
