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


const videoCards = document.querySelectorAll('.video-card');
const videoModal = document.querySelector('#video-modal');
const videoPlayer = document.querySelector('#video-player');
const videoModalDialog = document.querySelector('.video-modal-dialog');
const videoCloseButtons = document.querySelectorAll('[data-video-close]');

function formatVideoDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return null;
  const total = Math.round(seconds);
  const minutes = Math.floor(total / 60);
  const secs = total % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

videoCards.forEach((card) => {
  const source = card.dataset.video;
  const badge = card.querySelector('.video-duration');
  if (!source || !badge) return;

  const probe = document.createElement('video');
  probe.preload = 'metadata';
  probe.muted = true;
  probe.src = source;

  probe.addEventListener('loadedmetadata', () => {
    const formatted = formatVideoDuration(probe.duration);
    if (formatted) badge.textContent = formatted;
    probe.removeAttribute('src');
    probe.load();
  }, { once: true });
});

function closeVideoModal() {
  if (!videoModal || !videoPlayer) return;
  videoPlayer.pause();
  videoPlayer.removeAttribute('src');
  videoPlayer.removeAttribute('poster');
  videoPlayer.load();
  videoModalDialog?.classList.remove('video-modal-dialog--square', 'video-modal-dialog--portrait');
  videoModal.hidden = true;
  videoModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('video-open');
}

videoCards.forEach((card) => {
  card.addEventListener('click', () => {
    if (!videoModal || !videoPlayer) return;
    const isPortrait = card.classList.contains('video-card--portrait');
    videoModalDialog?.classList.toggle('video-modal-dialog--portrait', isPortrait);
    videoModalDialog?.classList.toggle('video-modal-dialog--square', !isPortrait);
    videoPlayer.src = card.dataset.video || '';
    videoPlayer.poster = card.dataset.poster || '';
    videoModal.hidden = false;
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('video-open');
    videoPlayer.load();
    videoPlayer.play().catch(() => {});
  });
});

videoCloseButtons.forEach((button) => button.addEventListener('click', closeVideoModal));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && videoModal && !videoModal.hidden) closeVideoModal();
});
