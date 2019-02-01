/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

// Questo è il swSrc

console.log('05 ___________________________  PAO: this is my custom service worker');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js'); //++Todo: Replace with local workbox.js
importScripts('js/idb.js');
importScripts('js/utility.js');


if (!workbox) {
  let workbox = new self.WorkboxSW();

}

if (workbox) {
  // const url = new URL(location.href);
  // const debug = url.searchParams.has('debug');
  const debug = false;
  workbox.setConfig({ debug: debug });

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
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  );

  workbox.routing.registerRoute(
    new RegExp(/.*(?:googleapis|gstatic)\.com.*$/),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30,
        }),
      ]
    })
  );

  workbox.routing.registerRoute('http://localhost:3000/todos', function (args) {
    return fetch(args.event.request)
      .then(function (res) {
        var clonedRes = res.clone();
        clearAllData('todos')
          .then(function () {
            return clonedRes.json();
          })
          .then(function (data) {
            for (let key in data) {
              writeData('todos', data[key])
            }
          });
        return res;
      });
  });


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

  // workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

  workbox.routing.registerRoute(
    new RegExp('http://localhost:8080/todos'),
    function (args) {
      return fetch(args.event.request)
        .then(function (res) {
          console.log('*******  fetch: ', args.event)
          var clonedRes = res.clone();
          clearAllData('todos')
            .then(function () {
              return clonedRes.json();
            })
            .then(function (data) {
              for (let key in data) {
                writeData('todos', data[key])
              }
            });
          return res
        })
    }
  );

}

if ('serviceWorker' in navigator) {

  console.log('*****************      Entering in custom-service-worker.js:')

}

  // self.addEventListener('fetch', function (event) {
  //   console.log('[Service Worker] Fetching something ....', event);
  //   console.log('event.request.cache=', event.request.cache)
  //   if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
  //     console.log('SAME ORIGIN!', event);
  //     return;
  //   }
  //   event.respondWith(caches.match(event.request));
  // });


  self.addEventListener('sync', function (event) {
    console.log('[Service Worker] Background syncing', event);

    if (event.tag === 'sync-new-todos') {
      console.log('[Service Worker] Syncing new Todos');

      let authHeader = []
      authHeader['content-type'] = 'application/json';
      authHeader['accept-language'] = 'en';
      // authHeader.append('x-auth', mytok)

      event.waitUntil(
        readAllData('sync_todos')
          .then(function (data) {
            for (var dt of data) {
              // var postData = new FormData();
              // postData.append('_id', dt._id);
              // postData.append('title', dt.title);
              // postData.append('location', dt.location);
              // postData.append('rawLocationLat', dt.rawLocation.lat);
              // postData.append('rawLocationLng', dt.rawLocation.lng);
              // postData.append('file', dt.picture, dt._id + '.png');

              console.log('Data to Send 6: ', JSON.stringify(dt))

              // Update myTodo to the server
              fetch('http://localhost:3000/todos', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                // mode: 'no-cors',
                mode: 'cors',
                body: JSON.stringify(dt)
              })
                .then(function (resData) {
                  console.log('Sent data Todo:', resData);
                  if (resData.ok) {
                      deleteItemFromData('sync_todos', dt.id);
                  }
                })
                .catch(function (err) {
                  console.log('Error while sending data', err);
                });
            }

          })
      );
    }
  });

// }

