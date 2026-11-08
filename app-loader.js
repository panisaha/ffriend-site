// ۱. ثبت سرویس ورکر (برای PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/ffriend-site/sw.js').catch(err => console.log('SW Error: ', err));
  });
}

document.addEventListener('DOMContentLoaded', () => {
    
    // ۲. ساخت دکمه چرخ‌دنده
    const settingsBtn = document.createElement('button');
    settingsBtn.innerHTML = '<i class="fas fa-cog"></i>';
    settingsBtn.style.cssText = `
        position: fixed; top: 15px; left: 15px; z-index: 9999;
        background: var(--bg-glass, #1a1a1a); color: var(--text-color, #f0e6d2);
        border: 1px solid var(--border-color, #8b0000); border-radius: 50%;
        width: 45px; height: 45px; font-size: 20px; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        backdrop-filter: blur(10px); transition: transform 0.3s;
    `;
    settingsBtn.onmouseover = () => settingsBtn.style.transform = 'rotate(90deg)';
    settingsBtn.onmouseout = () => settingsBtn.style.transform = 'rotate(0deg)';
    document.body.appendChild(settingsBtn);

    // ۳. ساخت منوی کناری
    const sidebar = document.createElement('div');
    sidebar.style.cssText = `
        position: fixed; top: 0; left: -350px; width: 300px; height: 100vh;
        background: var(--bg-main, #0a0a0a); border-right: 2px solid var(--border-color, #8b0000);
        z-index: 10000; padding: 20px; box-sizing: border-box;
        transition: left 0.3s ease; overflow-y: auto; box-shadow: 5px 0 20px rgba(0,0,0,0.5);
    `;
    
    // ۴. محتوای داخل منو (اکانت، تم، رنگ، پشتیبانی)
    sidebar.innerHTML = `
        <h2 style="color: var(--accent, #5c0e1b); margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 10px;">Settings</h2>
        
        <h3 style="font-size: 16px; margin-top: 20px;">Account</h3>
        <input type="text" id="usernameInput" placeholder="Your Name" style="width: 100%; padding: 10px; margin-bottom: 10px; background: var(--bg-glass, #1a1a1a); border: 1px solid #333; color: var(--text-color, #fff); border-radius: 8px; box-sizing: border-box;">
        <button id="saveNameBtn" style="width: 100%; padding: 10px; border-radius: 8px; background: var(--accent, #5c0e1b); color: white; border: none; cursor: pointer;">Change Account</button>

        <h3 style="font-size: 16px; margin-top: 20px;">Theme</h3>
        <label style="display: flex; align-items: center; margin-bottom: 10px; color: var(--text-color, #fff); cursor: pointer;">
            <input type="radio" name="themeMode" value="light" style="margin-right: 10px;"> Day Mode
        </label>
        <label style="display: flex; align-items: center; color: var(--text-color, #fff); cursor: pointer;">
            <input type="radio" name="themeMode" value="dark" style="margin-right: 10px;" checked> Night Mode
        </label>

        <h3 style="font-size: 16px; margin-top: 20px;">Accent Color</h3>
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <div class="c-circle" data-color="#5c0e1b" style="width: 30px; height: 30px; border-radius: 50%; background: #5c0e1b; cursor: pointer; border: 2px solid transparent;"></div>
            <div class="c-circle" data-color="#1d3557" style="width: 30px; height: 30px; border-radius: 50%; background: #1d3557; cursor: pointer; border: 2px solid transparent;"></div>
            <div class="c-circle" data-color="#6b705c" style="width: 30px; height: 30px; border-radius: 50%; background: #6b705c; cursor: pointer; border: 2px solid transparent;"></div>
        </div>
        <label style="color: var(--text-color, #fff); font-size: 14px;">Custom:</label>
        <input type="color" id="customColorPicker" style="width: 100%; height: 40px; border: none; background: none; cursor: pointer;">

        <h3 style="font-size: 16px; margin-top: 20px;">Support</h3>
        <form id="supportForm" action="https://formspree.io/f/mgaaqgnz" method="POST">
            <input type="text" name="name" placeholder="Name" style="width: 100%; padding: 8px; margin-bottom: 5px; background: #1a1a1a; border: 1px solid #333; color: white; border-radius: 5px;">
            <input type="email" name="email" placeholder="Email" style="width: 100%; padding: 8px; margin-bottom: 5px; background: #1a1a1a; border: 1px solid #333; color: white; border-radius: 5px;">
            <textarea name="message" placeholder="Message" rows="2" style="width: 100%; padding: 8px; margin-bottom: 5px; background: #1a1a1a; border: 1px solid #333; color: white; border-radius: 5px;"></textarea>
            <button type="submit" style="width: 100%; padding: 10px; border-radius: 8px; background: var(--accent, #5c0e1b); color: white; border: none; cursor: pointer;">Send Message</button>
        </form>

        <button id="closeBtn" style="width: 100%; padding: 12px; margin-top: 20px; background: transparent; border: 1px solid #666; color: white; border-radius: 8px; cursor: pointer;">Close</button>
    `;
    document.body.appendChild(sidebar);

    // ۵. باز و بسته کردن منو
    settingsBtn.addEventListener('click', () => sidebar.style.left = '0px');
    document.getElementById('closeBtn').addEventListener('click', () => sidebar.style.left = '-350px');

    // ۶. تغییر رنگ تاکید
    const updateColor = (c) => {
        document.documentElement.style.setProperty('--accent', c);
        localStorage.setItem('accentColor', c);
        document.querySelectorAll('.c-circle').forEach(el => el.style.borderColor = 'transparent');
        const active = document.querySelector(`.c-circle[data-color="${c}"]`);
        if(active) active.style.borderColor = 'white';
    };

    const saved = localStorage.getItem('accentColor') || '#5c0e1b';
    document.getElementById('customColorPicker').value = saved;
    updateColor(saved);

    document.querySelectorAll('.c-circle').forEach(circle => {
        circle.addEventListener('click', (e) => {
            const c = e.target.getAttribute('data-color');
            document.getElementById('customColorPicker').value = c;
            updateColor(c);
        });
    });

    document.getElementById('customColorPicker').addEventListener('input', (e) => updateColor(e.target.value));

    // ۷. تغییر تم شب و روز
    document.querySelectorAll('input[name="themeMode"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'light') {
                document.body.classList.add('light-mode');
                localStorage.setItem('themeMode', 'light');
            } else {
                document.body.classList.remove('light-mode');
                localStorage.setItem('themeMode', 'dark');
            }
        });
    });

    if (localStorage.getItem('themeMode') === 'light') {
        document.body.classList.add('light-mode');
        document.querySelector('input[value="light"]').checked = true;
    }

    // ۸. ذخیره نام کاربری
    const nameInp = document.getElementById('usernameInput');
    nameInp.value = localStorage.getItem('userName') || '';
    document.getElementById('saveNameBtn').addEventListener('click', () => {
        localStorage.setItem('userName', nameInp.value);
        alert('Name saved!');
    });
});
