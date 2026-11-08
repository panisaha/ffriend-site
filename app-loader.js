document.addEventListener('DOMContentLoaded', () => {
    
    // ۱. ساخت دکمه چرخ‌دنده ساده
    const settingsBtn = document.createElement('button');
    settingsBtn.innerHTML = '<i class="fas fa-cog"></i>';
    settingsBtn.style.cssText = `
        position: fixed; top: 15px; left: 15px; z-index: 9999;
        background: transparent; color: var(--text-color, #f0e6d2);
        border: none; font-size: 26px; cursor: pointer;
    `;
    document.body.appendChild(settingsBtn);

    // ۲. ساخت منوی کناری ساده
    const sidebar = document.createElement('div');
    sidebar.style.cssText = `
        position: fixed; top: 0; left: -300px; width: 280px; height: 100vh;
        background: var(--bg-main, #0a0a0a); border-right: 2px solid var(--accent, #5c0e1b);
        color: var(--text-color, #f0e6d2); z-index: 10000; padding: 20px; box-sizing: border-box;
        transition: left 0.3s ease; overflow-y: auto;
    `;
    
    sidebar.innerHTML = `
        <h2 style="color: var(--accent, #5c0e1b); margin-top: 0; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">Settings</h2>
        
        <h3 style="font-size: 16px; margin-top: 20px;">Account</h3>
        <input type="text" id="usernameInput" placeholder="Your Name" style="width: 100%; padding: 10px; margin-bottom: 10px; background: #1a1a1a; border: 1px solid #333; color: white; border-radius: 8px; box-sizing: border-box;">
        <button id="saveNameBtn" style="width: 100%; padding: 10px; border-radius: 8px; background: var(--accent); color: white; border: none; cursor: pointer;">Change Account</button>

        <h3 style="font-size: 16px; margin-top: 20px;">Theme</h3>
        <label style="display: flex; align-items: center; margin-bottom: 10px; cursor: pointer;">
            <input type="radio" name="themeMode" value="light" style="margin-right: 10px;"> Day Mode
        </label>
        <label style="display: flex; align-items: center; cursor: pointer;">
            <input type="radio" name="themeMode" value="dark" style="margin-right: 10px;" checked> Night Mode
        </label>

        <h3 style="font-size: 16px; margin-top: 20px;">Color</h3>
        <input type="color" id="customColorPicker" style="width: 100%; height: 40px; border: none; background: none; cursor: pointer;">
    `;
    document.body.appendChild(sidebar);

    // ۳. باز و بسته کردن منو
    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.style.left = '0px';
    });
    
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !settingsBtn.contains(e.target)) {
            sidebar.style.left = '-300px';
        }
    });

    // ۴. منطق رنگ و تم
    const updateColor = (c) => {
        document.documentElement.style.setProperty('--accent', c);
        localStorage.setItem('accentColor', c);
        const r = parseInt(c.slice(1, 3), 16);
        const g = parseInt(c.slice(3, 5), 16);
        const b = parseInt(c.slice(5, 7), 16);
        document.documentElement.style.setProperty('--day-bg', `rgb(${Math.round(r*0.15+255*0.85)}, ${Math.round(g*0.15+255*0.85)}, ${Math.round(b*0.15+255*0.85)})`);
    };

    const savedColor = localStorage.getItem('accentColor') || '#5c0e1b';
    document.getElementById('customColorPicker').value = savedColor;
    updateColor(savedColor);
    document.getElementById('customColorPicker').addEventListener('input', (e) => updateColor(e.target.value));

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

    const nameInp = document.getElementById('usernameInput');
    nameInp.value = localStorage.getItem('userName') || '';
    document.getElementById('saveNameBtn').addEventListener('click', () => {
        localStorage.setItem('userName', nameInp.value);
        alert('Name saved!');
    });
});
