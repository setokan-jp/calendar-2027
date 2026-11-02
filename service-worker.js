// 同じドメインの他のアプリのキャッシュを消さないよう、自分の接頭辞のものだけ削除する
const CACHE_PREFIX = 'setokan-calendar-2027-';
const CACHE_NAME = 'setokan-calendar-2027-v2';

// 本番画像（images/pool）は表示したものだけを別のキャッシュに保存する
// アプリ更新（CACHE_NAME の変更）では消さず、上限を超えたら古いものから削除する
// 画像を差し替えたときは IMAGE_CACHE_NAME を変えると、古い保存分は有効化時に自動で削除される
const IMAGE_CACHE_NAME = 'setokan-calendar-2027-images-v2';
const IMAGE_CACHE_MAX = 60;

// Network First で扱うコアファイル（更新が頻繁）
const NETWORK_FIRST_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './auth.js',
];

// Cache First で扱う静的アセット（ほぼ変わらない）
// 予備画像はインストール時に先に保存しておく
const CACHE_FIRST_ASSETS = [
  './manifest.json',
  './favicon.png?v=5',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './images/fallback/seto-kanna-fallback-1.webp',
  './images/fallback/seto-kanna-fallback-2.webp',
  './images/fallback/seto-kanna-fallback-3.webp',
  './images/fallback/seto-kanna-fallback-4.webp',
  './images/fallback/seto-kanna-fallback-5.webp',
];

// インストール時：コアファイル・静的アセット・予備画像をキャッシュ（本番画像は含めない）
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([...NETWORK_FIRST_ASSETS, ...CACHE_FIRST_ASSETS])
    )
  );
  self.skipWaiting();
});

// 有効化時：自分の接頭辞の古いキャッシュだけを削除（本番画像のキャッシュは残す）
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME && key !== IMAGE_CACHE_NAME)
        .map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// ネットワーク優先：最新を取得してキャッシュ更新、失敗時のみキャッシュを返す
function networkFirst(request) {
  return fetch(request)
    .then(response => {
      const clone = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
      return response;
    })
    .catch(() => caches.match(request));
}

// キャッシュ優先：キャッシュがあれば返す、なければネットワークから取得してキャッシュ
function cacheFirst(request) {
  return caches.match(request).then(cached => {
    if (cached) return cached;
    return fetch(request).then(response => {
      const clone = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
      return response;
    });
  });
}

// 本番画像の保存数を上限までに抑える（保存した順に古いものから削除）
function trimImageCache(cache) {
  return cache.keys().then(keys => {
    const excess = keys.length - IMAGE_CACHE_MAX;
    if (excess > 0) return Promise.all(keys.slice(0, excess).map(key => cache.delete(key)));
  });
}

// 本番画像：保存済みならそれを返し、なければ取得して保存（読み込めなかった画像は保存しない）
function poolImage(request) {
  return caches.open(IMAGE_CACHE_NAME).then(cache =>
    cache.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok) {
          cache.put(request, response.clone()).then(() => trimImageCache(cache));
        }
        return response;
      });
    })
  );
}

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 外部ドメインはサービスワーカーを通さない
  if (url.origin !== self.location.origin) return;

  const path = url.pathname;

  if (path.includes('/images/pool/')) {
    event.respondWith(poolImage(event.request));
    return;
  }

  const isNetworkFirst =
    path.endsWith('.html') ||
    path.endsWith('.css')  ||
    path.endsWith('.js')   ||
    path === '/'           ||
    path.endsWith('/');

  event.respondWith(isNetworkFirst ? networkFirst(event.request) : cacheFirst(event.request));
});
