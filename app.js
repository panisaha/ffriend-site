// ۱. لینک کردن manifest
const manifestLink = document.createElement('link');
manifestLink.rel = 'manifest';
manifestLink.href = 'manifest.json';
document.head.appendChild(manifestLink);

// ۲. ثبت سرویس ورکر
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(err => console.log('SW Error', err));
}

// ۳. گوش دادن به رویداد نصب و ساختن یه دکمه شناور
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // جلوگیری از نمایش خودکار پیام مرورگر
  e.preventDefault();
  deferredPrompt = e;

  // ساخت دکمه نصب به صورت خودکار
  const installBtn = document.createElement('button');
  installBtn.innerText = '📲 نصب اپلیکیشن';
  installBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
    background-color: #5c0e1b;
    color: white;
    border: 1px solid #8b0000;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    z-index: 9999;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.8);
  `;

  // وقتی کاربر روی دکمه کلیک کرد
  installBtn.addEventListener('click', async () => {
    installBtn.style.display = 'none'; // پنهان کردن دکمه
    if (deferredPrompt) {
      deferredPrompt.prompt(); // نمایش پیام نصب مرورگر
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      deferredPrompt = null;
    }
  });

  document.body.appendChild(installBtn);
});
