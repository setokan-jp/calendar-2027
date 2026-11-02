// ═══════════════════════════════════════════
//  アプリ設定（テンプレートとして再利用するときはここを編集）
// ═══════════════════════════════════════════
// localStorage のキーの接頭辞（他のアプリと衝突しない名前にする）
const APP_STORAGE_PREFIX = 'setokan2027';

// 共有の画像プール（認証画面・今日の占いグリッド・占いページ・カレンダー背景で使用）
// images/pool/seto-kanna-001.webp 〜 の連番画像。画像を追加したら IMAGE_POOL_COUNT を変えるだけでよい
const IMAGE_POOL_COUNT = 212;

// プールから除外する画像の番号（1始まり。例: [12, 45]）
const IMAGE_POOL_EXCLUDED = [];

const IMAGE_POOL = Array.from({ length: IMAGE_POOL_COUNT }, (_, i) => i + 1)
  .filter(n => !IMAGE_POOL_EXCLUDED.includes(n))
  .map(n => `./images/pool/seto-kanna-${String(n).padStart(3, '0')}.webp`);

// 画像が読み込めないときの予備画像
const FALLBACK_IMAGES = [
  './images/fallback/seto-kanna-fallback-1.webp',
  './images/fallback/seto-kanna-fallback-2.webp',
  './images/fallback/seto-kanna-fallback-3.webp',
  './images/fallback/seto-kanna-fallback-4.webp',
  './images/fallback/seto-kanna-fallback-5.webp'
];

// ═══════════════════════════════════════════
//  星座シルエット SVG (12星座 100×100 リアルシルエット)
// ═══════════════════════════════════════════
const ZODIAC_SILHOUETTES = {

  // 牡羊座: 羊
  aries: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M50 74c-3 0-5-2-5-5V37c0-12-8-20-17-20-7 0-12 5-12 12 0 5 3 9 7 11 3 1 4 4 3 7-1 3-4 4-7 3C11 47 6 39 6 30 6 16 16 6 29 6c9 0 16 5 21 13C55 11 62 6 71 6c13 0 23 10 23 24 0 9-5 17-13 20-3 1-6 0-7-3s0-6 3-7c4-2 7-6 7-11 0-7-5-12-12-12-9 0-17 8-17 20v32c0 3-2 5-5 5z"/>
  </svg>`,

  // 牡牛座: 牛
  taurus: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M25 13c6 11 14 18 25 18s19-7 25-18c2-3 7-2 7 2-1 15-11 25-22 29 11 4 19 14 19 26 0 16-13 29-29 29S21 86 21 70c0-12 8-22 19-26-11-4-21-14-22-29 0-4 5-5 7-2zm25 31c-14 0-25 11-25 25s11 25 25 25 25-11 25-25-11-25-25-25z"/>
  </svg>`,

  // 双子座: 双子
  gemini: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M24 12h52c3 0 5 2 5 5s-2 5-5 5h-9v56h9c3 0 5 2 5 5s-2 5-5 5H24c-3 0-5-2-5-5s2-5 5-5h9V22h-9c-3 0-5-2-5-5s2-5 5-5zm19 10v56h14V22H43z"/>
  </svg>`,

  // 蟹座: カニ
  cancer: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <g transform="translate(5 18)">
      <path d="M50 74c-10 0-18-8-18-18 0-2 0-4 1-6-6 2-13 3-20 3-10 0-18-3-24-8-3-3-8 2-5 5 8 9 19 13 31 13 8 0 15-2 22-5 4 3 8 5 13 5 10 0 18-8 18-18s-8-19-18-19zm0 11c4 0 8 4 8 8s-4 8-8 8-8-4-8-8 4-8 8-8zM32 34c10 0 18-8 18-18 0-5-2-10-5-13-3-3-8 1-5 5 1 2 2 5 2 8 0 4-4 8-8 8s-8-4-8-8 4-8 8-8c3 0 5-2 5-5s-2-5-5-5C20-2 10 8 10 22s10 12 22 12z"/>
    </g>
  </svg>`,

  // 獅子座: ライオン
  leo: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M35 67c-11 0-20-9-20-20s9-20 20-20c12 0 20 10 20 22 0 9-3 16-7 24 8-4 15-10 20-19 5-10 4-22-4-27-6-4-14-1-18 5-2 3-6 3-8 1-3-2-3-6-1-8 7-10 21-15 32-8 14 9 16 27 8 42-8 16-24 27-41 30-5 1-8-5-5-9 8-10 14-20 14-31 0-6-4-11-10-11s-10 4-10 9 4 9 10 9c3 0 5 2 5 5s-2 5-5 5z"/>
  </svg>`,

  // 乙女座: 乙女
  virgo: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M16 20c0-3 2-5 5-5s5 2 5 5v5c4-7 15-7 20 0 4-8 17-8 22 1 6 10 1 27-5 40l8-6c2-2 5-2 7 0s2 5 0 7L61 84c-2 2-6 1-7-2-1-2-1-4 0-7 7-14 13-35 6-44-3-4-11-2-11 5v34c0 3-2 5-5 5s-5-2-5-5V36c0-7-10-7-10 0v34c0 3-2 5-5 5s-5-2-5-5V20z"/>
  </svg>`,

  // 天秤座: 天秤
  libra: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M18 68h64c3 0 5 2 5 5s-2 5-5 5H18c-3 0-5-2-5-5s2-5 5-5zm0 15h64c3 0 5 2 5 5s-2 5-5 5H18c-3 0-5-2-5-5s2-5 5-5zm12-27h12c-4-5-7-11-7-18 0-10 7-18 15-18s15 8 15 18c0 7-3 13-7 18h12c3 0 5 2 5 5s-2 5-5 5H53c-5 0-7-5-4-9 4-5 7-11 7-19 0-5-3-9-6-9s-6 4-6 9c0 8 3 14 7 19 3 4 1 9-4 9H30c-3 0-5-2-5-5s2-5 5-5z"/>
  </svg>`,

  // 蠍座: サソリ
  scorpio: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M13 20c0-3 2-5 5-5s5 2 5 5v5c4-7 15-7 20 0 4-8 17-8 22 1 3 5 4 12 4 21v20h10l-8-8c-2-2-2-5 0-7s5-2 7 0l17 17c2 2 2 5 0 7L78 93c-2 2-5 2-7 0s-2-5 0-7l8-8H64c-3 0-5-2-5-5V47c0-7-1-13-4-16s-9-2-9 5v34c0 3-2 5-5 5s-5-2-5-5V36c0-7-10-7-10 0v34c0 3-2 5-5 5s-5-2-5-5V20z"/>
  </svg>`,

  // 射手座: 弓矢
  sagittarius: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <g transform="translate(8 0)">
      <path d="M66 17H39c-3 0-5-2-5-5s2-5 5-5h39c3 0 5 2 5 5v39c0 3-2 5-5 5s-5-2-5-5V24L25 72l15 15c2 2 2 5 0 7s-5 2-7 0L18 79 8 89c-2 2-5 2-7 0s-2-5 0-7l10-10L0 61c-2-2-2-5 0-7s5-2 7 0l11 11 48-48z"/>
    </g>
  </svg>`,

  // 山羊座: 山羊
  capricorn: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M17 19c0-3 2-5 5-5s5 2 5 5v16c4-13 13-21 24-21 14 0 24 12 24 28 0 7-2 13-5 18 9 2 16 9 16 19 0 12-10 21-23 21-11 0-20-7-20-17 0-8 6-14 14-14 3 0 5 2 5 5s-2 5-5 5c-2 0-4 2-4 4 0 4 5 7 10 7 7 0 13-5 13-11 0-7-7-11-15-11-4 0-6-5-3-8 5-5 7-11 7-18 0-10-6-18-14-18-13 0-24 18-24 45 0 3-2 5-5 5s-5-2-5-5V19z"/>
  </svg>`,

  // 水瓶座: 水の波
  aquarius: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M8 38c9 0 12-8 21-8s12 8 21 8 12-8 21-8 12 8 21 8c3 0 5 2 5 5s-2 5-5 5c-12 0-16-8-21-8s-9 8-21 8-16-8-21-8-9 8-21 8c-3 0-5-2-5-5s2-5 5-5zm0 26c9 0 12-8 21-8s12 8 21 8 12-8 21-8 12 8 21 8c3 0 5 2 5 5s-2 5-5 5c-12 0-16-8-21-8s-9 8-21 8-16-8-21-8-9 8-21 8c-3 0-5-2-5-5s2-5 5-5z"/>
  </svg>`,

  // 魚座: 魚
  pisces: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M22 12c21 13 30 28 30 38S43 75 22 88c-3 2-7 0-7-4 0-2 1-3 2-4 15-10 23-21 25-30-2-9-10-20-25-30-2-1-3-4-2-6 1-3 5-4 7-2zm56 0c3-2 7 0 7 4 0 2-1 3-2 4-15 10-23 21-25 30 2 9 10 20 25 30 2 1 3 4 2 6-1 3-5 4-7 2-21-13-30-28-30-38s9-25 30-38zM26 45h48c3 0 5 2 5 5s-2 5-5 5H26c-3 0-5-2-5-5s2-5 5-5z"/>
  </svg>`,
};

// ═══════════════════════════════════════════
//  fortune-page 画像左上アイコン用 SVG (100×100 fill=white)
// ═══════════════════════════════════════════
const FORTUNE_SILHOUETTES = {
  aries: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="white">
    <path d="M50 74c-3 0-5-2-5-5V37c0-12-8-20-17-20-7 0-12 5-12 12 0 5 3 9 7 11 3 1 4 4 3 7-1 3-4 4-7 3C11 47 6 39 6 30 6 16 16 6 29 6c9 0 16 5 21 13C55 11 62 6 71 6c13 0 23 10 23 24 0 9-5 17-13 20-3 1-6 0-7-3s0-6 3-7c4-2 7-6 7-11 0-7-5-12-12-12-9 0-17 8-17 20v32c0 3-2 5-5 5z"/>
  </svg>`,
  taurus: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="white">
    <path d="M25 13c6 11 14 18 25 18s19-7 25-18c2-3 7-2 7 2-1 15-11 25-22 29 11 4 19 14 19 26 0 16-13 29-29 29S21 86 21 70c0-12 8-22 19-26-11-4-21-14-22-29 0-4 5-5 7-2zm25 31c-14 0-25 11-25 25s11 25 25 25 25-11 25-25-11-25-25-25z"/>
  </svg>`,
  gemini: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="white">
    <path d="M24 12h52c3 0 5 2 5 5s-2 5-5 5h-9v56h9c3 0 5 2 5 5s-2 5-5 5H24c-3 0-5-2-5-5s2-5 5-5h9V22h-9c-3 0-5-2-5-5s2-5 5-5zm19 10v56h14V22H43z"/>
  </svg>`,
  cancer: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="white">
    <path d="M68 29c-10 0-18 8-18 18 0 2 0 4 1 6-6 2-13 3-20 3-10 0-18-3-24-8-3-3-8 2-5 5 8 9 19 13 31 13 8 0 15-2 22-5 4 3 8 5 13 5 10 0 18-8 18-18s-8-19-18-19zm0 11c4 0 8 4 8 8s-4 8-8 8-8-4-8-8 4-8 8-8zM32 34c10 0 18-8 18-18 0-5-2-10-5-13-3-3-8 1-5 5 1 2 2 5 2 8 0 4-4 8-8 8s-8-4-8-8 4-8 8-8c3 0 5-2 5-5s-2-5-5-5C20-2 10 8 10 22s10 12 22 12z" transform="translate(5 18)"/>
  </svg>`,
  leo: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="white">
    <path d="M35 67c-11 0-20-9-20-20s9-20 20-20c12 0 20 10 20 22 0 9-3 16-7 24 8-4 15-10 20-19 5-10 4-22-4-27-6-4-14-1-18 5-2 3-6 3-8 1-3-2-3-6-1-8 7-10 21-15 32-8 14 9 16 27 8 42-8 16-24 27-41 30-5 1-8-5-5-9 8-10 14-20 14-31 0-6-4-11-10-11s-10 4-10 9 4 9 10 9c3 0 5 2 5 5s-2 5-5 5z"/>
  </svg>`,
  virgo: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="white">
    <path d="M16 20c0-3 2-5 5-5s5 2 5 5v5c4-7 15-7 20 0 4-8 17-8 22 1 6 10 1 27-5 40l8-6c2-2 5-2 7 0s2 5 0 7L61 84c-2 2-6 1-7-2-1-2-1-4 0-7 7-14 13-35 6-44-3-4-11-2-11 5v34c0 3-2 5-5 5s-5-2-5-5V36c0-7-10-7-10 0v34c0 3-2 5-5 5s-5-2-5-5V20z"/>
  </svg>`,
  libra: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="white">
    <path d="M18 68h64c3 0 5 2 5 5s-2 5-5 5H18c-3 0-5-2-5-5s2-5 5-5zm0 15h64c3 0 5 2 5 5s-2 5-5 5H18c-3 0-5-2-5-5s2-5 5-5zm12-27h12c-4-5-7-11-7-18 0-10 7-18 15-18s15 8 15 18c0 7-3 13-7 18h12c3 0 5 2 5 5s-2 5-5 5H53c-5 0-7-5-4-9 4-5 7-11 7-19 0-5-3-9-6-9s-6 4-6 9c0 8 3 14 7 19 3 4 1 9-4 9H30c-3 0-5-2-5-5s2-5 5-5z"/>
  </svg>`,
  scorpio: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="white">
    <path d="M13 20c0-3 2-5 5-5s5 2 5 5v5c4-7 15-7 20 0 4-8 17-8 22 1 3 5 4 12 4 21v20h10l-8-8c-2-2-2-5 0-7s5-2 7 0l17 17c2 2 2 5 0 7L78 93c-2 2-5 2-7 0s-2-5 0-7l8-8H64c-3 0-5-2-5-5V47c0-7-1-13-4-16s-9-2-9 5v34c0 3-2 5-5 5s-5-2-5-5V36c0-7-10-7-10 0v34c0 3-2 5-5 5s-5-2-5-5V20z"/>
  </svg>`,
  sagittarius: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="white">
    <path d="M66 17H39c-3 0-5-2-5-5s2-5 5-5h39c3 0 5 2 5 5v39c0 3-2 5-5 5s-5-2-5-5V24L25 72l15 15c2 2 2 5 0 7s-5 2-7 0L18 79 8 89c-2 2-5 2-7 0s-2-5 0-7l10-10L0 61c-2-2-2-5 0-7s5-2 7 0l11 11 48-48z" transform="translate(8 0)"/>
  </svg>`,
  capricorn: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="white">
    <path d="M17 19c0-3 2-5 5-5s5 2 5 5v16c4-13 13-21 24-21 14 0 24 12 24 28 0 7-2 13-5 18 9 2 16 9 16 19 0 12-10 21-23 21-11 0-20-7-20-17 0-8 6-14 14-14 3 0 5 2 5 5s-2 5-5 5c-2 0-4 2-4 4 0 4 5 7 10 7 7 0 13-5 13-11 0-7-7-11-15-11-4 0-6-5-3-8 5-5 7-11 7-18 0-10-6-18-14-18-13 0-24 18-24 45 0 3-2 5-5 5s-5-2-5-5V19z"/>
  </svg>`,
  aquarius: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="white">
    <path d="M8 38c9 0 12-8 21-8s12 8 21 8 12-8 21-8 12 8 21 8c3 0 5 2 5 5s-2 5-5 5c-12 0-16-8-21-8s-9 8-21 8-16-8-21-8-9 8-21 8c-3 0-5-2-5-5s2-5 5-5zm0 26c9 0 12-8 21-8s12 8 21 8 12-8 21-8 12 8 21 8c3 0 5 2 5 5s-2 5-5 5c-12 0-16-8-21-8s-9 8-21 8-16-8-21-8-9 8-21 8c-3 0-5-2-5-5s2-5 5-5z"/>
  </svg>`,
  pisces: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="white">
    <path d="M22 12c21 13 30 28 30 38S43 75 22 88c-3 2-7 0-7-4 0-2 1-3 2-4 15-10 23-21 25-30-2-9-10-20-25-30-2-1-3-4-2-6 1-3 5-4 7-2zm56 0c3-2 7 0 7 4 0 2-1 3-2 4-15 10-23 21-25 30 2 9 10 20 25 30 2 1 3 4 2 6-1 3-5 4-7 2-21-13-30-28-30-38s9-25 30-38zM26 45h48c3 0 5 2 5 5s-2 5-5 5H26c-3 0-5-2-5-5s2-5 5-5z"/>
  </svg>`,
};

// ═══════════════════════════════════════════
//  星座データ
// ═══════════════════════════════════════════
const SIGNS = [
  { name: '牡羊座',  charKey: 'aries'       },
  { name: '牡牛座',  charKey: 'taurus'      },
  { name: '双子座',  charKey: 'gemini'      },
  { name: '蟹座',    charKey: 'cancer'      },
  { name: '獅子座',  charKey: 'leo'         },
  { name: '乙女座',  charKey: 'virgo'       },
  { name: '天秤座',  charKey: 'libra'       },
  { name: '蠍座',    charKey: 'scorpio'     },
  { name: '射手座',  charKey: 'sagittarius' },
  { name: '山羊座',  charKey: 'capricorn'   },
  { name: '水瓶座',  charKey: 'aquarius'    },
  { name: '魚座',    charKey: 'pisces'      },
];

// ═══════════════════════════════════════════
//  やさしい寄り添いメッセージ
// ═══════════════════════════════════════════
const MESSAGES = {
  overall: [
    '今日のキミ、ほんとによく頑張ったね。お疲れさま。少しだけ肩の力を抜いて、ゆっくりする時間をつくってね。キミのまわりには、やさしい風がそっと流れてるよ。そのままのキミで、穏やかな一日になるよう祈ってるね。',
    '小さなことでいいから、今日うれしかった瞬間を思い出してみて。その積み重ねが、キミの毎日をそっと温めてくれてるんだよ。焦らなくて大丈夫🩷 キミのペースでちゃんと前に進んでるの、私は知ってるからね。',
    '今日はいつもより、キミの流れが穏やかに整ってるみたい。新しい何かが、そっとキミのそばに近づいてきてるよ。受け取る準備だけしておけば、きっと大丈夫。穏やかな気持ちで、一緒にいい一日にしようね。',
    'いつも誰かのために頑張ってるの、ちゃんと知ってるよ。今日は少しだけ、自分のことも大切にしてあげてね。キミが人にやさしくできるのは、キミの心が満たされているから。自分をいたわるのも、大事なお仕事のひとつだよ。',
    '今日は静かに流れる、穏やかな一日になりそうだよ。急いで何かを成し遂げなくていいの。今ここにいるキミのままで十分。そのやわらかな存在に、まわりのみんなも私も、いつもほっとしてるんだよ。',
    '最近ちょっと疲れてたなら、今日はそれを認めてあげようね。完璧じゃなくていいし、弱い日があってもいいの。そういう日も含めて、キミは本当によくやってるよ。大丈夫🩷 ゆっくり、一緒に深呼吸しようね。',
    'キミがこつこつ積み重ねてきたもの、静かに形になってきてるよ。誰にも気づかれなくても、キミ自身がわかっていれば十分。私もちゃんと見てるしね。今日はそんな自分をそっとほめて、心を軽くしてあげようね。',
    '今日はキミのまわりに、温かい気配があふれてるよ。ふとした瞬間に、誰かの笑顔や言葉がキミをほっとさせてくれるはず。そんな小さな幸せを大切に受け取って、穏やかに過ごそうね。私もそばで応援してるよ。',
  ],
  love: [
    '誰かを想って心がほんのり温かくなるなら、今日はその気持ちをそっと大切にしてね。言葉にしなくても、その想いはちゃんと届いてるよ。誰かを愛せるキミは、それだけで本当に素敵。私までうれしくなっちゃうよ。',
    '好きな人のことが頭から離れないの、とっても純粋な気持ちだよ。今日はその想いを否定しないで、大事に持っていてね。焦らなくて大丈夫🩷 気持ちが熟したら、自然と形になっていくからね。',
    '人とのつながりって、気づかないうちにキミを支えてくれてるんだよ。今日はそのありがたさを、ふっと感じられる瞬間がありそう。大切な人を想うだけで心があたたかくなれるキミ、それだけで十分豊かだよ。',
    '今日は誰かとのやりとりの中に、特別な温もりを感じられそうだよ。それはキミの心が開いてる証拠。本音を少しだけ見せたら、距離がそっと縮まることもあるの。素直なキミのままで大丈夫🩷 そんなキミが好きだよ。',
    '一人の時間も、誰かを想う時間も、どっちも大切な恋の形だよ。今日はあわてなくていいからね。キミと縁のある人は、きっとちゃんとキミを見つけてくれる。そのままのキミでいてね、約束だよ。',
    '誰かにやさしくしたくなる気持ちって、とってもきれいだよね。今日はその気持ちのまま、ほんの少しだけ自分から歩み寄ってみよう！小さな一歩が、キミと誰かの間に温かい橋をかけてくれるよ。',
    'うまくいかない恋があっても、それはキミが誰かを大切に想っていた証だよ。今日はその経験を、やさしく抱きしめてあげてね。その温かさが、次の出会いに向けてキミの心を豊かにしてくれてるの。私もついてるよ。',
    '一緒にいるだけで安心できる誰かを、ふと思い出す日になりそう。その人への気持ちは、言葉にしなくてもちゃんと伝わってるよ。大切なものはいつも、静かにそこにあるの。今日もそのぬくもりを、一緒に感じていようね。',
  ],
  work: [
    '毎日コツコツ続けてきたこと、誰かに見えてなくても、ちゃんと意味があるんだよ。今日はそんな自分の努力を、少しだけ認めてあげてね。急がなくていいよ。キミのペースで積み上げてきたもの、確かにそこにあるからね。',
    '完璧じゃなくていいの。今日できることを、丁寧に。それだけで十分だよ。一生懸命なキミの姿、まわりにもちゃんと届いてる。自分を信じて、穏やかに前に進もうね。そんなキミが大好きだよ。',
    '今日は新しいアイデアがふっと浮かびそうだよ。すぐ形にしなくていいから、まずは心の中でそっと温めておいてね。焦らず自然に動けたとき、きっといい流れが生まれるよ。私も楽しみにしてるね。',
    '誰かと力を合わせると、一人じゃ気づけなかったものが見えてくるよ。今日はそんな協力の温かさを感じられそう。頼ることも、関係を深める大切な一歩なんだよ。ひとりで抱えこまないでね。',
    'うまくいかない日があっても、それはキミが全力で向き合ってる証拠だよ。今日は「よくやってる」って自分に言ってあげてね。私からも言わせて、本当によくやってる！その積み重ねが、キミの大切な力になっていくんだよ。',
    '今日は集中できる穏やかな時間が流れていきそう。難しいことも、一つずつ丁寧に向き合えば越えていけるよ。焦らず、自分のリズムでね。キミの真剣さ、ちゃんと誰かに届いてる。頑張ろう🩷 応援してるね。',
    '言葉の選び方ひとつで、場の空気がやわらぐことがあるよね。今日はていねいなコミュニケーションが、いい流れを運んでくれそう。誠実なキミの言葉は、人の心に温かく届くよ。そういうところ、すごく好きだよ。',
    '長く続けてきた努力が、そっと実を結びはじめてるよ。すぐに形にならなくても、焦らなくて大丈夫🩷 キミを信じてる人がいること、忘れないでね。私もそのひとりだよ。今日も、ていねいに過ごそうね。',
  ],
  money: [
    'お金って、気持ちの余裕に似てるところがあるんだよね。今日は何かを急いで手に入れなくていいよ。ゆったり流れに任せて、自分に本当に必要なものを感じてみよう。豊かさは、キミの心の中にもちゃんと宿ってるからね。',
    '欲しいものがあるときは、ちょっと立ち止まって「今の自分に必要かな」って聞いてみてね。答えは急がなくていいよ。今のキミには、必要なものがもうちゃんとそろってるからね。',
    '少しずつでも大切なものを積み上げていけるキミ、本当に強くて好きだよ。今日もキミらしいペースで、穏やかに過ごそうね。焦らなくていいの。豊かさは、じわじわとキミのそばに引き寄せられてくるものだからね。',
    '思わぬかたちで、うれしいことが舞い込んできそうだよ。受け取ることへの罪悪感は、もう手放しちゃおう！幸運を素直に喜べるのも、豊かさのひとつ。「ありがとう」の気持ちと一緒に受け取ってね。キミがうれしいと私もうれしいな。',
    '今日は大きく動くより、そっと守る日にしようね。今あるものをゆっくり確かめて、一緒に深呼吸する時間があったらうれしいな。無理しないって決められるキミ、すごく賢くて、すごく好きだよ。',
    'お金まわりを整理してみると、意外と心がすっきりする日だよ。全体を眺めてみたら、知らなかった豊かさに気づけるかも。キミの暮らしには、もうたくさんの恵みがあふれてるんだよ。それって、すごく素敵なことだね。',
    '誰かのために使うお金って、じんわり温かいよね。今日もそんな心の豊かさが、キミのまわりをそっと満たしてくれるよ。与える喜びは、きっとまたキミのもとに返ってくるからね。やさしいキミが好きだよ。',
    '豊かさのサインって、意外と日常の中に隠れてるんだよ。今日はそんな小さな兆しに、ふと気づける日になりそう。キミの感性はやわらかくて、私の自慢なの。そのやさしいアンテナ、大切にしていこうね。',
  ],
};

// 各メッセージの末尾「。」を「 🌸」に置き換え
Object.keys(MESSAGES).forEach(cat => {
  MESSAGES[cat] = MESSAGES[cat].map(msg => {
    const idx = msg.lastIndexOf('。');
    return idx >= 0 ? msg.slice(0, idx) + ' 💕' + msg.slice(idx + 1) : msg;
  });
});

const LUCKY_COLORS = [
  'ゴールド ✨', 'ダークネイビー 🌌', 'ディープパープル 💜', 'クリムゾン 🔴',
  'シルバー 🌙', 'ミステリアスブラック 🖤', 'コバルトブルー 💙', 'エメラルド 💚',
  'パールホワイト 🤍', 'バーガンディ 🍷', 'インディゴ 🔵', 'ローズゴールド ✦',
];

const LUCKY_NUMBERS = [3, 5, 7, 8, 11, 12, 15, 21, 24, 33, 7, 9];

// ── アニメーション タイマー管理 ──
const FORTUNE_PAGE_IDS = new Set(['page-overall', 'page-love', 'page-work', 'page-money']);
let _timers = [];
function addTimer(fn, ms) {
  const t = setTimeout(fn, ms);
  _timers.push(t);
  return t;
}
function clearAllTimers() {
  _timers.forEach(clearTimeout);
  _timers = [];
}

// ── タイピングアニメーション ──
function typeMessage(text, el, charDelay, periodPause) {
  const chars = Array.from(text);
  let i = 0;
  el.textContent = '';
  function next() {
    if (i >= chars.length) return;
    const ch = chars[i];
    el.textContent += ch;
    i++;
    addTimer(next, ch === '。' ? periodPause : charDelay);
  }
  next();
}

// ── fortune-page アニメーション ──
function animateFortunePage(pageId) {
  const pageEl = document.getElementById(pageId);
  if (!pageEl) return;

  const imgFrameEl = pageEl.querySelector('.fortune-img-frame');
  const titleEl    = pageEl.querySelector('.fortune-title');
  const starsEl    = pageEl.querySelector('.stars');
  const textEl     = pageEl.querySelector('.fortune-text');

  // 初期状態にリセット（imgFrameはshowPageで事前にリセット済み）
  if (titleEl) {
    titleEl.style.transition = '';
    titleEl.style.opacity    = '0';
    titleEl.style.transform  = 'translateY(16px)';
  }
  if (starsEl) starsEl.innerHTML = '';
  if (textEl)  textEl.textContent = '';

  // 0. 画像フェードイン（CSSアニメーション: 0.5s delay）
  if (imgFrameEl) {
    requestAnimationFrame(() => imgFrameEl.classList.add('is-visible'));
  }

  // 1. 運勢タイトル (1.9s) ─ 画像アニメーション完了(1.6s)の後
  addTimer(() => {
    if (titleEl) {
      titleEl.style.transition = 'opacity 0.9s ease-out, transform 0.9s ease-out';
      titleEl.style.opacity    = '1';
      titleEl.style.transform  = 'translateY(0)';
    }
  }, 1900);

  // 2. ★ 1つずつポップ (3.2s〜、各0.32s間隔)
  if (starsEl) {
    const starText = starsEl._starText || '';
    [...starText].forEach((ch, i) => {
      addTimer(() => {
        const span = document.createElement('span');
        span.className   = 'star-pop';
        span.textContent = ch;
        starsEl.appendChild(span);
      }, 3200 + i * 320);
    });
  }

  // 3. メッセージ タイピング (5.7s)
  if (textEl) {
    addTimer(() => {
      typeMessage(textEl._fullText || '', textEl, 90, 700);
    }, 5700);
  }
}

const PAGES = ['page-calendar', 'page-today', 'page-overall', 'page-love', 'page-work', 'page-money'];


const PAGE_BEAUTY_IMG = {
  'page-overall': 'beauty-img-overall',
  'page-love':    'beauty-img-love',
  'page-work':    'beauty-img-work',
  'page-money':   'beauty-img-money',
};

// ═══════════════════════════════════════════
//  画像の山札
//  プールをシャッフルした山札から上から順に配り、配り終えたら作り直す。
//  山札は localStorage に保存し、次回は続きから配る。
// ═══════════════════════════════════════════
const DECK_STORAGE_KEY = `${APP_STORAGE_PREFIX}_image_deck`;
let _deck = null;
let _roundShown = new Set(); // 今回の利用ですでに表示した画像
let _lastFallbackIndex = -1;

function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// localStorage が使えない環境では null（毎回ランダムな山札で動く）
function readSavedDeck() {
  try {
    const saved = JSON.parse(localStorage.getItem(DECK_STORAGE_KEY));
    if (saved && Array.isArray(saved.remaining) && Array.isArray(saved.known)) return saved;
  } catch (e) { /* 使えない環境では無視 */ }
  return null;
}

function saveDeck() {
  try {
    localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(_deck));
  } catch (e) { /* 使えない環境では無視 */ }
}

// 保存済みの山札をプールの増減に合わせて補正する
// （プールから消えた画像は捨て、新しく増えた画像は山札のランダムな位置に差し込む）
function getDeck() {
  if (_deck) return _deck;
  const saved = readSavedDeck();
  if (!saved) {
    _deck = { remaining: shuffled(IMAGE_POOL), known: [...IMAGE_POOL] };
    return _deck;
  }
  const pool  = new Set(IMAGE_POOL);
  const known = new Set(saved.known);
  const remaining = [...new Set(saved.remaining)].filter(url => pool.has(url));
  IMAGE_POOL.filter(url => !known.has(url)).forEach(url => {
    remaining.splice(Math.floor(Math.random() * (remaining.length + 1)), 0, url);
  });
  _deck = { remaining, known: [...IMAGE_POOL] };
  return _deck;
}

// 新しい回（カレンダー画面に戻ったとき）を始める
function startImageRound() {
  _roundShown = new Set();
}

// 山札から count 枚配る。今回すでに表示した画像は飛ばす（飛ばした画像は山札に残る）
function dealImages(count) {
  if (!IMAGE_POOL.length) {
    return Array.from({ length: count }, (_, i) => FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]);
  }
  const deck = getDeck();
  const dealt = [];
  while (dealt.length < count) {
    let idx = deck.remaining.findIndex(url => !_roundShown.has(url));
    if (idx < 0) {
      // 配り終えた（残りは今回表示済みのみ）→ 新しくシャッフルして作り直す
      deck.remaining = shuffled(IMAGE_POOL);
      idx = deck.remaining.findIndex(url => !_roundShown.has(url));
      if (idx < 0) { _roundShown.clear(); idx = 0; } // 今回だけでプールを使い切った
    }
    const [url] = deck.remaining.splice(idx, 1);
    _roundShown.add(url);
    dealt.push(url);
  }
  saveDeck();
  return dealt;
}

// 次に配られる画像を先読み（キャッシュ促進）
function preloadUpcomingImages(count) {
  getDeck().remaining.filter(url => !_roundShown.has(url)).slice(0, count)
    .forEach(url => { new Image().src = url; });
}

// 読み込みに失敗したら予備画像に差し替える
function setImageWithFallback(el, url) {
  el.onerror = function() {
    this.onerror = null;
    let idx;
    do {
      idx = Math.floor(Math.random() * FALLBACK_IMAGES.length);
    } while (FALLBACK_IMAGES.length > 1 && idx === _lastFallbackIndex);
    _lastFallbackIndex = idx;
    this.src = FALLBACK_IMAGES[idx];
  };
  el.src = url;
}

// ── 今日の占いグリッド（12枚）──
let _topPageImgEls = [];

function assignTopPageImages() {
  const urls = dealImages(_topPageImgEls.length);
  _topPageImgEls.forEach((el, i) => setImageWithFallback(el, urls[i]));
}

// ── 占いページ（4枚）──
const SESSION_PAGES = ['page-overall', 'page-love', 'page-work', 'page-money'];
let _sessionImages = {};

function assignSessionImages() {
  const urls = dealImages(SESSION_PAGES.length);
  SESSION_PAGES.forEach((pageId, i) => { _sessionImages[pageId] = urls[i]; });
}

function applySessionImage(pageId) {
  const imgId = PAGE_BEAUTY_IMG[pageId];
  const el = imgId && document.getElementById(imgId);
  if (!el || !_sessionImages[pageId]) return;
  setImageWithFallback(el, _sessionImages[pageId]);
}

function seededRand(seed) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function getDailySeed(signIndex) {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate() + signIndex * 997;
}

function pickRandom(arr, rand) {
  return arr[Math.floor(rand() * arr.length)];
}

function starsHTML(count) {
  return '★'.repeat(count) + '☆'.repeat(5 - count);
}

function getStarCount(rand) {
  const r = rand();
  if (r < 0.08) return 2;
  if (r < 0.25) return 3;
  if (r < 0.65) return 4;
  return 5;
}

function formatDate(d) {
  const week = ['日', '月', '火', '水', '木', '金', '土'];
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${week[d.getDay()]}）`;
}

// 占いページ見出し用（年なし）: 10月18日（日）
function formatMonthDay(d) {
  const week = ['日', '月', '火', '水', '木', '金', '土'];
  return `${d.getMonth() + 1}月${d.getDate()}日（${week[d.getDay()]}）`;
}

let _currentPageId = null;

function showPage(pageId) {
  clearAllTimers();
  if (pageId === 'page-calendar') {
    if (_currentPageId !== 'page-calendar') startImageRound();
    renderMonth();
    preloadUpcomingImages(16);
    ensureHearts();
  }
  if (pageId === 'page-today') {
    assignTopPageImages();
    updateTodayPage();
    ensureHearts();
  }
  if (FORTUNE_PAGE_IDS.has(pageId)) {
    // ページ表示前に src をセット＆imgFrame を非表示にリセット（フラッシュ防止）
    applySessionImage(pageId);
    const pageEl = document.getElementById(pageId);
    const imgFrameEl = pageEl && pageEl.querySelector('.fortune-img-frame');
    if (imgFrameEl) {
      imgFrameEl.style.transition = '';
      imgFrameEl.style.opacity    = '';
      imgFrameEl.style.transform  = '';
      imgFrameEl.classList.remove('is-visible');
    }
    // 見出し1行目の日付は表示のたびに取得し直す（日またぎ対策）
    const dateEl = pageEl && pageEl.querySelector('.fortune-title-date');
    if (dateEl) dateEl.textContent = formatMonthDay(new Date());
  }
  PAGES.forEach(id => {
    document.getElementById(id).hidden = (id !== pageId);
  });
  _currentPageId = pageId;
  document.body.dataset.page = pageId;
  // 今日の占い画面では見出し下の日付だけを表示する
  document.getElementById('today-date').hidden = (pageId === 'page-today');
  if (FORTUNE_PAGE_IDS.has(pageId)) {
    animateFortunePage(pageId);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const CATEGORY_LABELS = {
  overall: '総合運',
  love:    '恋愛運',
  work:    '仕事運',
  money:   '金運',
};

function setPortrait(elId, nameElId, sign) {
  const el = document.getElementById(elId);
  if (el) el.innerHTML = FORTUNE_SILHOUETTES[sign.charKey] || '';
  const nameEl = document.getElementById(nameElId);
  if (nameEl) nameEl.textContent = sign.name;
}

function showFortune(signIndex) {
  assignSessionImages(); // 4ページ分の画像を重複なしで選び直す
  const sign = SIGNS[signIndex];
  const rand = seededRand(getDailySeed(signIndex));

  const cats = ['overall', 'love', 'work', 'money'];
  const data = {};
  cats.forEach(k => {
    data[k] = { stars: getStarCount(rand), text: pickRandom(MESSAGES[k], rand) };
  });
  const luckyColor  = pickRandom(LUCKY_COLORS, rand);
  const luckyNumber = pickRandom(LUCKY_NUMBERS, rand);

  setPortrait('portrait-overall', 'charname-overall', sign);
  setPortrait('portrait-love',    'charname-love',    sign);
  setPortrait('portrait-work',    'charname-work',    sign);
  setPortrait('portrait-money',   'charname-money',   sign);

  // 総合運
  document.getElementById('overall-title').textContent = `${sign.name}の${CATEGORY_LABELS.overall}`;
  const starsOverall = document.getElementById('stars-overall');
  starsOverall._starText = starsHTML(data.overall.stars);
  const textOverall = document.getElementById('text-overall');
  textOverall._fullText = data.overall.text;
  document.getElementById('lucky-color').textContent        = luckyColor;
  document.getElementById('lucky-number').textContent       = luckyNumber;
  document.getElementById('lucky-color-love').textContent   = luckyColor;
  document.getElementById('lucky-number-love').textContent  = luckyNumber;
  document.getElementById('lucky-color-work').textContent   = luckyColor;
  document.getElementById('lucky-number-work').textContent  = luckyNumber;
  document.getElementById('lucky-color-money').textContent  = luckyColor;
  document.getElementById('lucky-number-money').textContent = luckyNumber;

  // 恋愛運
  document.getElementById('love-title').textContent = `${sign.name}の${CATEGORY_LABELS.love}`;
  const starsLove = document.getElementById('stars-love');
  starsLove._starText = starsHTML(data.love.stars);
  const textLove = document.getElementById('text-love');
  textLove._fullText = data.love.text;

  // 仕事運
  document.getElementById('work-title').textContent = `${sign.name}の${CATEGORY_LABELS.work}`;
  const starsWork = document.getElementById('stars-work');
  starsWork._starText = starsHTML(data.work.stars);
  const textWork = document.getElementById('text-work');
  textWork._fullText = data.work.text;

  // 金運
  document.getElementById('money-title').textContent = `${sign.name}の${CATEGORY_LABELS.money}`;
  const starsMoney = document.getElementById('stars-money');
  starsMoney._starText = starsHTML(data.money.stars);
  const textMoney = document.getElementById('text-money');
  textMoney._fullText = data.money.text;

  showPage('page-overall');
}

// ── PWAインストールバナー ──
(function () {
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    navigator.standalone === true;
  if (isStandalone) return;
  if (sessionStorage.getItem(`${APP_STORAGE_PREFIX}_installBannerDismissed`)) return;

  const banner     = document.getElementById('install-banner');
  const installBtn = document.getElementById('install-btn');
  const closeBtn   = document.getElementById('install-close');
  const overlay    = document.getElementById('ios-popup-overlay');
  const popup      = document.getElementById('ios-popup');
  const popupClose = document.getElementById('ios-popup-close');

  function hideBanner() {
    banner.hidden = true;
    sessionStorage.setItem(`${APP_STORAGE_PREFIX}_installBannerDismissed`, '1');
  }

  closeBtn.addEventListener('click', hideBanner);
  overlay.addEventListener('click', () => { overlay.hidden = true; popup.hidden = true; });
  popupClose.addEventListener('click', () => { overlay.hidden = true; popup.hidden = true; });

  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    banner.hidden = false;
    installBtn.addEventListener('click', async () => {
      hideBanner();
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
    });
  });

  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  if (isIos) {
    document.getElementById('install-banner-text').textContent = 'ホーム画面に追加してアプリとして使えます';
    installBtn.textContent = '追加方法を見る';
    banner.hidden = false;
    installBtn.addEventListener('click', () => { overlay.hidden = false; popup.hidden = false; });
  }
})();

// 日付表示
document.getElementById('today-date').textContent = formatDate(new Date());

// 星座ボタン生成
const grid = document.getElementById('sign-grid');
SIGNS.forEach((sign, i) => {
  const btn = document.createElement('button');
  btn.className = 'sign-btn';
  const wrap = document.createElement('div');
  wrap.className = 'sign-btn-img-wrap';
  const img = document.createElement('img');
  img.className = 'sign-btn-img';
  img.alt = sign.name;
  _topPageImgEls.push(img);
  const nameSpan = document.createElement('span');
  nameSpan.className = 'btn-name';
  nameSpan.innerHTML = `<span class="btn-zodiac-icon">${ZODIAC_SILHOUETTES[sign.charKey]}</span>${sign.name}`;
  wrap.appendChild(img);
  wrap.appendChild(nameSpan);
  btn.appendChild(wrap);
  btn.dataset.charKey = sign.charKey;
  btn.addEventListener('click', () => showFortune(i));
  grid.appendChild(btn);
});

// ナビゲーション
document.getElementById('overall-back').addEventListener('click', () => showPage('page-today'));
document.getElementById('overall-next').addEventListener('click', () => showPage('page-love'));
document.getElementById('love-back').addEventListener('click', () => showPage('page-overall'));
document.getElementById('love-next').addEventListener('click', () => showPage('page-work'));
document.getElementById('work-back').addEventListener('click', () => showPage('page-love'));
document.getElementById('work-next').addEventListener('click', () => showPage('page-money'));
document.getElementById('money-back').addEventListener('click', () => showPage('page-work'));
// 🏠 トップへ → カレンダー（showPage 内で ensureHearts() を呼ぶ）
document.getElementById('money-next').addEventListener('click', () => showPage('page-calendar'));

// ハートアニメーション（PC表示のみ）
function initHearts() {
  if (window.innerWidth < 768) return;
  const total = 30;
  const half = total / 2;
  for (let i = 0; i < total; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.textContent = '♡';
    const size = 18 + Math.random() * 14;
    heart.style.fontSize = size + 'px';
    const left = i < half
      ? Math.random() * 45
      : 55 + Math.random() * 45;
    heart.style.left = left + '%';
    heart.style.animationDuration = (15 + Math.random() * 7) + 's';
    heart.style.animationDelay = (-Math.random() * 18) + 's';
    document.body.appendChild(heart);
  }
}

function ensureHearts() {
  if (window.innerWidth < 768) return;
  if (document.querySelectorAll('.heart-float').length === 0) {
    initHearts();
  }
}

initHearts();

// ═══════════════════════════════════════════
//  セトカン カレンダー2027
// ═══════════════════════════════════════════
// 出典: 内閣府 国民の祝日
// 2026年11月〜2027年12月（振替休日を含む）
const HOLIDAYS = [
  ['2026-11-03', '文化の日'],
  ['2026-11-23', '勤労感謝の日'],
  ['2027-01-01', '元日'],
  ['2027-01-11', '成人の日'],
  ['2027-02-11', '建国記念の日'],
  ['2027-02-23', '天皇誕生日'],
  ['2027-03-21', '春分の日'],
  ['2027-03-22', '振替休日'],
  ['2027-04-29', '昭和の日'],
  ['2027-05-03', '憲法記念日'],
  ['2027-05-04', 'みどりの日'],
  ['2027-05-05', 'こどもの日'],
  ['2027-07-19', '海の日'],
  ['2027-08-11', '山の日'],
  ['2027-09-20', '敬老の日'],
  ['2027-09-23', '秋分の日'],
  ['2027-10-11', 'スポーツの日'],
  ['2027-11-03', '文化の日'],
  ['2027-11-23', '勤労感謝の日'],
];
const HOLIDAY_MAP = new Map(HOLIDAYS);

const CAL_START = new Date(2026, 10, 1);   // 2026-11-01
const CAL_END   = new Date(2027, 11, 31);  // 2027-12-31
const MONTH_MIN = 2026 * 12 + 10;
const MONTH_MAX = 2027 * 12 + 11;
const WEEKDAYS  = ['日', '月', '火', '水', '木', '金', '土'];

function ymd(d) {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function isSameDay(a, b) { return ymd(a) === ymd(b); }

function clampToRange(d) {
  if (d < CAL_START) return new Date(CAL_START);
  if (d > CAL_END)   return new Date(CAL_END);
  return d;
}

const _initialDate = clampToRange(new Date());
const calState = {
  monthIndex: _initialDate.getFullYear() * 12 + _initialDate.getMonth(),
};

function dayClasses(d, today) {
  const cls = [];
  if (d.getDay() === 0) cls.push('is-sun');
  if (d.getDay() === 6) cls.push('is-sat');
  if (HOLIDAY_MAP.has(ymd(d))) cls.push('is-holiday');
  if (isSameDay(d, today)) cls.push('is-today');
  return cls;
}

function onDateTap(d) {
  if (isSameDay(d, new Date())) {
    showPage('page-today');
  } else {
    showCalToast();
  }
}

let _toastTimer = null;
function showCalToast() {
  const toast = document.getElementById('cal-toast');
  toast.hidden = true;
  void toast.offsetWidth; // アニメーション再生のためリフロー
  toast.hidden = false;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => { toast.hidden = true; }, 2500);
}

// 長い祝日名は自然な位置で2行に分ける（例: 勤労感謝／の日、天皇／誕生日）
function holidayLabelHTML(name) {
  let parts = [name];
  if (name.length > 4) {
    parts = name.endsWith('の日') ? [name.slice(0, -2), 'の日'] : [name.slice(0, 2), name.slice(2)];
  }
  return parts.map(p => `<span>${p}</span>`).join('');
}

// カレンダー背景：表示のたびに山札から1枚引く
function applyCalendarBg() {
  setImageWithFallback(document.getElementById('cal-bg-img'), dealImages(1)[0]);
}

function renderMonth() {
  const today = new Date();
  const year  = Math.floor(calState.monthIndex / 12);
  const month = calState.monthIndex % 12;
  document.getElementById('month-label').textContent = `${year}年${month + 1}月`;
  document.getElementById('month-prev').disabled = calState.monthIndex <= MONTH_MIN;
  document.getElementById('month-next').disabled = calState.monthIndex >= MONTH_MAX;
  applyCalendarBg();

  const grid = document.getElementById('month-grid');
  grid.innerHTML = '';
  const firstDow    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells  = Math.ceil((firstDow + daysInMonth) / 7) * 7;

  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - firstDow + 1;
    if (dayNum < 1 || dayNum > daysInMonth) {
      const empty = document.createElement('div');
      empty.className = 'cal-cell is-empty';
      grid.appendChild(empty);
      continue;
    }
    const d = new Date(year, month, dayNum);
    const cell = document.createElement('button');
    cell.className = ['cal-cell', ...dayClasses(d, today)].join(' ');
    const holiday = HOLIDAY_MAP.get(ymd(d));
    cell.innerHTML = `<span class="cal-day">${dayNum}</span>` +
      (holiday ? `<span class="cal-holiday">${holidayLabelHTML(holiday)}</span>` : '');
    cell.setAttribute('aria-label', `${month + 1}月${dayNum}日（${WEEKDAYS[d.getDay()]}）${holiday ? ' ' + holiday : ''}`);
    cell.addEventListener('click', () => onDateTap(d));
    grid.appendChild(cell);
  }
}

function updateTodayPage() {
  document.getElementById('today-fortune-date').textContent = formatDate(new Date());
}

// カレンダー操作
document.getElementById('month-prev').addEventListener('click', () => {
  if (calState.monthIndex > MONTH_MIN) { calState.monthIndex--; renderMonth(); }
});
document.getElementById('month-next').addEventListener('click', () => {
  if (calState.monthIndex < MONTH_MAX) { calState.monthIndex++; renderMonth(); }
});
document.getElementById('today-fortune-btn').addEventListener('click', () => showPage('page-today'));
document.getElementById('today-back').addEventListener('click', () => showPage('page-calendar'));

// 初期表示：カレンダー
showPage('page-calendar');
