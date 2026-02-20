/* ============================================
   ShopGuard — Authentication Module
   File: js/auth.js
   ============================================ */

/**
 * Select role on login screen
 */
function selectLoginRole(role, el) {
    AppState.selectedLoginRole = role;
    document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }
  
  /**
   * Handle login form submission
   */
  function doLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const pass  = document.getElementById('loginPass').value.trim();
  
    if (!email || !pass) {
      showToast('Please enter email and password', 'error');
      return;
    }
  
    // Simulate login
    AppState.isLoggedIn = true;
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('app').style.display = 'block';
  
    switchRole(AppState.selectedLoginRole);
    showToast('Welcome back! Logged in successfully.', 'success');
  }
  
  /**
   * Handle logout
   */
  function doLogout() {
    AppState.isLoggedIn = false;
    document.getElementById('app').style.display = 'none';
    document.getElementById('loginPage').style.display = 'flex';
    showToast('Logged out successfully.', 'info');
  }
  
  /**
   * Switch between Admin / Citizen / Owner roles
   */
  function switchRole(role) {
    AppState.currentRole = role;
    const r = ROLES[role];
  
    // Update sidebar identity
    document.getElementById('sidebarAvatar').textContent = r.avatar;
    document.getElementById('sidebarName').textContent   = r.name;
    document.getElementById('sidebarRole').textContent   = r.type;
    document.getElementById('topAvatar').textContent     = r.avatar;
  
    // Show/hide nav sections
    document.getElementById('adminNav').style.display   = role === 'admin'   ? '' : 'none';
    document.getElementById('citizenNav').style.display = role === 'citizen' ? '' : 'none';
    document.getElementById('ownerNav').style.display   = role === 'owner'   ? '' : 'none';
  
    // Update role switcher highlights
    document.querySelectorAll('.role-option').forEach((opt, i) => {
      const roleMap = ['admin', 'citizen', 'owner'];
      opt.classList.toggle('active', roleMap[i] === role);
    });
  
    // Close the dropdown
    closeSwitcher();
  
    // Navigate to default page for this role
    goTo(r.defaultPage);
  
    showToast(`Switched to ${r.name} view`, 'info');
  }
  
  /**
   * Toggle role-switcher dropdown
   */
  function toggleRoleSwitcher() {
    document.getElementById('roleSwitcher').classList.toggle('open');
  }
  
  /**
   * Close role-switcher dropdown
   */
  function closeSwitcher() {
    document.getElementById('roleSwitcher').classList.remove('open');
  }
  
  /**
   * Show register toast (placeholder)
   */
  function showRegister() {
    showToast('Registration form coming soon!', 'info');
  }
  
  // Close switcher when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.role-badge') && !e.target.closest('.role-switcher')) {
      closeSwitcher();
    }
  });
  