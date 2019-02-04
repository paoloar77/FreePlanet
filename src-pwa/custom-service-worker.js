/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

// Questo è il swSrc

console.log('05 ___________________________  PAO: this is my custom service worker');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js'); //++Todo: Replace with local workbox.js
importScripts('../statics/js/idb.js');
importScripts('js/globalenv.js');
// importScripts('js/utility.js');

importScripts('../statics/js/storage.js');

const cfgenv = {
  website: 'http://localhost:8080',
  serverweb: 'http://localhost:3000',
  dbname: 'mydb3',
  dbversion: 11,
}

async function writeData(table, data) {
  console.log('writeData', table, data);
  await idbKeyval.setdata(table, data);
}

async function readAllData(table) {
  console.log('readAllData', table);
  return await idbKeyval.getalldata(table);
}

async function clearAllData(table) {
  console.log('clearAllData', table);
  await idbKeyval.clearalldata(table)
}

async function deleteItemFromData(table, id) {
  console.log('deleteItemFromData', table, 'ID:', id);

  await idbKeyval.deletedata(table, id)
}



// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     // createDB()
//   );
// });

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
    new RegExp(/\.(?:png|gif|jpg|jpeg|svg)$/),
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


  workbox.routing.registerRoute(
    new RegExp(cfgenv.serverweb + '/todos/'),
    function (args) {
      return fetch(args.event.request, args.event.headers)
        .then(function (res) {
          // console.log('1° *******  registerRoute fetch: ', args.event)
          // LOAD FROM SERVER , AND SAVE INTO INDEXEDDB
          var clonedRes = res.clone();
          clearAllData('todos')
            .then(function () {
              return clonedRes.json();
            })
            .then(function (data) {
              console.log('Records TODOS Received from Server [', data.todos.length, 'record]', data.todos)
              for (let key in data.todos) {
                writeData('todos', data.todos[key])
              }
            });
          return res
        })
    }
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


// const syncStore = {}
// self.addEventListener('message', event => {
//   if (event.data.type === 'sync') {
//     // get a unique id to save the data
//     const id = uuid()
//     syncStore[id] = event.data
//     // register a sync and pass the id as tag for it to get the data
//     self.registration.sync.register(id)
//   }
//   console.log(event.data)
// })

self.addEventListener('sync', function (event) {
  console.log('[Service Worker V5] Background syncing', event.tag);

  let mystrparam = event.tag
  let multiparams = mystrparam.split('|')
  if (multiparams) {
    if (multiparams.length > 3) {
      let cmd = multiparams[0]
      let table = multiparams[1]
      let method = multiparams[2]
      let token = multiparams[3]
      // let lang = multiparams[3]

      if (cmd === 'sync-todos') {
        console.log('[Service Worker] Syncing', cmd, table, method);

        const headers = new Headers()
        headers.append('content-Type', 'application/json')
        headers.append('Accept', 'application/json')
        headers.append('x-auth', token)

        console.log('A1) INIZIO.............................................................');

        event.waitUntil(
          readAllData(table)
            .then(function (alldata) {
              const myrecs = [...alldata]
              console.log('----------------------- LEGGO QUALCOSA DAL WAITUNTIL ')
              if (myrecs) {
                for (let rec of myrecs) {
                  //console.log('syncing', table, '', rec.descr)
                  let link = cfgenv.serverweb + '/todos/' + rec._id
                  console.log('++++++++++++++++++ SYNCING !!!!  ', rec.descr, table, 'FETCH: ', method, link, 'data:')

                  // Insert/Delete/Update table to the server
                  fetch(link, {
                    method: method,
                    headers: headers,
                    mode: 'cors',   // 'no-cors',
                    body: JSON.stringify(rec)
                  })
                    .then(function (resData) {
                      console.log('Result CALL ', method, ' OK? =', resData.ok);
                      if (resData.ok) {
                        deleteItemFromData(table, rec._id);
                      }

                      console.log('DELETE: ', mystrparam)
                      deleteItemFromData('swmsg', mystrparam)

                    })
                    .catch(function (err) {
                      console.log('!!!!!!!!!!!!!!!   Error while sending data', err);
                    });
                }
              }
            })
        );
        console.log('A2) ?????????????????????????? ESCO DAL LOOP !!!!!!!!! err=')
      }
    }
  }
})
;


/*

// send message to serviceWorker
function sync (url, options) {
  navigator.serviceWorker.controller.postMessage({type: 'sync', url, options})
}


const syncStore = {}
self.addEventListener('message', event => {
  if(event.data.type === 'sync') {
    // get a unique id to save the data
    const id = uuid()
    syncStore[id] = event.data
    // register a sync and pass the id as tag for it to get the data
    self.registration.sync.register(id)
  }
  console.log(event.data)
})


self.addEventListener('sync', event => {
  // get the data by tag
  const {url, options} = syncStore[event.tag]
  event.waitUntil(fetch(url, options))
})
*/
