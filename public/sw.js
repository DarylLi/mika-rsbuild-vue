importScripts('https://cdn.jsdelivr.net/npm/workbox-sw@5.1.2/build/workbox-sw.min.js');

if (workbox) {
  workbox.setConfig({
    debug: false,
    modulePathCb(name, debug) {
      const env = debug ? 'dev' : 'prod';
      return `https://cdn.jsdelivr.net/npm/${name}@5.1.2/build/${name}.${env}.js`;
    },
  });
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();
  var maxAge = 7 * 24 * 60 * 60;
  var maxSize = 1000;
  var registerRoute = workbox.routing.registerRoute;
  var CacheFirst = workbox.strategies.CacheFirst;
  var ExpirationPlugin = workbox.expiration.ExpirationPlugin;

  var statciReg = /index.html|\/static\/(js|fonts|img|css)/;
  var noNeedMatch = /(sw\.js)|(workbox\-sw\.js)/;
  
  registerRoute(
    function({ request }) {
      var url = request && request.url || '';
      return statciReg.test(url) && !noNeedMatch.test(url);
    },
    new CacheFirst({
      cacheName: 'circle-static',
      plugins: [
        new ExpirationPlugin({
          maxEntries: maxSize,
          maxAgeSeconds: maxAge,
          purgeOnQuotaError: true,
        })
      ],
    }),
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
