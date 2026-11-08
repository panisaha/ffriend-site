// ۱. ثبت سرویس ورکر (برای حالت آفلاین)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/ffriend-site/sw.js').catch(err => console.log('SW Error: ', err));
  });
}

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // ۲. تزریق استایل‌های منوی تنظیمات به صفحه
    // ==========================================
    const styleCSS = `
        #openSettingsBtn {
            position: fixed; top: 15px; left: 15px; z-index: 9999; 
            background: var(--bg-glass, #111); color: var(--text-color, #f0e6d2); 
            border: 1px solid var(--border-color, #8b0000); border-radius: 50%; 
            width: 45px; height: 45px; font-size: 22px; cursor: pointer; 
            backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center;
        }
        #settingsSidebar {
            position: fixed; top: 0; left: -350px; width: 300px; height: 100vh; 
            background: var(--bg-main, #0a0a0a); border-right: 2px solid var(--border-color, #8b0000); 
            z-index: 10000; padding: 20px; box-sizing: border-box; 
            transition: left 0.3s ease; overflow-y: auto; box-shadow: 5px 0 20px rgba(0,0,0,0.5);
        }
        .color-circle {
            width: 30px; height: 30px; border-radius: 50%; cursor: pointer; 
            border: 2px solid transparent; transition: border 0.2s;
        }
        .settings-input {
            width: 100%; padding: 10px; margin-bottom: 10px; 
            background: var(--bg-glass, #1a1a1a); border: 1px solid var(--border-color, #333); 
            color: var(--text-color, #fff); border-radius: 8px; box-sizing: border-box;
        }
        .settings-btn {
            width: 100%; padding: 10px; border-radius: 8px; font-weight: bold;
            background: var(--accent, #5c0e1b); color: #f0e6d2; border: none; cursor: pointer;
        }
        .settings-title {
            color: var(--accent, #5c0e1b); margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 10px;
        }
        .settings-subtitle {
            font-size: 16px; margin-bottom: 10px; margin-top: 20px;
        }
    `;
    const styleEl = document.createElement('style');
    styleEl.innerHTML = styleCSS;
    document.head.appendChild(styleEl);

    // ==========================================
    // ۳. ساخت HTML منوی تنظیمات
    // ==========================================
    const settingsHTML = `
        <button id="openSettingsBtn">⚙️</button>

        <div id="settingsSidebar">
            <h2 class="settings-title">Settings</h2>
            
            <!-- بخش اکانت -->
            <div>
                <h3 class="settings-subtitle">Account</h3>
                <input type="text" id="usernameInput" class="settings-input" placeholder="Your Name">
                <button id="saveNameBtn" class="settings-btn">Change Account</button>
            </div>

            <!-- بخش تم -->
            <div>
                <h3 class="settings-subtitle">Theme</h3>
                <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer; color: var(--text-color, #fff);">
                    <input type="radio" name="themeMode" value="light" style="margin-right: 10px; accent-color: var(--accent, #5c0e1b); width: 18px; height: 18px;"> Day Mode
                </label>
                <label style="display: flex; align-items: center; cursor: pointer; color: var(--text-color, #fff);">
                    <input type="radio" name="themeMode" value="dark" style="margin-right: 10px; accent-color: var(--accent, #5c0e1b); width: 18px; height: 18px;" checked> Night Mode
                </label>
            </div>

            <!-- بخش رنگ‌ها -->
            <div>
                <h3 class="settings-subtitle">Accent Color</h3>
                <div style="display: flex; gap: 10px; margin-bottom: 15px;" id="presetColors">
                    <div class="color-circle" data-color="#5c0e1b" style="background: #5c0e1b;"></div>
                    <div class="color-circle" data-color="#1d3557" style="background: #1d3557;"></div>
                    <div class="color-circle" data-color="#6b705c" style="background: #6b705c;"></div>
                    <div class="color-circle" data-color="#7a3e28" style="background: #7a3e28;"></div>
                </div>
                <label style="display: block; margin-bottom: 5px; font-size: 14px; color: var(--text-color, #fff);">Custom Color:</label>
                <input type="color" id="customColorPicker" style="width: 100%; height: 40px; border: none; background: none; cursor: pointer;">
            </div>

            <!-- فرم پشتیبانی -->
            <div style="margin-bottom: 30px;">
                <h3 class="settings-subtitle">Support</h3>
                <input type="text" placeholder="Name" class="settings-input">
                <input type="email" placeholder="Email" class="settings-input">
                <textarea placeholder="Message" class="settings-input" rows="3" style="resize: none;"></textarea>
                <button class="settings-btn">Send Message</button>
            </div>

            <button id="closeSettingsBtn" style="width: 100%; padding: 12px; background: transparent; border: 1px solid var(--text-color, #fff); color: var(--text-color, #fff); border-radius: 8px; cursor: pointer;">Close Menu</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', settingsHTML);

    // ==========================================
    // ۴. منطق باز و بسته شدن منو
    // ==========================================
    const sidebar = document.getElementById('settingsSidebar');
    document.getElementById('openSettingsBtn').onclick = () => sidebar.style.left = '0px';
    document.getElementById('closeSettingsBtn').onclick = () => sidebar.style.left = '-350px';

    // ==========================================
    // ۵. ذخیره و بازیابی تنظیمات
    // ==========================================
    const root = document.documentElement;
    
    // تغییر رنگ
    const updateAccent = (color) => {
        root.style.setProperty('--accent', color);
        localStorage.setItem('accentColor', color);
        document.querySelectorAll('.color-circle').forEach(c => c.style.borderColor = 'transparent');
        const activeCircle = document.querySelector(`.color-circle[data-color="${color}"]`);
        if (activeCircle) activeCircle.style.borderColor = 'white';
    };

    const savedColor = localStorage.getItem('accentColor') || '#5c0e1b';
    document.getElementById('customColorPicker').value = savedColor;
    updateAccent(savedColor);

    document.querySelectorAll('.color-circle').forEach(circle => {
        circle.onclick = (e) => {
            const color = e.target.getAttribute('data-color');
            document.getElementById('customColorPicker').value = color;
            updateAccent(color);
        };
    });

    document.getElementById('customColorPicker').oninput = (e) => updateAccent(e.target.value);

    // تغییر تم
    const themeRadios = document.querySelectorAll('input[name="themeMode"]');
    themeRadios.forEach(radio => {
        radio.onchange = (e) => {
            if (e.target.value === 'light') {
                document.body.classList.add('light-mode');
                localStorage.setItem('themeMode', 'light');
            } else {
                document.body.classList.remove('light-mode');
                localStorage.setItem('themeMode', 'dark');
            }
        };
    });

    if (localStorage.getItem('themeMode') === 'light') {
        document.body.classList.add('light-mode');
        document.querySelector('input[value="light"]').checked = true;
    }

    // ذخیره نام
    const nameInput = document.getElementById('usernameInput');
    nameInput.value = localStorage.getItem('userName') || '';
    
    document.getElementById('saveNameBtn').onclick = () => {
        localStorage.setItem('userName', nameInput.value);
        alert('Name saved successfully!');
    };
});
