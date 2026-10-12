<?php

declare(strict_types=1);

define('LARAVEL_START', microtime(true));

/*
|--------------------------------------------------------------------------
| Entry point SuksesTKA (subfolder)
|--------------------------------------------------------------------------
| Kode Laravel sengaja berada DI LUAR docroot. Entry point ini mencari folder
| `suksestka-app` pada beberapa level parent sehingga tidak perlu disunting
| walau kedalaman docroot berbeda-beda.
*/

$candidates = [
    dirname(__DIR__, 2).'/suksestka-app',
    dirname(__DIR__, 3).'/suksestka-app',
    dirname(__DIR__, 4).'/suksestka-app',
    dirname(__DIR__, 5).'/suksestka-app',
];

$appDir = null;

foreach ($candidates as $candidate) {
    if (is_file($candidate.'/vendor/autoload.php') && is_file($candidate.'/bootstrap/app.php')) {
        $appDir = $candidate;
        break;
    }
}

if ($appDir === null) {
    http_response_code(500);
    exit('SuksesTKA app tidak ditemukan. Pastikan folder suksestka-app berada di luar docroot dan vendor/ tersedia.');
}

if (file_exists($maintenance = $appDir.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

require $appDir.'/vendor/autoload.php';

$app = require_once $appDir.'/bootstrap/app.php';
$app->handleRequest(Illuminate\Http\Request::capture());