/* ============================================
   ShopGuard — App Entry Point
   File: js/app.js
   ============================================ */

/**
 * Initialize app on DOM load
 */
document.addEventListener('DOMContentLoaded', () => {
    // Render dynamic tables
    renderShopsTable();
  
    // Attach Enter key to login
    document.getElementById('loginPass')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doLogin();
    });
  
    console.log('🍺 ShopGuard initialized successfully');
  });
  
