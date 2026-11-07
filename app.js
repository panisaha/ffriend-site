// ثبت سرویس ورکر با مسیر کامل
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/ffriend-site/sw.js')
      .then(reg => console.log('SW Registered!', reg))
      .catch(err => console.log('SW Error: ', err));
  });
}

// ساخت دکمه نصب
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // اگه دکمه از قبل ساخته نشده، بسازش
  if (!document.getElementById('pwa-install-btn')) {
    const btn = document.createElement('button');
    btn.id = 'pwa-install-btn';
    btn.innerText = '📲 نصب اپلیکیشن';
    btn.style.cssText = 'position:fixed; bottom:20px; left:50%; transform:translateX(-50%); padding:15px 30px; background:#5c0e1b; color:#f0e6d2; border:2px solid #8b0000; border-radius:30px; font-size:18px; font-weight:bold; z-index:9999; cursor:pointer; box-shadow:0 0 20px #8b0000;';
    
    btn.onclick = async () => {
      btn.style.display = 'none';
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log('User choice:', outcome);
        deferredPrompt = null;
      }
    };
    document.body.appendChild(btn);
  }
});
