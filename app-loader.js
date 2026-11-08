// ۱. ثبت سرویس ورکر
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
        background: transparent; color: var(--text-color, #f0e6d2);
        border: none; font-size: 26px; cursor: pointer;
        transition: transform 0.3s; padding: 5px;
    `;
    settingsBtn.onmouseover = () => settingsBtn.style.transform = 'rotate(90deg)';
    settingsBtn.onmouseout = () => settingsBtn.style.transform = 'rotate(0deg)';
    document.body.appendChild(settingsBtn);

    // ۳. ساخت منوی کناری با متغیرهای CSS
    const sidebar = document.createElement('div');
    sidebar.style.cssText = `
        position: fixed; top: 0; left: -350px; width: 300px; height: 100vh;
        background: var(--bg-main, #0a0a0a); border-right: 2px solid var(--accent, #5c0e1b);
        color: var(--text-color, #f0e6d2); z-index: 10000; padding: 20px; box-sizing: border-box;
        transition: left 0.3s ease, background-color 0.3s; overflow-y: auto; box-shadow: 5px 0 20px rgba(0,0,0,0.5);
    `;
    
    // ۴. محتوای منو
    sidebar.innerHTML = `
        <h2 style="color: var(--accent, #5c0e1b); margin-top: 0; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">Settings</h2>
        
        <h3 style="font-size: 16px; margin-top: 20px; color: var(--text-color);">Account</h3>
        <input type="text" id="usernameInput" placeholder="Your Name" style="width: 100%; padding: 10px; margin-bottom: 10px; background: var(--bg-glass); border: 1px solid var(--border-color); color: var(--text-color); border-radius: 8px; box-sizing: border-box;">
        <button id="saveNameBtn" style="width: 100%; padding: 10px; border-radius: 8px; background: var(--accent); color: #f0e6d2; border: none; cursor: pointer;">Change Account</button>

        <h3 style="font-size: 16px; margin-top: 20px; color: var(--text-color);">Theme</h3>
        <label style="display: flex; align-items: center; margin-bottom: 10px; color: var(--text-color); cursor: pointer;">
            <input type="radio" name="themeMode" value="light" style="margin-right: 10px; accent-color: var(--accent); width: 18px; height: 18px;"> Day Mode
        </label>
        <label style="display: flex; align-items: center; color: var(--text-color); cursor: pointer;">
            <input type="radio" name="themeMode" value="dark" style="margin-right: 10px; accent-color: var(--accent); width: 18px; height: 18px;" checked> Night Mode
        </label>

        <h3 style="font-size: 16px; margin-top: 20px; color: var(--text-color);">Accent Color</h3>
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <div class="c-circle" data-color="#5c0e1b" style="width: 30px; height: 30px; border-radius: 50%; background: #5c0e1b; cursor: pointer; border: 2px solid transparent;"></div>
            <div class="c-circle" data-color="#1d3557" style="width: 30px; height: 30px; border-radius: 50%; background: #1d3557; cursor: pointer; border: 2px solid transparent;"></div>
            <div class="c-circle" data-color="#6b705c" style="width: 30px; height: 30px; border-radius: 50%; background: #6b705c; cursor: pointer; border: 2px solid transparent;"></div>
        </div>
        
        <label style="color: var(--text-color); font-size: 14px;">Custom Color:</label>
        <div id="customColorPicker" style="width: 100%; height: 120px; border-radius: 8px; background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0)), linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000); cursor: crosshair; position: relative; margin-bottom: 10px; border: 1px solid var(--border-color);"></div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <span id="hexDisplay" style="color: var(--text-color); font-family: monospace;">#5c0e1b</span>
            <div id="colorPreview" style="width: 30px; height: 30px; border-radius: 50%; background: #5c0e1b; border: 2px solid var(--text-color);"></div>
        </div>

        <h3 style="font-size: 16px; margin-top: 20px; color: var(--text-color);">Support</h3>
        <form id="supportForm" action="https://formspree.io/f/mgaaqgnz" method="POST">
            <input type="text" name="name" placeholder="Name" style="width: 100%; padding: 8px; margin-bottom: 5px; background: var(--bg-glass); border: 1px solid var(--border-color); color: var(--text-color); border-radius: 5px;">
            <input type="email" name="email" placeholder="Email" style="width: 100%; padding: 8px; margin-bottom: 5px; background: var(--bg-glass); border: 1px solid var(--border-color); color: var(--text-color); border-radius: 5px;">
            <textarea name="message" placeholder="Message" rows="2" style="width: 100%; padding: 8px; margin-bottom: 5px; background: var(--bg-glass); border: 1px solid var(--border-color); color: var(--text-color); border-radius: 5px;"></textarea>
            <button type="submit" style="width: 100%; padding: 10px; border-radius: 8px; background: var(--accent); color: #f0e6d2; border: none; cursor: pointer;">Send Message</button>
        </form>
    `;
    document.body.appendChild(sidebar);

    // ۵. باز و بسته کردن منو
    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.style.left = '0px';
    });
    
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !settingsBtn.contains(e.target) && sidebar.style.left === '0px') {
            sidebar.style.left = '-350px';
        }
    });

    // ۶. تغییر رنگ
    const updateColor = (c) => {
        document.documentElement.style.setProperty('--accent', c);
        localStorage.setItem('accentColor', c);
        document.getElementById('hexDisplay').innerText = c.toUpperCase();
        document.getElementById('colorPreview').style.background = c;

        const r = parseInt(c.slice(1, 3), 16);
        const g = parseInt(c.slice(3, 5), 16);
        const b = parseInt(c.slice(5, 7), 16);
        const lightR = Math.round(r * 0.15 + 255 * 0.85);
        const lightG = Math.round(g * 0.15 + 255 * 0.85);
        const lightB = Math.round(b * 0.15 + 255 * 0.85);
        document.documentElement.style.setProperty('--day-bg', `rgb(${lightR}, ${lightG}, ${lightB})`);

        document.querySelectorAll('.c-circle').forEach(el => el.style.borderColor = 'transparent');
        const active = document.querySelector(`.c-circle[data-color="${c}"]`);
        if(active) active.style.borderColor = 'var(--text-color)';
    };

    const saved = localStorage.getItem('accentColor') || '#5c0e1b';
    updateColor(saved);

    document.querySelectorAll('.c-circle').forEach(circle => {
        circle.addEventListener('click', (e) => {
            updateColor(e.target.getAttribute('data-color'));
        });
    });

    // پالت رنگ سفارشی
    const picker = document.getElementById('customColorPicker');
    picker.addEventListener('click', (e) => {
        const rect = picker.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const hue = (x / rect.width) * 360;
        const lightness = 50 - (y / rect.height) * 50;

        const hslToHex = (h, s, l) => {
            l /= 100;
            const a = s * Math.min(l, 1 - l) / 100;
            const f = n => {
                const k = (n + h / 30) % 12;
                const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                return Math.round(255 * color).toString(16).padStart(2, '0');
            };
            return `#${f(0)}${f(8)}${f(4)}`;
        };
        updateColor(hslToHex(hue, 100, lightness));
    });

    // ۷. تغییر تم
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

    // ۸. ذخیره نام
    const nameInp = document.getElementById('usernameInput');
    nameInp.value = localStorage.getItem('userName') || '';
    document.getElementById('saveNameBtn').addEventListener('click', () => {
        localStorage.setItem('userName', nameInp.value);
        alert('Name saved!');
    });
});
