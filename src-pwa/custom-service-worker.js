/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

// Questo è il swSrc

console.log('___________________________  PAO: this is my custom service worker');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

if (!workbox) {
  workbox = new self.WorkboxSW();
}

if (workbox) {
  workbox.core.setCacheNameDetails({ prefix: "freeplanet" });

  /**
   * The workboxSW.precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  self.__precacheManifest = [].concat(self.__precacheManifest || []);
  workbox.precaching.suppressWarnings();
  workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

  // workbox.routing.registerRoute(/^http/, workbox.strategies.networkFirst(), 'GET');

  workbox.routing.registerRoute(
    new RegExp(/.*(?:googleapis|gstatic)\.com.*$/),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts',
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ]
    })
  );

  workbox.routing.registerRoute(
    new RegExp(/.*\/(?:statics\/icons).*$/),
    workbox.strategies.cacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ]
    })
  );

  workbox.routing.registerRoute(
    new RegExp(/.*\/(?:css|font).*/),
    workbox.strategies.cacheFirst({
      cacheName: 'css-fonts',
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ]
    })
  );


  workbox.routing.registerRoute(
    new RegExp('https://cdnjs.coudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'material-css',
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ]
    })
  );

// Storage
  workbox.routing.registerRoute(
    new RegExp(/.*(?:storage\.freeplanet)\.app.*$/),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'storage',
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 30 * 24 * 60 * 60,
          // Only cache 10 requests.
          maxEntries: 200,
        }),
      ]
    })
  );

  workbox.routing.registerRoute(
    new RegExp(/.*\/(?:statics).*$/),
    workbox.strategies.cacheFirst({
      cacheName: 'statics',
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 10 * 24 * 60 * 60,
          // Only cache 10 requests.
        }),
      ]
    })
  );

  workbox.routing.registerRoute(
    new RegExp(/^http/),
    workbox.strategies.networkFirst({
      cacheName: 'all-stuff',
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 10 * 24 * 60 * 60,
          // Only cache 10 requests.
        }),
      ]
    })
  );

}

if ('serviceWorker' in navigator) {

  console.log('*****************      Entering in custom-service-worker.js:')

  // self.addEventListener('fetch', function (event) {
  //   console.log('[Service Worker] Fetching something ....', event);
  //   console.log('event.request.cache=', event.request.cache)
  //   if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
  //     console.log('SAME ORIGIN!', event);
  //     return;
  //   }
  //   event.respondWith(fetch(event.request));
  // });

}

