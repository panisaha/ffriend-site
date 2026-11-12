document.addEventListener('DOMContentLoaded', () => {
    
    const myImageBase64 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgcng9IjgwIiBmaWxsPSIjMWExYTFhIi8+PHBhdGggZD0iTTE2MCAxNDBsMTYwIDB2MjAwbC0xNjAgMHoiIGZpbGw9IiNmMGU2ZDIiLz48cGF0aCBkPSJNMTYwIDE0MGwtMzAgMHYyMjBsMzAgMHoiIGZpbGw9IiNmMGU2ZDIiLz48cGF0aCBkPSJNMTMwIDM2MGwxNjAgMHYzMGwtMTYwIDB6IiBmaWxsPSIjZjBlNmQyIi8+PC9zdmc+';

    // ۱. کادر پروفایل
    const profileBox = document.createElement('div');
    profileBox.id = 'profile-container';
    profileBox.innerHTML = `
        <img id="profile-img" src="${myImageBase64}" alt="Profile">
        <span id="profile-name">User</span>
    `;
    document.body.appendChild(profileBox);

    // ۲. دکمه چرخ‌دنده
    const settingsBtn = document.createElement('button');
    settingsBtn.innerHTML = '<i class="fas fa-cog"></i>';
    settingsBtn.id = 'clean-settings-btn';
    document.body.appendChild(settingsBtn);

    // ۳. منوی تنظیمات
    const sidebar = document.createElement('div');
    sidebar.id = 'clean-settings-sidebar';
    
    sidebar.innerHTML = `
        <h2 style="color: var(--accent); margin-top: 0; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">Settings</h2>
        
        <h3 style="font-size: 16px; margin-top: 20px;">Account</h3>
        
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <img id="profileImagePreview" src="${myImageBase64}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 2px solid var(--accent);">
            <input type="file" id="profileImageInput" accept="image/*" style="display: none;">
            <button id="uploadImageBtn" style="padding: 8px 12px; border-radius: 8px; background: var(--bg-card); color: var(--text-color); border: 1px solid var(--border-color); cursor: pointer;">Upload Photo</button>
        </div>

        <input type="text" id="usernameInput" placeholder="Your Name" style="width: 100%; padding: 10px; margin-bottom: 10px; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-color); border-radius: 8px; box-sizing: border-box;">
        <button id="saveNameBtn" style="width: 100%; padding: 10px; border-radius: 8px; background: var(--accent); color: #f0e6d2; border: none; cursor: pointer;">Change Account</button>

        <h3 style="font-size: 16px; margin-top: 20px;">Theme</h3>
        <label style="display: flex; align-items: center; margin-bottom: 10px; color: var(--text-color); cursor: pointer;">
            <input type="radio" name="themeMode" value="light" style="margin-right: 10px; accent-color: var(--accent);"> Day Mode
        </label>
        <label style="display: flex; align-items: center; color: var(--text-color); cursor: pointer;">
            <input type="radio" name="themeMode" value="dark" style="margin-right: 10px; accent-color: var(--accent);" checked> Night Mode
        </label>
    `;
    document.body.appendChild(sidebar);

    // ۴. باز و بسته کردن منو (با کلاس open)
    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.add('open');
    });
    
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !settingsBtn.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    // ۵. مدیریت نام و عکس
    const nameInp = document.getElementById('usernameInput');
    const nameDisplay = document.getElementById('profile-name');
    const profileImgDisplay = document.getElementById('profile-img');
    const profileImgPreview = document.getElementById('profileImagePreview');
    const imageInput = document.getElementById('profileImageInput');
    
    const savedName = localStorage.getItem('userName') || 'User';
    nameInp.value = savedName;
    nameDisplay.innerText = savedName;

    const savedImg = localStorage.getItem('profileImage') || myImageBase64;
    profileImgDisplay.src = savedImg;
    profileImgPreview.src = savedImg;

    document.getElementById('saveNameBtn').addEventListener('click', () => {
        const newName = nameInp.value || 'User';
        localStorage.setItem('userName', newName);
        nameDisplay.innerText = newName;
        
        const toast = document.createElement('div');
        toast.innerText = 'Name Saved!';
        toast.style.cssText = `position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: var(--accent); color: #f0e6d2; padding: 10px 20px; border-radius: 20px; font-size: 14px; z-index: 99999; transition: opacity 0.3s;`;
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 2000);
    });

    document.getElementById('uploadImageBtn').addEventListener('click', () => imageInput.click());
    
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64Img = event.target.result;
                localStorage.setItem('profileImage', base64Img);
                profileImgDisplay.src = base64Img;
                profileImgPreview.src = base64Img;
            };
            reader.readAsDataURL(file);
        }
    });

    // ۶. تغییر تم
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
// ================== لود کردن فونت‌آوسام برای همه صفحات ==================
if (!document.querySelector('link[href*="font-awesome"]')) {
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(faLink);
}
