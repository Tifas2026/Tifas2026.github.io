/* Offline-Cache mit automatischer Aktualisierung.
   Die Seite selbst wird immer zuerst vom Server geholt (bei Netz) und nur als
   Rueckfall aus dem Cache bedient. Neue Versionen erscheinen damit beim naechsten
   Start, ohne dass jemand Cache leeren oder einen neuen Link oeffnen muss.
   Bei Aenderungen an den Dateien die Version hochzaehlen. */
const CACHE = "abnahme-v11";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", e => {
  if (e.data === "skipWaiting") self.skipWaiting();
});

function istSeite(req) {
  return req.mode === "navigate" || (req.headers.get("accept") || "").indexOf("text/html") !== -1;
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  /* Die App-Seite: erst Netz, dann Cache */
  if (istSeite(req)) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put("./index.html", copy)).catch(() => {});
        return res;
      }).catch(() =>
        caches.match("./index.html", { ignoreSearch: true })
          .then(hit => hit || caches.match("./", { ignoreSearch: true }))
      )
    );
    return;
  }

  /* Alles andere: erst Cache, dann Netz */
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
      return res;
    }))
  );
});
