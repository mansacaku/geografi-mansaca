/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "d710da85ce6ae1f29a6ab511fb969fe0"
  }, {
    "url": "pwa-512x512.png",
    "revision": "d710da85ce6ae1f29a6ab511fb969fe0"
  }, {
    "url": "pwa-192x192.png",
    "revision": "4b8ff2b9fb003d6f68f8a511a7445a9a"
  }, {
    "url": "index.html",
    "revision": "eb71e1b9ef1d95eff41eebb4c484af4d"
  }, {
    "url": "icon.svg",
    "revision": "9211cc3913d2e537fcfe02e8122207cb"
  }, {
    "url": "favicon.svg",
    "revision": "9211cc3913d2e537fcfe02e8122207cb"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "7d61e64ba0a70bbfd726f81b7c743fe3"
  }, {
    "url": "assets/index-DgnV0mEW.css",
    "revision": null
  }, {
    "url": "assets/index-BJjiFWGd.js",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "7d61e64ba0a70bbfd726f81b7c743fe3"
  }, {
    "url": "favicon.svg",
    "revision": "9211cc3913d2e537fcfe02e8122207cb"
  }, {
    "url": "pwa-192x192.png",
    "revision": "4b8ff2b9fb003d6f68f8a511a7445a9a"
  }, {
    "url": "pwa-512x512.png",
    "revision": "d710da85ce6ae1f29a6ab511fb969fe0"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "d710da85ce6ae1f29a6ab511fb969fe0"
  }, {
    "url": "manifest.webmanifest",
    "revision": "72e1bac39501fccb896d4ab907b0c711"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/.*\.basemaps\.cartocdn\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "carto-tiles-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 400,
      maxAgeSeconds: 2592000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
