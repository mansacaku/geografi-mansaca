/* Geosfer · mesin latihan (bank soal)
   Alur: pilih topik -> muat bank soal -> jawab satu per satu -> hasil dan rekap kompetensi.
   Semua keadaan punya tampilan: kosong, memuat, mengerjakan, hasil. */
(function () {
  'use strict';
  var BANK = window.GEOSFER_SOAL || [];
  var KEY = ['A', 'B', 'C', 'D'];

  var s = {
    mode: 'latihan',
    soal: [],
    idx: 0,
    benar: 0,
    perKompetensi: {},
    terjawab: false,
    topik: 'semua',
    jumlah: 10
  };

  var el = {};

  function kumpulkanElemen() {
    el.setup = document.getElementById('kuis-setup');
    el.loading = document.getElementById('kuis-loading');
    el.main = document.getElementById('kuis-main');
    el.hasil = document.getElementById('kuis-hasil');
    el.topik = document.getElementById('pilih-topik');
    el.jumlah = document.getElementById('pilih-jumlah');
    el.mulai = document.getElementById('btn-mulai');
    el.pertanyaan = document.getElementById('soal-pertanyaan');
    el.meta = document.getElementById('soal-meta');
    el.opsi = document.getElementById('soal-opsi');
    el.fb = document.getElementById('soal-fb');
    el.lanjut = document.getElementById('btn-lanjut');
    el.meter = document.getElementById('soal-meter');
    el.meterTeks = document.getElementById('soal-progres');
    el.error = document.getElementById('kuis-error');
  }

  function tampil(nama) {
    ['setup', 'loading', 'main', 'hasil', 'error'].forEach(function (k) {
      if (el[k]) el[k].hidden = (k !== nama);
    });
  }

  /* ---------- daftar kompetensi ---------- */
  function daftarKompetensi() {
    var set = [];
    BANK.forEach(function (q) { if (set.indexOf(q.kompetensi) === -1) set.push(q.kompetensi); });
    return set;
  }

  function bangunPilihan() {
    var list = daftarKompetensi();
    el.topik.innerHTML = '';
    [{ v: 'semua', t: 'Semua topik' }].concat(list.map(function (k) { return { v: k, t: k }; }))
      .forEach(function (o) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip';
        b.textContent = o.t;
        b.setAttribute('data-topik', o.v);
        b.setAttribute('aria-pressed', o.v === 'semua' ? 'true' : 'false');
        b.addEventListener('click', function () {
          s.topik = o.v;
          GE.els('[data-topik]', el.topik).forEach(function (x) {
            x.setAttribute('aria-pressed', x.getAttribute('data-topik') === o.v ? 'true' : 'false');
          });
        });
        el.topik.appendChild(b);
      });
  }

  function pilihSoal() {
    var pool = s.topik === 'semua' ? BANK.slice() : BANK.filter(function (q) { return q.kompetensi === s.topik; });
    pool = GE.acak(pool);
    var n = s.mode === 'kilat' ? 5 : (s.jumlah === 'semua' ? pool.length : Number(s.jumlah));
    return pool.slice(0, Math.max(1, Math.min(n, pool.length)));
  }

  /* ---------- mulai ---------- */
  function mulai() {
    if (!BANK.length) { tampil('error'); return; }
    tampil('loading');
    /* jeda singkat supaya keadaan memuat terlihat jelas, bukan berkedip */
    setTimeout(function () {
      s.soal = pilihSoal();
      s.idx = 0; s.benar = 0; s.perKompetensi = {}; s.terjawab = false;
      if (!s.soal.length) { tampil('error'); return; }
      tampil('main');
      gambarSoal();
    }, 550);
  }

  function gambarSoal() {
    var q = s.soal[s.idx];
    s.terjawab = false;
    el.meta.innerHTML = '';
    var t1 = document.createElement('span'); t1.className = 'tag'; t1.textContent = q.kompetensi;
    var t2 = document.createElement('span'); t2.className = 'tag tag-quiet'; t2.textContent = 'Fase ' + q.fase;
    el.meta.appendChild(t1); el.meta.appendChild(t2);

    el.pertanyaan.textContent = q.pertanyaan;

    el.opsi.innerHTML = '';
    q.pilihan.forEach(function (teks, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'opt';
      b.setAttribute('data-i', String(i));
      b.innerHTML = '<span class="opt-key" aria-hidden="true">' + KEY[i] + '</span><span>' + teks + '</span>';
      b.addEventListener('click', function () { jawab(i); });
      el.opsi.appendChild(b);
    });

    el.fb.hidden = true;
    el.fb.innerHTML = '';
    el.lanjut.hidden = true;
    el.lanjut.textContent = s.idx === s.soal.length - 1 ? 'Lihat hasil' : 'Soal berikutnya';

    var p = GE.persen(s.idx, s.soal.length);
    el.meter.style.width = p + '%';
    el.meter.setAttribute('data-level', '');
    el.meterTeks.textContent = 'Soal ' + (s.idx + 1) + ' dari ' + s.soal.length;
  }

  function jawab(pilih) {
    if (s.terjawab) return;
    s.terjawab = true;
    var q = s.soal[s.idx];
    var benar = pilih === q.jawaban;

    GE.els('.opt', el.opsi).forEach(function (b) {
      var i = Number(b.getAttribute('data-i'));
      b.disabled = true;
      if (i === q.jawaban) b.setAttribute('data-state', 'ok');
      else if (i === pilih) b.setAttribute('data-state', 'no');
    });

    if (benar) s.benar += 1;
    var k = s.perKompetensi[q.kompetensi] || { benar: 0, total: 0 };
    k.total += 1; if (benar) k.benar += 1;
    s.perKompetensi[q.kompetensi] = k;

    el.fb.hidden = false;
    el.fb.innerHTML = '';
    var head = document.createElement('p');
    head.innerHTML = '<b>' + (benar ? 'Tepat. ' : 'Belum tepat. ') + '</b>' +
      'Jawaban yang benar: ' + KEY[q.jawaban] + '. ' + q.pilihan[q.jawaban] + '.';
    var why = document.createElement('p');
    why.className = 'muted';
    why.textContent = q.pembahasan;
    el.fb.appendChild(head); el.fb.appendChild(why);
    el.fb.setAttribute('role', 'status');

    el.lanjut.hidden = false;
    el.lanjut.focus();
    el.meter.style.width = GE.persen(s.idx + 1, s.soal.length) + '%';
  }

  function lanjut() {
    if (s.idx < s.soal.length - 1) { s.idx += 1; gambarSoal(); }
    else selesai();
  }

  function selesai() {
    var total = s.soal.length;
    var p = GE.persen(s.benar, total);
    GE.catatHasil({ kompetensi: s.perKompetensi, benar: s.benar, total: total, mode: s.mode });

    document.getElementById('hasil-skor').textContent = p + '%';
    document.getElementById('hasil-benar').textContent = s.benar + ' benar';
    document.getElementById('hasil-salah').textContent = (total - s.benar) + ' salah';
    document.getElementById('hasil-total').textContent = total + ' soal';

    var box = document.getElementById('hasil-kompetensi');
    box.innerHTML = '';
    var nama = Object.keys(s.perKompetensi);
    nama.sort();
    nama.forEach(function (n) {
      var d = s.perKompetensi[n];
      var pp = GE.persen(d.benar, d.total);
      var row = document.createElement('div');
      row.className = 'meter-row';
      row.innerHTML =
        '<div class="meter-top"><span class="meter-name">' + n + '</span>' +
        '<span class="meter-val">' + d.benar + '/' + d.total + ' benar</span></div>' +
        '<div class="meter" role="img" aria-label="' + n + ': ' + pp + ' persen benar">' +
        '<span class="meter-fill" data-level="' + (pp >= 75 ? 'ok' : (pp >= 50 ? '' : 'warn')) + '" style="width:' + pp + '%"></span></div>';
      box.appendChild(row);
    });

    var saran = document.getElementById('hasil-saran');
    if (p >= 80) saran.textContent = 'Penguasaan sudah kuat. Lanjut ke topik berikutnya atau naikkan jumlah soal.';
    else if (p >= 60) saran.textContent = 'Sudah cukup. Ulangi topik dengan hasil terendah di daftar di atas.';
    else saran.textContent = 'Ulangi topik ini sekali lagi sambil membaca pembahasan tiap soal.';

    tampil('hasil');
  }

  function ulangi() {
    s.topik = 'semua';
    GE.els('[data-topik]', el.topik).forEach(function (x) {
      x.setAttribute('aria-pressed', x.getAttribute('data-topik') === 'semua' ? 'true' : 'false');
    });
    tampil('setup');
    document.getElementById('kuis-setup').scrollIntoView({ block: 'start' });
  }

  document.addEventListener('DOMContentLoaded', function () {
    kumpulkanElemen();
    if (!el.setup) return;

    var q = new URLSearchParams(location.search);
    if (q.get('mode') === 'kilat') s.mode = 'kilat';
    if (q.get('topik')) s.topik = q.get('topik');

    bangunPilihan();
    if (s.topik !== 'semua') {
      GE.els('[data-topik]', el.topik).forEach(function (x) {
        x.setAttribute('aria-pressed', x.getAttribute('data-topik') === s.topik ? 'true' : 'false');
      });
    }

    el.jumlah.addEventListener('change', function () { s.jumlah = el.jumlah.value; });
    el.mulai.addEventListener('click', mulai);
    el.lanjut.addEventListener('click', lanjut);
    document.getElementById('btn-ulangi').addEventListener('click', ulangi);
    document.getElementById('btn-ke-progres').addEventListener('click', function () { location.href = 'progres.html'; });

    var judul = document.getElementById('mode-judul');
    if (judul && s.mode === 'kilat') judul.textContent = 'Kuis kilat: lima soal acak';

    if (s.mode === 'kilat') mulai();
    else tampil('setup');
  });
})();
