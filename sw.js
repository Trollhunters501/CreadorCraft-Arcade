var cacheName = "CreatorCraftofflinemodeV1";
var appShellFiles = [
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg8yKamH4WD_Wdnpz956yZ_Dg8EWDqWynVakkDRTgPlm8wrN9sJMsSoMlRn-o_Jfw6OWu7F7E9lkDewNNs-XhLZvhm_v_0RNGEAudTtgqT-ImDVx7K9d2UYRZZUlvA40MHQ47kjG-CAvNo4m6tnkZHvu3RilSZkup2g3RG7ZBNPTi_yBTvdi7MuL7StDw/s2592/png_20230217_225412_0000.png",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiqq-PoB32oOZJbDxL5JQ6GyIAw-c4RPvG5mNLIVP4RYZ3o5j8ewh4H3RqR6nEDAedJZ8tBKxlKco15ylliuiiuhyHZjdlzhGlLRZmkWzUHfTKpdxMwtNFouAEnm1ltL-JBD4qGLc52sDqY0wh9r4h1hEjxLsk1i-nFbF2iDswpQNJmwIBBxnDPhQbOiw/s428/20230307_204139_0000.png",
  "https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js",
  "https://github.com/Trollhunters501/CreadorCraft-Arcade/raw/main/music/Warning.ogg",
  "https://creadorcraftcp.blogspot.com/"
];
var contentToCache = appShellFiles.concat(cacheName);
// This code executes in its own worker or thread
self.addEventListener("install", event => {
   console.log("Service worker installed");
   e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log(
        "[Servicio Worker] Offline mode was stored"
      );
      return cache.addAll(contentToCache);
});
self.addEventListener("activate", event => {
   console.log("Service worker activated");
   
   event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
});
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      console.log("[Servicio Worker] Getting Resource: " + e.request.url);
      return (
        r ||
        fetch(e.request).then((response) => {
          return caches.open(cacheName).then((cache) => {
            console.log(
              "[Servicio Worker] Store the New Resource: " + e.request.url
            );
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});