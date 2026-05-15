// ============================================
//  AlphaLearn — Letter Data & Constants
// ============================================

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const LETTER_DATA = {
  A: { word: '🍎 Apel', tip: 'Buat dua garis miring bertemu di atas, lalu tambahkan garis mendatar di tengah!', strokes: ['Buat garis miring dari kiri ke puncak (/)', 'Buat garis miring dari puncak ke kanan (\\)', 'Tambahkan garis mendatar di tengah (-)'] },
  B: { word: '⚽ Bola', tip: 'Mulai dari atas, turun lurus ke bawah, lalu buat dua benjolan ke kanan!', strokes: ['Buat garis lurus dari atas ke bawah (|)', 'Buat setengah lingkaran ke kanan di bagian atas', 'Buat setengah lingkaran lebih besar ke kanan di bagian bawah'] },
  C: { word: '🦎 Cicak', tip: 'Seperti bulan sabit, mulai dari kanan atas dan lengkung ke kanan bawah!', strokes: ['Mulai dari kanan atas', 'Lengkungkan ke kiri melewati tengah', 'Selesaikan di kanan bawah'] },
  D: { word: '🎲 Dadu', tip: 'Garis lurus di kiri, lalu buat lengkungan besar ke kanan!', strokes: ['Buat garis lurus dari atas ke bawah (|)', 'Buat lengkungan besar ke kanan dari atas ke bawah'] },
  E: { word: '🦅 Elang', tip: 'Garis lurus di kiri, lalu tiga garis mendatar ke kanan!', strokes: ['Buat garis lurus dari atas ke bawah (|)', 'Tambahkan garis mendatar di atas', 'Tambahkan garis mendatar di tengah', 'Tambahkan garis mendatar di bawah'] },
  F: { word: '🖼️ Foto', tip: 'Seperti E tapi tanpa garis bawah!', strokes: ['Buat garis lurus dari atas ke bawah (|)', 'Tambahkan garis mendatar di atas', 'Tambahkan garis mendatar di tengah'] },
  G: { word: '🎸 Gitar', tip: 'Seperti C, tapi ada garis pendek ke dalam di bagian tengah kanan!', strokes: ['Mulai dari kanan atas dan lengkung seperti C', 'Buat garis pendek mendatar ke kiri di bagian tengah kanan'] },
  H: { word: '🐯 Harimau', tip: 'Dua garis lurus, lalu hubungkan di tengah!', strokes: ['Buat garis lurus dari atas ke bawah di kiri (|)', 'Buat garis lurus dari atas ke bawah di kanan (|)', 'Hubungkan keduanya dengan garis mendatar di tengah (-)'] },
  I: { word: '🐟 Ikan', tip: 'Cukup satu garis lurus ke bawah saja!', strokes: ['Buat garis mendatar di atas', 'Buat garis lurus dari atas ke bawah (|)', 'Buat garis mendatar di bawah'] },
  J: { word: '🦒 Jerapah', tip: 'Garis lurus ke bawah, lalu lengkung ke kiri di bawah!', strokes: ['Buat garis mendatar di atas', 'Buat garis lurus ke bawah (|)', 'Lengkungkan ke kiri di bagian bawah (J)'] },
  K: { word: '🐇 Kelinci', tip: 'Garis lurus, lalu dua garis miring seperti tanda V ke samping!', strokes: ['Buat garis lurus dari atas ke bawah (|)', 'Buat garis miring dari tengah ke kanan atas (/)', 'Buat garis miring dari tengah ke kanan bawah (\\)'] },
  L: { word: '🕷️ Laba-laba', tip: 'Mudah! Garis ke bawah, lalu garis ke kanan!', strokes: ['Buat garis lurus dari atas ke bawah (|)', 'Buat garis mendatar ke kanan di bagian bawah (L)'] },
  M: { word: '🐒 Monyet', tip: 'Dua garis lurus dan dua garis miring di tengah membentuk M!', strokes: ['Buat garis lurus di kiri (|)', 'Buat garis miring turun ke tengah (\\)', 'Buat garis miring naik ke kanan (/)', 'Buat garis lurus di kanan (|)'] },
  N: { word: '🍍 Nanas', tip: 'Dua garis lurus dihubungkan oleh garis miring!', strokes: ['Buat garis lurus di kiri (|)', 'Buat garis miring dari atas kiri ke bawah kanan (\\)', 'Buat garis lurus di kanan (|)'] },
  O: { word: '🍊 Oren', tip: 'Buat lingkaran penuh! Mulai dari atas dan putar ke kiri!', strokes: ['Mulai dari puncak', 'Lengkung ke kiri melewati tengah kiri', 'Teruskan ke bawah dan kembali ke kanan', 'Selesaikan di puncak'] },
  P: { word: '🐼 Panda', tip: 'Garis lurus ke bawah, lalu setengah lingkaran di atas kanan!', strokes: ['Buat garis lurus dari atas ke bawah (|)', 'Buat setengah lingkaran ke kanan di bagian atas'] },
  Q: { word: '🐦 Quail', tip: 'Seperti O tapi ada garis kecil di kanan bawah!', strokes: ['Buat lingkaran (O)', 'Tambahkan garis kecil miring ke kanan bawah di bagian dalam bawah'] },
  R: { word: '🤴 Raja', tip: 'Seperti P, tapi tambahkan garis miring ke kanan bawah!', strokes: ['Buat garis lurus dari atas ke bawah (|)', 'Buat setengah lingkaran ke kanan di bagian atas', 'Buat garis miring ke kanan bawah dari tengah'] },
  S: { word: '🐜 Semut', tip: 'Seperti dua setengah lingkaran, yang atas ke kiri dan bawah ke kanan!', strokes: ['Mulai dari kanan atas', 'Lengkung ke kiri di bagian atas', 'Lengkung ke kanan di bagian bawah', 'Selesaikan di kiri bawah'] },
  T: { word: '🧢 Topi', tip: 'Garis mendatar di atas, lalu garis lurus ke bawah di tengah!', strokes: ['Buat garis mendatar dari kiri ke kanan di atas (-)', 'Buat garis lurus ke bawah dari tengah (|)'] },
  U: { word: '🐛 Ulat', tip: 'Dua garis lurus dihubungkan oleh lengkungan di bawah!', strokes: ['Buat garis lurus ke bawah di kiri (|)', 'Lengkungkan ke kanan di bagian bawah', 'Naik lurus ke atas di kanan (|)'] },
  V: { word: '💐 Vas', tip: 'Dua garis miring bertemu di bawah!', strokes: ['Buat garis miring dari kiri atas ke bawah tengah (\\)', 'Buat garis miring dari bawah tengah ke kanan atas (/)'] },
  W: { word: '🥕 Wortel', tip: 'Seperti dua V yang digabung!', strokes: ['Buat garis miring turun ke tengah kiri (\\)', 'Naik ke tengah (/)', 'Turun ke tengah kanan (\\)', 'Naik ke kanan atas (/)'] },
  X: { word: '🩻 X-Ray', tip: 'Dua garis miring yang bersilang di tengah!', strokes: ['Buat garis miring dari kiri atas ke kanan bawah (\\)', 'Buat garis miring dari kanan atas ke kiri bawah (/)'] },
  Y: { word: '🪀 Yoyo', tip: 'Dua garis miring ke tengah lalu satu garis lurus ke bawah!', strokes: ['Buat garis miring dari kiri atas ke tengah (\\)', 'Buat garis miring dari kanan atas ke tengah (/)', 'Buat garis lurus ke bawah dari tengah (|)'] },
  Z: { word: '🦓 Zebra', tip: 'Garis mendatar di atas, garis miring ke bawah, garis mendatar di bawah!', strokes: ['Buat garis mendatar di atas (-)', 'Buat garis miring dari kanan atas ke kiri bawah (/)', 'Buat garis mendatar di bawah (-)'] },
};

const EXAMPLE_WORDS = {
  A: 'Apel', B: 'Bola', C: 'Cicak', D: 'Dadu', E: 'Elang', F: 'Foto', G: 'Gitar', H: 'Harimau',
  I: 'Ikan', J: 'Jerapah', K: 'Kelinci', L: 'Laba-laba', M: 'Monyet', N: 'Nanas', O: 'Oren',
  P: 'Panda', Q: 'Quail', R: 'Raja', S: 'Semut', T: 'Topi', U: 'Ulat', V: 'Vas', W: 'Wortel',
  X: 'Xilofon', Y: 'Yogurt', Z: 'Zebra',
};

// Letter drawing animation paths (for canvas animation)
const LETTER_PATHS = {
  A: [[[50, 120], [70, 20]], [[70, 20], [90, 120]], [[55, 80], [85, 80]]],
  B: [[[20, 20], [20, 120]], [[20, 20], [55, 20], [65, 35], [55, 70], [20, 70]], [[20, 70], [55, 70], [65, 85], [55, 120], [20, 120]]],
  C: [[[80, 35], [60, 20], [30, 30], [10, 70], [30, 110], [60, 120], [80, 105]]],
  D: [[[20, 20], [20, 120]], [[20, 20], [50, 20], [75, 50], [75, 90], [50, 120], [20, 120]]],
  E: [[[20, 20], [20, 120]], [[20, 20], [80, 20]], [[20, 70], [65, 70]], [[20, 120], [80, 120]]],
  F: [[[20, 20], [20, 120]], [[20, 20], [80, 20]], [[20, 70], [65, 70]]],
  G: [[[80, 35], [60, 20], [30, 30], [10, 70], [30, 110], [60, 120], [80, 100], [80, 70], [50, 70]]],
  H: [[[20, 20], [20, 120]], [[80, 20], [80, 120]], [[20, 70], [80, 70]]],
  I: [[[20, 20], [80, 20]], [[50, 20], [50, 120]], [[20, 120], [80, 120]]],
  J: [[[20, 20], [80, 20]], [[60, 20], [60, 100], [40, 120], [20, 110]]],
  K: [[[20, 20], [20, 120]], [[80, 20], [20, 70]], [[20, 70], [80, 120]]],
  L: [[[20, 20], [20, 120]], [[20, 120], [80, 120]]],
  M: [[[20, 20], [20, 120]], [[20, 20], [50, 70]], [[50, 70], [80, 20]], [[80, 20], [80, 120]]],
  N: [[[20, 20], [20, 120]], [[20, 20], [80, 120]], [[80, 20], [80, 120]]],
  O: [[[50, 20], [20, 50], [20, 90], [50, 120], [80, 90], [80, 50], [50, 20]]],
  P: [[[20, 20], [20, 120]], [[20, 20], [60, 20], [75, 45], [60, 70], [20, 70]]],
  Q: [[[50, 20], [20, 50], [20, 90], [50, 120], [80, 90], [80, 50], [50, 20]], [[60, 100], [80, 120]]],
  R: [[[20, 20], [20, 120]], [[20, 20], [60, 20], [75, 45], [60, 70], [20, 70]], [[40, 70], [80, 120]]],
  S: [[[80, 30], [60, 20], [30, 25], [20, 45], [60, 70], [80, 90], [70, 115], [40, 120], [20, 110]]],
  T: [[[20, 20], [80, 20]], [[50, 20], [50, 120]]],
  U: [[[20, 20], [20, 90], [50, 120], [80, 90], [80, 20]]],
  V: [[[20, 20], [50, 120]], [[50, 120], [80, 20]]],
  W: [[[10, 20], [30, 120]], [[30, 120], [50, 60]], [[50, 60], [70, 120]], [[70, 120], [90, 20]]],
  X: [[[20, 20], [80, 120]], [[80, 20], [20, 120]]],
  Y: [[[20, 20], [50, 70]], [[80, 20], [50, 70]], [[50, 70], [50, 120]]],
  Z: [[[20, 20], [80, 20]], [[80, 20], [20, 120]], [[20, 120], [80, 120]]],
};
