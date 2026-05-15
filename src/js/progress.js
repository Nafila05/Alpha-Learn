// ============================================
//  AlphaLearn — Progress Page
// ============================================

function updateProgressPage() {
  const learned = ALPHABET.filter(l => progress[l]?.learned).length;
  document.getElementById('progLettersLearned').textContent = learned;
  document.getElementById('progQuizDone').textContent       = globalStats.quizDone;
  document.getElementById('progTotalScore').textContent     = globalStats.totalScore;
  document.getElementById('progBestStreak').textContent     = globalStats.bestStreak;

  // Letter progress grid
  const grid = document.getElementById('alphabetProgressGrid');
  grid.innerHTML = '';
  ALPHABET.forEach(l => {
    const div      = document.createElement('div');
    const isLearned = progress[l]?.learned;
    const detected  = progress[l]?.detected || 0;
    div.className  = 'prog-letter' + (isLearned ? ' done' : detected > 0 ? ' partial' : '');
    div.innerHTML  = `${l}<div class="mini-stars">${detected > 2 ? '★★★' : detected > 0 ? '★★' : '○'}</div>`;
    div.title      = `${l}: ${isLearned ? 'Sudah dipelajari' : 'Belum'} | Terdeteksi: ${detected}x`;
    div.onclick    = () => { showPage('video'); selectLetter(l); };
    grid.appendChild(div);
  });

  // Badges
  const badges = [
    { icon:'🔤', name:'Mulai Belajar',   desc:'Pelajari huruf pertama',         got: learned >= 1  },
    { icon:'⭐', name:'Bintang 5',        desc:'Pelajari 5 huruf',               got: learned >= 5  },
    { icon:'🌟', name:'Bintang 10',       desc:'Pelajari 10 huruf',              got: learned >= 10 },
    { icon:'🏅', name:'Setengah Jalan',   desc:'Pelajari 13 huruf',              got: learned >= 13 },
    { icon:'🏆', name:'Master Alfabet',   desc:'Pelajari semua huruf',           got: learned >= 26 },
    { icon:'📷', name:'Mata Elang',       desc:'Deteksi 5 huruf via kamera',     got: Object.values(progress).filter(p => p.detected > 0).length >= 5 },
    { icon:'🎮', name:'Kuis Pertama',     desc:'Selesaikan 1 kuis',              got: globalStats.quizDone >= 1 },
    { icon:'🔥', name:'On Fire!',         desc:'Streak 5 benar berturut-turut',  got: globalStats.bestStreak >= 5 },
  ];

  document.getElementById('badgesGrid').innerHTML = badges.map(b => `
    <div style="display:flex;align-items:center;gap:10px;padding:12px 16px;background:${b.got ? '#F0FFF4' : '#F7FAFC'};border-radius:12px;border:2px solid ${b.got ? '#6EE7B7' : '#EDF2F7'};min-width:180px">
      <span style="font-size:1.8rem;${!b.got ? 'filter:grayscale(1);opacity:0.4' : ''}">${b.icon}</span>
      <div>
        <div style="font-weight:800;font-size:14px;color:${b.got ? '#065F46' : 'var(--muted)'}">${b.name}</div>
        <div style="font-size:12px;color:var(--muted)">${b.desc}</div>
      </div>
    </div>`).join('');
}
