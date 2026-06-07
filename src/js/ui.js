// ============================================
//  AlphaLearn — Shared UI Utilities
// ============================================

/* ── Page Navigation ── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  const tabs = ['home', 'camera', 'video', 'quiz', 'progress'];
  const idx = tabs.indexOf(id);
  if (idx >= 0) document.querySelectorAll('.nav-tab')[idx].classList.add('active');
  if (id === 'progress') updateProgressPage();
  if (id === 'video') renderLetterSelector();
  if (id === 'animasi') renderAnimasiGrid('all');
}

/* ── Alphabet Grids ── */
function buildAlphabetGrid(containerId, clickable) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = '';
  ALPHABET.forEach(letter => {
    const chip = document.createElement('div');
    chip.className = 'letter-chip' + (progress[letter]?.learned ? ' learned' : '');
    chip.textContent = letter;
    chip.title = letter;
    if (clickable) chip.onclick = () => { showPage('video'); selectLetter(letter); };
    el.appendChild(chip);
  });
}

function updateAllGrids() {
  buildAlphabetGrid('homeAlphabetGrid', true);
  buildAlphabetGrid('camAlphabetGrid', false);
}

/* ── Reward Flash ── */
function showReward(letter, message) {
  const fl = document.getElementById('rewardFlash');
  const emojis = ['🎉', '⭐', '🌟', '🎊', '🏆', '✨', '🎈'];
  document.getElementById('rewardEmoji').textContent = emojis[Math.floor(Math.random() * emojis.length)];
  document.getElementById('rewardMsg').textContent = `Hebat! Itu huruf ${letter}!`;
  document.getElementById('rewardSub').textContent = message || 'Terus semangat belajar!';
  fl.classList.add('show');
  launchConfetti();
  setTimeout(() => fl.classList.remove('show'), 3000);
}

/* ── Confetti ── */
function launchConfetti() {
  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A78BFA', '#6EE7B7', '#FCA5A5'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    p.style.animationDelay = Math.random() * 0.5 + 's';
    p.style.width = (8 + Math.random() * 12) + 'px';
    p.style.height = p.style.width;
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '4px';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 3500);
  }
}

/* ── Mini Toast ── */
function showMiniReward(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = 'position:fixed;bottom:2rem;right:2rem;background:white;padding:12px 20px;border-radius:50px;box-shadow:0 8px 32px rgba(0,0,0,0.15);font-weight:800;font-size:1.1rem;z-index:999;animation:popIn 0.3s ease;';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1500);
}