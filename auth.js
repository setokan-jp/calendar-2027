const GAS_URL = 'https://script.google.com/macros/s/AKfycbwvsyWvAd35fG25nHbx4wp459pLwcOlKNVOJn3KFuC5X8m9Oys93w1mbsF0p742WeZw2w/exec';
const LS_KEY = 'auth_email_setokan2027';

document.addEventListener('DOMContentLoaded', () => {
  const authScreen   = document.getElementById('auth-screen');
  const appContainer = document.querySelector('.container');
  const submitBtn    = document.getElementById('auth-submit-btn');
  const emailInput   = document.getElementById('auth-email');
  const errorMsg     = document.getElementById('auth-error');

  if (!authScreen || !appContainer) {
    console.error('Auth: DOM要素が見つかりません', { authScreen, appContainer });
    return;
  }

  // ランダム画像表示（script.js の IMAGE_POOL / FALLBACK_IMAGES を使用）
  const authImg = document.getElementById('auth-bg-img');
  if (authImg) {
    const pool = (typeof IMAGE_POOL !== 'undefined' && IMAGE_POOL.length) ? IMAGE_POOL : null;
    if (pool) {
      authImg.src = pool[Math.floor(Math.random() * pool.length)];
      authImg.onerror = () => {
        const fb = (typeof FALLBACK_IMAGES !== 'undefined' && FALLBACK_IMAGES.length)
          ? FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)]
          : './images/fallback/seto-kanna-fallback-1.webp';
        authImg.onerror = null;
        authImg.src = fb;
      };
    }
  }

  function showApp() {
    authScreen.style.display = 'none';
    appContainer.style.display = '';
    appContainer.removeAttribute('hidden');
  }

  function showAuthScreen() {
    authScreen.style.display = 'flex';
    appContainer.style.display = 'none';
  }

  const savedEmail = localStorage.getItem(LS_KEY);
  console.log('Auth check:', savedEmail);

  if (savedEmail) {
    showApp();
  } else {
    showAuthScreen();
  }

  async function signIn() {
    const email = emailInput.value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorMsg.textContent = '正しいメールアドレスを入力してください';
      errorMsg.hidden = false;
      return;
    }

    localStorage.setItem(LS_KEY, email);

    fetch(GAS_URL, {
      method: 'POST',
      body: JSON.stringify({ email, appName: 'セトカン カレンダー2027（ウェブ版）' })
    }).catch(err => console.log('GAS送信エラー:', err));

    showApp();
  }

  submitBtn.addEventListener('click', signIn);

  emailInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') signIn();
  });
});
