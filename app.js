// این کد خودش تگ‌های لازم رو به صفحه اضافه می‌کنه
const manifestLink = document.createElement('link');
manifestLink.rel = 'manifest';
manifestLink.href = 'manifest.json';
document.head.appendChild(manifestLink);

// ثبت سرویس ورکر
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(err => console.log('SW Error', err));
}
