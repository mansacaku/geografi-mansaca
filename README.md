# Geosfer · kerangka aplikasi serius

Versi serius dari template **Alur Belajar**. Bukan lagi mockup satu halaman, tetapi aplikasi
statis berjalan dengan navigasi, konten nyata, penyimpanan progres di perangkat, dan mode offline.

## Cara menjalankan

Service worker dan tombol Pasang hanya bekerja lewat server, bukan klik dua kali berkas HTML.

```bash
cd "F:/PROYEK web/app-alur-belajar"
python -m http.server 8099
```

Buka `http://127.0.0.1:8099/`. Untuk menilai sisi HP, kecilkan jendela peramban sampai 320-414 px.

## Halaman

| Berkas | Isi |
|---|---|
| `index.html` | Beranda: alur tiga langkah, kartu Lanjutkan belajar, ringkasan modul |
| `modul.html` | Daftar enam modul dengan saringan lapisan kajian dan fase |
| `modul-peta.html` | Peta skematis persebaran: tiga wilayah biogeografi, garis Wallace dan Weber |
| `latihan.html` | Mesin latihan: pilih topik, jawab satu per satu, rekap per kompetensi |
| `progres.html` | Rekap hasil, riwayat, ekspor CSV, hapus riwayat |
| `glosarium.html` | 35 istilah geografi dengan pencarian dan saringan kategori |

Pendukung: `assets/app.css` (sistem desain), `assets/app.js` (inti bersama), `assets/quiz.js`
(mesin latihan), `assets/map.js` (peta), `data/*.js` (konten), `sw.js`, `manifest.webmanifest`, `icon.svg`.

## Sistem navigasi

Ringkasnya: lima tujuan utama selalu terlihat, satu pola untuk seluruh aplikasi.
Rincian dan alasan tiap keputusan ada di `DOKUMENTASI-NAVIGASI.md`.

- **Layar kecil sampai 899 px**: bilah tab tetap di bawah, lima tab dengan ikon dan label, tinggi 64 px
  ditambah ruang aman perangkat. Tab aktif ditandai garis atas dan `aria-current="page"`.
- **Layar 900 px ke atas**: bilah tab disembunyikan, diganti navigasi atas dengan pil aktif.
- **Sub-halaman** memakai tombol **Kembali** yang terlihat di dalam isi halaman, bukan ikon tersembunyi.
- Semua target sentuh minimal 44 px. Tidak ada pintasan tersembunyi, tahan lama, atau gerakan geser.

## Yang nyata dan yang belum

Sudah berjalan penuh:

- enam halaman dengan navigasi dan penanda halaman aktif,
- peta skematis interaktif dengan tiga wilayah dan dua garis pemisah,
- 18 soal asli ber-anchor peta, lengkap dengan pembahasan,
- penyimpanan progres per kompetensi di perangkat, ekspor CSV,
- 35 istilah glosarium dengan pencarian,
- mode offline lewat service worker, banner offline, dan tombol Pasang.

Belum dikerjakan, dan ditandai jujur di halaman Modul sebagai **Segera**:

- Lab Spasial (butuh data citra dan izin penggunaan),
- LKPD Cetak (sedang disusun bersama guru mata pelajaran).

Catatan penting: peta pada `modul-peta.html` bersifat **skematis, tidak berskala**. Tujuannya
menunjukkan urutan wilayah dan letak garis pemisah. Bila nanti butuh peta sebenarnya, ganti dengan
Leaflet dan ubin OpenStreetMap seperti pada proyek GeoExplorer, lalu simpan ubinnya untuk mode offline.

## Keputusan teknis

- **Tanpa build step, tanpa dependensi.** HTML, CSS, dan JavaScript biasa, supaya bisa langsung diunggah
  ke hosting cPanel. Font dan ikon diambil dari CDN; bila offline, peramban memakai font cadangan sistem.
- **Versi berkas aset.** Berkas CSS dan JavaScript dipanggil dengan akhiran `?v=2`, dan service worker
  memakai nama cache `geosfer-app-v3`. Naikkan angka ini setiap kali mengubah aset, supaya peramban
  dan service worker tidak menyajikan versi lama.
- **Tanpa akun.** Progres disimpan di `localStorage` dengan kunci `geosfer.progres.v1`.
- **Satu aksen, satu sistem sudut.** Teal `oklch(51% 0.132 195)`, kartu 20 px, tombol pil.
- **Kontras teks memenuhi WCAG AA.** Nilai terendah pada teks kecil adalah 4,68 : 1.
- **Hormati `prefers-reduced-motion`.** Seluruh transisi dimatikan bila pengguna memintanya.
- **Siap cetak.** Tombol, bilah tab, dan navigasi disembunyikan saat halaman dicetak.

## Langkah berikutnya

1. Tambah soal sampai setiap kompetensi punya minimal 10 butir.
2. Ganti peta skematis dengan peta ubin bila Lab Spasial mulai dikerjakan.
3. Tambahkan mode guru: pilih paket soal, cetak lembar kerja, unduh rekap kelas.
