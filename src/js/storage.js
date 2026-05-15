// ============================================
//  AlphaLearn — Progress & Storage
// ============================================

let progress    = JSON.parse(localStorage.getItem('alphalearn_progress') || '{}');
let globalStats = JSON.parse(localStorage.getItem('alphalearn_stats')    || '{"quizDone":0,"totalScore":0,"bestStreak":0}');

function saveProgress() {
  localStorage.setItem('alphalearn_progress', JSON.stringify(progress));
  localStorage.setItem('alphalearn_stats',    JSON.stringify(globalStats));
}

function markLearned(letter) {
  if (!progress[letter]) progress[letter] = {};
  progress[letter].learned = true;
  saveProgress();
  updateAllGrids();
}

function markDetected(letter) {
  if (!progress[letter]) progress[letter] = {};
  progress[letter].detected = (progress[letter].detected || 0) + 1;
  markLearned(letter);
}

function resetProgress() {
  if (confirm('Reset semua progress? Ini tidak bisa dibatalkan!')) {
    progress    = {};
    globalStats = { quizDone: 0, totalScore: 0, bestStreak: 0 };
    saveProgress();
    updateProgressPage();
    updateAllGrids();
    alert('Progress telah direset!');
  }
}
