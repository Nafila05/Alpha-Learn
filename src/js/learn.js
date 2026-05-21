// ============================================
//  AlphaLearn — Learn / Write Page
// ============================================

let currentLetter = 'A';
let drawCanvas, drawCtx, isDrawing = false;
let currentStroke = 0;

/* ── Letter Selector ── */
function renderLetterSelector() {
  const el = document.getElementById('letterSelector');
  if (!el) return;
  el.innerHTML = '';
  ALPHABET.forEach(l => {
    const btn = document.createElement('button');
    btn.className = 'letter-btn' + (l === currentLetter ? ' active' : '');
    btn.textContent = l;
    btn.onclick = () => selectLetter(l);
    el.appendChild(btn);
  });
}

function selectLetter(letter) {
  currentLetter = letter;
  document.querySelectorAll('.letter-btn').forEach((b, i) =>
    b.classList.toggle('active', ALPHABET[i] === letter)
  );

  // Update display
  document.getElementById('letterMainDisplay').textContent = letter;
  document.getElementById('letterLowerDisplay').textContent = letter.toLowerCase();
  document.getElementById('letterWordDisplay').textContent = LETTER_DATA[letter]?.word || '';
  document.getElementById('alphaBotTip').textContent = LETTER_DATA[letter]?.tip || '';
  document.getElementById('guideLetterLabel').textContent = letter;

  currentStroke = 0;
  renderStrokes(letter);
  clearCanvas();
  document.getElementById('drawFeedbackText').textContent =
    `Siap belajar huruf ${letter}! Ikuti langkah-langkah di sebelah kanan, lalu coba tulis sendiri. Klik "Analisis AI" untuk umpan balik!`;

  // Bounce animation
  const lm = document.getElementById('letterMainDisplay');
  lm.style.animation = 'none';
  setTimeout(() => lm.style.animation = 'bounceIn 0.5s cubic-bezier(0.34,1.56,0.64,1)', 10);

  markLearned(letter);
}

function renderStrokes(letter) {
  const strokes = LETTER_DATA[letter]?.strokes || ['Tuliskan huruf ini'];
  const container = document.getElementById('strokeSteps');
  container.innerHTML = '';
  strokes.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'stroke-step' + (i === 0 ? ' active-step' : '');
    div.id = 'stroke' + i;
    div.innerHTML = `<div class="step-num">${i + 1}</div><p>${s}</p>`;
    container.appendChild(div);
  });
}

function showNextStroke() {
  const strokes = LETTER_DATA[currentLetter]?.strokes || [];
  document.querySelectorAll('.stroke-step').forEach(s => s.classList.remove('active-step'));
  currentStroke = (currentStroke + 1) % strokes.length;
  document.getElementById('stroke' + currentStroke)?.classList.add('active-step');
}

/* ── Canvas Drawing ── */
function initDrawCanvas() {
  drawCanvas = document.getElementById('drawCanvas');
  if (!drawCanvas) return;
  drawCtx = drawCanvas.getContext('2d');
  drawCtx.lineCap = 'round';
  drawCtx.lineJoin = 'round';
  drawCtx.strokeStyle = '#2D3748';
  clearCanvas();

  const getPos = e => {
    const r = drawCanvas.getBoundingClientRect();
    const sx = drawCanvas.width / r.width;
    const sy = drawCanvas.height / r.height;
    if (e.touches) return { x: (e.touches[0].clientX - r.left) * sx, y: (e.touches[0].clientY - r.top) * sy };
    return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy };
  };

  const startDraw = e => {
    e.preventDefault(); isDrawing = true;
    const p = getPos(e);
    drawCtx.lineWidth = parseInt(document.getElementById('penSize')?.value || 8);
    drawCtx.beginPath(); drawCtx.moveTo(p.x, p.y);
  };
  const doDraw = e => {
    if (!isDrawing) return; e.preventDefault();
    const p = getPos(e);
    drawCtx.lineTo(p.x, p.y); drawCtx.stroke();
  };
  const stopDraw = () => { isDrawing = false; };

  drawCanvas.addEventListener('mousedown', startDraw);
  drawCanvas.addEventListener('mousemove', doDraw);
  drawCanvas.addEventListener('mouseup', stopDraw);
  drawCanvas.addEventListener('mouseleave', stopDraw);
  drawCanvas.addEventListener('touchstart', startDraw, { passive: false });
  drawCanvas.addEventListener('touchmove', doDraw, { passive: false });
  drawCanvas.addEventListener('touchend', stopDraw);
}

function clearCanvas() {
  if (!drawCtx) return;
  drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
  // Draw faint guide lines
  drawCtx.save();
  drawCtx.strokeStyle = 'rgba(255,230,109,0.4)';
  drawCtx.lineWidth = 1;
  drawCtx.setLineDash([8, 8]);
  for (let y = 55; y < 220; y += 55) {
    drawCtx.beginPath();
    drawCtx.moveTo(0, y); drawCtx.lineTo(600, y); drawCtx.stroke();
  }
  drawCtx.restore();
}

/* ── AI Analysis ── */
async function analyzeDrawing() {
  if (!drawCanvas) return;
  const fb = document.getElementById('drawFeedbackText');
  fb.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div> AlphaBot sedang melihat tulisanmu...';

  try {
    // Pastikan model sudah dimuat (dari detect.js)
    if (typeof initTMModel === 'function') {
      await initTMModel();
    } else {
      throw new Error("Teachable Machine script missing");
    }

    // Buat background putih sementara untuk prediksi karena model TM biasanya lebih baik dengan background putih
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = drawCanvas.width;
    tempCanvas.height = drawCanvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.fillStyle = 'white';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(drawCanvas, 0, 0);

    const predictions = await tmModel.predict(tempCanvas);
    predictions.sort((a, b) => b.probability - a.probability);

    const bestPred = predictions[0];
    const detectedLetter = bestPred.className;
    const conf = bestPred.probability;

    if (detectedLetter === currentLetter && conf > 0.5) {
      fb.textContent = `Wow, tulisan huruf ${currentLetter} kamu keren banget! 🌟 Keyakinan AI: ${Math.round(conf * 100)}%`;
    } else if (conf > 0.3) {
      fb.textContent = `Bagus sekali! Sedikit lagi kamu pasti bisa menulis huruf ${currentLetter} dengan sempurna! AI membaca ini terlihat seperti ${detectedLetter}. 🎉`;
    } else {
      fb.textContent = `Hebat! Kamu sudah mencoba dengan semangat! Ayo tebalkan lagi garisnya biar makin mirip huruf ${currentLetter}! 🌟`;
    }

  } catch (e) {
    console.error(e);
    const feedbacks = [
      `Wow, tulisan huruf ${currentLetter} kamu keren banget! Terus latihan ya! ⭐`,
      `Bagus sekali! Sedikit lagi kamu pasti bisa menulis huruf ${currentLetter} dengan sempurna! 🎉`,
      `Hebat! Kamu sudah mencoba dengan semangat! Huruf ${currentLetter} semakin bagus! 🌟`,
    ];
    fb.textContent = feedbacks[Math.floor(Math.random() * feedbacks.length)];
  }
}

/* ── Letter Animation ── */
function animateLetter() {
  clearCanvas();
  if (!drawCtx) return;
  drawCtx.strokeStyle = '#FF6B6B';
  drawCtx.lineWidth = 12;
  drawCtx.lineCap = 'round';

  const paths = LETTER_PATHS[currentLetter] || [[[50, 20], [50, 120]]];
  const cx = 300, cy = 110;
  let pathIdx = 0, pointIdx = 0;

  const interval = setInterval(() => {
    if (pathIdx >= paths.length) { clearInterval(interval); return; }
    const path = paths[pathIdx];
    if (pointIdx >= path.length - 1) { pathIdx++; pointIdx = 0; return; }
    drawCtx.beginPath();
    drawCtx.moveTo(path[pointIdx][0] + cx - 50, path[pointIdx][1] + cy - 60);
    drawCtx.lineTo(path[pointIdx + 1][0] + cx - 50, path[pointIdx + 1][1] + cy - 60);
    drawCtx.stroke();
    pointIdx++;
  }, 30);
}

/* ── Navigation ── */
function prevLetter() { selectLetter(ALPHABET[(ALPHABET.indexOf(currentLetter) - 1 + 26) % 26]); }
function nextLetter() { selectLetter(ALPHABET[(ALPHABET.indexOf(currentLetter) + 1) % 26]); }
