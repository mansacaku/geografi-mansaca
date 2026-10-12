/* Geosfer · inti aplikasi
   Dipakai semua halaman: navigasi aktif, pemasangan PWA, banner offline, penyimpanan, toast, dialog.
   Tanpa dependensi. Semua fungsi global di bawah satu namespace GE. */
(function () {
  'use strict';

  var STORE_KEY = 'geosfer.progres.v1';

  var GE = window.GE = {
    /* ---------- penyimpanan ---------- */
    baca: function () {
      try {
        var raw = localStorage.getItem(STORE_KEY);
        if (!raw) return { riwayat: [], kompetensi: {}, terakhir: null };
        var data = JSON.parse(raw);
        return {
          riwayat: Array.isArray(data.riwayat) ? data.riwayat : [],
          kompetensi: data.kompetensi && typeof data.kompetensi === 'object' ? data.kompetensi : {},
          terakhir: data.terakhir || null
        };
      } catch (e) {
        return { riwayat: [], kompetensi: {}, terakhir: null };
      }
    },
    simpan: function (data) {
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(data));
        return true;
      } catch (e) {
        GE.pesan('Penyimpanan perangkat penuh, hasil tidak tersimpan.');
        return false;
      }
    },
    catatHasil: function (hasil) {
      /* hasil: {kompetensi: {nama: {benar, total}}, benar, total, mode} */
      var data = GE.baca();
      var ts = new Date().toISOString();
      data.riwayat.unshift({
        ts: ts, benar: hasil.benar, total: hasil.total, mode: hasil.mode || 'latihan'
      });
      data.riwayat = data.riwayat.slice(0, 40);
      Object.keys(hasil.kompetensi).forEach(function (nama) {
        var lama = data.kompetensi[nama] || { benar: 0, total: 0 };
        data.kompetensi[nama] = {
          benar: lama.benar + hasil.kompetensi[nama].benar,
          total: lama.total + hasil.kompetensi[nama].total
        };
      });
      data.terakhir = ts;
      GE.simpan(data);
      return data;
    },
    hapusProgres: function () {
      try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    },

    /* ---------- pembantu tampilan ---------- */
    el: function (sel, akar) { return (akar || document).querySelector(sel); },
    els: function (sel, akar) { return Array.prototype.slice.call((akar || document).querySelectorAll(sel)); },
    angka: function (n, d) { return Number(n).toFixed(d === undefined ? 0 : d); },
    persen: function (benar, total) { return total ? Math.round((benar / total) * 100) : 0; },
    tanggal: function (iso) {
      try {
        return new Date(iso).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      } catch (e) { return iso; }
    },
    acak: function (arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    },
    /* Menandai tab dan tautan yang sedang aktif, dari nama berkas. */
    tandaiNavigasi: function () {
      var berkas = location.pathname.split('/').pop() || 'index.html';
      var grup = {
        'index.html': 'beranda',
        'modul.html': 'modul',
        'modul-peta.html': 'modul',
        'latihan.html': 'latihan',
        'progres.html': 'progres',
        'glosarium.html': 'glosarium'
      };
      var aktif = grup[berkas] || 'beranda';
      GE.els('[data-nav]').forEach(function (a) {
        if (a.getAttribute('data-nav') === aktif) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });
    },
    pesan: function (teks, ms) {
      var t = GE.el('#toast');
      if (!t) return;
      t.textContent = teks;
      t.hidden = false;
      clearTimeout(GE._toastTimer);
      GE._toastTimer = setTimeout(function () { t.hidden = true; }, ms || 2600);
    },
    muat: function (sel, tampil) {
      var n = GE.el(sel);
      if (n) n.hidden = !tampil;
    }
  };

  /* ---------- banner offline ---------- */
  function bannerOffline() {
    var b = GE.el('#banner-offline');
    if (!b) return;
    /* Peristiwa online/offline adalah sumber kebenaran, karena sebagian peramban
       melaporkan navigator.onLine secara tidak konsisten. */
    function perbarui(paksa) {
      var offline = (paksa === true) ? true : (paksa === false ? false : !navigator.onLine);
      b.hidden = !offline;
    }
    window.addEventListener('offline', function () { perbarui(true); });
    window.addEventListener('online', function () { perbarui(false); });
    perbarui();
    GE._bannerOffline = perbarui;
  }

  /* ---------- pemasangan PWA ---------- */
  function siapkanPasang() {
    var btn = GE.el('#install'), hint = GE.el('#install-hint'), deferred = null;
    window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; });
    if (!btn) return;
    btn.addEventListener('click', function () {
      if (deferred) {
        deferred.prompt();
        deferred.userChoice.then(function () { deferred = null; });
        return;
      }
      if (hint) hint.hidden = !hint.hidden;
    });
    window.addEventListener('appinstalled', function () { GE.pesan('Geosfer sudah dipasang di perangkat ini.'); });
  }

  /* ---------- service worker ---------- */
  function daftarSW() {
    if (!('serviceWorker' in navigator)) return;
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* mode berkas lokal: diabaikan */ });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    GE.tandaiNavigasi();
    bannerOffline();
    siapkanPasang();
    daftarSW();
  });
})();
