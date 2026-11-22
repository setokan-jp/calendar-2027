// サービスワーカーの登録（CSP で HTML の中のスクリプトを止めるため、index.html から移した）
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}
