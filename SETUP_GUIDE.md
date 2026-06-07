# 📘 Panduan Lengkap: VSCode + GitHub — AlphaLearn

---

## BAGIAN 1 — Setup di VSCode (Lokal)

### Langkah 1: Install VSCode
Unduh dan install dari: https://code.visualstudio.com/

### Langkah 2: Install Ekstensi Live Server
1. Buka VSCode
2. Tekan `Ctrl + Shift + X` (Windows/Linux) atau `Cmd + Shift + X` (Mac)
3. Ketik **"Live Server"**
4. Klik **Install** pada ekstensi dari *Ritwick Dey*

### Langkah 3: Buka Project
Cara A — Drag & Drop:
  → Seret folder `alphalearn` ke jendela VSCode

Cara B — Terminal:
```bash
cd path/ke/folder/alphalearn
code .
```

Cara C — File menu:
  → File → Open Folder → pilih folder alphalearn

### Langkah 4: Jalankan dengan Live Server
**Opsi 1** (Paling mudah):
  → Klik tombol **"Go Live"** di pojok kanan bawah VSCode

**Opsi 2**:
  → Klik kanan `index.html` di Explorer → **"Open with Live Server"**

**Opsi 3** (Command Palette):
  → `Ctrl+Shift+P` → ketik `Live Server: Open with Live Server`

✅ Browser akan otomatis terbuka di: `http://127.0.0.1:5500`

---

## BAGIAN 2 — Upload ke GitHub

### Langkah 1: Install Git
- Windows: https://git-scm.com/download/win
- Mac: `brew install git` atau dari Xcode Command Line Tools
- Linux: `sudo apt install git`

Cek instalasi:
```bash
git --version
```

### Langkah 2: Konfigurasi Git (sekali saja)
```bash
git config --global user.name "Nama Kamu"
git config --global user.email "email@kamu.com"
```

### Langkah 3: Buat Repository di GitHub
1. Buka https://github.com
2. Login / daftar akun
3. Klik tombol **"New"** (hijau) atau klik **"+"** → **"New repository"**
4. Isi:
   - Repository name: `alphalearn`
   - Description: `Platform belajar huruf AI untuk anak PAUD`
   - Visibility: **Public** (agar bisa pakai GitHub Pages gratis)
   - ❌ JANGAN centang "Add README" (sudah ada)
5. Klik **"Create repository"**

### Langkah 4: Init & Push dari VSCode Terminal
Buka terminal di VSCode: `Ctrl + \`` (backtick)

```bash
# Masuk ke folder project
cd path/ke/alphalearn

# Inisialisasi git
git init

# Tambah semua file
git add .

# Commit pertama
git commit -m "🎉 Initial commit - AlphaLearn AI Alphabet Learning"

# Hubungkan ke GitHub (ganti USERNAME dengan username GitHub kamu)
git remote add origin https://github.com/USERNAME/alphalearn.git

# Set branch utama ke main
git branch -M main

# Push ke GitHub
git push -u origin main
```

💡 Saat push pertama, GitHub akan minta login. Gunakan **Personal Access Token**:
- GitHub → Settings → Developer settings → Personal access tokens → Generate new token
- Centang scope: `repo`
- Copy token, gunakan sebagai password saat git push

---

## BAGIAN 3 — Aktifkan GitHub Pages (Live Website)

### Langkah 1: Aktifkan Pages
1. Buka repository di GitHub
2. Klik tab **"Settings"**
3. Di sidebar kiri, klik **"Pages"**
4. Di bagian **"Source"**:
   - Pilih: **"Deploy from a branch"**
   - Branch: **main**
   - Folder: **/ (root)**
5. Klik **"Save"**

### Langkah 2: Tunggu Deploy
- Biasanya 1-3 menit
- Refresh halaman Settings → Pages
- Akan muncul: *"Your site is live at https://USERNAME.github.io/alphalearn"*

### Langkah 3: Akses Website
🌐 `https://USERNAME.github.io/alphalearn`

---

## BAGIAN 4 — Update Website (setelah edit kode)

Setiap kali kamu edit kode dan mau update website:

```bash
git add .
git commit -m "✨ Tambah fitur XYZ"
git push
```

GitHub Pages akan otomatis update dalam 1-2 menit! 🚀

---

## BAGIAN 5 — Shortcut VSCode yang Berguna

| Shortcut | Fungsi |
|---|---|
| `Ctrl + \`` | Buka/tutup terminal |
| `Ctrl + S` | Simpan file |
| `Ctrl + Z` | Undo |
| `Ctrl + Shift + P` | Command palette |
| `Ctrl + B` | Toggle sidebar |
| `Alt + Z` | Toggle word wrap |
| `Ctrl + /` | Comment/uncomment baris |
| `F5` | Jalankan debugger |
| `Ctrl + Shift + X` | Extensions marketplace |

---

## BAGIAN 6 — Troubleshooting

### ❌ "Kamera tidak bisa diakses"
→ Harus buka via Live Server (localhost), bukan double-click file HTML
→ Izinkan akses kamera di popup browser
→ Chrome: klik ikon 🔒 di address bar → Camera → Allow

### ❌ "Port 5500 sudah dipakai"
→ Ubah port di `.vscode/settings.json`:
```json
"liveServer.settings.port": 5501
```

### ❌ "git push" minta password terus
→ Simpan credentials: `git config --global credential.helper store`
→ Atau gunakan SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### ❌ GitHub Pages menampilkan 404
→ Pastikan file bernama `index.html` (bukan `Index.html`)
→ Tunggu beberapa menit setelah push
→ Cek tab Actions di GitHub untuk melihat status deploy

### ❌ Live Server tidak mau reload otomatis
→ Simpan file dengan `Ctrl+S`
→ Restart Live Server: klik "Port: 5500" di status bar → Stop → Go Live lagi

---

## 📞 Butuh Bantuan?

- Dokumentasi VSCode: https://code.visualstudio.com/docs
- Dokumentasi GitHub: https://docs.github.com
- GitHub Pages: https://pages.github.com
