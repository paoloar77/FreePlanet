/*
 * This file is picked up by the build system only
 * when building for PRODUCTION
 */

import {register} from 'register-service-worker'

register(process.env.SERVICE_WORKER_FILE, {
    ready() {
      console.log('READY::: App is being served from cache by a service worker.')

    },
    registered(registration) { // registration -> a ServiceWorkerRegistration instance
      console.log('REGISTERED::: !!!', process.env.SERVICE_WORKER_FILE)

    },
    cached(registration) {
      console.log('CACHED::: Content has been cached for offline use.')
    },
    updatefound(registration) {
      console.log('UPDATEFOUND::: New content is downloading.')
    },
    updated(registration) {
      console.log('New content is available; please refresh.')
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error(err) {
      console.error('Error during service worker registration:', err)
    },
  }
);

// ServiceWorkerRegistration: https://developer.mozilla.org/en-uk/docs/Web/API/ServiceWorkerRegistration




//    "build": "quasar build -m pwa && workbox generateSW workbox-config.js",
