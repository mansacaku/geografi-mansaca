<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| Penyaji berkas storage/app/public
|--------------------------------------------------------------------------
| Karena docroot dan folder aplikasi terpisah, symlink `public/storage` bawaan
| Laravel tidak bisa dipakai. Berkas ini menyajikan isi storage/app/public
| (mis. gambar stimulus soal) supaya URL /storage/... tetap bekerja.
|
| Keamanan:
|  - hanya berkas di dalam storage/app/public (path traversal ditolak);
|  - hanya jenis berkas gambar yang dipakai aplikasi;
|  - tidak ada daftar direktori.
*/

$candidates = [
    dirname(__DIR__, 2).'/suksestka-app',
    dirname(__DIR__, 3).'/suksestka-app',
    dirname(__DIR__, 4).'/suksestka-app',
    dirname(__DIR__, 5).'/suksestka-app',
];

$appDir = null;

foreach ($candidates as $candidate) {
    if (is_dir($candidate.'/storage/app/public')) {
        $appDir = $candidate;
        break;
    }
}

$deny = static function (): void {
    http_response_code(404);
    exit('Berkas tidak ditemukan.');
};

if ($appDir === null) {
    $deny();
}

$allowed = [
    'jpg' => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'png' => 'image/png',
    'webp' => 'image/webp',
    'gif' => 'image/gif',
];

$relative = (string) ($_GET['p'] ?? '');
$relative = str_replace('\\', '/', $relative);

// Buang query yang menempel pada path, lalu tolak apa pun yang mencurigakan.
$relative = explode('?', $relative)[0];
$relative = ltrim($relative, '/');

if ($relative === '' || str_contains($relative, '..') || str_contains($relative, "\0")) {
    $deny();
}

$extension = strtolower(pathinfo($relative, PATHINFO_EXTENSION));

if (! isset($allowed[$extension])) {
    $deny();
}

$base = realpath($appDir.'/storage/app/public');

if ($base === false) {
    $deny();
}

$full = realpath($base.'/'.$relative);

if ($full === false || ! str_starts_with($full, $base.DIRECTORY_SEPARATOR) || ! is_file($full)) {
    $deny();
}

header('Content-Type: '.$allowed[$extension]);
header('Content-Length: '.(string) filesize($full));
header('Cache-Control: public, max-age=604800');
header('X-Content-Type-Options: nosniff');

readfile($full);