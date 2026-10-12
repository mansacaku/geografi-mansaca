/* Geosfer · service worker
   Halaman: jaringan lebih dulu, cache sebagai cadangan, supaya berkas HTML tidak basi.
   Berkas milik aplikasi: pakai cache dulu, lalu perbarui di latar belakang
   (stale-while-revalidate), supaya perubahan berkas ikut terbawa pada kunjungan berikutnya.
   Berkas luar seperti font dan ikon: cache lebih dulu. */
var CACHE = 'geosfer-app-v3';
var SHELL = [
  './',
  './index.html',
  './modul.html',
  './modul-peta.html',
  './latihan.html',
  './progres.html',
  './glosarium.html',
  './assets/app.css?v=2',
  './assets/app.js?v=2',
  './assets/quiz.js?v=2',
  './assets/map.js?v=2',
  './data/modul.js?v=2',
  './data/soal.js?v=2',
  './data/glosarium.js?v=2',
  './manifest.webmanifest',
  './icon.svg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(SHELL).catch(function () { /* satu berkas gagal, sisanya tetap dipasang */ });
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function simpan(req, res) {
  var copy = res.clone();
  caches.open(CACHE).then(function (c) { c.put(req, copy); }).catch(function () {});
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (res) { simpan(req, res); return res; })
        .catch(function () {
          return caches.match(req).then(function (hit) { return hit || caches.match('./index.html'); });
        })
    );
    return;
  }

  var sendiri = new URL(req.url, location.href).origin === location.origin;

  if (sendiri) {
    /* Berkas aplikasi: pakai cache dulu, perbarui di latar belakang. */
    e.respondWith(
      caches.match(req).then(function (hit) {
        var dariJaringan = fetch(req).then(function (res) {
          if (res && res.status === 200) simpan(req, res);
          return res;
        }).catch(function () { return hit; });
        return hit || dariJaringan;
      })
    );
    return;
  }

  /* Berkas luar: cache lebih dulu, lalu jaringan. */
  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && (res.status === 200 || res.type === 'opaque')) simpan(req, res);
        return res;
      }).catch(function () {
        return new Response('', { status: 504, statusText: 'Offline' });
      });
    })
  );
});
