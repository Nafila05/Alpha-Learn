// ============================================
//  AlphaLearn — Halaman Animasi Menulis
//  Video source: assets/videos/video_A.mp4 dst.
// ============================================

let currentAnimasiLetter = 'A';

/* ── Link Google Drive embed per huruf ── */
const VIDEO_LINKS = {
  A: 'https://drive.google.com/file/d/1EDEV2G6nCUvhy7HyCuTVwkLLRfCbWuFG/preview',
  B: 'https://drive.google.com/file/d/1XOLvP77mCdb9NwdD9f0D9GTddv-LIbBI/preview',
  C: 'https://drive.google.com/file/d/1ejKnl4Fd2wTMjE4ML-TajEirdiXjmX1z/preview',
  D: 'https://drive.google.com/file/d/1aNhyg6HShF1BYUQ7qbDu2udlebHzi5II/preview',
  E: 'https://drive.google.com/file/d/1JOmQ7uOh26mDofhP17iLCTlN7LInqGlH/preview',
  F: 'https://drive.google.com/file/d/1kAiG-UTSDO156ksLfKQTBPS8lLMb8_E7/preview',
  G: 'https://drive.google.com/file/d/1A2_Hr_tusFzH-u9blRD16t8-ATeGpRSJ/preview',
  H: 'https://drive.google.com/file/d/1Ej1Q1E3871hVKn9IOHK85Yxm1H47fs7X/preview',
  I: 'https://drive.google.com/file/d/1LNP5gZQy76NJArbbEKxc9p_Oy6fT-9p0/preview',
  J: 'https://drive.google.com/file/d/1L4sLRAWleGOqyH3LLEVlTsh8m454PEnX/preview',
  K: 'https://drive.google.com/file/d/1plX9fQ7rmgyUtkfWvoA8WKYaPPb4021o/preview',
  L: 'https://drive.google.com/file/d/1C53xcJVMr5R7K7XW2g55O5uSJgZP6NtF/preview',
  M: 'https://drive.google.com/file/d/1jiwPv9eCXEclaLTwkTySmJ9we80AQj9A/preview',
  N: 'https://drive.google.com/file/d/1zXrGT6kkjgzPTKkhsuP0vHCqglxMba_M/preview',
  O: 'https://drive.google.com/file/d/17Wxt1UEzxRdosZSkUfWlD7OCrThvCxyJ/preview',
  P: null, // belum ada video
  Q: 'https://drive.google.com/file/d/1xTEUQr9Dpw39oZzhqKdqWeAJsOnvNSNt/preview',
  R: 'https://drive.google.com/file/d/1YWNIVn0rH8squtFBSUnOBeTku_lY35be/preview',
  S: 'https://drive.google.com/file/d/1FEBjOQO5sKGQmOIBbZFJfW_FgJ6Q9wf7/preview',
  T: 'https://drive.google.com/file/d/1lvkhRuXyTrx-pL2wMu12KofiMD4C_-ii/preview',
  U: 'https://drive.google.com/file/d/1BPxei9oflYEh8uRfB19gt530GukRe-Bw/preview',
  V: 'https://drive.google.com/file/d/158wiBH3n0UAzgFugjMrmKCg8UnoQ-4ii/preview',
  W: 'https://drive.google.com/file/d/1VOE4ozlULvSfJRRZTMYLwOcfW5HmuP2d/preview',
  X: 'https://drive.google.com/file/d/1nv5Auuuj1VgxCAVi8ACtopfuJgwogW5-/preview',
  Y: 'https://drive.google.com/file/d/15rh7qxL6ONd-MQiJSur2TM19wEQf-TQR/preview',
  Z: 'https://drive.google.com/file/d/1ObFj_DKCGItXktMDbPCwIwS3GPRxPR0t/preview',
};

/* ── Render grid kartu animasi ── */
function renderAnimasiGrid(filter) {
  const grid = document.getElementById('animasiGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const ranges = {
    'A-G': 'ABCDEFG',
    'H-N': 'HIJKLMN',
    'O-U': 'OPQRSTU',
    'V-Z': 'VWXYZ',
  };

  const letters = filter && filter !== 'all'
    ? ranges[filter].split('')
    : ALPHABET;

  letters.forEach(letter => {
    const data = LETTER_DATA[letter] || {};
    const card = document.createElement('div');
    card.className = 'animasi-card';
    card.onclick = () => openAnimasiModal(letter);
    card.innerHTML = `
      <span class="animasi-card-letter">${letter}</span>
      <span class="animasi-card-lower">${letter.toLowerCase()}</span>
      <div class="animasi-card-word">${data.word || ''}</div>
      <div class="animasi-card-play">▶</div>
    `;
    grid.appendChild(card);
  });
}

/* ── Filter tombol ── */
function filterAnimasi(range) {
  document.querySelectorAll('.animasi-filter-btn').forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');
  renderAnimasiGrid(range);
}

/* ── Buka modal ── */
function openAnimasiModal(letter) {
  currentAnimasiLetter = letter;
  const data = LETTER_DATA[letter] || {};

  document.getElementById('modalLetter').textContent = letter;
  document.getElementById('modalTitle').textContent = `Huruf ${letter}`;
  document.getElementById('modalSubtitle').textContent = data.word || '';

  // Set iframe embed Google Drive
  const src = VIDEO_LINKS[letter];
  const wrap = document.getElementById('animasiVideoWrap');
  wrap.removeAttribute('style');
  if (src) {
    wrap.innerHTML = `<iframe src="${src}" class="animasi-iframe" allowfullscreen allow="autoplay"></iframe>`;
  } else {
    wrap.innerHTML = `
      <div class="animasi-no-video">
        <div style="font-size:3rem;margin-bottom:8px">🎬</div>
        <div>Video huruf <strong>${letter}</strong> belum tersedia</div>
        <div style="font-size:13px;margin-top:4px;opacity:0.7">Segera hadir!</div>
      </div>`;
    wrap.style.paddingTop = '0';
    wrap.style.minHeight = '180px';
    wrap.style.display = 'flex';
    wrap.style.alignItems = 'center';
    wrap.style.justifyContent = 'center';
    wrap.style.background = '#F7FAFC';
  }

  // Render daftar langkah menulis
  renderAnimasiStrokes(letter);

  document.getElementById('animasiModalOverlay').classList.add('open');
}

/* ── Render daftar langkah menulis ── */
function renderAnimasiStrokes(letter) {
  const data = LETTER_DATA[letter] || {};
  const strokes = data.strokes || [];
  const list = document.getElementById('animasiStrokeList');
  list.innerHTML = '';
  strokes.forEach((s, i) => {
    const item = document.createElement('div');
    item.className = 'animasi-stroke-item';
    item.innerHTML = `<div class="animasi-stroke-num">${i + 1}</div><span>${s}</span>`;
    list.appendChild(item);
  });
}

/* ── Navigasi huruf ── */
function prevAnimasiLetter() {
  const idx = ALPHABET.indexOf(currentAnimasiLetter);
  openAnimasiModal(ALPHABET[(idx - 1 + 26) % 26]);
}
function nextAnimasiLetter() {
  const idx = ALPHABET.indexOf(currentAnimasiLetter);
  openAnimasiModal(ALPHABET[(idx + 1) % 26]);
}

/* ── Tutup modal ── */
function closeAnimasiModal() {
  // Kosongkan iframe supaya video berhenti
  document.getElementById('animasiVideoWrap').innerHTML = '';
  document.getElementById('animasiModalOverlay').classList.remove('open');
}

/* ── showAnimasiPage: dipanggil dari halaman Belajar ── */
function showAnimasiPage(letter) {
  showPage('animasi');
  setTimeout(() => openAnimasiModal(letter || 'A'), 120);
}