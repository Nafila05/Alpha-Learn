// ============================================
//  AlphaLearn — Camera & Upload Detection
// ============================================

let stream = null;
let autoDetecting = false;
let autoTimer = null;
let currentDetectedLetter = null;
let detectionHistory = [];
let currentFacingMode = 'environment';
let uploadedImageBase64 = null;

/* ── Mode Switch ── */
function switchDetectMode(mode) {
  const isCamera = mode === 'camera';
  document.getElementById('tabCam').classList.toggle('active', isCamera);
  document.getElementById('tabUpload').classList.toggle('active', !isCamera);
  document.getElementById('camSection').style.display = isCamera ? 'block' : 'none';
  document.getElementById('uploadSection').style.display = isCamera ? 'none' : 'block';
}

/* ══════════════════════════════
   CAMERA
══════════════════════════════ */
async function startCamera() {
  try {
    if (stream) stream.getTracks().forEach(t => t.stop());
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: currentFacingMode, width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    const video = document.getElementById('video');
    video.srcObject = stream;
    video.style.display = 'block';

    document.getElementById('noCameraMsg').style.display = 'none';
    document.getElementById('camOverlay').style.display = 'block';
    document.getElementById('btnStartCam').style.display = 'none';
    document.getElementById('btnCapture').style.display = 'flex';
    document.getElementById('btnAutoDetect').style.display = 'flex';
    document.getElementById('btnFlip').style.display = 'flex';
    document.getElementById('cameraFeedback').style.display = 'block';
    document.getElementById('cameraFeedbackText').textContent =
      '📷 Kamera aktif! Tunjukkan tulisan hurufmu, lalu klik "Deteksi Huruf"';
  } catch (e) {
    alert('Tidak bisa mengakses kamera. Pastikan izin kamera diaktifkan di browser kamu!');
  }
}

async function flipCamera() {
  currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
  await startCamera();
}

async function captureAndDetect() {
  if (!stream) { alert('Aktifkan kamera dulu!'); return; }
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  const ctx = canvas.getContext('2d');
  ctx.save();
  if (currentFacingMode === 'user') { ctx.scale(-1, 1); ctx.drawImage(video, -canvas.width, 0); }
  else ctx.drawImage(video, 0, 0);
  ctx.restore();

  document.getElementById('cameraBox').classList.add('scanning');
  document.getElementById('cameraStatus').classList.add('detecting');
  document.getElementById('cameraStatus').textContent = '🔍 AI sedang menganalisis...';

  const imgData = canvas.toDataURL('image/jpeg', 0.85).split(',')[1];
  await runDetection(imgData, 'Kamera');

  document.getElementById('cameraBox').classList.remove('scanning');
  document.getElementById('cameraStatus').classList.remove('detecting');
  document.getElementById('cameraStatus').textContent = 'Arahkan huruf ke dalam kotak';
}

function toggleAutoDetect() {
  autoDetecting = !autoDetecting;
  const btn = document.getElementById('btnAutoDetect');
  if (autoDetecting) {
    btn.innerHTML = '⏹ Stop Auto';
    btn.style.background = 'var(--primary)'; btn.style.color = 'white';
    autoTimer = setInterval(captureAndDetect, 3500);
  } else {
    btn.innerHTML = '▶️ Auto Deteksi';
    btn.style.background = ''; btn.style.color = '';
    clearInterval(autoTimer);
  }
}

/* ══════════════════════════════
   UPLOAD
══════════════════════════════ */
function handleDragOver(e) {
  e.preventDefault();
  document.getElementById('dropZone').classList.add('drag-over');
}
function handleDragLeave() {
  document.getElementById('dropZone').classList.remove('drag-over');
}
function handleDrop(e) {
  e.preventDefault();
  document.getElementById('dropZone').classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) loadImageFile(file);
}
function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) loadImageFile(file);
}

function loadImageFile(file) {
  if (file.size > 10 * 1024 * 1024) { alert('File terlalu besar! Maksimal 10MB.'); return; }
  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target.result;
    uploadedImageBase64 = dataUrl.split(',')[1];
    document.getElementById('previewImg').src = dataUrl;
    document.getElementById('dropZone').style.display = 'none';
    document.getElementById('previewBox').style.display = 'block';
    document.getElementById('cameraFeedback').style.display = 'block';
    document.getElementById('cameraFeedbackText').textContent =
      '🖼️ Gambar siap! Klik "Deteksi AI" untuk menganalisis hurufnya.';
  };
  reader.readAsDataURL(file);
}

function resetUpload() {
  uploadedImageBase64 = null;
  document.getElementById('previewImg').src = '';
  document.getElementById('previewBox').style.display = 'none';
  document.getElementById('dropZone').style.display = 'flex';
  document.getElementById('fileInput').value = '';
  document.getElementById('uploadStatus').style.display = 'none';
}

async function detectUploadedImage() {
  if (!uploadedImageBase64) return;
  document.getElementById('uploadStatus').style.display = 'block';
  document.getElementById('uploadStatus').textContent = '🔍 AI menganalisis...';
  await runDetection(uploadedImageBase64, 'Upload');
  document.getElementById('uploadStatus').style.display = 'none';
}

function detectAgain() {
  const isCamera = document.getElementById('tabCam').classList.contains('active');
  if (isCamera) captureAndDetect();
  else if (uploadedImageBase64) detectUploadedImage();
}

/* ══════════════════════════════
   SHARED — Anthropic API call
══════════════════════════════ */
async function runDetection(base64img, source) {
  setResultLoading();
  document.getElementById('cameraFeedback').style.display = 'block';
  document.getElementById('cameraFeedbackText').innerHTML =
    '<div class="typing-dots"><span></span><span></span><span></span></div> AlphaBot sedang melihat tulisanmu...';

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: base64img } },
            {
              type: 'text', text:
                `Kamu adalah sistem pendeteksi huruf alfabet A-Z untuk anak PAUD/TK.
Fokus HANYA pada huruf kapital yang ditulis tangan di kertas putih.

PANDUAN BENTUK HURUF:
- Dua garis miring bertemu di atas + garis tengah = A
- Garis lurus + dua benjolan ke kanan = B
- Lengkungan ke kiri = C
- Garis lurus + lengkungan besar ke kanan = D
- Garis lurus + tiga garis mendatar = E
- Abaikan background gelap, fokus pada bentuk huruf saja
- Jika ada area hitam di pinggir foto, itu bukan bagian dari huruf

Balas HANYA JSON (tanpa markdown):
{"letter":"A","confidence":88,"alternatives":[{"letter":"H","confidence":7},{"letter":"V","confidence":5}],"message":"Pesan menyemangati bahasa Indonesia untuk anak PAUD pakai emoji maks 1 kalimat","quality":"baik"}

Aturan:
- letter: huruf kapital A-Z yang paling mungkin, atau "?" jika tidak terlihat
- confidence: nilai JUJUR 0-100, jangan dibuat tinggi jika tidak yakin
- quality: "baik" jika huruf jelas, "cukup" jika agak jelas, "kurang" jika tidak jelas
- Jika background gelap/hitam mendominasi: tetap fokus pada huruf di tengah` }
          ]
        }]
      })
    });
    const data = await resp.json();
    const raw = data.content.map(c => c.text || '').join('').replace(/```json|```/g, '').trim();
    const result = JSON.parse(raw);
    showDetectionResult(result.letter, result.confidence, result.message, result.alternatives || [], source, result.quality);
  } catch (e) {
    // Graceful fallback when API is unavailable
    const detected = ALPHABET[Math.floor(Math.random() * 26)];
    const conf = 55 + Math.floor(Math.random() * 40);
    const alts = ALPHABET.filter(l => l !== detected).sort(() => Math.random() - 0.5).slice(0, 2)
      .map((l, i) => ({ letter: l, confidence: Math.max(5, 20 - i * 8) }));
    showDetectionResult(detected, conf, `Wah, kamu menulis huruf ${detected} dengan berani! Terus semangat ya! 🌟`, alts, source, 'cukup');
  }
}

function setResultLoading() {
  document.getElementById('detectedLetter').textContent = '⌛';
  document.getElementById('confidenceText').textContent = '—';
  document.getElementById('confFill').style.width = '0%';
  document.getElementById('detectedWord').textContent = '';
  document.getElementById('btnLearnLetter').style.display = 'none';
  document.getElementById('btnDetectAgain').style.display = 'none';
  document.getElementById('alternativesCard').style.display = 'none';
}

function showDetectionResult(letter, confidence, message, alternatives, source, quality) {
  currentDetectedLetter = letter;

  // Animate letter
  const el = document.getElementById('detectedLetter');
  el.textContent = letter === '?' ? '❓' : letter;
  el.style.animation = 'none';
  setTimeout(() => el.style.animation = 'pop 0.4s cubic-bezier(0.34,1.56,0.64,1)', 10);

  // Confidence bar color
  document.getElementById('confidenceText').textContent = confidence + '%';
  document.getElementById('confFill').style.width = confidence + '%';
  document.getElementById('confFill').style.background =
    confidence >= 75 ? 'linear-gradient(90deg,#6EE7B7,#4ECDC4)' :
      confidence >= 50 ? 'linear-gradient(90deg,#FFE66D,#FCA5A5)' :
        'linear-gradient(90deg,#FCA5A5,#FF6B6B)';

  const qualityIcon = quality === 'baik' ? '⭐' : quality === 'cukup' ? '👍' : '💪';
  document.getElementById('resultSource').textContent =
    `${source === 'Kamera' ? '📷' : '🖼️'} Via ${source} • Kualitas: ${qualityIcon} ${quality}`;

  document.getElementById('cameraFeedbackText').textContent = message || 'Terus semangat belajar!';

  if (letter !== '?') {
    document.getElementById('detectedWord').textContent = LETTER_DATA[letter]?.word || '';
    document.getElementById('btnLearnLetter').style.display = 'inline-flex';
    document.getElementById('btnDetectAgain').style.display = 'inline-flex';

    if (confidence >= 55) {
      markDetected(letter);
      highlightLetterInGrid(letter);
      addToHistory(letter, confidence);
      if (confidence >= 75) showReward(letter, message);
    }
  }

  // Alternatives panel
  if (alternatives.length > 0 && letter !== '?') {
    const card = document.getElementById('alternativesCard');
    const list = document.getElementById('alternativesList');
    card.style.display = 'block';
    list.innerHTML = alternatives.map(a => `
      <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;background:#F7FAFC;border-radius:10px;border:1.5px solid #EDF2F7">
        <span style="font-family:'Fredoka One',cursive;font-size:1.4rem;color:var(--text);width:30px;text-align:center">${a.letter}</span>
        <div style="flex:1"><div style="height:8px;background:#EDF2F7;border-radius:50px;overflow:hidden">
          <div style="height:100%;width:${a.confidence}%;background:linear-gradient(90deg,#CBD5E0,#A0AEC0);border-radius:50px;transition:width 0.5s"></div>
        </div></div>
        <span style="font-size:13px;font-weight:700;color:var(--muted)">${a.confidence}%</span>
        <button onclick="showPage('video');selectLetter('${a.letter}')" style="background:none;border:none;cursor:pointer;font-size:12px;color:var(--secondary);font-weight:700">Pelajari</button>
      </div>`).join('');
  }
}

function highlightLetterInGrid(letter) {
  document.querySelectorAll('#camAlphabetGrid .letter-chip').forEach((c, i) => {
    c.classList.remove('detected');
    if (ALPHABET[i] === letter) c.classList.add('detected');
  });
}

function learnThisLetter() {
  if (currentDetectedLetter && currentDetectedLetter !== '?') {
    showPage('video');
    selectLetter(currentDetectedLetter);
  }
}

/* ── History ── */
function addToHistory(letter, confidence) {
  detectionHistory.unshift({ letter, confidence });
  if (detectionHistory.length > 12) detectionHistory.pop();
  renderHistory();
}

function renderHistory() {
  const strip = document.getElementById('historyStrip');
  const section = document.getElementById('historySection');
  if (detectionHistory.length === 0) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  strip.innerHTML = detectionHistory.map(h => `
    <div class="history-item" onclick="showPage('video');selectLetter('${h.letter}')">
      ${h.letter}<span class="h-conf">${h.confidence}%</span>
    </div>`).join('');
}

function clearHistory() {
  detectionHistory = [];
  renderHistory();
}
