# セトカン カレンダー2027（ウェブ版）

https://app.setokan.jp/ で公開しているカレンダーと12星座占いのウェブアプリ。

## 公開のしくみ
- Cloudflare Workers（静的アセット）で配信。Worker の名前は setokan-calendar-app
- このリポジトリの main に push すると、Cloudflare Workers Builds が自動で本番に出す（デプロイのコマンドは npx wrangler deploy）
- 配信しないファイルは .assetsignore、見出し（キャッシュ・CSP など）は _headers に書く
- 手元で試すとき：npx wrangler@4.153.0 dev

## 画像を足したとき
- images/pool に連番で置き、script.js の IMAGE_POOL_COUNT を変える
- 差し替えたときは service-worker.js の IMAGE_CACHE_NAME を上げる
