/* Geosfer · bank soal
   Soal disusun untuk Kurikulum Merdeka fase E dan F. Setiap soal punya satu jawaban benar
   dan pembahasan singkat yang menjelaskan alasannya.
   Struktur: {id, kompetensi, fase, pertanyaan, pilihan[4], jawaban, pembahasan}
   jawaban = indeks pilihan yang benar (0-3). */
window.GEOSFER_SOAL = [
  {
    id: "peta-01",
    kompetensi: "Peta dan Penginderaan Jauh",
    fase: "E",
    pertanyaan: "Jarak dua kota pada peta 4 cm, sedangkan jarak sebenarnya 20 km. Skala peta tersebut adalah...",
    pilihan: ["1 : 500.000", "1 : 50.000", "1 : 5.000", "1 : 5.000.000"],
    jawaban: 0,
    pembahasan: "20 km = 2.000.000 cm. Skala = jarak peta dibagi jarak sebenarnya = 4 : 2.000.000 = 1 : 500.000."
  },
  {
    id: "peta-02",
    kompetensi: "Peta dan Penginderaan Jauh",
    fase: "E",
    pertanyaan: "Sensor penginderaan jauh yang dapat merekam permukaan bumi pada malam hari dan menembus tutupan awan adalah...",
    pilihan: ["Sensor fotografik", "Sensor radar", "Sensor multispektral", "Sensor ultraviolet"],
    jawaban: 1,
    pembahasan: "Sensor radar memancarkan gelombang mikro sendiri, sehingga tidak bergantung cahaya matahari dan dapat menembus awan."
  },
  {
    id: "peta-03",
    kompetensi: "Peta dan Penginderaan Jauh",
    fase: "E",
    pertanyaan: "Pada Sistem Informasi Geografis, proses menumpuk dua layer peta untuk memperoleh informasi baru disebut...",
    pilihan: ["Buffering", "Overlay", "Digitasi", "Klasifikasi"],
    jawaban: 1,
    pembahasan: "Overlay menumpuk dua layer atau lebih sehingga muncul informasi gabungan, misalnya peta lereng ditumpuk peta penggunaan lahan."
  },
  {
    id: "lito-01",
    kompetensi: "Litosfer",
    fase: "E",
    pertanyaan: "Batuan beku yang terbentuk dari pendinginan magma di bawah permukaan bumi disebut batuan...",
    pilihan: ["Ekstrusif", "Intrusif", "Sedimen", "Metamorf"],
    jawaban: 1,
    pembahasan: "Pendinginan di bawah permukaan berlangsung lambat sehingga kristalnya besar. Batuan jenis ini disebut intrusif atau plutonik, contohnya granit."
  },
  {
    id: "lito-02",
    kompetensi: "Litosfer",
    fase: "E",
    pertanyaan: "Letusan gunung api dengan lava sangat cair sehingga membentuk lereng landai seperti perisai disebut tipe...",
    pilihan: ["Vulkano", "Perisai", "Merapi", "Pelean"],
    jawaban: 1,
    pembahasan: "Lava yang sangat cair mengalir jauh sebelum membeku, sehingga lerengnya landai. Contohnya gunung api di Hawaii."
  },
  {
    id: "lito-03",
    kompetensi: "Litosfer",
    fase: "E",
    pertanyaan: "Alat yang mencatat getaran gempa bumi beserta kekuatannya adalah...",
    pilihan: ["Barometer", "Anemometer", "Seismograf", "Higrometer"],
    jawaban: 2,
    pembahasan: "Seismograf mencatat getaran gempa dalam bentuk seismogram. Barometer mengukur tekanan udara, anemometer kecepatan angin, higrometer kelembapan."
  },
  {
    id: "atmo-01",
    kompetensi: "Atmosfer dan Iklim",
    fase: "E",
    pertanyaan: "Lapisan atmosfer tempat terjadinya hampir semua peristiwa cuaca adalah...",
    pilihan: ["Stratosfer", "Troposfer", "Mesosfer", "Termosfer"],
    jawaban: 1,
    pembahasan: "Troposfer adalah lapisan paling bawah dan memuat hampir seluruh uap air, sehingga awan dan hujan terbentuk di sini."
  },
  {
    id: "atmo-02",
    kompetensi: "Atmosfer dan Iklim",
    fase: "E",
    pertanyaan: "Indonesia beriklim tropis terutama karena...",
    pilihan: ["Terletak di antara dua benua", "Berada di sekitar garis khatulistiwa", "Dikelilingi banyak laut", "Memiliki banyak gunung api"],
    jawaban: 1,
    pembahasan: "Posisi lintang menentukan sudut datang sinar matahari. Karena berada di sekitar khatulistiwa, Indonesia menerima penyinaran matahari sepanjang tahun."
  },
  {
    id: "atmo-03",
    kompetensi: "Atmosfer dan Iklim",
    fase: "E",
    pertanyaan: "Angin monsun barat yang membawa musim hujan di Indonesia bertiup dari...",
    pilihan: ["Australia menuju Asia", "Asia menuju Australia", "Samudra Pasifik menuju Australia", "Samudra Hindia menuju Afrika"],
    jawaban: 1,
    pembahasan: "Pada Oktober sampai Maret, angin bertiup dari Benua Asia menuju Australia. Karena melintasi perairan luas, angin ini membawa uap air dan menimbulkan musim hujan."
  },
  {
    id: "hidro-01",
    kompetensi: "Hidrosfer",
    fase: "E",
    pertanyaan: "Perubahan uap air menjadi titik-titik air di atmosfer dalam siklus hidrologi disebut...",
    pilihan: ["Evaporasi", "Kondensasi", "Presipitasi", "Infiltrasi"],
    jawaban: 1,
    pembahasan: "Kondensasi adalah perubahan uap air menjadi titik air karena suhu turun. Titik air inilah yang membentuk awan dan dapat jatuh sebagai hujan."
  },
  {
    id: "hidro-02",
    kompetensi: "Hidrosfer",
    fase: "E",
    pertanyaan: "Sungai yang mengalir sepanjang tahun karena sumber airnya berasal dari mata air dan curah hujan disebut sungai...",
    pilihan: ["Periodik", "Permanen", "Episodik", "Intermiten"],
    jawaban: 1,
    pembahasan: "Sungai permanen mengalir terus sepanjang tahun. Sungai periodik hanya berair pada musim hujan, sedangkan episodik hanya sesaat setelah hujan."
  },
  {
    id: "bio-01",
    kompetensi: "Persebaran Flora dan Fauna",
    fase: "F",
    pertanyaan: "Garis yang memisahkan wilayah fauna Oriental dengan wilayah Peralihan disebut garis...",
    pilihan: ["Weber", "Wallace", "Khatulistiwa", "Balik utara"],
    jawaban: 1,
    pembahasan: "Garis Wallace memisahkan wilayah Oriental di barat dengan wilayah Peralihan di tengah. Garis Weber memisahkan wilayah Peralihan dengan Australis."
  },
  {
    id: "bio-02",
    kompetensi: "Persebaran Flora dan Fauna",
    fase: "F",
    pertanyaan: "Anoa dan babi rusa adalah fauna endemik yang hidup di wilayah...",
    pilihan: ["Sumatra", "Kalimantan", "Sulawesi", "Papua"],
    jawaban: 2,
    pembahasan: "Sulawesi termasuk wilayah Peralihan atau Wallacea, dengan fauna endemik seperti anoa, babi rusa, dan tarsius."
  },
  {
    id: "bio-03",
    kompetensi: "Persebaran Flora dan Fauna",
    fase: "F",
    pertanyaan: "Hutan hujan tropis di Indonesia bagian barat didominasi pohon dari keluarga Dipterocarpaceae, contohnya meranti. Wilayah tersebut termasuk tipe persebaran...",
    pilihan: ["Australis", "Oriental", "Peralihan", "Subtropis"],
    jawaban: 1,
    pembahasan: "Bagian barat Indonesia termasuk wilayah Oriental yang dipengaruhi flora Asia, dengan pohon berbatang tinggi dan berdaun lebar seperti meranti."
  },
  {
    id: "antro-01",
    kompetensi: "Dinamika Kependudukan",
    fase: "F",
    pertanyaan: "Angka yang menunjukkan jumlah kelahiran hidup per 1.000 penduduk dalam satu tahun disebut...",
    pilihan: ["Angka kelahiran kasar", "Angka kematian kasar", "Angka fertilitas total", "Angka harapan hidup"],
    jawaban: 0,
    pembahasan: "Angka kelahiran kasar atau Crude Birth Rate dihitung dari jumlah kelahiran hidup dibagi jumlah penduduk, lalu dikali 1.000."
  },
  {
    id: "antro-02",
    kompetensi: "Dinamika Kependudukan",
    fase: "F",
    pertanyaan: "Piramida penduduk dengan bentuk granat, yaitu bagian tengah paling lebar, menunjukkan struktur penduduk yang...",
    pilihan: ["Tumbuh sangat cepat", "Stasioner", "Menyusut", "Didominasi anak-anak"],
    jawaban: 2,
    pembahasan: "Bentuk granat berarti jumlah penduduk usia muda lebih sedikit daripada usia dewasa, tanda pertumbuhan penduduk menyusut."
  },
  {
    id: "mitig-01",
    kompetensi: "Mitigasi Bencana",
    fase: "F",
    pertanyaan: "Tindakan yang tepat saat gempa terjadi dan kita berada di dalam ruangan adalah...",
    pilihan: ["Berlari keluar melalui lift", "Berlindung di bawah meja kokoh sambil melindungi kepala", "Berdiri dekat jendela kaca", "Naik ke lantai paling atas"],
    jawaban: 1,
    pembahasan: "Berlindung di bawah meja kokoh dengan kepala terlindungi mencegah luka akibat benda jatuh. Lift dan jendela kaca berbahaya saat gempa."
  },
  {
    id: "mitig-02",
    kompetensi: "Mitigasi Bencana",
    fase: "F",
    pertanyaan: "Contoh mitigasi nonstruktural untuk mengurangi risiko banjir adalah...",
    pilihan: ["Membangun tanggul sungai", "Membuat peta rawan banjir dan sosialisasi ke warga", "Melakukan normalisasi sungai", "Membuat waduk penampung"],
    jawaban: 1,
    pembahasan: "Mitigasi nonstruktural mengandalkan informasi dan perilaku, bukan bangunan. Peta rawan banjir dan sosialisasi membuat warga tahu kapan harus mengungsi."
  }
];
