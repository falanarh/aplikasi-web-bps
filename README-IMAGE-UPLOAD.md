# Sistem Upload Gambar Publikasi BPS

## Cara Menggunakan Sistem Upload Gambar

### 1. Menambah Publikasi dengan Gambar
1. Klik menu "Tambah Publikasi" di navbar
2. Isi judul dan tanggal rilis (wajib)
3. Klik "Choose File" untuk memilih gambar (opsional)
4. Format yang didukung: JPG, PNG, GIF
5. Ukuran maksimal: 2MB
6. Klik "Tambah Publikasi" untuk menyimpan

### 2. Melihat Gambar yang Tersimpan
1. Klik menu "Kelola Gambar" di navbar
2. Akan muncul daftar semua gambar yang pernah diupload
3. Informasi yang ditampilkan:
   - Judul publikasi
   - Nama file asli
   - Nama file yang disimpan
   - Tanggal upload
   - Path file

### 3. Cara Kerja Sistem
- **Gambar disimpan sebagai base64**: Gambar dikonversi ke format base64 dan disimpan dalam aplikasi
- **Informasi file disimpan di localStorage**: Data tentang file disimpan di browser
- **Folder penyimpanan**: `src/assets/publications/`
- **Nama file otomatis**: Format: `timestamp-judul-publikasi.ekstensi`

### 4. Fitur yang Tersedia
- ✅ Upload gambar dengan preview
- ✅ Validasi tipe file (hanya gambar)
- ✅ Validasi ukuran file (max 2MB)
- ✅ Preview gambar sebelum upload
- ✅ Hapus gambar yang dipilih
- ✅ Daftar gambar yang tersimpan
- ✅ Informasi detail file

### 5. Struktur File
```
src/
├── components/
│   ├── AddPublicationPage.jsx    # Form tambah publikasi
│   ├── ImageManager.jsx          # Kelola gambar
│   └── PublicationListPage.jsx   # Daftar publikasi
├── utils/
│   └── imageHelper.js            # Helper untuk gambar
└── assets/
    └── publications/             # Folder penyimpanan gambar
```

### 6. Tips untuk Pemula
- Gunakan gambar dengan ukuran kecil (di bawah 1MB) untuk performa lebih baik
- Format JPG lebih direkomendasikan untuk foto
- Format PNG lebih direkomendasikan untuk gambar dengan transparansi
- Pastikan gambar memiliki rasio aspek yang baik untuk tampilan

### 7. Troubleshooting
- **Gambar tidak muncul**: Cek apakah file adalah gambar valid
- **File terlalu besar**: Kompres gambar atau pilih file yang lebih kecil
- **Error saat upload**: Refresh halaman dan coba lagi
- **Gambar hilang**: Data tersimpan di localStorage browser, pastikan tidak menghapus data browser 