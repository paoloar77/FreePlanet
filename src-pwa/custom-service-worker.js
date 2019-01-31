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
  workbox.core.setCacheNameDetails({prefix: "freeplanet"});

  /**
   * The workboxSW.precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  self.__precacheManifest = [].concat(self.__precacheManifest || []);
  workbox.precaching.suppressWarnings();
  workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

  workbox.routing.registerRoute(/^http/, workbox.strategies.networkFirst(), 'GET');

}

if ('serviceWorker' in navigator) {

  console.log('*****************      Entering in custom-service-worker.js:')

  self.addEventListener('fetch', function (event) {
    console.log('[Service Worker] Fetching something ....', event);
    console.log('event.request.cache=', event.request.cache)
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
      console.log('SAME ORIGIN!', event);
      return;
    }
    event.respondWith(fetch(event.request));
  });

}

