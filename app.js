// ۱. لینک کردن manifest
const manifestLink = document.createElement('link');
manifestLink.rel = 'manifest';
manifestLink.href = 'manifest.json';
document.head.appendChild(manifestLink);

// ۲. ثبت سرویس ورکر
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker Registered!'))
    .catch(err => console.log('SW Error', err));
}

// ۳. ساخت دکمه نصب
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // ساخت دکمه
  const installBtn = document.createElement('button');
  installBtn.innerHTML = '📲 نصب اپلیکیشن';
  installBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
    background-color: #5c0e1b;
    color: #f0e6d2;
    border: 2px solid #8b0000;
    border-radius: 30px;
    font-size: 16px;
    font-family: inherit;
    font-weight: bold;
    z-index: 9999;
    cursor: pointer;
    box-shadow: 0 0 15px rgba(139, 0, 0, 0.8);
    animation: pulse 2s infinite;
  `;

  // افکت چشمک زدن برای جلب توجه
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes pulse {
      0% { box-shadow: 0 0 15px rgba(139, 0, 0, 0.8); }
      50% { box-shadow: 0 0 25px rgba(255, 0, 0, 0.6); }
      100% { box-shadow: 0 0 15px rgba(139, 0, 0, 0.8); }
    }
  `;
  document.head.appendChild(style);

  // عملکرد دکمه
  installBtn.addEventListener('click', async () => {
    installBtn.style.display = 'none';
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response: ${outcome}`);
      deferredPrompt = null;
    }
  });

  document.body.appendChild(installBtn);
});
