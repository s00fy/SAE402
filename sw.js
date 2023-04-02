// Choose a cache name
const staticCacheName = "site-static-v2";
const dynamicCacheName = "site-dynamic-v1";

// List the files to precache
const assets = [
  "/",
  "/index.html",
  "/main.js",
  "/src/js/autorisations.js",
  "/src/js/edit.js",
  "/src/js/favShop.js",
  "/src/js/list.js",
  "/src/js/localisation.js",
  "/src/js/storage.js",
  "/src/fonts/Comfortaa.woff",
  "/src/fonts/Comfortaa.woff2",
  "/pages/fallback/fallback.html",
  "/pages/edit/edit.html",
];

// install event
self.addEventListener("install", (evt) => {
  console.log("service worker installed");
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (evt) => {
  console.log("service worker activated");
  evt.waitUntil(
    caches.keys().then((keys) => {
      //console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (evt) => {
  // check if request is made by chrome extensions or web page
  // if request is made for web page url must contains http.
  if (!(evt.request.url.indexOf("http") === 0)) return; // skip the request. if request is not made with http protocol

  evt.respondWith(
    caches
      .match(evt.request)
      .then(
        (cacheRes) =>
          cacheRes ||
          fetch(evt.request).then((fetchRes) =>
            caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              // check cached items size
              limitCacheSize(dynamicCacheName, 75);
              return fetchRes;
            })
          )
      )
      .catch(() => caches.match("/fallback.html"))
  );
});

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};
