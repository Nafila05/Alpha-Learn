// ============================================
//  AlphaLearn — Quiz System
// ============================================

let quizType = 'pilihan';
let quizCount = 10;
let quizQuestions = [];
let quizIdx = 0;
let quizScore = 0;
let quizWrong = 0;
let quizStreak = 0;
let bestStreak = 0;
let quizCanvas, quizCtx, quizDrawing = false;

/* ── Setup ── */
function selectQuizType(type) {
  quizType = type;
  document.querySelectorAll('.qtype-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('qt-' + type).classList.add('selected');
}

function setQCount(n) {
  quizCount = n;
  document.querySelectorAll('#quizSetup button[id^=q]').forEach(b => {
    b.className = 'btn btn-sm';
    b.style.background = '#EDF2F7'; b.style.color = '#4A5568';
  });
  const sel = document.getElementById('q' + n);
  if (sel) { sel.className = 'btn btn-sm btn-primary'; sel.style.background = ''; sel.style.color = ''; }
}

function startQuiz() {
  quizIdx = 0; quizScore = 0; quizWrong = 0; quizStreak = 0; bestStreak = 0;
  const shuffled = [...ALPHABET].sort(() => Math.random() - 0.5).slice(0, quizCount);
  quizQuestions = shuffled.map(letter => {
    let type = quizType;
    if (type === 'campur') type = ['pilihan', 'menulis', 'tebak'][Math.floor(Math.random() * 3)];
    return { letter, type };
  });
  document.getElementById('quizSetup').style.display = 'none';
  document.getElementById('quizResult').style.display = 'none';
  document.getElementById('quizGame').style.display = 'block';
  document.getElementById('qTotal').textContent = quizCount;
  renderQuestion();
}

/* ── Render question ── */
function renderQuestion() {
  const q = quizQuestions[quizIdx];
  document.getElementById('qNum').textContent = quizIdx + 1;
  updateQuizStats();
  document.getElementById('quizProgFill').style.width = (quizIdx / quizCount * 100) + '%';
  document.getElementById('btnNextQ').style.display = 'none';

  const content = document.getElementById('quizContent');
  if (q.type === 'pilihan') renderPilihanQ(q, content);
  else if (q.type === 'menulis') renderMenulisQ(q, content);
  else if (q.type === 'tebak') renderTebakQ(q, content);
}

/* ── Pilihan Ganda ── */
function renderPilihanQ(q, container) {
  const wrongs = ALPHABET.filter(l => l !== q.letter).sort(() => Math.random() - 0.5).slice(0, 3);
  const choices = [q.letter, ...wrongs].sort(() => Math.random() - 0.5);
  const showWord = Math.random() > 0.5; // alternate between "what letter is this?" and "find the letter"
  container.innerHTML = `
    <div class="quiz-card">
      <div class="quiz-question">${showWord ? 'Huruf apa ini?' : `Mana huruf "${q.letter}"?`}</div>
      ${showWord
      ? `<span class="quiz-letter-big">${q.letter}</span>
           <p style="font-size:1.1rem;color:var(--muted);font-weight:700">${LETTER_DATA[q.letter]?.word || ''}</p>`
      : ''}
      <div class="quiz-choices">
        ${choices.map(c =>
        `<button class="choice-btn" onclick="answerPilihan('${c}','${q.letter}',this)">
            ${showWord ? `${c} — ${EXAMPLE_WORDS[c] || c}` : c}
          </button>`
      ).join('')}
      </div>
    </div>`;
}

function answerPilihan(chosen, correct, btn) {
  document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
  if (chosen === correct) {
    btn.classList.add('correct');
    quizScore++; quizStreak++;
    if (quizStreak > bestStreak) bestStreak = quizStreak;
    showMiniReward(quizStreak > 1 ? `🔥 Streak ${quizStreak}!` : '✅ Betul!');
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.choice-btn').forEach(b => {
      if (b.textContent.trim().startsWith(correct)) b.classList.add('correct');
    });
    quizWrong++; quizStreak = 0;
    showMiniReward('❌ Coba lagi!');
  }
  updateQuizStats();
  document.getElementById('btnNextQ').style.display = 'inline-flex';
}

/* ── Menulis (canvas) ── */
function renderMenulisQ(q, container) {
  container.innerHTML = `
    <div class="quiz-draw-area">
      <div class="quiz-question">✍️ Tulis huruf <span style="color:var(--primary)">${q.letter}</span> di sini!</div>
      <p style="color:var(--muted);font-weight:600;margin-bottom:1rem">
        ${LETTER_DATA[q.letter]?.word || ''} — Langkah 1: ${LETTER_DATA[q.letter]?.strokes[0] || ''}
      </p>
      <canvas id="quizCanvas" class="quiz-canvas" width="400" height="200"></canvas>
      <div class="quiz-action-row">
        <button class="btn btn-sm" style="background:#EDF2F7;color:#4A5568" onclick="clearQuizCanvas()">🗑️ Hapus</button>
        <button class="btn btn-primary btn-sm" onclick="submitMenulis('${q.letter}')">🤖 Cek AI</button>
      </div>
      <div class="ai-feedback-box" id="quizFeedback" style="display:none;margin-top:1rem">
        <div class="fb-title">🤖 AlphaBot:</div>
        <div class="fb-text" id="quizFbText"></div>
      </div>
    </div>`;
  initQuizCanvas();
}

function initQuizCanvas() {
  quizCanvas = document.getElementById('quizCanvas');
  if (!quizCanvas) return;
  quizCtx = quizCanvas.getContext('2d');
  quizCtx.lineCap = 'round'; quizCtx.lineJoin = 'round';
  quizCtx.strokeStyle = '#2D3748'; quizCtx.lineWidth = 10;
  clearQuizCanvas();

  const getP = e => {
    const r = quizCanvas.getBoundingClientRect();
    const sx = quizCanvas.width / r.width, sy = quizCanvas.height / r.height;
    if (e.touches) return { x: (e.touches[0].clientX - r.left) * sx, y: (e.touches[0].clientY - r.top) * sy };
    return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy };
  };
  quizCanvas.addEventListener('mousedown', e => { quizDrawing = true; const p = getP(e); quizCtx.beginPath(); quizCtx.moveTo(p.x, p.y); });
  quizCanvas.addEventListener('mousemove', e => { if (!quizDrawing) return; const p = getP(e); quizCtx.lineTo(p.x, p.y); quizCtx.stroke(); });
  quizCanvas.addEventListener('mouseup', () => quizDrawing = false);
  quizCanvas.addEventListener('mouseleave', () => quizDrawing = false);
  quizCanvas.addEventListener('touchstart', e => { e.preventDefault(); quizDrawing = true; const p = getP(e); quizCtx.beginPath(); quizCtx.moveTo(p.x, p.y); }, { passive: false });
  quizCanvas.addEventListener('touchmove', e => { e.preventDefault(); if (!quizDrawing) return; const p = getP(e); quizCtx.lineTo(p.x, p.y); quizCtx.stroke(); }, { passive: false });
  quizCanvas.addEventListener('touchend', () => quizDrawing = false);
}

function clearQuizCanvas() {
  if (!quizCtx || !quizCanvas) return;
  quizCtx.clearRect(0, 0, 400, 200);
  quizCtx.save();
  quizCtx.strokeStyle = 'rgba(255,230,109,0.5)'; quizCtx.lineWidth = 1; quizCtx.setLineDash([6, 6]);
  quizCtx.beginPath(); quizCtx.moveTo(0, 100); quizCtx.lineTo(400, 100); quizCtx.stroke();
  quizCtx.restore();
}

async function submitMenulis(letter) {
  if (!quizCanvas) return;
  const fbBox = document.getElementById('quizFeedback');
  const fbText = document.getElementById('quizFbText');
  fbBox.style.display = 'block';
  fbText.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';

  try {
    if (typeof initTMModel === 'function') {
      await initTMModel();
    }

    // Buat layer background putih untuk dikirimkan ke model
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = quizCanvas.width;
    tempCanvas.height = quizCanvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.fillStyle = 'white';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(quizCanvas, 0, 0);

    const predictions = await tmModel.predict(tempCanvas);
    const targetPrediction = predictions.find(p => p.className === letter);
    const isCorrect = (targetPrediction && targetPrediction.probability > 0.5) ||
      (predictions[0].className === letter && predictions[0].probability > 0.3);

    if (isCorrect) {
      fbText.textContent = `Hebat! Ini benar-benar mirip huruf ${letter}! ⭐`;
      quizScore++; quizStreak++;
      if (quizStreak > bestStreak) bestStreak = quizStreak;
      showMiniReward('⭐ Tulisanmu bagus!');
    } else {
      const topPred = predictions[0];
      fbText.textContent = `Ini lebih terlihat seperti huruf ${topPred.className}, mari berlatih lagi menulis ${letter} ya! 💪`;
      quizWrong++; quizStreak = 0;
      showMiniReward('💪 Terus berlatih!');
    }
  } catch (e) {
    console.error(e);
    fbText.textContent = `Hebat! Kamu sudah mencoba menulis huruf ${letter}! ⭐`;
    quizScore++; quizStreak++;
  }
  updateQuizStats();
  document.getElementById('btnNextQ').style.display = 'inline-flex';
}

/* ── Tebak Huruf ── */
function renderTebakQ(q, container) {
  const word = EXAMPLE_WORDS[q.letter] || q.letter;
  const wrongs = ALPHABET.filter(l => l !== q.letter).sort(() => Math.random() - 0.5).slice(0, 3);
  const choices = [q.letter, ...wrongs].sort(() => Math.random() - 0.5);
  container.innerHTML = `
    <div class="quiz-card">
      <div class="quiz-question">🔤 Apa huruf pertama dari kata ini?</div>
      <div style="font-size:3.5rem;margin:1rem 0;letter-spacing:4px;color:var(--text);font-family:'Fredoka One',cursive">
        _ ${word.slice(1).toUpperCase().split('').join(' ')}
      </div>
      <p style="color:var(--muted);font-weight:600;font-size:1.1rem">Contoh: ${word}</p>
      <div class="quiz-choices" style="margin-top:1.5rem">
        ${choices.map(c => `<button class="choice-btn" onclick="answerPilihan('${c}','${q.letter}',this)">${c}</button>`).join('')}
      </div>
    </div>`;
}

/* ── Shared ── */
function updateQuizStats() {
  document.getElementById('qScore').textContent = quizScore;
  document.getElementById('qWrong').textContent = quizWrong;
  document.getElementById('qStreak').textContent = quizStreak;
}

function nextQuestion() {
  quizIdx++;
  if (quizIdx >= quizCount) endQuiz();
  else renderQuestion();
}

function skipQuestion() {
  quizWrong++; quizStreak = 0;
  updateQuizStats();
  quizIdx++;
  if (quizIdx >= quizCount) endQuiz();
  else renderQuestion();
}

function endQuiz() {
  document.getElementById('quizGame').style.display = 'none';
  document.getElementById('quizResult').style.display = 'block';
  const pct = Math.round(quizScore / quizCount * 100);
  const t = Math.min(Math.floor(pct / 25), 4);
  const trophies = ['😢', '💪', '⭐', '🏅', '🏆'];
  const titles = ['Semangat terus!', 'Bagus, terus berlatih!', 'Keren, hampir sempurna!', 'Hebat sekali!', 'Sempurna! 🎉'];
  document.getElementById('finalScore').textContent = pct + '%';
  document.getElementById('resultTrophy').textContent = trophies[t];
  document.getElementById('resultTitle').textContent = titles[t];
  document.getElementById('resultSubtitle').textContent =
    `${quizScore} benar dari ${quizCount} soal • Streak terbaik: ${bestStreak} 🔥`;
  document.getElementById('resultStars').textContent =
    pct >= 80 ? '⭐⭐⭐' : pct >= 50 ? '⭐⭐' : '⭐';

  globalStats.quizDone++;
  globalStats.totalScore += quizScore * 10;
  if (bestStreak > globalStats.bestStreak) globalStats.bestStreak = bestStreak;
  saveProgress();
  if (pct >= 80) launchConfetti();
}
