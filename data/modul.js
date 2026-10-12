/* Geosfer · data modul
   Semua modul nyata: status "siap" berarti halaman sudah ada dan bisa dibuka.
   Status "segera" ditandai jujur, bukan tautan mati. */
window.GEOSFER_MODUL = [
  {
    id: "peta",
    nama: "Peta Persebaran",
    ikon: "ph-map-trifold",
    lapisan: "Biosfer",
    fase: "Fase F",
    ringkas: "Peta skematis flora dan fauna Indonesia dengan tiga wilayah biogeografi serta garis Wallace dan Weber.",
    status: "siap",
    href: "modul-peta.html"
  },
  {
    id: "soal",
    nama: "Bank Soal TKA",
    ikon: "ph-exam",
    lapisan: "Lintas lapisan",
    fase: "Fase E dan F",
    ringkas: "Soal ber-anchor peta dengan pembahasan bertahap dan rekap hasil per kompetensi.",
    status: "siap",
    href: "latihan.html"
  },
  {
    id: "kuis",
    nama: "Kuis Kilat",
    ikon: "ph-lightning",
    lapisan: "Lintas lapisan",
    fase: "Semua fase",
    ringkas: "Lima soal acak untuk pemanasan sebelum materi baru. Umpan balik langsung.",
    status: "siap",
    href: "latihan.html?mode=kilat"
  },
  {
    id: "lab",
    nama: "Lab Spasial",
    ikon: "ph-flask",
    lapisan: "Litosfer",
    fase: "Fase E",
    ringkas: "Praktikum terpandu membaca citra dan menumpuk layer memakai data terbuka Indonesia.",
    status: "segera",
    catatan: "Menunggu data citra dan izin penggunaan. Belum bisa dibuka."
  },
  {
    id: "lkpd",
    nama: "LKPD Cetak",
    ikon: "ph-printer",
    lapisan: "Lintas lapisan",
    fase: "Mode Guru",
    ringkas: "Lembar kerja, kunci, dan rubrik siap cetak dengan tata letak hemat tinta.",
    status: "segera",
    catatan: "Sedang disusun bersama guru mata pelajaran."
  },
  {
    id: "atlas",
    nama: "Atlas dan Glosarium",
    ikon: "ph-book-open-text",
    lapisan: "Lintas lapisan",
    fase: "Semua fase",
    ringkas: "Istilah geografi, satuan, dan peta tematik dasar yang tetap terbuka tanpa koneksi.",
    status: "siap",
    href: "glosarium.html"
  }
];
