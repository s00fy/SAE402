// Choose a cache name
const staticCacheName = "site-static-v2";
const dynamicCacheName = "site-dynamic-v1";

// List the files to precache
const assets = [
  "/",
  "/index.html",
  "/assets/Comfortaa.woff2",
  "/assets/Comfortaa.woff",
  "/assets/logo-white-pwa.svg",
  "/assets/editList.js",
  "/assets/offline.js",
  "/assets/favShop.js",
  "/assets/newList.js",
  "/assets/parameters.js",
  "/assets/shop.js",
  "/assets/main.js",
  "/assets/offline.css",
  "/pages/edit/edit.html",
  "/pages/storage/new.html",
  "/pages/parameters/parameters.html",
  "/pages/favShop/favShop.html",
  "/pages/fallback/fallback.html",
  "/pages/shop/shop.html",
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
