/* Geosfer · peta skematis persebaran
   Peta ini skematis, tidak berskala. Tujuannya menunjukkan urutan wilayah biogeografi
   dan letak garis pemisah, bukan bentuk pulau yang presisi.
   Interaksi: ketuk wilayah untuk keterangan, nyalakan atau matikan garis pemisah. */
(function () {
  'use strict';

  var WILAYAH = {
    oriental: {
      nama: 'Wilayah Oriental',
      pulau: 'Sumatra, Jawa, Kalimantan, dan Bali',
      ciri: 'Fauna bertipe Asia. Mamalia besar, primata, dan burung berwarna kurang mencolok.',
      contoh: 'Harimau sumatra, gajah, badak jawa, orang utan, merak.',
      flora: 'Hutan hujan tropis dengan pohon meranti dan keruing.'
    },
    peralihan: {
      nama: 'Wilayah Peralihan (Wallacea)',
      pulau: 'Sulawesi, Nusa Tenggara, dan Maluku',
      ciri: 'Fauna endemik bertipe campuran Asia dan Australia, jumlah jenis mamalia besar sedikit.',
      contoh: 'Anoa, babi rusa, tarsius, komodo, maleo.',
      flora: 'Hutan monsun dan savana, banyak jenis endemik.'
    },
    australis: {
      nama: 'Wilayah Australis',
      pulau: 'Papua dan pulau-pulau di sekitarnya',
      ciri: 'Fauna bertipe Australia. Mamalia berkantung dan burung berwarna cerah.',
      contoh: 'Kanguru pohon, kuskus, cenderawasih, kasuari.',
      flora: 'Hutan hujan tropis dengan banyak jenis tumbuhan berkayu keras.'
    }
  };

  var el = {};

  function pilihWilayah(kunci) {
    var w = WILAYAH[kunci];
    if (!w) return;
    el.panel.hidden = false;
    el.panelNama.textContent = w.nama;
    el.panelPulau.textContent = w.pulau;
    el.panelCiri.textContent = w.ciri;
    el.panelContoh.textContent = w.contoh;
    el.panelFlora.textContent = w.flora;
    GE.els('.zone', el.svg).forEach(function (g) {
      var aktif = g.getAttribute('data-zone') === kunci;
      g.setAttribute('data-pilih', aktif ? 'true' : 'false');
    });
  }

  function pasangTombol(kunci) {
    var tombol = GE.el('[data-toggle="' + kunci + '"]');
    if (!tombol) return;
    tombol.addEventListener('click', function () {
      var nyala = tombol.getAttribute('aria-pressed') === 'true';
      tombol.setAttribute('aria-pressed', nyala ? 'false' : 'true');
      if (kunci === 'wallace' || kunci === 'weber') {
        var garis = GE.el('[data-garis="' + kunci + '"]', el.svg);
        if (garis) garis.style.display = nyala ? 'none' : '';
      } else {
        var zona = GE.el('[data-zone="' + kunci + '"]', el.svg);
        if (zona) zona.setAttribute('data-on', nyala ? 'false' : 'true');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    el.svg = document.getElementById('peta');
    if (!el.svg) return;
    el.panel = document.getElementById('peta-panel');
    el.panelNama = document.getElementById('peta-nama');
    el.panelPulau = document.getElementById('peta-pulau');
    el.panelCiri = document.getElementById('peta-ciri');
    el.panelContoh = document.getElementById('peta-contoh');
    el.panelFlora = document.getElementById('peta-flora');

    GE.els('.zone', el.svg).forEach(function (g) {
      g.addEventListener('click', function () { pilihWilayah(g.getAttribute('data-zone')); });
      g.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pilihWilayah(g.getAttribute('data-zone')); }
      });
    });

    ['oriental', 'peralihan', 'australis', 'wallace', 'weber'].forEach(pasangTombol);
    pilihWilayah('oriental');

    var lanjut = document.getElementById('peta-ke-latihan');
    if (lanjut) {
      lanjut.addEventListener('click', function () {
        location.href = 'latihan.html?topik=' + encodeURIComponent('Persebaran Flora dan Fauna');
      });
    }
  });
})();
