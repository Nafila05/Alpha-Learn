# 🎒 AlphaLearn — Belajar Huruf Alfabet via AI

Platform belajar huruf alfabet interaktif berbasis AI untuk anak PAUD & TK.
Anak bisa mendeteksi huruf lewat kamera, upload gambar, belajar cara menulis, dan main kuis seru!

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 📷 **Deteksi Kamera** | Tulis huruf di kertas → arahkan ke kamera → AI mendeteksi |
| 🖼️ **Upload Gambar** | Upload foto tulisan tangan → AI menganalisis huruf |
| ✏️ **Panduan Menulis** | Langkah-langkah menulis tiap huruf + kanvas latihan |
| 🤖 **Analisis AI** | AlphaBot memberi umpan balik tulisan anak secara real-time |
| 🎬 **Animasi Huruf** | Lihat animasi cara menulis huruf di kanvas |
| 🎮 **Kuis Interaktif** | 3 jenis kuis: pilihan ganda, menulis, tebak kata |
| ⭐ **Lacak Progress** | Peta huruf, poin, streak, dan 8 lencana pencapaian |

---

## 📁 Struktur Project

```
alphalearn/
├── index.html              # Entry point utama
├── src/
│   ├── css/
│   │   ├── base.css        # Reset, variabel, animasi
│   │   ├── components.css  # Nav, button, card, chip, dll
│   │   └── pages.css       # Style tiap halaman
│   └── js/
│       ├── data.js         # Data huruf, kata, path animasi
│       ├── storage.js      # LocalStorage & progress
│       ├── ui.js           # Navigasi, grid, reward, confetti
│       ├── detect.js       # Kamera + upload + AI detection
│       ├── learn.js        # Halaman belajar & kanvas
│       ├── quiz.js         # Sistem kuis lengkap
│       └── progress.js     # Halaman progress & lencana
├── .vscode/
│   ├── settings.json       # VSCode workspace settings
│   └── extensions.json     # Ekstensi yang direkomendasikan
├── .github/
│   └── workflows/
│       └── deploy.yml      # Auto-deploy ke GitHub Pages
├── .gitignore
└── README.md
```

---

## 🚀 Cara Menjalankan (VSCode)

### Prasyarat
- [Visual Studio Code](https://code.visualstudio.com/)
- Ekstensi **Live Server** (otomatis disarankan saat buka project)

### Langkah-langkah

```bash
# 1. Clone repository
git clone https://github.com/USERNAME/alphalearn.git
cd alphalearn

# 2. Buka di VSCode
code .

# 3. Install ekstensi Live Server jika belum ada
#    Ctrl+Shift+X → cari "Live Server" → Install

# 4. Jalankan
#    Klik kanan index.html → "Open with Live Server"
#    ATAU klik tombol "Go Live" di status bar bawah VSCode
```

Browser akan otomatis terbuka di `http://127.0.0.1:5500`

> ⚠️ **Penting:** Harus dijalankan via Live Server (bukan buka file HTML langsung) agar kamera & API bisa berfungsi dengan benar karena butuh HTTPS/localhost.

---

## 🤖 Konfigurasi API

Website ini menggunakan **Anthropic Claude API** untuk:
- Mendeteksi huruf dari foto/kamera
- Memberikan umpan balik tulisan anak
- Menilai hasil kuis menulis

API key sudah terintegrasi via claude.ai artifacts. Jika deploy mandiri, tambahkan API key di `src/js/detect.js` dan `src/js/learn.js`:

```js
headers: {
  'Content-Type': 'application/json',
  'x-api-key': 'YOUR_ANTHROPIC_API_KEY',  // tambahkan ini
  'anthropic-version': '2023-06-01'
}
```

> 🔒 **Jangan commit API key ke GitHub!** Gunakan environment variable atau backend proxy untuk production.

---

## 🌐 Deploy ke GitHub Pages

### Otomatis (GitHub Actions)
Push ke branch `main` → otomatis deploy via `.github/workflows/deploy.yml`

```bash
git add .
git commit -m "feat: initial deploy"
git push origin main
```

Akses di: `https://USERNAME.github.io/alphalearn`

### Manual
1. GitHub repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / `(root)`
4. Save → tunggu 1-2 menit

---

## 🛠️ Tech Stack

- **HTML5** + **CSS3** + **Vanilla JavaScript** — tanpa framework, ringan & cepat
- **Canvas API** — kanvas menggambar huruf
- **MediaDevices API** — akses kamera
- **Claude Vision API** — deteksi & analisis gambar
- **LocalStorage** — simpan progress offline

---

## 📱 Kompatibilitas

| Browser | Kamera | Upload | Canvas |
|---|---|---|---|
| Chrome 90+ | ✅ | ✅ | ✅ |
| Firefox 88+ | ✅ | ✅ | ✅ |
| Safari 14+ | ✅ | ✅ | ✅ |
| Edge 90+ | ✅ | ✅ | ✅ |

---

## 🤝 Kontribusi

Pull request sangat diterima! Untuk perubahan besar, buka issue dulu ya.

---

## 📄 Lisensi

MIT License — bebas digunakan untuk keperluan edukasi.
