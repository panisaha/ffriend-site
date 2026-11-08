document.addEventListener('DOMContentLoaded', () => {
    
    // ۱. ساخت دکمه چرخ‌دنده (بدون هیچ پس‌زمینه و دایره‌ای)
    const settingsBtn = document.createElement('button');
    settingsBtn.innerHTML = '<i class="fas fa-cog"></i>';
    settingsBtn.id = 'clean-settings-btn'; // یه آیدی تمیز براش گذاشتیم
    document.body.appendChild(settingsBtn);

    // ۲. ساخت منوی تنظیمات (فقط اکانت و تم)
    const sidebar = document.createElement('div');
    sidebar.id = 'clean-settings-sidebar';
    
    sidebar.innerHTML = `
        <h2 style="color: var(--accent, #5c0e1b); margin-top: 0; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">Settings</h2>
        
        <h3 style="font-size: 16px; margin-top: 20px;">Account</h3>
        <input type="text" id="usernameInput" placeholder="Your Name" style="width: 100%; padding: 10px; margin-bottom: 10px; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-color); border-radius: 8px; box-sizing: border-box;">
        <button id="saveNameBtn" style="width: 100%; padding: 10px; border-radius: 8px; background: var(--accent); color: #f0e6d2; border: none; cursor: pointer;">Change Account</button>

        <h3 style="font-size: 16px; margin-top: 20px;">Theme</h3>
        <label style="display: flex; align-items: center; margin-bottom: 10px; color: var(--text-color); cursor: pointer;">
            <input type="radio" name="themeMode" value="light" style="margin-right: 10px; accent-color: var(--accent); width: 18px; height: 18px;"> Day Mode
        </label>
        <label style="display: flex; align-items: center; color: var(--text-color); cursor: pointer;">
            <input type="radio" name="themeMode" value="dark" style="margin-right: 10px; accent-color: var(--accent); width: 18px; height: 18px;" checked> Night Mode
        </label>
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

    // ۴. ذخیره و لود کردن نام
    const nameInp = document.getElementById('usernameInput');
    const savedName = localStorage.getItem('userName') || 'User';
    nameInp.value = savedName;

    document.getElementById('saveNameBtn').addEventListener('click', () => {
        localStorage.setItem('userName', nameInp.value || 'User');
        const toast = document.createElement('div');
        toast.innerText = 'Name Saved!';
        toast.style.cssText = `position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: var(--accent); color: #f0e6d2; padding: 10px 20px; border-radius: 20px; font-size: 14px; z-index: 99999; transition: opacity 0.3s;`;
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 2000);
    });

    // ۵. تغییر تم شب و روز
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
});
