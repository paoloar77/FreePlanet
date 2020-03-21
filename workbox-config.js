module.exports = {
  "globDirectory": "dist/pwa/",
  "globPatterns": [
    "**/*.{css,woff2,woff,svg,html,js,json,ico}"
    // "src/images/*.{jpg,png}"
  ],
  // "swSrc": "dist/pwa/src-sw.js",
  "swDest": "dist/pwa/service-worker.js",
  "globIgnores": [
    "../workbox-config.js",
    "help/**"
  ],
};
