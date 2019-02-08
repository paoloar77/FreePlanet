module.exports = {
  "globDirectory": "dist/pwa-mat/",
  "globPatterns": [
    "**/*.{css,woff2,woff,svg,html,js,json,ico}"
    // "src/images/*.{jpg,png}"
  ],
  // "swSrc": "dist/pwa-mat/src-sw.js",
  "swDest": "dist/pwa-mat/service-worker.js",
  "globIgnores": [
    "../workbox-config.js",
    "help/**"
  ],
};
