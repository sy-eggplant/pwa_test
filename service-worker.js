alert('JavaScriptのアラート');
// service-worker.js
var CACHE_STATIC_VERSION = 'static-v2';

// サービスワーカーのインストール
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker...');

  // キャッシュできるまで次の処理を待つ
  event.waitUntil(
    caches.open(CACHE_STATIC_VERSION)
      .then(function(cache) {
        console.log('[Service Worker] Precaching App...');
        // 何でもキャッシュできる。cssとかの中で更にリクエストが発生する場合は、動的にキャッシュする必要がある（後述）
        cache.addAll([
          './',
          './2020',
          './app'
        ]).catch((error)=> {
          console.dir(error)
        });
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== CACHE_STATIC_VERSION && key !== CACHE_DYNAMIC_VERSION) {
          console.log('[Service Worker] Removing old cache...');
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

var CACHE_DYNAMIC_VERSION = 'dynamic-v2';

self.addEventListener('fetch', function(event) {
  console.log('[Service Worker] Fetching something ...');
  // オンラインの場合キャッシュを消す
  event.respondWith(
    // キャッシュの存在チェック
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      } else {
        // キャッシュがなければリクエストを投げて、レスポンスをキャッシュに入れる
        return fetch(event.request).then(function(res) {
          return caches.open(CACHE_DYNAMIC_VERSION).then(function(cache) {
            // 最後に res を返せるように、ここでは clone() する必要がある
            cache.put(event.request.url, res.clone());
            return res;
          })
        }).catch(function() {
          // エラーが発生しても何もしない
        });
      }
    })
  );
});

alert("aaa");