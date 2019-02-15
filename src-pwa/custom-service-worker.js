/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

// Questo è il swSrc

console.log('   [  VER-0.0.27 ] _---------________------  PAO: this is my custom service worker');

importScripts('../statics/js/idb.js');
importScripts('../statics/js/storage.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js'); //++Todo: Replace with local workbox.js


let port = 3000;
if (self.location.hostname === 'test.freeplanet.app') {
  port = 3001;
}
// console.log('SW-06 1');
const cfgenv = {
  serverweb: self.location.protocol + "//" + self.location.hostname + ':' + port,
  dbname: 'mydb3',
  dbversion: 11,
}

// console.log('serverweb', cfgenv.serverweb)


async function writeData(table, data) {
  // console.log('writeData', table, data);
  await idbKeyval.setdata(table, data);
}

async function readAllData(table) {
  // console.log('readAllData', table);
  return await idbKeyval.getalldata(table);
}

async function clearAllData(table) {
  // console.log('clearAllData', table);
  await idbKeyval.clearalldata(table)
}

async function deleteItemFromData(table, id) {
  // console.log('deleteItemFromData', table, 'ID:', id);

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
  // console.log('WORKBOX PRESENT')
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

  // console.log('  routing.registerRoute function declaration:')

  workbox.routing.registerRoute(
    new RegExp(cfgenv.serverweb + '/todos/'),
    function (args) {
      console.log('registerRoute! ', cfgenv.serverweb + '/todos/')
      // console.log('DATABODY:', args.event.request.body)
      let myres = null
      // return fetch(args.event.request, args.event.headers)
      return fetch(args.event.request, args.event.headers)
        .then(function (res) {
          myres = res
          // console.log('1° *******  [[[ SERVICE-WORKER ]]] registerRoute fetch: -> ', args.event.request, res)
          // LOAD FROM SERVER , AND SAVE INTO INDEXEDDB
          // console.log('res.status', res.status)
          if (res.status === 200) {
            const clonedRes = res.clone();

            return clearAllData('todos')
              .then(() => {
                return clonedRes
              })
          }
        })
        .then((clonedRes) => {
          if (clonedRes !== undefined)
            return clonedRes.json();
          return null
        })
        .then(async data => {
          if (data) {
            if (data.todos) {
              console.log('***********************+++++++++++++++++++++++++++++++++++++++++++++++++++**********    Records TODOS Received from Server [', data.todos.length, 'record]', data.todos)
              for (let key in data.todos) {
                await writeData('todos', data.todos[key])
              }
            }
          }
        })
        .then(() => {
          return myres
        })
        .catch(err => {
          console.log('ERROR registerRoute FETCH:', err)
          return myres
        })
    })


  workbox.routing.registerRoute(function (routeData) {
    return (routeData.event.request.headers.get('accept').includes('text/html'));
  }, function (args) {
    return caches.match(args.event.request)
      .then(function (response) {
        if (response) {
          return response;
        } else {
          return fetch(args.event.request)
            .then(function (res) {
              return caches.open('dynamic')
                .then(function (cache) {
                  cache.put(args.event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function (err) {
              return caches.match('/offline')
                .then(function (res) {
                  return res;
                });
            });
        }
      })
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


  workbox.routing.registerRoute(
    new RegExp('/admin/'),
    workbox.strategies.networkOnly()
  );


}

if ('serviceWorker' in navigator) {

  // console.log('*****************      Entering in custom-service-worker.js:')

}


// self.addEventListener('fetch', (event) => {
//   if (event.request.url === '/') {
//     const staleWhileRevalidate = new workbox.strategies.StaleWhileRevalidate();
//     event.respondWith(staleWhileRevalidate.handle({ event }));
//   }
// });

// self.addEventListener('fetch', function (event) {
//   console.log('[Service Worker] Fetching something ....', event);
//   console.log('event.request.cache=', event.request.cache)
//   if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
//     console.log('SAME ORIGIN!', event);
//     return;
//   }
//   event.respondWith(caches.match(event.request));
// });
//

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

// addEventListener('fetch', event => {
//   // Prevent the default, and handle the request ourselves.
//   event.respondWith(async function() {
//     // Try to get the response from a cache.
//     const cachedResponse = await caches.match(event.request);
//     // Return it if we found one.
//     if (cachedResponse && (event.request.cache !== 'no-cache'))
//       return cachedResponse;
//
//     // If we didn't find a match in the cache, use the network.
//     return fetch(event.request);
//   }());
// });

// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       return response ||
//         fetch(event.request, event.headers)
//           .catch(err => {
//             console.log('_______________________ ERRORE FETCH SW: ', event.request, err)
//             writeData('config', { _id: 2, stateconn: 'offline' })
//             return caches.match(event.request);
//           })
//     })
//   );
// });


// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     fetch(event.request, event.headers)
//       .catch(err => {
//         console.log('_______________________ ERRORE FETCH SW: ', event.request, err)
//         writeData('config', {_id: 2, stateconn: 'offline'})
//         return caches.match(event.request);
//       })
//   );
// });


// self.addEventListener('sync', function (event) {
//   console.log('[Service Worker V5] Background syncing', event.tag);
//
//   let mystrparam = event.tag
//   let multiparams = mystrparam.split('|')
//   if (multiparams) {
//     if (multiparams.length > 3) {
//       let cmd = multiparams[0]
//       let table = multiparams[1]
//       let method = multiparams[2]
//       let token = multiparams[3]
//       // let lang = multiparams[3]
//
//       if (cmd === 'sync-todos') {
//         console.log('[Service Worker] Syncing', cmd, table, method);
//
//         const headers = new Headers()
//         headers.append('content-Type', 'application/json')
//         headers.append('Accept', 'application/json')
//         headers.append('x-auth', token)
//
//
//         // console.log('A1) INIZIO.............................................................');
//
//         event.waitUntil(
//           readAllData(table)
//             .then(function (alldata) {
//               const myrecs = [...alldata]
//               console.log('----------------------- LEGGO QUALCOSA DAL WAITUNTIL ')
//               let errorfromserver = false
//               if (myrecs) {
//                 for (let rec of myrecs) {
//                   //console.log('syncing', table, '', rec.descr)
//                   let link = cfgenv.serverweb + '/todos'
//
//                   if (method !== 'POST')
//                     link += '/' + rec._id
//
//                   console.log('++++++++++++++++++ SYNCING !!!!  ', rec.descr, table, 'FETCH: ', method, link, 'data:')
//
//                   // console.log('DATATOSAVE:', JSON.stringify(rec))
//
//                   // Insert/Delete/Update table to the server
//                   fetch(link, {
//                     method: method,
//                     headers: headers,
//                     cache: 'no-cache',
//                     mode: 'cors',   // 'no-cors',
//                     body: JSON.stringify(rec)
//                   })
//                     .then(() => {
//                       deleteItemFromData(table, rec._id)
//                     })
//                     .then(() => {
//                       deleteItemFromData('swmsg', mystrparam)
//                     })
//                     .catch(function (err) {
//                       console.log('!!!!!!!!!!!!!!!   Error while sending data', err, err.message);
//                       if (err.message === 'Failed to fetch') {
//                         errorfromserver = true
//                       }
//                     })
//                 }
//                 return errorfromserver
//               }
//             })
//             .then((errorfromserver) => {
//               const mystate = !errorfromserver ? 'online' : 'offline'
//               writeData('config', { _id: 2, stateconn: mystate })
//             })
//         );
//         // console.log('A2) ?????????????????????????? ESCO DAL LOOP !!!!!!!!! err=')
//       }
//     }
//   }
// })
// ;


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

self.addEventListener('notificationclick', function (event) {
  var notification = event.notification;
  var action = event.action;

  console.log(notification);

  if (action === 'confirm') {
    console.log('Confirm was chosen');
    notification.close();
  } else {
    console.log(action);
    event.waitUntil(
      clients.matchAll()
        .then(function (clis) {
          var client = clis.find(function (c) {
            return c.visibilityState === 'visible';
          });

          if (client !== undefined) {
            client.navigate(notification.data.url);
            client.focus();
          } else {
            clients.openWindow(notification.data.url);
          }
          notification.close();
        })
    );
  }
});

self.addEventListener('notificationclose', function (event) {
  console.log('Notification was closed', event);
});

self.addEventListener('push', function (event) {
  console.log('Push Notification received', event);

  var data = { title: 'New!', content: 'Something new happened!', url: '/' };

  try {

    if (event.data) {
      try {
        data = JSON.parse(event.data.text());
      } catch (e) {
        data = event.data.text();
      }
    }

    var options = {
      body: data.content,
      icon: '/statics/icons/android-chrome-192x192.png',
      badge: '/statics/icons/android-chrome-192x192.png',
      data: {
        url: data.url
      },
      tag: 'received',
      renitify: true, // vibrate also with others messages.
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  } catch (e) {
    console.log('Error on event push:', e)
  }
});

