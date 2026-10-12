# Dokumentasi Navigasi · Geosfer

Dokumen ini menjelaskan sistem navigasi yang dipakai seluruh halaman: apa saja tujuannya,
bagaimana bentuknya di tiap ukuran layar, dan alasan tiap keputusan.

## 1. Lima tujuan utama

| Tujuan | Berkas | Isi |
|---|---|---|
| Beranda | `index.html` | Alur tiga langkah dan kartu Lanjutkan belajar |
| Modul | `modul.html` | Daftar modul dengan saringan |
| Latihan | `latihan.html` | Mengerjakan soal dan melihat hasil |
| Progres | `progres.html` | Rekap per kompetensi dan riwayat |
| Glosarium | `glosarium.html` | Istilah geografi |

Angka lima dipilih karena dua alasan. Pertama, lima muat dalam satu baris di layar 320 px tanpa
mengecilkan label sampai sulit dibaca. Kedua, kelima tujuan ini memang pekerjaan utama siswa:
membaca, berlatih, lalu memeriksa hasil.

`modul-peta.html` bukan tujuan tersendiri. Ia anak dari Modul, sehingga tidak memakai slot di bilah tab.

## 2. Bentuk per ukuran layar

### Layar kecil sampai 899 px

- **Bilah tab tetap di bawah**, tinggi 64 px ditambah `env(safe-area-inset-bottom)` untuk ponsel berponi.
- Setiap tab berisi ikon dan label tulisan. Label selalu terlihat, tidak pernah disembunyikan.
- Tab aktif ditandai dua cara sekaligus: warna teks berubah ke teal gelap, dan muncul garis penanda
  32 px di tepi atas tab. Tidak bergantung pada warna saja.
- **Header ringkas**: lambang, nama, dan tombol Pasang. Tautan navigasi tidak diulang di header,
  karena sudah ada di bilah tab.
- `main` diberi ruang bawah setinggi bilah tab supaya isi terakhir tidak tertutup.

### Layar 900 px ke atas

- Bilah tab **disembunyikan**; navigasi pindah ke header sebagai deretan tautan dengan pil aktif.
- Header tetap menempel di atas saat halaman digulir.
- Alasannya: di layar lebar, ibu jari tidak lagi menjangkau bawah layar, sedangkan kursor nyaman
  dengan navigasi atas. Satu sistem untuk semua ukuran justru memaksa salah satu pihak berkompromi.

### Sub-halaman

`modul-peta.html` memakai tombol **Kembali ke Modul** yang terlihat di dalam isi halaman, di atas
judul. Bukan ikon panah kecil di header, bukan gestur geser dari tepi layar. Tombolnya bisa diketuk
dengan jelas dan terbaca oleh pembaca layar.

## 3. Penanda halaman aktif

Setiap tautan navigasi punya atribut `data-nav`. Berkas `assets/app.js` mencocokkan nama berkas yang
sedang dibuka dengan tujuan, lalu memasang `aria-current="page"` pada tautan yang cocok. Karena
`modul-peta.html` dipetakan ke tujuan **modul**, tab Modul tetap menyala saat halaman peta dibuka.
Penanda ini dipasang di bilah tab **dan** navigasi atas sekaligus, sehingga keduanya tidak pernah
menunjuk halaman yang berbeda.

## 4. Aturan yang dipegang

1. **Tidak ada tujuan yang tersembunyi.** Semua halaman bisa dicapai dalam satu ketukan dari mana pun.
2. **Target sentuh minimal 44 px.** Berlaku untuk tautan tab, tautan header, tombol, chip saringan,
   dan pilihan jawaban.
3. **Label selalu ada.** Ikon tidak pernah berdiri sendiri tanpa teks, kecuali tombol tutup dialog
   yang sudah punya `aria-label`.
4. **Tidak ada interaksi berbasis hover saja.** Efek hover hanya menambah umpan balik, bukan satu-satunya
   cara memakai fitur.
5. **Tidak ada gerakan geser atau tahan lama yang wajib.** Tidak ada carousel yang harus digeser untuk
   melihat isi.
6. **Keadaan kosong selalu menyediakan jalan keluar.** Contohnya halaman Progres menampilkan tombol
   Mulai latihan, dan halaman Modul menampilkan tombol Tampilkan semua modul.
7. **Fokus keyboard terlihat.** `:focus-visible` memberi garis tebal 3 px pada semua elemen interaktif,
   termasuk wilayah pada peta yang bisa difokuskan dengan tombol Tab.
8. **Ada tautan lewati.** `Lewati ke isi utama` muncul saat Tab pertama ditekan.

## 5. Alur pindah halaman

```
Beranda ──> Modul ──> Peta Persebaran ──> Latihan (topik sudah terpilih)
   │           │                                │
   │           └──> Latihan / Glosarium          └──> Progres
   └──> kartu Lanjutkan belajar ──> Latihan atau Progres
```

Dari halaman peta, tombol **Latihan topik ini** membawa topik Persebaran Flora dan Fauna sebagai
parameter URL, sehingga siswa tidak perlu memilih topik dua kali.

## 6. Uji yang dijalankan

| Uji | Cara | Hasil |
|---|---|---|
| Tidak ada gulir mendatar | Ukur `documentElement.scrollWidth` di 320, 375, 414, 768, 1440 px | Lulus di semua lebar |
| Tab aktif benar | Buka tiap halaman, baca `aria-current` | Satu tab aktif per halaman, sesuai tujuan |
| Bilah tab vs navigasi atas | Baca `getComputedStyle` pada 375 px dan 900 px | Bilah tab tampil di bawah 900 px, tersembunyi di atasnya |
| Label tab tidak terpotong | Ukur `scrollWidth` vs `clientWidth` tiap label di 320 px | Lima label muat, lebar 64 px masing-masing |
| Target sentuh | Hitung semua `a` dan `button` dengan tinggi < 44 px | Nol temuan di 320 sampai 1440 px |
| Peta bisa dikendalikan | Tombol Tab ke wilayah, tekan Enter, tombol layer diklik | Panel berubah, layer bisa dinyalakan |
| Peta tidak memotong pulau | Hitung tiap titik garis terhadap elips wilayah | Garis Wallace tidak masuk pulau mana pun |
| Latihan utuh | Selesaikan satu paket soal, periksa simpanan | Skor, rekap kompetensi, dan riwayat tersimpan |
| Jalur jawaban salah | Pilih jawaban keliru, baca umpan balik | Kunci ditandai hijau, pilihan salah ditandai merah, pembahasan muncul |
| Progres bertahan | Muat ulang halaman Progres | Angka sama seperti sebelum muat ulang |
| Ekspor CSV | Tekan Ekspor rekap | Berkas terunduh, isi memuat rekap per kompetensi |
| Mode offline | Matikan jaringan, buka halaman | Halaman tetap tampil, banner offline muncul |
| Kontras teks | Hitung rasio WCAG tiap pasangan warna teks dan latar | Nilai terendah 4,68 : 1, di atas ambang AA 4,5 : 1 |
| Kaki halaman vs bilah tab | Tangkap layar pada 390 px setelah digulir ke bawah | Teks kaki terlihat utuh, tidak tertutup bilah tab |
| Gerak dikurangi | Aktifkan `prefers-reduced-motion` | Transisi dimatikan, animasi berhenti |

Catatan metode: pemeriksaan lebar bergantung pada emulasi perangkat lewat CDP. Pada lingkungan uji ini,
emulasi kadang tidak memicu perhitungan ulang gaya yang bergantung media query, sehingga angka
`getBoundingClientRect` bisa menyesatkan. Untuk kasus seperti itu, tangkapan layar dipakai sebagai
bukti utama, dan `innerWidth` selalu dicatat bersama hasil ukur untuk memastikan lebarnya sah.

## 7. Yang belum dikerjakan

- **Pencarian global.** Saat ini pencarian hanya ada di Glosarium.
- **Tombol kembali dari halaman Latihan.** Halaman Latihan adalah tujuan utama, jadi tidak butuh
  tombol kembali; bilah tab sudah menyediakannya.
- **Riwayat halaman.** Setelah menyelesaikan latihan, tombol kembali peramban tetap bekerja seperti biasa.
